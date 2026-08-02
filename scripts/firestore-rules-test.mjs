// firestore.rules の検証用スクリプト（使い捨て。検証後に削除する）
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const app = initializeApp({ apiKey: 'fake-api-key', projectId: 'testsite-7f2a6' });
const auth = getAuth(app);
const db = getFirestore(app);
connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
connectFirestoreEmulator(db, '127.0.0.1', 8080);

const results = [];
async function check(label, expected, fn) {
  let actual = 'allow';
  try { await fn(); } catch (e) {
    actual = String(e?.code || e?.message || e).includes('permission-denied') ? 'deny' : `error(${e?.code || e?.message})`;
  }
  const pass = actual === expected;
  results.push({ label, expected, actual, pass });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  (期待:${expected} 実際:${actual})`);
}

async function as(email) {
  await signOut(auth).catch(() => {});
  try { await createUserWithEmailAndPassword(auth, email, 'passw0rd!'); }
  catch { await signInWithEmailAndPassword(auth, email, 'passw0rd!'); }
  return auth.currentUser.uid;
}

const POST = 'test-post-1';

// --- 攻撃者A（投稿者）と攻撃者B（第三者）を用意 ---
const uidA = await as('alice@example.com');

await check('A: 自分のuidで投稿を作成', 'allow', () =>
  setDoc(doc(db, 'forumPosts', POST), { title: 't', author: 'alice', category: 'c', content: 'original', date: '2026-08-02', createdAt: Date.now(), uid: uidA }));

await check('A: 他人(uid=stranger)になりすまして作成', 'deny', () =>
  setDoc(doc(db, 'forumPosts', 'spoofed'), { title: 't', author: 'x', category: 'c', content: 'x', date: '2026-08-02', createdAt: Date.now(), uid: 'stranger' }));

await check('A: 自分の投稿を更新', 'allow', () =>
  updateDoc(doc(db, 'forumPosts', POST), { content: 'edited by owner' }));

await check('A: 自分の投稿に返信', 'allow', () =>
  setDoc(doc(db, 'forumPosts', POST, 'replies', 'r1'), { author: 'alice', content: 'reply', createdAt: Date.now(), uid: uidA }));

const uidB = await as('mallory@example.com');

await check('B: 他人(A)の投稿を書き換え  ★今回の修正対象', 'deny', () =>
  updateDoc(doc(db, 'forumPosts', POST), { content: 'HIJACKED' }));

await check('B: 他人(A)の投稿の uid を自分に付け替え', 'deny', () =>
  updateDoc(doc(db, 'forumPosts', POST), { uid: uidB }));

await check('B: 他人(A)の投稿を削除', 'deny', () =>
  deleteDoc(doc(db, 'forumPosts', POST)));

await check('B: 他人(A)の返信を書き換え  ★今回の修正対象', 'deny', () =>
  updateDoc(doc(db, 'forumPosts', POST, 'replies', 'r1'), { content: 'HIJACKED' }));

await check('B: 自分のuidで投稿を作成', 'allow', () =>
  setDoc(doc(db, 'forumPosts', 'test-post-2'), { title: 't', author: 'mallory', category: 'c', content: 'ok', date: '2026-08-02', createdAt: Date.now(), uid: uidB }));

// 未ログインでも閲覧できること（掲示板の要件）
await signOut(auth);
await check('未ログイン: 投稿の閲覧', 'allow', () => getDoc(doc(db, 'forumPosts', POST)));
await check('未ログイン: 投稿の書き換え', 'deny', () =>
  updateDoc(doc(db, 'forumPosts', POST), { content: 'anon hijack' }));

// A の投稿が改竄されていないことを最終確認
const finalSnap = await getDoc(doc(db, 'forumPosts', POST));
const content = finalSnap.data()?.content;
console.log(`\n最終確認: A の投稿本文 = "${content}"`);
const intact = content === 'edited by owner';
console.log(intact ? '  → 改竄されていない' : '  → ★改竄された★');

const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} 件成功`);
process.exit(failed === 0 && intact ? 0 : 1);

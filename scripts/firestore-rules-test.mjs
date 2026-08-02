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

// ===== 使用量メトリクス (usage/*) =====
console.log('\n--- 使用量メトリクス ---');
const uidC = await as('carol@example.com');
const MB50 = 52428800;

await check('C: 自分の使用量を作成', 'allow', () =>
  setDoc(doc(db, 'usage', `${uidC}_202608`), { uploadedBytes: 1000 }));
await check('C: 自分の使用量を加算', 'allow', () =>
  setDoc(doc(db, 'usage', `${uidC}_202608`), { uploadedBytes: 2000 }));
await check('C: 一度に50MB超を加算', 'deny', () =>
  setDoc(doc(db, 'usage', `${uidC}_202608`), { uploadedBytes: 2000 + MB50 + 1 }));
await check('C: 使用量を減らして枠を回復', 'deny', () =>
  setDoc(doc(db, 'usage', `${uidC}_202608`), { uploadedBytes: 0 }));
await check('C: 他人の使用量を書き換え', 'deny', () =>
  setDoc(doc(db, 'usage', `${uidA}_202608`), { uploadedBytes: 999 }));
await check('C: サイト全体の使用量を加算（正規の利用）', 'allow', () =>
  setDoc(doc(db, 'usage', 'site_202608'), { uploadedBytes: 3000 }));
await check('C: サイト全体の使用量を巨大な値に改竄  ★今回の修正対象', 'deny', () =>
  setDoc(doc(db, 'usage', 'site_202608'), { uploadedBytes: 999999999999 }));
await check('C: 想定外フィールドを混入', 'deny', () =>
  setDoc(doc(db, 'usage', `${uidC}_202608`), { uploadedBytes: 2500, isAdmin: true }));

// ===== 公開スケジュールの回答 (schedules/*/participants, responses) =====
console.log('\n--- 公開スケジュールの回答 ---');
await as('alice@example.com');
const SCHED = 'public-schedule-1';
await check('A: 公開スケジュールを作成', 'allow', () =>
  setDoc(doc(db, 'schedules', SCHED), { ownerUid: uidA, isPublic: true, title: '打合せ' }));

await signOut(auth); // ここから未ログイン（公開スケジュールの想定利用者）
await check('未ログイン: 参加者として登録（正規の利用）', 'allow', () =>
  setDoc(doc(db, 'schedules', SCHED, 'participants', 'p1'), { name: '山田', comment: 'よろしく', createdAt: new Date(), updatedAt: new Date() }));
await check('未ログイン: 回答を送信（正規の利用）', 'allow', () =>
  setDoc(doc(db, 'schedules', SCHED, 'responses', 'r1'), { participantId: 'p1', optionId: 'o1', value: 'ok' }));
await check('未ログイン: 巨大な名前を登録  ★今回の修正対象', 'deny', () =>
  setDoc(doc(db, 'schedules', SCHED, 'participants', 'p2'), { name: 'x'.repeat(100000), createdAt: new Date(), updatedAt: new Date() }));
await check('未ログイン: 想定外フィールドで容量を埋める  ★今回の修正対象', 'deny', () =>
  setDoc(doc(db, 'schedules', SCHED, 'participants', 'p3'), { name: '山田', payload: 'x'.repeat(100000), createdAt: new Date(), updatedAt: new Date() }));
await check('未ログイン: 回答に巨大な値を入れる  ★今回の修正対象', 'deny', () =>
  setDoc(doc(db, 'schedules', SCHED, 'responses', 'r2'), { participantId: 'p1', optionId: 'o1', value: 'x'.repeat(100000) }));
await check('未ログイン: 参加者を削除', 'deny', () =>
  deleteDoc(doc(db, 'schedules', SCHED, 'participants', 'p1')));

const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} 件成功`);
process.exit(failed === 0 && intact ? 0 : 1);

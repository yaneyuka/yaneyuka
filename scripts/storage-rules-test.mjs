// storage.rules の検証（npm run test:storage-rules）
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getStorage, connectStorageEmulator, ref, uploadBytes } from 'firebase/storage';

const app = initializeApp({ apiKey: 'fake-api-key', projectId: 'testsite-7f2a6', storageBucket: 'testsite-7f2a6.firebasestorage.app' });
const auth = getAuth(app);
const storage = getStorage(app);
connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
connectStorageEmulator(storage, '127.0.0.1', 9199);

const results = [];
async function check(label, expected, fn) {
  let actual = 'allow';
  try { await fn(); } catch (e) {
    const msg = String(e?.code || e?.message || e);
    actual = msg.includes('unauthorized') || msg.includes('permission') ? 'deny' : `error(${msg.slice(0, 60)})`;
  }
  const pass = actual === expected;
  results.push(pass);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  (expected:${expected} actual:${actual})`);
}

async function as(email) {
  await signOut(auth).catch(() => {});
  try { await createUserWithEmailAndPassword(auth, email, 'passw0rd!'); }
  catch { await signInWithEmailAndPassword(auth, email, 'passw0rd!'); }
  return auth.currentUser.uid;
}

const MB = 1024 * 1024;
const blob = (bytes) => new Uint8Array(bytes);

const uidA = await as('alice@example.com');

await check('A: 自分の領域に 1MB をアップロード', 'allow', () =>
  uploadBytes(ref(storage, `userUploads/${uidA}/small`), blob(1 * MB)));

await check('A: ちょうど上限 100MB', 'allow', () =>
  uploadBytes(ref(storage, `userUploads/${uidA}/exact`), blob(100 * MB)));

await check('A: 上限超え 101MB  ★今回の修正対象', 'deny', () =>
  uploadBytes(ref(storage, `userUploads/${uidA}/toobig`), blob(101 * MB)));

const uidB = await as('mallory@example.com');

await check('B: 他人(A)の領域にアップロード', 'deny', () =>
  uploadBytes(ref(storage, `userUploads/${uidA}/intruder`), blob(1 * MB)));

await signOut(auth);
await check('未ログイン: アップロード', 'deny', () =>
  uploadBytes(ref(storage, `userUploads/${uidA}/anon`), blob(1 * MB)));

const failed = results.filter((r) => !r).length;
console.log(`\n${results.length - failed}/${results.length} 件成功`);
process.exit(failed === 0 ? 0 : 1);

import bcrypt from "bcryptjs";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const usersRef = collection(db, "users");
const SESSION_KEY = "devdeakin_user";
const SALT_ROUNDS = 10;

async function findUserByEmail(email) {
  const q = query(usersRef, where("email", "==", email), limit(1));
  const snapshot = await getDocs(q);
  return snapshot.empty ? null : snapshot.docs[0];
}

// Creates a new user. The password is hashed with bcrypt - plain text is NEVER stored.
export async function registerUser({ name, email, password }) {
  const normalisedEmail = email.trim().toLowerCase();

  if (await findUserByEmail(normalisedEmail)) {
    throw new Error("EMAIL_TAKEN");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  await addDoc(usersRef, {
    name: name.trim(),
    email: normalisedEmail,
    passwordHash,
    createdAt: serverTimestamp(),
  });
}

// Checks the email + password against Firestore. Throws INVALID_CREDENTIALS if wrong.
export async function loginUser({ email, password }) {
  const normalisedEmail = email.trim().toLowerCase();
  const userDoc = await findUserByEmail(normalisedEmail);

  // Same error for "no such user" and "wrong password" so we don't leak which emails exist
  if (!userDoc) throw new Error("INVALID_CREDENTIALS");

  const data = userDoc.data();
  const passwordMatches = await bcrypt.compare(password, data.passwordHash);
  if (!passwordMatches) throw new Error("INVALID_CREDENTIALS");

  // Never put the hash in the session
  const sessionUser = { id: userDoc.id, name: data.name, email: data.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return sessionUser;
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

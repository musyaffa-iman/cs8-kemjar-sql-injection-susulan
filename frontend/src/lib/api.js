import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "");
const client = axios.create({ baseURL });

async function post(path, body, fallback) {
  try {
    const { data } = await client.post(path, body);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || fallback);
  }
}

export const signIn = (user, pass) => post("/api/auth/signin", { user, pass }, "Sign in failed. Please try again.");
export const verifyPassword = (user, pass) => post("/api/account/verify", { user, pass }, "Verification failed.");
export const submitFlag = (account_id, flag) => post("/api/flag/submit", { account_id, flag }, "Flag submission failed.");

const KEY = "session";
export const session = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch {
      return null;
    }
  },
  set(account) {
    localStorage.setItem(KEY, JSON.stringify(account));
  },
  clear() {
    localStorage.removeItem(KEY);
  },
};

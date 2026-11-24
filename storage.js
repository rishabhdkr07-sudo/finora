const USERS_KEY = "finora_users_v21";
const SESSION_KEY = "finora_session_v21";
const DATA_PREFIX = "finora_data_v21_";
export const readUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
export const getSession = () => localStorage.getItem(SESSION_KEY);
export const setSession = email => localStorage.setItem(SESSION_KEY,email);
export const clearSession = () => localStorage.removeItem(SESSION_KEY);
export function getUserData(email) {
  try {
    const d=JSON.parse(localStorage.getItem(DATA_PREFIX+email.toLowerCase())||"null")||{};
    return {transactions:Array.isArray(d.transactions)?d.transactions:[],budgets:Array.isArray(d.budgets)?d.budgets:[],goals:Array.isArray(d.goals)?d.goals:[],settings:d.settings||{dark:false}};
  } catch { return {transactions:[],budgets:[],goals:[],settings:{dark:false}}; }
}
export const saveUserData=(email,data)=>localStorage.setItem(DATA_PREFIX+email.toLowerCase(),JSON.stringify(data));
async function hashPassword(password) {
  if (globalThis.crypto?.subtle) {
    const bytes=new TextEncoder().encode(password);
    const digest=await crypto.subtle.digest("SHA-256",bytes);
    return [...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,"0")).join("");
  }
  throw new Error("Secure password hashing is unavailable. Open the site through GitHub Pages or localhost.");
}
export async function registerUser(name,email,password) {
  const users=readUsers(),normalized=email.trim().toLowerCase();
  if(users.some(u=>u.email===normalized)) throw new Error("An account with this email already exists.");
  users.push({name:name.trim(),email:normalized,passwordHash:await hashPassword(password)});
  localStorage.setItem(USERS_KEY,JSON.stringify(users));setSession(normalized);
}
export async function loginUser(email,password) {
  const normalized=email.trim().toLowerCase(),hash=await hashPassword(password);
  const user=readUsers().find(u=>u.email===normalized&&u.passwordHash===hash);
  if(!user) throw new Error("Email or password is incorrect.");
  setSession(normalized);return user;
}
export function getCurrentUser(){const email=getSession();return email?readUsers().find(u=>u.email===email)||null:null;}

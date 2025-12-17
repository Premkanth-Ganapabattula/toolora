'use client';
export function saveHistory(key:string,data:any){
  const h=JSON.parse(localStorage.getItem(key)||'[]');
  h.unshift(data);
  localStorage.setItem(key,JSON.stringify(h.slice(0,10)));
}
export function getHistory(key:string){
  return JSON.parse(localStorage.getItem(key)||'[]');
}

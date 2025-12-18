'use client';

export function saveHistory(key: string, data: any) {
  if (typeof window === 'undefined') return;

  const h = JSON.parse(localStorage.getItem(key) || '[]');
  h.unshift({ ...data, date: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(h.slice(0, 10)));
}

export function loadHistory(key: string) {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(key) || '[]');
}

// src/api/bookApi.js
const BASE_URL = 'https://pages-of-flavor-production-0aa1.up.railway.app/api';

export async function fetchBooks() {
  const response = await fetch(`${BASE_URL}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
}

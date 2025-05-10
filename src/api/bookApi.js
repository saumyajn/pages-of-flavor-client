// src/api/bookApi.js
const BASE_URL = 'http://localhost:8080/api';

export async function fetchBooks() {
  const response = await fetch(`${BASE_URL}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
}

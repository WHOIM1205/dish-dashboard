// Small wrapper around the backend API calls.
// Requests go to "/api/..." and Vite proxies them to the Express server.

export async function getDishes() {
  const res = await fetch("/api/dishes");
  if (!res.ok) {
    throw new Error("Failed to load dishes");
  }
  return res.json();
}

export async function toggleDish(id) {
  const res = await fetch(`/api/dishes/${id}/toggle`, { method: "PATCH" });
  if (!res.ok) {
    throw new Error("Failed to update dish");
  }
  return res.json();
}

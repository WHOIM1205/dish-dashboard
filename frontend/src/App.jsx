import { useEffect, useState } from "react";
import { getDishes, toggleDish } from "./api";
import socket from "./socket";
import DishCard from "./components/DishCard.jsx";

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ids of dishes that currently have a toggle request in progress.
  const [togglingIds, setTogglingIds] = useState([]);

  // Load all dishes once when the page mounts.
  useEffect(() => {
    loadDishes();
  }, []);

  // Realtime: when any dish changes anywhere, update just that dish in state.
  useEffect(() => {
    socket.on("dishUpdated", (updated) => {
      setDishes((current) =>
        current.map((dish) => (dish.id === updated.id ? updated : dish))
      );
    });

    return () => socket.off("dishUpdated");
  }, []);

  async function loadDishes() {
    setLoading(true);
    setError("");
    try {
      const data = await getDishes();
      setDishes(data);
    } catch (err) {
      setError("Could not load dishes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(id) {
    setError("");
    setTogglingIds((ids) => [...ids, id]);
    try {
      const updated = await toggleDish(id);
      // Update the UI with the dish returned by the backend.
      setDishes((current) =>
        current.map((dish) => (dish.id === id ? updated : dish))
      );
    } catch (err) {
      setError("Could not update the dish. Please try again.");
    } finally {
      setTogglingIds((ids) => ids.filter((current) => current !== id));
    }
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Dish Dashboard</h1>
        <p>Manage which dishes are published.</p>
      </header>

      {error && <div className="banner banner-error">{error}</div>}

      {loading ? (
        <div className="state">Loading dishes...</div>
      ) : dishes.length === 0 ? (
        <div className="state">No dishes found.</div>
      ) : (
        <div className="grid">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onToggle={handleToggle}
              isToggling={togglingIds.includes(dish.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

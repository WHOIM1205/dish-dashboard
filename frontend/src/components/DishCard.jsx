// A single dish card: image, name, published status and a toggle button.

export default function DishCard({ dish, onToggle, isToggling }) {
  return (
    <div className="card">
      <img className="card-image" src={dish.imageUrl} alt={dish.dishName} />

      <div className="card-body">
        <h3 className="card-title">{dish.dishName}</h3>

        <span
          className={
            dish.isPublished ? "status status-published" : "status status-draft"
          }
        >
          {dish.isPublished ? "Published" : "Unpublished"}
        </span>

        <button
          className="toggle-button"
          onClick={() => onToggle(dish.id)}
          disabled={isToggling}
        >
          {isToggling
            ? "Updating..."
            : dish.isPublished
            ? "Unpublish"
            : "Publish"}
        </button>
      </div>
    </div>
  );
}

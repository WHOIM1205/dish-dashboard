# Dish Dashboard

A full-stack application to manage and display dishes. The dashboard lists all
dishes, lets you toggle each dish's published status, and reflects changes
across every connected client in real time using Socket.IO.

## Features

- **View dishes** – see all dishes with image, name, and published status.
- **Toggle publish status** – publish/unpublish a dish; the UI and database
  update immediately.
- **Real-time updates** – when a dish changes anywhere (another tab, another
  user, or directly on the backend), all connected dashboards update
  automatically, with no page reload.

## Tech Stack

**Frontend**
- React
- Vite

**Backend**
- Node.js
- Express

**Database**
- Prisma
- SQLite

**Realtime**
- Socket.IO

## Project Structure

```
dish-dashboard/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Dish model + SQLite datasource
│   │   ├── seed.js            # seeds dishes from dish-assignment.json
│   │   └── migrations/
│   └── src/
│       ├── routes/
│       │   └── dishes.js      # GET /api/dishes, PATCH /api/dishes/:id/toggle
│       ├── prisma.js          # shared Prisma client
│       ├── socket.js          # Socket.IO server setup
│       └── server.js          # Express + HTTP server entry point
└── frontend/
    └── src/
        ├── components/
        │   └── DishCard.jsx   # single dish card
        ├── api.js             # REST calls to the backend
        ├── socket.js          # Socket.IO client connection
        ├── App.jsx            # dashboard page + state
        └── main.jsx           # React entry point
```

## Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev --name init   # creates the SQLite DB and seeds it
npm run dev                          # starts the server on http://localhost:4000
```

> Copy `backend/.env.example` to `backend/.env` before running (it provides
> `DATABASE_URL` and `PORT`).

## Frontend Setup

```bash
cd frontend
npm install
npm run dev                          # starts the dashboard on http://localhost:5173
```

### Environment variables (frontend)

`VITE_API_URL` is **optional**. It sets the backend URL the Socket.IO client
connects to. If not provided, it defaults to `http://localhost:4000`, which is
correct for local development. To override, create a `frontend/.env` file:

```
VITE_API_URL="http://localhost:4000"
```

## API Endpoints

| Method | Endpoint                   | Description                          |
| ------ | -------------------------- | ------------------------------------ |
| GET    | `/api/dishes`              | Returns all dishes.                  |
| PATCH  | `/api/dishes/:id/toggle`   | Toggles a dish's `isPublished` flag. |
| GET    | `/health`                  | Health check, returns `{status:"ok"}`. |

## Realtime Flow

1. A client (or a direct backend action) calls
   `PATCH /api/dishes/:id/toggle`.
2. The backend updates the dish in the database via Prisma.
3. On success, the backend emits a `dishUpdated` event through Socket.IO with
   the updated dish `{ id, dishId, dishName, imageUrl, isPublished }`.
4. The event is broadcast to **all** connected clients.
5. Each dashboard listens for `dishUpdated` and surgically updates only the
   matching dish in its state — no full refetch and no page reload.

Because the event fires on every successful toggle regardless of its origin, a
change made directly on the backend updates every open dashboard as well.

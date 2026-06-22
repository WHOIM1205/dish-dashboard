// Routes for dishes: list all dishes and toggle a dish's published status.

import { Router } from "express";
import prisma from "../prisma.js";
import { getIo } from "../socket.js";

const router = Router();

// GET /api/dishes -> all dishes
router.get("/", async (req, res) => {
  const dishes = await prisma.dish.findMany({ orderBy: { id: "asc" } });
  res.json(dishes);
});

// PATCH /api/dishes/:id/toggle -> flip isPublished for one dish
router.patch("/:id/toggle", async (req, res) => {
  const id = Number(req.params.id);

  const dish = await prisma.dish.findUnique({ where: { id } });
  if (!dish) {
    return res.status(404).json({ error: "Dish not found" });
  }

  const updated = await prisma.dish.update({
    where: { id },
    data: { isPublished: !dish.isPublished },
  });

  // Notify all connected dashboards about the change.
  getIo().emit("dishUpdated", updated);

  res.json(updated);
});

export default router;

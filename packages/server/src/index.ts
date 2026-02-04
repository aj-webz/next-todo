import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { getDb, todos } from "@repo/db";
import { logger } from "hono/logger";
import { nanoid } from "nanoid";

const app = new Hono();

app.use("*", logger());

app.get("/", async (c) => {
  const db = getDb(); 
  const data = await db.select().from(todos);
  return c.json(data);
});

app.post("/", async (c) => {
  const db = getDb(); 
  const input = await c.req.json();

  const [row] = await db
    .insert(todos)
    .values({
      id: nanoid(),
      title: input.title,
      description: input.description,
      status: "in-progress",
      completed: false,
      createdAt: new Date(),
    })
    .returning();

  return c.json(row, 201);
});

app.patch("/:id/status", async (c) => {
  const db = getDb(); 
  const { id } = c.req.param();
  const { status } = await c.req.json();

  const [row] = await db
    .update(todos)
    .set({
      status,
      completed: status === "completed",
    })
    .where(eq(todos.id, id))
    .returning();

  if (!row) return c.json({ message: "Not found" }, 404);
  return c.json(row);
});

app.delete("/:id", async (c) => {
  const db = getDb(); 
  const { id } = c.req.param();

  const result = await db
    .delete(todos)
    .where(eq(todos.id, id))
    .returning();

  if (!result.length) return c.json({ message: "Not found" }, 404);
  return c.body(null, 204);
});

export default app;

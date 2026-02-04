import { z } from "zod";


export const TodoStatusSchema = z.enum([
  "in-progress",
  "completed",
]);

export type TodoStatus = z.infer<typeof TodoStatusSchema>;


export const TodoSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: TodoStatusSchema,
    completed: z.boolean(),
    createdAt:z.date(),
  })
  .refine(
    (data) =>
      data.status === "completed" ? data.completed === true : true,
    {
      message: "completed must be true when status is completed",
      path: ["completed"],
    }
  );

export type Todo = z.infer<typeof TodoSchema>;


export const CreateTodoSchema = z.object({
  title: z.string().trim().min(3, "Title too short").max(100),
  description: z
    .string()
    .trim()
    .min(10, "Description too short")
    .max(200),
});

export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;

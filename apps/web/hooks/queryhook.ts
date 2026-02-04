"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type { Todo, TodoStatus, CreateTodoInput } from "@repo/shared";
import {
  readTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from "../lib/todo.services";

import { queryKey } from "./todo.keys";



export function useTodoQuery() {
  return useQuery<Todo[]>({
    queryKey: queryKey.all,
    queryFn: readTodos,
    staleTime: 1000 * 60,
  });
}

/* ----------------------------- */
/* CREATE */
/* ----------------------------- */

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTodoInput) => createTodo(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}

/* ----------------------------- */
/* UPDATE */
/* ----------------------------- */

export function useUpdateTodoStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: TodoStatus;
    }) => updateTodoStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}

/* ----------------------------- */
/* DELETE */
/* ----------------------------- */

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}

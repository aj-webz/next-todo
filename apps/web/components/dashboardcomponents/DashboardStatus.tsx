"use client";

import { StatCard } from "./TodoStats";
import { useTodoQuery } from "@/hooks/queryhook";
import { isToday } from "date-fns";

export function DashboardStats() {

    const { data: todos = [] } = useTodoQuery();

    const today = todos.filter((t) => isToday(t.createdAt)).length;

    const pending = todos.filter((t) => t.status === "in-progress").length;

    const completed = todos.filter((t) => t.status === "completed").length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard label="Today" value={today} variant="today" />
            <StatCard label="Pending" value={pending} variant="pending" />
            <StatCard label="Completed" value={completed} variant="completed" />
        </div>
    );

}

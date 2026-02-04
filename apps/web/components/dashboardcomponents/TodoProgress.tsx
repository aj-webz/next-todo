"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { Progress } from "@workspace/ui/components/progress";
import { useTodoQuery} from "../../hooks/queryhook"

export function TodoProgress() {
  const { data: todos = [] } = useTodoQuery();

  const total = todos.length;
  const completed = todos.filter(
    (t) => t.status === "completed"
  ).length;

  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completion Rate</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <span className="text-sm text-muted-foreground">
            Progress
          </span>
          <span className="text-2xl font-semibold">
            {percentage}%
          </span>
        </div>

        <Progress value={percentage} />

        <p className="text-xs text-muted-foreground">
          {completed} of {total} tasks completed
        </p>
      </CardContent>
    </Card>
  );
}

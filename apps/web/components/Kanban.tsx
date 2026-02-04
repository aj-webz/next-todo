"use client";

import { 
    DragDropContext, 
    Droppable, 
    Draggable, 
    DropResult,
} from "@hello-pangea/dnd";
import { format } from "date-fns";

import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

import type { Todo, TodoStatus } from "@repo/shared";
import { 
    useUpdateTodoStatus, 
    useDeleteTodo, 
    useTodoQuery 
} from '../hooks/queryhook';

const isTodoStatus = (value: string): value is TodoStatus =>
    value === "in-progress" || value === "completed";

const statusColumn: {
    id: TodoStatus;
    label: string;
    borderColor: string;
}[] = [
    {
        id: "in-progress",
        label: "In Progress",
        borderColor: "border-blue-400",
    },
    {
        id: "completed",
        label: "Completed",
        borderColor: "border-green-400",
    },
];

export const KanbanBoard = () => {
    const { data: todos = [], isLoading } = useTodoQuery();
    const updateTodoStatus = useUpdateTodoStatus();

    if (isLoading) {
        return <div className="p-6">Loading todos...</div>;
    }

    const todosByStatus: Record<TodoStatus, Todo[]> = {
        "in-progress": [],
        completed: [],
    };

    for (const todo of todos) {
        todosByStatus[todo.status].push(todo);
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId) return;

        if (!isTodoStatus(destination.droppableId)) return;

        const todoId = draggableId.replace("todo-", "");

        updateTodoStatus.mutate({
            id: todoId,
            status: destination.droppableId,
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-2 gap-6">
                {statusColumn.map((column) => (
                    <Card key={column.id}>
                        <CardHeader>
                            <CardTitle>
                                {column.label} ({todosByStatus[column.id].length})
                            </CardTitle>
                        </CardHeader>

                        <Droppable droppableId={column.id}>
                            {(provided) => (
                                <CardContent
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="space-y-4 min-h-[100px]"
                                >
                                    {todosByStatus[column.id].map((todo, index) => (
                                        <TodoCard
                                            key={todo.id}
                                            todo={todo}
                                            index={index}
                                            borderColor={column.borderColor}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </CardContent>
                            )}
                        </Droppable>
                    </Card>
                ))}
            </div>
        </DragDropContext>
    );
};

const TodoCard = ({
    todo,
    index,
    borderColor,
}: {
    todo: Todo;
    index: number;
    borderColor: string;
}) => {
    const deleteTodo = useDeleteTodo();

    return (
        <Draggable draggableId={`todo-${todo.id}`} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card className={cn("border-l-4", borderColor)}>
                        <CardContent className="p-4 space-y-2">
                            <h3 className="font-semibold">{todo.title}</h3>

                            <Badge>{todo.status}</Badge>

                            <p className="text-xs text-muted-foreground">
                                Created:{" "}
                                {format(new Date(todo.createdAt), "dd MMM yyyy")}
                            </p>

                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteTodo.mutate(todo.id)}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};
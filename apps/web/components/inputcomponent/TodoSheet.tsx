"use client";

import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import { useCreateTodo } from "@/hooks/queryhook";
import { CreateTodoSchema, type CreateTodoInput } from "@repo/shared";

export function CreateTodoSheet() {
    const createTodo = useCreateTodo();
    const [open, setOpen] = React.useState(false);

    const form = useForm<CreateTodoInput>({
        resolver: zodResolver(CreateTodoSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit: SubmitHandler<CreateTodoInput> = (values) => {
        createTodo.mutate(values, {
            onSuccess: () => {
                form.reset({
                    title: "",
                    description: "",
                });
                setOpen(false);
            },
        });
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Todo
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full flex flex-col justify-between p-6 sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="text-3xl">Create Todo</SheetTitle>
                </SheetHeader>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    {/* Title */}
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input
                            placeholder="Assign the task"
                            {...form.register("title")}
                        />
                        {form.formState.errors.title && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea
                            rows={4}
                            placeholder="Describe the task..."
                            {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.description.message}
                            </p>
                        )}
                    </div>

                    <SheetFooter className="mt-auto gap-2">
                        <Button type="submit" disabled={createTodo.isPending}>
                            {createTodo.isPending ? "Creating..." : "Create"}
                        </Button>

                        <SheetClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}

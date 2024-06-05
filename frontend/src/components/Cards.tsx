import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useCreateTodo from "@/hooks/useCreateTodo";

export default function Cards() {
  const { createTodo, todos, isLoading, error } = useCreateTodo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.elements.title.value;
    const description = e.currentTarget.elements.description.value;
    createTodo(title, description);
  };

  // Display a loading message while todos are being fetched
  if (isLoading) {
    return <div>Loading...</div>; // Or replace this with a spinner/loading component
  }

  // Display an error message if there was an issue fetching todos
  if (error) {
    return <div>Error: {error.message}</div>; // Adjust based on how you handle errors in useCreateTodo
  }

  function handleEdit(todo: TodoList): void {
    throw new Error("Function not implemented.");
  }

  function handleDelete(index: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <Card className="w-[600px] mt-3 mx-auto">
        <CardHeader>
          <CardTitle className="mx-auto">Task Manager</CardTitle>
          <form onSubmit={handleSubmit}>
            <Input placeholder="Todo Title" name="title" required />
            <Input
              className="mt-2"
              placeholder="Todo Description"
              name="description"
              required
            />
            <CardFooter className="mt-2 flex justify-center">
              <Button type="submit">Add Task</Button>
            </CardFooter>
          </form>
        </CardHeader>
      </Card>

      <Card className="w-[600px] mt-3 mx-auto p-2">
        <h1 className="text-center font-bold">TASKS</h1>
        {todos.map((todo, index) => (
          <Card key={index} className="mb-2 ">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-between">
              <div>
                <h1 className="font-extrabold">{todo.title}</h1>
                <p>{todo.description}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button onClick={() => handleEdit(todo)}>Edit</Button>
                <Button onClick={() => handleDelete(index)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </Card>
    </div>
  );
}

import { KanbanBoard } from "../../../components/Kanban"
import { CreateTodoSheet } from '../../../components/inputcomponent/TodoSheet';


export default function ManagePage() {
  return (
    <section className="flex flex-col p-10 min-h-screen">
      <h1 className="text-4xl font-bold">
        Manage Your Task
      </h1>

      <div className="flex w-full p-2 justify-end mb-5">
        <CreateTodoSheet />
      </div>

      <div className="w-auto">
        <KanbanBoard />
      </div>
    </section>
  );
}

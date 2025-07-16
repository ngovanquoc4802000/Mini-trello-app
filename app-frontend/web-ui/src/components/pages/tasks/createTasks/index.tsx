import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { CreateTasks, TasksAll } from "../../../mockup/tasks";
import { createTasks } from "../../../service/tasks";
interface TasksPagesProps {
  setShowAddCard?: React.Dispatch<React.SetStateAction<boolean>>;
  item: string;
}
function CreateTasksPages({ setShowAddCard, item }: TasksPagesProps) {
  const [tasks, setTasks] = useState<CreateTasks>({
    title: "",
    description: "No description",
    status: "đang thực hiện",
  });
  const queryClient = useQueryClient();

  const handleChangeTasksInput = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTasks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { boardId } = useParams();
  const handleAddTask = async () => {
    updateTasks();
  };

  const { mutate: updateTasks } = useMutation({
    mutationFn: async () => {
      const response = await createTasks(boardId ?? "", item, tasks);
       console.log("Server response:", response);
      return response;
    },
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ["tasks", boardId, item] });
      const previousTasks = queryClient.getQueryData(["tasks", boardId, item]);
      queryClient.setQueryData(["tasks", boardId, item], (old: TasksAll | undefined) => {
        return { 
          success: true,
          tasks: [...(old?.tasks ?? []), tasks],
        };
      });
      setTasks({
        title: "",
        description: "",
        status: "đang thực hiện",
      });
      console.log("Create task new success");
      return { previousTasks };
    },
    onError: (error) => {
      console.error("Error create tasks new" + error);
    },
  });
  
  return (
    <div className=" bg-gray-800 p-3 rounded-lg shadow-md mb-3">
      <input
        type="text"
        value={tasks.title}
        name="title"
        onChange={handleChangeTasksInput}
        placeholder="Enter title or paste link..."
        className="w-full px-3 py-2 text-sm rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
      />
      <div className="flex mt-2">
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-2 cursor-pointer py-1 rounded hover:bg-blue-500 text-[14px]"
        >
          Add card
        </button>
        <button
          onClick={() => setShowAddCard && setShowAddCard(false)}
          className="text-white ml-2 cursor-pointer text-[30px] rounded-[4px] hover:bg-gray-200 px-2 hover:text-gray-800"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default CreateTasksPages;

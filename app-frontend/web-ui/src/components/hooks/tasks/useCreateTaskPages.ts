import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createTasks } from "../../service/tasks";
import { useState } from "react";
import type { CreateTasks, TasksAll } from "../../mockup/tasks";

interface TasksPagesProps {
  setShowAddCard?: React.Dispatch<React.SetStateAction<boolean>>;
  item: string;
}
export const useCreateTaskPages = ({
  item,
}: TasksPagesProps) => {
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
      queryClient.setQueryData(
        ["tasks", boardId, item],
        (old: TasksAll | undefined) => {
          return {
            success: true,
            tasks: [...(old?.tasks ?? []), tasks],
          };
        }
      );
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
  return {
    tasks,
    handleChangeTasksInput,
    handleAddTask,
    
  };
};

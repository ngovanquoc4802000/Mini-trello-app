import { useNavigate } from "react-router-dom";
import queriesTasks from "../../queries/tasks";
import { useQuery } from "@tanstack/react-query";

interface TasksPageTs {
  boardId: string;
  cardId: string;
  setShowDetail?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTasksPage = ({boardId,cardId}: TasksPageTs) => {
      const {
    isLoading: loadingTasks,
    isError: errorTasks,
    data,
  } = useQuery({ ...queriesTasks.list(boardId, cardId) });

  const navigate = useNavigate();

  const handleTaskDetail = (cardId: string, taskId: string) => {
    if (boardId && cardId && taskId) {
      navigate(`${cardId}/tasks/${taskId}`);
    }
  };
  const handleEditTasks = () => {

  }
  const taskList = data?.tasks ?? [];
    return {
        loadingTasks,errorTasks,
        taskList,
        handleEditTasks,
        handleTaskDetail
    }
}
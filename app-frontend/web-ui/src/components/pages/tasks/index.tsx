import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import queriesTasks from "../../queries/tasks";

interface TasksPageTs {
  boardId: string;
  cardId: string;
  setShowDetail?: React.Dispatch<React.SetStateAction<boolean>>;
}

function TasksPage({ boardId, cardId }: TasksPageTs) {
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
  const taskList = data?.tasks ?? [];

  if (loadingTasks) return <div>...Loading</div>;

  if (errorTasks) return <div>...Error</div>;

  return (
    <>
      {taskList.map((item, index) => (
        <div
          key={item.id ?? index}
          onClick={() => handleTaskDetail(cardId, item.id)}
          className="bg-gray-800 p-3 cursor-pointer rounded-lg shadow-md mb-3"
        >
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm">{item.title}</p>
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-2">
              SD
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TasksPage;

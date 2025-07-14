import { useQuery } from "@tanstack/react-query";
import queriesTasks from "../../queries/tasks";

interface TasksPageTs {
  handleTaskDetail?: () => void;
  boardId: string;
  cardId: string;
}

function TasksPage({ handleTaskDetail, boardId, cardId }: TasksPageTs) {
  const {
    isLoading: loadingTasks,
    isError: errorTasks,
    data: taskList,
  } = useQuery({ ...queriesTasks.list(boardId ?? "", cardId ?? "") });
  console.log("có đúng cardId không", cardId);
  console.log(taskList?.map((item) => item.title));

  if (loadingTasks || !taskList) return <div>...Loading</div>;
  if (errorTasks) return <div>...Error</div>;
  return (
    <>
      {taskList?.map((item, index) => (
        <div
          key={item.id ?? index}
          onClick={handleTaskDetail}
          className="bg-gray-800 p-3 cursor-pointer rounded-lg shadow-md mb-3"
        >
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm">{item.title}</p>
            <p className="text-sm">{item.description}</p>
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

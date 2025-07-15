import { useTasksPage } from "../../hooks/tasks/useTasksPage";

interface TasksPageTs {
  boardId: string;
  cardId: string;
  setShowDetail?: React.Dispatch<React.SetStateAction<boolean>>;
}

function TasksPage({ boardId, cardId }: TasksPageTs) {
   const {
       loadingTasks,errorTasks,
        taskList,
        handleEditTasks,
        handleTaskDetail
   } = useTasksPage({boardId,cardId})

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
            <p 
            onClick={handleEditTasks}
            className="text-sm">{item.title}</p>
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

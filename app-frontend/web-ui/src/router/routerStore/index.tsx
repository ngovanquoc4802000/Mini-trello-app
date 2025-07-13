import BoardsPage from "../../components/pages/boards";
import CardsPage from "../../components/pages/cards";
import TaskDetails from "../../components/pages/taskDetail";

export const routerStore = [
  {
    path: "/boards", 
    index: true,
    element: <BoardsPage />,
  },
  {
    path: "/boards/:boardId/cards",
    element: <CardsPage />,
     children: [
      {
        path: ":id/tasks",
        element: <TaskDetails />,
      }
    ]
  },
  

];

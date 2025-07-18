import BoardsPage from "../../components/pages/boards/boards";
import CardsPage from "../../components/pages/cards";
import TasksPage from "../../components/pages/tasks";
import TaskDetails from "../../components/pages/tasks/taskDetail";

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
        path: ":cardId/tasks",
        element: <TasksPage boardId={""} cardId={""} />,
      },
      {
        path: ":cardId/tasks/:taskId",
        element: <TaskDetails />,
      },
    ],
  },
];

import { createBrowserRouter } from "react-router-dom";
import BoardsPage from "../components/pages/boards/boards";
import CardsPage from "../components/pages/cards";
import TasksPage from "../components/pages/tasks";

export const routerStore = createBrowserRouter([
  { path: "/boards", index: true, element: <BoardsPage /> },
  {
    path: "/boards/:boardId/cards",
    element: <CardsPage />,
    children: [
      {
        path: ":cardId/tasks",
        element: <TasksPage />,
      },
    ],
  },
]);

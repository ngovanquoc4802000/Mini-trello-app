import { createBrowserRouter } from "react-router-dom";
import BoardsPage from "../components/pages/boards/boards";
import CardsPage from "../components/pages/cards";
import TaskDetails from "../components/pages/taskDetail";

export const routerStore = createBrowserRouter([
  { path: "/boards", index: true, element: <BoardsPage /> },
  {
    path: "/boards/:boardId/cards",
    element: <CardsPage />,
    children: [
      {
        path: ":id/tasks",
        element: <TaskDetails />,
      },
    ],
  },
]);;

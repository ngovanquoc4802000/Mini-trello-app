import { createBrowserRouter } from "react-router-dom";
import VerifyPage from "../components/auth/verifyPages";
import NotFound from "../components/notfound";
import BoardsPage from "../components/pages/boards/boards";
import CardsPage from "../components/pages/cards";
import TasksPage from "../components/pages/tasks";
import TaskDetails from "../components/pages/tasks/taskDetail";

export const routerStore = createBrowserRouter([
  { path: "/boards", element: <BoardsPage /> },
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
  {
    path: "auth/login",
    element: <VerifyPage/>
  },
  {
    path: "*",
    element:<NotFound/>
  }
]);

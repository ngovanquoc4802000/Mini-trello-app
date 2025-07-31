import { createBrowserRouter } from "react-router-dom";
import Signup from "../components/auth/signup";
import NotFound from "../components/notfound";
import BoardsPage from "../components/pages/boards/boards";
import CardsPage from "../components/pages/cards";
import TasksPage from "../components/pages/tasks";
import TaskDetails from "../components/pages/tasks/taskDetail";
import Signin from "../components/auth/signin";

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
    path: "auth/signup",
    element: <Signup/>,
    children: [
      {
        path: ":signup/signup",
        element: <Signin/>
      }
    ]
  },
  {
    path: "*",
    element:<NotFound/>
  }
]);

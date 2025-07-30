import Signin from "../../components/auth/signin";
import Signup from "../../components/auth/signup";
import NotFound from "../../components/notfound";
import BoardsPage from "../../components/pages/boards/boards";
import CardsPage from "../../components/pages/cards";
import TasksPage from "../../components/pages/tasks";
import TaskDetails from "../../components/pages/tasks/taskDetail";

export const routerStore = [
  {
    path: "/boards",
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
  {
    path: "auth/signup",
    index: true,
    element: <Signup/>
  },
   {
    path: "auth/signin",
    index: true,
    element: <Signin/>
  },
  {
    path: "*",
    element:<NotFound/>
  }
];

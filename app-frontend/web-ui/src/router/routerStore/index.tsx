import LoginPage from "../../components/auth/loginPages";
import RegisterPages from "../../components/auth/registerPages";
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
    path: "auth/login",
    index: true,
    element: <LoginPage/>
  },
   {
    path: "auth/register",
    index: true,
    element: <RegisterPages/>
  },
  {
    path: "*",
    element:<NotFound/>
  }
];

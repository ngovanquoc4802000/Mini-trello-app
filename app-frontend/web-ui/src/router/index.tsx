import { createBrowserRouter } from "react-router-dom";
import BoardsPage from "../components/pages/boards";
import CardsPage from "../components/pages/cards";

export const routerStore = createBrowserRouter([
  { path: "/boards", index: true, element: <BoardsPage /> },
  { path: "/boards/:boardId/cards", element: <CardsPage /> },
]);

import { createBrowserRouter } from "react-router-dom";
import BoardsPage from "../components/pages/boards";

export const routerStore = createBrowserRouter([
  { path: "/boards", index: true, element: <BoardsPage /> },
]);

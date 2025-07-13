import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerStore } from "./router/routerStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: undefined,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter(routerStore)} />
    </QueryClientProvider>
  );
}

export default App;

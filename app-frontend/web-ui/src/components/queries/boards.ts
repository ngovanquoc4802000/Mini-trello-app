import { queryOptions } from "@tanstack/react-query";
import { getAllBoards } from "../service/boards";

const queriesBoards = {
  list: queryOptions({
    queryKey: ["boards"],
    queryFn: async () => {
      const result = await getAllBoards();
      if (result && result.success) return result;
      return null;
    },
    staleTime: 1000 * 60 * 60
  }),
};

export default queriesBoards;
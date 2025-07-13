import { queryOptions } from "@tanstack/react-query";
import { getAllCards } from "../service/cards";

const queriesCards = {
    list: (boardId: string) => queryOptions({
        queryKey: ["cards", boardId],
        queryFn: async() => {
          const result = await getAllCards(boardId);
          if(result && result) return result;
          return null
        },
        staleTime: 1000 * 60 * 60
    })
}
export default queriesCards;
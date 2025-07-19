import { queryOptions } from "@tanstack/react-query";
import { getAllUser } from "../service/users";

const queriesUsers = {
  list: () =>
    queryOptions({
      queryKey: ["users"],
      queryFn: async () => {
        const result = await getAllUser();
        console.log(result.userAll);
        if (result.success) return result.userAll;
        return null;
      },
      staleTime: 1000 * 60 * 60,
    }),
};

export default queriesUsers;

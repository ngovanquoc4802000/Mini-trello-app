import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { CreateBoardTs, Board, BoardAll } from "../../mockup/boards";
import queriesBoards from "../../queries/boards";
import { createBoards } from "../../service/boards";

interface CreateBoardProps {
  onClose: () => void;
}

export const useCreateBoards = ({onClose}: CreateBoardProps ) => {
  const [value, setValue] = useState<CreateBoardTs>({
    name: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const handleBoardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name, value);
  };
  
  const handleCreateBoard = async () => {
    updateBoard();
    onClose();
  };

  const { mutate: updateBoard } = useMutation({
    mutationFn: async () => {
      const res = await createBoards(value);
      if (!res) {
        throw new Error("Failed to create board");
      }
      return res;
    },
    onSuccess: (newBoard: Board) => {
     queryClient.setQueryData(queriesBoards.list.queryKey, (oldData: BoardAll | null | undefined) => {
    if (!oldData) return { boards: [newBoard] } as BoardAll;
    return {
      ...oldData,
      boards: [newBoard, ...oldData.boards], 
    };
  });
      setValue(value);
       
      console.log("Create board new success");
    },
    onError: (error) => {
      console.error("Error create boards new" + error);
    },
  });

  return {
    handleBoardTitleChange,
    handleCreateBoard,
    value
  };
};

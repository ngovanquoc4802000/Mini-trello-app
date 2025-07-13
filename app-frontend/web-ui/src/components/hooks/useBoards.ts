import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import queriesBoards from "../queries/boards";
import { useParams } from "react-router-dom";

export const useBoards = () => {
    const [showBoard, setShowBoard] = useState(false);

  const { isLoading,isError, data: boardList } = useQuery({...queriesBoards.list}); 
  
  const { boardId } = useParams();

  const handleShowBoard = () => {
    setShowBoard(true);
  };
  return {
    handleShowBoard,
    boardList,
    isError,
    isLoading,
    showBoard,
    boardId,
    setShowBoard
  }
}
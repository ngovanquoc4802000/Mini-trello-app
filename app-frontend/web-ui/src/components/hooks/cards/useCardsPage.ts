import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { CreateCards } from "../../mockup/cards";
import queriesBoards from "../../queries/boards";
import queriesCards from "../../queries/cards";
import { updateBoards } from "../../service/boards";
import { createCards } from "../../service/cards";

export const useCardsPage = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [showInvite, setShowInvite] = useState<boolean>(false);

  const [showAddListInput, setShowAddListInput] = useState<boolean>(false);

  const [showAddCard, setShowAddCard] = useState<string | null>(null);

  const [valueName, setValueName] = useState<boolean>(false);

  const [showAddNewBoard, setShowAddNewBoard] = useState<boolean>(false);

  const [cards, setCards] = useState<CreateCards>({
    name: "",
    description: "",
  });

  const { boardId } = useParams();

  const {
    isLoading,
    isError,
    data: cartList,
  } = useQuery({
    ...queriesCards.list(boardId ?? ""),
  });
  const findName = cartList?.board.name;

  const [editNameBoard, setEditNameBoard] = useState(findName ?? "");

  useEffect(() => {
  if (cartList?.board?.name && editNameBoard === "") {
    setEditNameBoard(cartList.board.name);
  }
}, [cartList, editNameBoard]);

  const handleInvite = () => {
    setShowInvite(true);
  };
  const handleChangeCardsInput = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCards((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        nameInputRef.current &&
        !nameInputRef.current.contains(event.target as Node)
      ) {
        if (editNameBoard !== cartList?.board.name) {
          updateBoardName(editNameBoard);
        }
        setValueName(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editNameBoard, cartList]);
  const queryClient = useQueryClient();

  const handleAddCards = () => {
    updateCards();

    setShowAddListInput(false);
  };

  const { mutate: updateCards } = useMutation({
    mutationFn: async () => {
      const response = await createCards(boardId ?? "", cards);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ ...queriesCards.list });

      setCards({ name: "", description: "" });
      setShowAddListInput(false);
    },
  });

  const { mutate: updateBoardName } = useMutation({
    mutationFn: async (name: string) =>
      await updateBoards(boardId ?? "", {
        name,
        description: cartList?.board.description ?? "",
      }),
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: queriesBoards.list().queryKey }); // ✅ fix
    queryClient.invalidateQueries({ queryKey: queriesCards.list(boardId ?? "").queryKey }); // ✅ cũng đúng
  setValueName(false);
    },
    onError: (error) => {
      console.error("Failed to update board name:", error);
    },
  });

  const handleFindName = () => {
    setValueName(true);
  };
  return {
    handleAddCards,
    handleChangeCardsInput,
    handleFindName,
    handleInvite,
    showAddCard,
    showDetail,
    showInvite,
    showAddNewBoard,
    showAddListInput,
    setCards,
    setEditNameBoard,
    setShowAddCard,
    setShowAddNewBoard,
    setShowDetail,
    setShowInvite,
    setShowAddListInput,
    valueName,
    isLoading,
    isError,
    cartList,
    boardId,
    cards,
    editNameBoard,
    updateBoardName,
    nameInputRef,
    findName,
  };
};

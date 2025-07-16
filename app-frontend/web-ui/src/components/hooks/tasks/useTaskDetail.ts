import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import queriesTasks from "../../queries/tasks";
interface Comment {
  id: string;
  valueComment: string;
  createdAt: number;
}
interface TaskDetailState {
  setShowDetail?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  description?: string;
}
export const useTaskDetailsPages = ({ setShowDetail} : TaskDetailState) => {
  const navigate = useNavigate();
  const { boardId, cardId, taskId } = useParams();
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState({
    valueComment: "",
  });
  const [commentArr, setCommentArr] = useState<Comment[]>([]);

  const { data, isLoading, isError } = useQuery(
    queriesTasks.detail(boardId!, cardId!, taskId!)
  );

  const handleAddComment = () => {
    if (taskId && comment.valueComment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        valueComment: comment.valueComment,
        createdAt: Date.now(),
      };
      const updatedComments = [...commentArr, newComment];
      setCommentArr(updatedComments);
      localStorage.setItem(
          `task-${taskId}-comments`,
          JSON.stringify(updatedComments)
        );
      setComment({ valueComment: "" });
    }
  };

  const handleComment = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const task = data?.task;

  const handleClose = () => {
    if (setShowDetail) {
      setShowDetail(false);
    }
    navigate(`/boards/${boardId}/cards`);
  };

  const handleSave = () => {
    if (taskId) {
      localStorage.setItem(`task-${taskId}-description`, description);
    }
    if (setShowDetail) {
      setShowDetail(false);
    }
    navigate(`/boards/${boardId}/cards`);
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return {
    handleAddComment,
    handleClose,
    handleComment,
    handleTextarea,
    handleSave,
    task,
    isLoading,
    isError,
    taskId,
    description,
    comment,
    commentArr,
    setDescription,
    setCommentArr,
  };
};

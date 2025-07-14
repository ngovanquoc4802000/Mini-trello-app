import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import queriesTasks from "../../../queries/tasks";
import { useEffect, useState } from "react";

interface Comment {
  id: string;
  valueComment: string;
  createdAt: number;
}
interface TaskDetailState {
  setShowDetail?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  description?: string;
}
function TaskDetails({ setShowDetail }: TaskDetailState) {
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
    console.log(name,value)
    setComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (taskId) {
      const savedDescription = localStorage.getItem(
        `task-${taskId}-description`
      );
      if (savedDescription) setDescription(savedDescription);

      const savedComments = localStorage.getItem(`task-${taskId}-comments`);
      if (savedComments) setCommentArr(JSON.parse(savedComments));
    }
  }, [taskId]);
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

  if (isLoading || !task) return <div>...loading</div>;

  if (isError) return <div>...Error</div>;

  return (
    <div className="z-[1000] fixed top-0 left-0 right-0 bottom-0 bg-black/50 min-h-screen bg-black/50 text-white flex items-center justify-center  bg-black/70 min-h-screen  text-white p-4 sm:p-6 md:p-8">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-6 md:p-8 lg:p-10 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {task && (
          <>
            <div className="mb-6 pb-4 border-b border-gray-700">
              <h2 className="text-2xl font-semibold mb-1">{task.title}</h2>
              <p className="text-gray-400 text-sm">in list To do</p>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 mr-2">Members</span>
                    <div className="flex -space-x-2 overflow-hidden">
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-sm font-bold">
                        SD
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xl text-gray-400 hover:bg-gray-600">
                      +
                    </button>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path>
                    </svg>
                    <span>Watch</span>
                  </button>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                    <span className="text-gray-300 font-medium">
                      Description
                    </span>
                  </div>
                  <textarea
                    value={description}
                    onChange={handleTextarea}
                    name="description"
                    className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 resize-y min-h-[80px]"
                    placeholder="Add a more detailed description"
                  ></textarea>
                  <div className="text-right">
                    {description === "" ? (
                      ""
                    ) : (
                      <button
                        onClick={handleSave}
                        className="text-right bg-blue-600 p-1 rounded-[4px] text-[16px] cursor-pointer"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2 justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 8h10M7 12h10M7 16h10M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
                        ></path>
                      </svg>
                      <span className="text-gray-300 font-medium">
                        Activity
                      </span>
                    </div>

                    <button className="px-3 text-[14px] py-1 bg-gray-700 rounded-md text-sm text-gray-300 hover:bg-gray-600">
                      Show details
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    {commentArr.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center text-sm font-bold">
                          SD
                        </div>
                        <div className="bg-gray-700 p-3 rounded-md flex-1">
                          <div className="text-sm">{item.valueComment}</div>
                          <div className="text-gray-400 text-xs mt-1">
                            {new Date(item.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center text-sm font-bold">
                      SD
                    </div>

                    <textarea
                      value={comment.valueComment}
                      onChange={handleComment}
                      name="valueComment"
                      className="flex-grow mr-[-0rem] p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 resize-y min-h-[40px]"
                      placeholder="Write a comment"
                    ></textarea>
                  </div>

                  <div className="text-right mt-[2px]">
                    <button
                      onClick={handleAddComment}
                      className=" bg-gray-600 p-1 rounded-[4px] mt-1 "
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-60 mt-8 md:mt-0 space-y-4">
                <div>
                  <h3 className="text-gray-400 text-sm mb-2">Add to card</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-start space-x-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M9 20v-2m3 2v-2m0 0a1 1 0 100-2 1 1 0 000 2zm0 0a1 1 0 100-2 1 1 0 000 2z"
                        ></path>
                      </svg>
                      <span>Members</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm mb-2">Power-Ups</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-start space-x-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-github.svg"
                        alt="GitHub"
                        className="w-5 h-5 filter invert"
                      />
                      <span>GitHub</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 text-left">
                    Attach Branch
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 text-left">
                    Attach Commit
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 text-left">
                    Attach Issue
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 text-left">
                    Attach Pull Request...
                  </button>
                  <button className="w-full flex items-center justify-start space-x-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      ></path>
                    </svg>
                    <span>Archive</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskDetails;

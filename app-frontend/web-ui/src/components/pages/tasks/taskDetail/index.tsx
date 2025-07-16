import { useEffect } from "react";
import { useTaskDetailsPages } from "../../../hooks/tasks/useTaskDetail";

interface TaskDetailState {
  setShowDetail?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  description?: string;
}
function TaskDetails({ setShowDetail }: TaskDetailState) {
  const {
    handleAddComment,
    handleClose,
    handleComment,
    handleTextarea,
    handleSave,
    task,
    taskId,
    isLoading,
    isError,
    setCommentArr,
    setDescription,
    description,
    comment,
    commentArr
  } = useTaskDetailsPages({ setShowDetail });
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

  if (isLoading || !task)
    return <div className="text-white p-4">Loading task details...</div>;

  if (isError)
    return <div className="text-red-500 p-4">Error loading task details.</div>;

  return (
    <div className="z-[1000] fixed inset-0 bg-black/50 min-h-screen text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-6 md:p-8 lg:p-10 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
          aria-label="Close task details"
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
              <h2 className="text-xl sm:text-2xl font-semibold mb-1 break-words">
                {task.title}
              </h2>
              <p className="text-gray-400 text-sm">in list To do</p>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="flex-1 space-y-6 order-2 md:order-1">
                {/* Members & Watch */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 mr-2">Members</span>
                    <div className="flex -space-x-2 overflow-hidden">
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-sm font-bold ring-2 ring-gray-800">
                        SD
                      </div>
                    </div>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xl text-gray-400 hover:bg-gray-600 transition-colors"
                      aria-label="Add member"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 text-sm transition-colors"
                    aria-label="Watch task"
                  >
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

                {/* Description */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0"
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
                    <span className="text-gray-300 font-medium text-lg">
                      Description
                    </span>
                  </div>
                  <textarea
                    value={description}
                    onChange={handleTextarea}
                    name="description"
                    className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 resize-y min-h-[80px] text-base"
                    placeholder="Add a more detailed description"
                    rows={3} // Added rows for better initial sizing
                  ></textarea>
                  <div className="text-right mt-2">
                    {description !== "" && (
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>

                {/* Activity/Comments */}
                <div>
                  <div className="flex items-center space-x-2 mb-2 justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0"
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
                      <span className="text-gray-300 font-medium text-lg">
                        Activity
                      </span>
                    </div>

                    <button className="px-3 py-1 bg-gray-700 rounded-md text-sm text-gray-300 hover:bg-gray-600 transition-colors">
                      Show details
                    </button>
                  </div>

                  {/* Comment input */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center text-sm font-bold ring-2 ring-gray-800">
                      SD
                    </div>
                    <textarea
                      value={comment.valueComment}
                      onChange={handleComment}
                      name="valueComment"
                      className="flex-grow p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 resize-y min-h-[40px] text-base"
                      placeholder="Write a comment"
                      rows={1} // Start with 1 row, let it expand
                    ></textarea>
                  </div>
                  <div className="text-right mb-4">
                    <button
                      onClick={handleAddComment}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                      disabled={!comment.valueComment.trim()} // Disable if comment is empty
                    >
                      Send
                    </button>
                  </div>

                  {/* Existing comments */}
                  <div className="space-y-4">
                    {commentArr.length > 0 ? (
                      commentArr.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center text-sm font-bold ring-2 ring-gray-800">
                            SD
                          </div>
                          <div className="bg-gray-700 p-3 rounded-md flex-1 break-words">
                            <div className="text-sm sm:text-base">
                              {item.valueComment}
                            </div>
                            <div className="text-gray-400 text-xs mt-1">
                              {new Date(item.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm text-center">
                        No comments yet. Be the first to comment!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar / Add to card & Power-Ups */}
              <div className="w-full md:w-60 mt-8 md:mt-0 space-y-4 order-1 md:order-2">
                <div>
                  <h3 className="text-gray-400 text-sm mb-2 font-semibold">
                    Add to card
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-start space-x-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 transition-colors">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
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
                  <h3 className="text-gray-400 text-sm mb-2 font-semibold">
                    Power-Ups
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-start space-x-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 transition-colors">
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
                  <h3 className="text-gray-400 text-sm mb-2 font-semibold">
                    Actions
                  </h3>{" "}
                  {/* Added an Actions heading */}
                  <button className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 text-left transition-colors">
                    Attach Branch
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 text-left transition-colors">
                    Attach Commit
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 text-left transition-colors">
                    Attach Issue
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 text-left transition-colors">
                    Attach Pull Request...
                  </button>
                  <button className="w-full flex items-center justify-start space-x-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300 transition-colors">
                    <svg
                      className="w-5 h-5 flex-shrink-0"
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

import { useCreateBoards } from "../../../hooks/boards/useCreateBoards";

interface CreateBoardProps {
  onClose: () => void;
}

function CreateBoard({ onClose }: CreateBoardProps) {
  const { handleBoardTitleChange, handleCreateBoard, value } = useCreateBoards({
    onClose,
  });

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-gray-800  cursor-pointer rounded-lg shadow-xl p-6 w-full max-w-sm relative text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">Create New Board</h3>
          <button
            onClick={onClose}
            className="text-gray-400  cursor-pointer hover:text-white transition-colors"
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
        </div>

        <div className="mb-6">
          <label
            htmlFor="boardTitle"
            className="block text-gray-400 text-sm mb-2"
          >
            Board Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="boardName"
            className={`w-full p-3 bg-gray-700 text-gray-200 rounded-md border focus:outline-none focus:border-blue-500`}
            value={value.name}
            name="name"
            onChange={handleBoardTitleChange}
            placeholder="Enter your board title"
          />
        </div>

        <div className="flex cursor-pointer justify-end">
          <button
            onClick={handleCreateBoard}
            className={`px-3 bg-gray-100 text-black cursor-pointer hover:bg-gray-200 py-3 rounded-md font-semibold transition-colors
             
            `}
          >
            Create Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBoard;

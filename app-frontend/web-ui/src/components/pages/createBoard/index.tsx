import React, { useState } from 'react';

interface CreateBoardProps {
  onClose: () => void;
}

function CreateBoard ({ onClose } : CreateBoardProps) {
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');

  const handleBoardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.target.value);
    if (e.target.value.trim()) {
      setTitleError('');
    }
  };

  const handleCreateBoard = () => {
    if (!boardTitle.trim()) {
      setTitleError('Board title is required');
      return;
    }
    console.log('Creating new board with title:', boardTitle);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm relative text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">Create New Board</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="boardTitle" className="block text-gray-400 text-sm mb-2">
            Board Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="boardTitle"
            className={`w-full p-3 bg-gray-700 text-gray-200 rounded-md border ${titleError ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-blue-500`}
            value={boardTitle}
            onChange={handleBoardTitleChange}
            placeholder="Enter your board title"
          />
          {titleError && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span role="img" aria-label="warning" className="mr-1">
                👋
              </span>
              {titleError}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleCreateBoard}
            className={`px-6 py-3 rounded-md font-semibold transition-colors
              ${boardTitle.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
            `}
            disabled={!boardTitle.trim()}
          >
            Create Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
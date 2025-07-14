import { useState } from "react";
import type { CreateCards } from "../../../mockup/cards";
interface TasksPagesProps {
    setShowAddCard?: React.Dispatch<React.SetStateAction<boolean>>
}
function CreateTasks({setShowAddCard} : TasksPagesProps) {
  const [tasks, setTasks] = useState<CreateCards>({
    name: "",
    description: "",
  });

  const handleChangeTasksInput = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setTasks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddTask = async () => {};
  return (
    <div className=" bg-gray-800 p-3 rounded-lg shadow-md mb-3">
      <input
        type="text"
        value={tasks.name}
        name="name"
        onChange={handleChangeTasksInput}
        placeholder="Enter title or paste link..."
        className="w-full px-3 py-2 text-sm rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
      />
      <div className="flex mt-2">
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-2 cursor-pointer py-1 rounded hover:bg-blue-500 text-[14px]"
        >
          Add card
        </button>
        <button
          onClick={() => setShowAddCard && setShowAddCard(false)}
          className="text-white ml-2 cursor-pointer text-[30px] rounded-[4px] hover:bg-gray-200 px-2 hover:text-gray-800"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default CreateTasks;

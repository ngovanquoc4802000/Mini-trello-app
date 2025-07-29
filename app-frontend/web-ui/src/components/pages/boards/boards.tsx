import logoMember from "$/assets/logo-member.png";
import logoNotification from "$/assets/logo-notifice.png";
import logo from "$/assets/logo.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBoards } from "../../hooks/boards/useBoards";
import queriesUsers from "../../queries/users";
import CreateBoard from "./createBoard";
import "./styles.scss";
import type { CreateRegisterTs } from "../../mockup/users";
import { registerUser } from "../../service/users";

function BoardsPage() {
  const { boardList, isError, isLoading, showBoard, setShowBoard } =
    useBoards();
    console.log(boardList);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [valueRegister, setValueRegister] = useState<CreateRegisterTs>({
    name: "",
    email: "",
    password: "",
  });
  const {
    isLoading: loadingUsers,
    isError: errorUsers,
    data: userList,
  } = useQuery({ ...queriesUsers.list() });
  const handleSubmitRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateUser();
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const handleShowBoard = () => {
    if (!currentUser) {
      setShowLogin(true);
      return;
    } else {
      setShowBoard(true);
      return;
    }
  };
  const handleOnChangeRegister = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValueRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  if (!currentUser) console.log("chưa có user");
  const { mutate: updateUser } = useMutation({
    mutationFn: async () => {
      const response = await registerUser(valueRegister);
      if (!response) throw new Error("Fails to register user new");
      return response;
    },

    onSuccess: (response) => {
      localStorage.setItem("currentUser", JSON.stringify(response));
      setShowLogin(false);
      setValueRegister({
        name: "",
        email: "",
        password: "",
      });
      alert("Bạn đã đăng nhập thành công");
      setShowBoard(true);
    },
    onError: (error) => {
      console.log("register Error ", error.message);
    },
  });

  if (isLoading || loadingUsers || !userList || !boardList)
    return <div>...Loading</div>;

  if (isError || errorUsers) return <div>...Error</div>;
  return (
    <div className="boards-page bg-gray-800 min-h-screen flex flex-col">
      <header className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button className="p-1.5 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </button>

          <img src={logo} className="h-8 w-8" alt="Logo" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1.5 rounded-[50px] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
            <img
              src={logoNotification}
              className="h-6 w-6"
              alt="Notifications"
            />
          </button>
          <div className="w-10 h-10 bg-red-600 hover:bg-red-400 cursor-pointer rounded-full flex items-center justify-center text-white font-semibold text-sm">
            SD
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-gray-900 p-4 md:flex-shrink-0">
          <nav>
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="flex items-center p-3 rounded-lg  bg-blue-700 text-white hover:bg-blue-600"
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 12l3-3m0 0l3 3m-3-3v6M12 2a10 10 0 100 20 10 10 0 000-20z"
                    ></path>
                  </svg>
                  Boards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  <img
                    src={logoMember}
                    className="h-5 w-5 mr-3"
                    alt="Members"
                  />
                  All Members
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  <img
                    src={logoMember}
                    className="h-5 w-5 mr-3"
                    alt="Members"
                  />
                  Management Users
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-gray-400 uppercase tracking-wide font-semibold mb-6">
            Your Workspaces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentUser &&
              boardList.boards.map((item, index) => (
                <Link key={index} to={`/boards/${item.id}/cards`}>
                  <div className="bg-gray-700 p-6 rounded-lg h-[130px] shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col justify-between">
                    <h3 className="text-xl font-semibold mb-8 text-white">
                      {item.name}
                    </h3>
                    <div className="text-gray-400 text-sm">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            {showLogin && (
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex items-center justify-center px-4 sm:px-6 lg:px-8 z-50">
                <div className="relative w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-8">
                  {/* Nút Close */}
                  <button
                    onClick={() => setShowLogin(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    aria-label="Close"
                  >
                    ×
                  </button>

                  {/* Nội dung form login */}
                  <div className="text-center">
                    <img
                      className="mx-auto h-12 w-auto"
                      src="https://cdn.worldvectorlogo.com/logos/trello.svg"
                      alt="Trello Logo"
                    />
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                      Sign in to your account
                    </h2>
                  </div>

                  <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmitRegister}
                  >
                    <div className="rounded-md  -space-y-px">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="name"
                          value={valueRegister.name}
                          onChange={handleOnChangeRegister}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={valueRegister.email}
                          onChange={handleOnChangeRegister}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          value={valueRegister.password}
                          onChange={handleOnChangeRegister}
                          type="password"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Log in
                      </button>
                    </div>
                  </form>

                  <div className="text-center text-sm text-gray-500">
                    <p>
                      Don't have an account?{" "}
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div
              onClick={handleShowBoard}
              className="bg-gray-700 p-6 rounded-lg shadow-md border-2 border-dashed border-gray-600  text-gray-400 flex flex-col items-center justify-center hover:bg-gray-600 lg:hover:bg-gray-600 md:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
            >
              <svg
                className="h-10 w-10 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span className="text-lg">Create a new board</span>
            </div>
            {showBoard && <CreateBoard onClose={() => setShowBoard(false)} />}
          </div>
        </main>
      </div>
      <footer className="bg-gray-900 text-white p-4 text-center">
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  );
}

export default BoardsPage;

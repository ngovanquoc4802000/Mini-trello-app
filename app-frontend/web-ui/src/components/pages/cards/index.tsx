
function CardsPage() {
  return (
    <div className="cards-page bg-gray-800 text-gray-100 min-h-screen flex flex-col">
      <header className="bg-gray-900 p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <button
            id="sidebarToggle"
            className="md:hidden p-1.5 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
          >
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <button className="p-1.5 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2 hidden md:block">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </button>

          <svg
            className="h-8 w-8 text-red-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-9 4h6m-3-3v6"
            ></path>
          </svg>
          <span className="text-xl font-bold mr-4">S</span>

          <div className="relative flex-grow max-w-xs hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-700 text-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 hidden md:block">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.899a9 9 0 010 12.727m-9.899-2.828a5 5 0 01-7.072 0M3.05 11.293a9 9 0 0112.727 0L12 15l-3.778-3.778z"
              ></path>
            </svg>
          </button>

          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            SD
          </div>
        </div>
      </header>
       <div className="flex flex-1 relative">
        <div id="sidebarBackdrop" className="fixed inset-0 bg-black z-40 sidebar-backdrop md:hidden"></div>

        <aside id="sidebar" className="fixed md:static inset-y-0 left-0 w-64 bg-gray-900 p-4 flex flex-col z-50 md:flex-shrink-0 sidebar-overlay md:sidebar-overlay-none">
            <h3 className="text-gray-400 uppercase tracking-wide font-semibold mb-4">Your boards</h3>
            <nav className="mb-8">
                <ul>
                    <li className="mb-2">
                        <a href="#" className="flex items-center p-3 rounded-lg bg-blue-700 text-white hover:bg-blue-600">
                            <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3m0 0l3 3m-3-3v6M12 2a10 10 0 100 20 10 10 0 000-20z"></path></svg>
                            My Trello board
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700">
                            <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M9 20v-2m3 2v-2m3 2v-2m-9 0h1.5a3 3 0 003-3V6a3 3 0 00-3-3H9m12 0h-1.5a3 3 0 00-3 3v10a3 3 0 003 3H21"></path></svg>
                            Members
                        </a>
                    </li>
                </ul>
            </nav>

            <h3 className="text-gray-400 uppercase tracking-wide font-semibold mb-4">Members</h3>
            <div className="flex-1 overflow-y-auto members-scrollable pr-2 -mr-2"> <ul>
                    <li className="mb-2">
                        <a href="#" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">SD</div>
                            User 1
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">SD</div>
                            User 2
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">SD</div>
                            User 3
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">SD</div>
                            User 4
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">SD</div>
                            User 5
                        </a>
                    </li>
                     <li className="mb-2">
                        <a href="#" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">SD</div>
                            User 6
                        </a>
                    </li>
                     <li className="mb-2">
                        <a href="#" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">SD</div>
                            User 7
                        </a>
                    </li>
                     <li className="mb-2">
                        <a href="#" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">SD</div>
                            User 8
                        </a>
                    </li>
                </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-700 text-center">
                <p className="text-gray-500 text-sm mb-4 leading-snug">
                    You can't find and reopen closed boards if close the board
                </p>
                <button className="bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 font-semibold transition duration-300">
                    Close
                </button>
            </div>
        </aside>

        <main className="flex-1 p-6 md:p-8 bg-gray-800 overflow-x-auto kanban-scrollable">
            <div className="bg-purple-700 p-4 rounded-lg shadow-lg flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">My Trello board</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 flex items-center text-sm">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Invite member
                </button>
            </div>

            <div className="flex space-x-4 items-start h-full">
                <div className="kanban-list bg-gray-700 p-4 rounded-lg flex-shrink-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">To do</h3>
                        <button className="text-gray-400 hover:text-gray-200">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                        </button>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg shadow-md mb-3">
                        <p className="text-sm">Project planning</p>
                        <div className="flex justify-between items-center mt-2">
                             <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-2">SD</div>
                             </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg shadow-md mb-3">
                        <p className="text-sm">Kickoff meeting</p>
                         <div className="flex justify-between items-center mt-2">
                             <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-2">SD</div>
                             </div>
                    </div>
                    <button className="w-full text-left text-gray-400 p-2 rounded-lg hover:bg-gray-600 flex items-center text-sm">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Add a card
                    </button>
                </div>

                <div className="kanban-list bg-gray-700 p-4 rounded-lg flex-shrink-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">Doing</h3>
                        <button className="text-gray-400 hover:text-gray-200">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                        </button>
                    </div>
                    <button className="w-full text-left text-gray-400 p-2 rounded-lg hover:bg-gray-600 flex items-center text-sm">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Add a card
                    </button>
                </div>

                <div className="kanban-list bg-gray-700 p-4 rounded-lg flex-shrink-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">Done</h3>
                        <button className="text-gray-400 hover:text-gray-200">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                        </button>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg shadow-md mb-3">
                        <p className="text-sm">Kickoff meeting</p>
                        <div className="flex justify-between items-center mt-2">
                             <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-2">SD</div>
                             </div>
                    </div>
                    <button className="w-full text-left text-gray-400 p-2 rounded-lg hover:bg-gray-600 flex items-center text-sm">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Add a card
                    </button>
                </div>

                <button className="kanban-list bg-gray-700 bg-opacity-50 text-gray-300 p-4 rounded-lg flex-shrink-0 hover:bg-opacity-70 transition duration-200 flex items-center justify-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Add another list
                </button>
            </div>
        </main>
    </div>
    </div>
  );
}

export default CardsPage;

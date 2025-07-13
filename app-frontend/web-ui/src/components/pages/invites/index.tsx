interface InvitesMemberProps {
    onClose: () => void;
}
function InvitesMember({onClose} : InvitesMemberProps) {
    return ( 
        <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose} 
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">Invite to Board</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Email address or name"
              className="w-full p-3 pr-10 bg-gray-700 text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-300 text-sm">
            Invite someone to this Workspace with a link:
            <br />
            <a href="#" className="text-blue-400 hover:underline">Disable link</a>
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <span className="text-[13px]">Copy link</span>
          </button>
        </div>
      </div>
    </div>
     );
}
                                                                                                                                                                                                                                         
export default InvitesMember;
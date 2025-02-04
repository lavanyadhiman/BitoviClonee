import { useState } from "react";

function ChatBot() {
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      {/* Chat Toggle Button */}
      <button
        className="bg-gray-800 text-white p-3 w-12 h-12 rounded-full flex items-center justify-center hover:w-14 hover:h-14 transition-all duration-300"
        onClick={() => setOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 19 18">
            <g fill="none">
              <g fill="#ffffff">
                <path d="M10.627 9.013l6.872 6.873.708.707-1.415 1.414-.707-.707-6.872-6.872L2.34 17.3l-.707.707L.22 16.593l.707-.707L7.8 9.013.946 2.161l-.707-.708L1.653.04l.707.707L9.213 7.6 16.066.746l.707-.707 1.414 1.414-.707.708-6.853 6.852z" />
              </g>
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 39 37"
            className="w-6 h-6"
          >
            <path
              fill="#ffffff"
              d="M30.594 4.773c-.314-1.943-1.486-3.113-3.374-3.38C27.174 1.382 22.576.5 15.36.5c-7.214 0-11.812.882-11.843.889-1.477.21-2.507.967-3.042 2.192a83.103 83.103 0 019.312-.503c6.994 0 11.647.804 12.33.93 3.079.462 5.22 2.598 5.738 5.728.224 1.02.932 4.606.932 8.887 0 2.292-.206 4.395-.428 6.002 1.22-.516 1.988-1.55 2.23-3.044.008-.037.893-3.814.893-8.415 0-4.6-.885-8.377-.89-8.394"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="w-[500px] bg-white rounded-lg shadow-lg p-4 mt-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-2 mb-2">
            <div className="flex items-center space-x-2">
              <img
                src="https://www.bitovi.com/hs-fs/hubfs/bitovi_logo.jpeg?width=108&height=108"
                alt="Bitovi Logo"
                className="w-10 h-10 rounded-full"
              />
              <h5 className="text-lg font-semibold">BitBot</h5>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✖
            </button>
          </div>

          {/* Message */}
          <div className="flex space-x-3 items-start">
            <img
              src="https://www.bitovi.com/hs-fs/hubfs/bitovi_logo.jpeg?width=108&height=108"
              alt="Bot"
              className="w-8 h-8 rounded-full"
            />
            <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
              <p className="text-gray-800">Got any questions? {`I'm`} happy to help.</p>
            </div>
            
          </div>
          <div className="p-4 border rounded-lg shadow-md w-full max-w-md">
      <div className="flex flex-col space-y-2">
        <div className="border p-2 rounded-md">
          <div
            className="w-full min-h-[40px] p-2 border rounded-md focus:outline-none"
            contentEditable
            role="textbox"
            placeholder="Write a message"
            onInput={(e) => setMessage(e.currentTarget.textContent)}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="video/*,audio/*,application/pdf,image/*,text/plain"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            📎 Attach File
          </label>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              message || file ? "bg-blue-500" : "bg-gray-400"
            }`}
            disabled={!message && !file}
          >
            Send
          </button>
        </div>
      </div>
    </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;

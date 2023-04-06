
function WindowNotInstalled() {
    return (
      <div className="absolute z-[9999] top-4 right-[12%] flex flex-col w-80 bg-gray-900 rounded-lg px-8 py-4 justify-center items-center shadow-xl shadow-gray-400">
          <div className="text-center text-xl text-white font-light">
              Oops! We can&#39;t detect Window.AI in your browser.
          </div>
          <button className="flex flex-row bg-transparent px-4 py-2 mt-4 rounded-xl border-[1px] border-slate-100 border-opacity-60 hover:border-opacity-100 text-lg text-white font-thin transition-all">
              Get Window.AI
          </button>
          <div className="absolute -top-1 right-4 h-4 w-4 rotate-45 bg-gray-900" />
      </div>
    )
  }
  
  export default WindowNotInstalled
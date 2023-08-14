export function Loader() {
  return (
    <div className=" relative inline-block h-7 w-7 rounded-full align-middle">
      <div className="absolute h-full w-full animate-spin rounded-full border-4 border-b-0 border-solid border-pink-300 border-l-transparent border-opacity-100"></div>
      <div className="absolute left-[calc(50%_-_10px)] top-[calc(50%_-_10px)] h-5 w-5 animate-reverse-spin rounded-full border-4 border-r-0 border-solid border-pink-300 border-t-transparent border-opacity-100"></div>
    </div>
  )
}

export function FullPageLoader() {
  return (
    <div className="fixed left-0 top-0 z-40 grid h-full w-full place-items-center">
      <div className="relative h-24 w-24 animate-[spin_2s_linear_infinite] rounded-full border-2 border-transparent border-t-gray-200">
        <div className="absolute inset-1 animate-[spin_3s_linear_infinite] rounded-full border-2 border-transparent border-t-gray-300"></div>
        <div className="absolute inset-3 animate-[spin_1.5s_linear_infinite] rounded-full border-2 border-transparent border-t-gray-400"></div>
      </div>
    </div>
  )
}

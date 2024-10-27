import React from "react"

export const BarLoader = () => {
  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden">
      <div className="w-full h-full bg-primary animate-[barloader_1s_ease-in-out_infinite]"></div>
    </div>
  )
}

export default BarLoader;
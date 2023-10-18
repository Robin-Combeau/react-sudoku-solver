import React from 'react'

export default function Button({onClick, innerHTML}) {
  return (
    <button onClick={onClick} className="transition ease-in-out bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded m-3 duration-300">
      {innerHTML}
    </button>
  )
}

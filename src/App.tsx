import { useState } from 'react'
import cx from 'clsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-2 gap-2 w-full max-w-screen-xl mx-auto">
      <div className="w-full bg-gray-500 rounded-lg h-6 dark:bg-gray-700 flex-row">
        <div className={cx("bg-teal-900 h-6 rounded-l-lg transition-[width] duration-[2s] items-start", `w-[${count}%]`)}></div>
        <div className={cx("bg-red-700 h-6 rounded-r-lg transition-[width] duration-[2s] items-end", `w-[${100-count}%]`)}></div>
      </div>
      <button type='button' onClick={() => setCount(prev => (prev + 10) % 101)} > Increment </button>
    </div>
  )
}

export default App

import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl font-bold text-center underline text-red-500'>Hello World</h1>
    </>
  )
}

export default App

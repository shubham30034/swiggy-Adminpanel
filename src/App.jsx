import { useState } from 'react'

import { Button } from "@/components/ui/button"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className=''>
      <Button   variant={'outline'}>Click me</Button>
      </h1>
    </>
  )
}

export default App

import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const [user, setUser] = useState(null);
  
  return (
    <>
      <ToastContainer/>
    </>
  )
}

export default App
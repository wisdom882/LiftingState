// useEffect: persistent state
// 💯 effect dependencies

import React, { useState, useEffect} from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = useState(
    () => window.localStorage.getItem('name') || initialName,
  )

  //add dependency list 
  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

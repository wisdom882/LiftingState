// useEffect: persistent state
// 💯 flexible localStorage hook

import React, {useState, useEffect, useRef} from 'react';

function useLocalStorageState(
    key,
    defaultValue = '',
    {serialize = JSON.stringify, deserialize = JSON.parse} = {},
  ) {
    const [state, setState] = useState(() => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        // the try/catch is here in case the localStorage value was set before
        // we had the serialization in place (like we do in previous extra drill down)
        try {
          return deserialize(valueInLocalStorage)
        } catch (error) {
          window.localStorage.removeItem(key)
        }
      }
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })
  
    const prevKeyRef = useRef(key)
    
    useEffect(() => {
      const prevKey = prevKeyRef.current
      if (prevKey !== key) {
        window.localStorage.removeItem(prevKey)
      }
      prevKeyRef.current = key
      window.localStorage.setItem(key, serialize(state))
    }, [key, state, serialize])
  
    return [state, setState]
  }
  
  function Greeting({initialName = ''}) {
    const [name, setName] = useLocalStorageState('name', initialName)
  
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
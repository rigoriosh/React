import { useState } from "react"

export const AddCategoria = ({addCategoria}) => {

    const [inputValue, setInputValue] = useState('One punch')

    const cachInputValue = ({target}) => {
        setInputValue(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(inputValue)
        if (inputValue.trim() <= 1) return
        addCategoria(inputValue.trim());
        setInputValue('');
        
    }

  return (
    <form onSubmit={handleSubmit}>
        <input onChange={cachInputValue} type="text" placeholder="Buscar gifs" value={inputValue}/>
    </form>
  )
}

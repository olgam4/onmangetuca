import { useState } from 'react'
import { toast } from 'react-toastify'

import Recipe from 'components/Recipe'

import useRecipesApi from 'hooks/useRecipesApi'

import style from './style.module.css'

const Recipes = () => {
  const { recipes, addRecipe } = useRecipesApi()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const addError = () => toast.error('Woops...', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.length === 0) {
      addError()
      return
    }

    const newRecipe ={
      name,
      description
    }

    addRecipe(newRecipe, addError)
    setName('')
    setDescription('')
  }

  return (
    <div className={style.recipes}>
      {recipes.map((recipe, i) => (
        <>
          <Recipe key={i} name={recipe.name} description={recipe.description} />
          <br/>
        </>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}


export default Recipes

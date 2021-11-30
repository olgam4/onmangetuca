import Recipe from 'components/Recipe'

import useRecipesApi from 'hooks/useRecipesApi'
import { useState } from 'react'

import style from './style.module.css'

const Recipes = () => {
  const { recipes, addRecipe } = useRecipesApi()
  const [newName, setNewName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }

  const handleClick = () => {
    const newRecipe ={ name: newName }
    addRecipe(newRecipe)
    setNewName('')
  }

  return (
    <div className={style.recipes}>
      {
        recipes.map((recipe, i) => (<Recipe key={i} name={recipe.name} />))
      }
      <input value={newName} onChange={handleChange} />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}


export default Recipes

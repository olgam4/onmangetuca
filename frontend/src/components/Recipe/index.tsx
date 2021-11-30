import style from './style.module.css'

type Props = {
  name: string
}

const Recipes = ({ name }: Props) => {
  return (
    <div className={style.recipe}>
      <h1>{name}</h1>
    </div>
  )
}

export default Recipes

import style from './style.module.css'

type Props = {
  name: string
  description: string
}

const Recipes = ({ name, description }: Props) => {
  return (
    <>
      <div className={style.recipe}>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
      <br />
    </>
  )
}

export default Recipes

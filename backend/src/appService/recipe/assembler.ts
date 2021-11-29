import Recipe from '@src/domain/recipe';

interface User {
  name: string
}

const fromJson = (json: User): Recipe => {
  return new Recipe(json.name)
};

export {
  fromJson
}

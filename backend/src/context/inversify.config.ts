import 'reflect-metadata'
import { Container } from 'inversify'

import IRecipeRepository, { IRecipeRepositoryType } from '@src/domain/IRecipeRepository'

import InMemoryRecipeRepository from '@src/infrastructure/InMemoryRecipeRepository'

const container = new Container()

const setup = () => {
  container.bind<IRecipeRepository>(IRecipeRepositoryType).toConstantValue(new InMemoryRecipeRepository())
  return container
}

export default setup

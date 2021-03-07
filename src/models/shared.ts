import * as _ from 'lodash'
import { graphql } from 'slowie'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdef', 16)

export const builtInFields = {
  id: {
    graphql: {
      default: { type: graphql.GraphQLString },
      create: null,
      update: null,
    },
    db: { type: String, default: nanoid },
  },
}

export interface IBaseModel {
  _id: string
}

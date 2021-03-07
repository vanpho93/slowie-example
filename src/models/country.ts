import * as _ from 'lodash'
import { graphql, ApolloServer, IField } from 'slowie'
import { app, IContext } from '../app'
import { ICountry } from './country.interface'
import { builtInFields } from './shared'

const name: IField<IContext, string> = {
  graphql: {
    default: { type: graphql.GraphQLString },
    create: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
  db: { type: String },
}

const phonePrefix: IField<IContext, string> = {
  graphql: {
    default: { type: graphql.GraphQLInt },
    create: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
  db: { type: Number, unique: true },
  validate: async (_context, value) => {
    const current = await app.getModel('Country').findOne({ phonePrefix: value })
    if (_.isNil(current)) return
    throw new ApolloServer.UserInputError('PHONE_PREFIX_ALREADY_EXISTS')
  },
}

export const Country = app.createModel<ICountry>({
  name: 'Country',
  schema: {
    _id: builtInFields.id,
    name,
    phonePrefix,
  },
})

Country.hook.beforeCreate((context) => {
  if (context.role === 'ADMIN') return
  throw new ApolloServer.AuthenticationError('PERMISSION_REQUIRED')
})

Country.createIndexes()

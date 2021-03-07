import { graphql, IField, TypeGenerator } from 'slowie'
import { app, IContext } from '../app'
import { IPhone } from './phone.interface'
import { builtInFields } from './shared'

const userId: IField<IContext, string> = {
  graphql: {
    default: { type: graphql.GraphQLString },
  },
  db: { type: String, required: true, unique: true },
}

const phoneNumber: IField<IContext, string> = {
  graphql: {
    default: { type: graphql.GraphQLString },
  },
  db: { type: Number, unique: true },
}

const countryId: IField<IContext, string> = {
  graphql: {
    default: { type: graphql.GraphQLString },
  },
  db: { type: String },
}

const country: IField<IContext> = {
  graphql: {
    get: {
      get type() { return TypeGenerator.getCachedType('Country') },
      resolve(parent: IPhone) {
        return app.getModel('Country').findById(parent.countryId)
      },
    },
  },
}

export const Phone = app.createModel<IPhone>({
  name: 'Phone',
  schema: {
    _id: builtInFields.id,
    userId,
    phoneNumber,
    countryId,
    country,
  },
})

Phone.createIndexes()

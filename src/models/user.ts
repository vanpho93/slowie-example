import * as _ from 'lodash'
import { graphql, IField, TypeGenerator } from 'slowie'
import { app, IContext } from '../app'
import { builtInFields } from './shared'
import { IUser } from './user.interface'

const email: IField<IContext, string> = {
  graphql: {
    default: { type: graphql.GraphQLString },
    create: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    update: null,
  },
  db: { type: String, required: true, unique: true },
}

const countryId: IField<IContext, string> = {
  graphql: {
    default: { type: graphql.GraphQLString },
  },
  db: { type: String },
}

const country: IField<IContext, string> = {
  graphql: {
    read: {
      get type() { return TypeGenerator.getCachedType('Country') },
      resolve(parent: IUser, _args, context) {
        if (_.isNil(parent.countryId)) return null
        return app.getModel('Country').withContext(context).getById(parent.countryId)
      },
    },
    write: null,
  },
}

const phone: IField<IContext, string> = {
  graphql: {
    read: {
      get type() { return TypeGenerator.getCachedType('Phone') },
      resolve(parent: IUser) {
        return app.getModel('Phone').findOne({ userId: parent._id })
      },
    },
    create: {
      get type() { return TypeGenerator.getCachedType('CreatePhoneInput') as any as graphql.GraphQLInputType },
    },
  },
}

export const User = app.createModel<IUser>({
  name: 'User',
  schema: {
    _id: builtInFields.id,
    email,
    countryId,
    country,
    phone,
  },
})

User.createIndexes()

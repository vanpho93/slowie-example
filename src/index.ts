import { Slowie, graphql } from 'slowie'

// step 1: Define context interface
export interface IContext {
  role: string
}

// step 2: Init app and define `context` method, showing how to get context from `req`
export const app = new Slowie<IContext>({
  // How to get context from the request
  context: async (req) => ({ role: req.headers.role || 'GUEST' }),
})

// step 3: Create a model
interface IUser {
  email: string
  countryId: string
}

export const User = app.createModel<IUser>({
  name: 'User',
  schema: {
    email: {
      graphql: {
        default: { type: graphql.GraphQLString },
        create: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        update: null,
      },
      db: { type: String, required: true, unique: true },
    },
    countryId: {
      graphql: {
        default: { type: graphql.GraphQLString },
      },
      db: { type: String },
    },
  },
})

User.createIndexes()

// step 4: Connect database
app.mongoose.connect(
  'mongodb://localhost:27017/slowie',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)

// step 5: Start server
app.getServer().listen(
  3000,
  () => console.log('Play server started at http://localhost:3000')
)

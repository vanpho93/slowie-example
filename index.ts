import * as graphql from 'graphql'
import { Slowie } from 'slowie'

const app = new Slowie<{ userId: string }>({
  context: async (req) => ({ userId: req.headers['user_id'] as string })
})

app.mongoose.connect(
  process.env.DATABASE_URL as string,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)

app.createModel({
  name: 'User',
  schema: {
    email: {
      graphql: { type: graphql.GraphQLString }
    }
  }
})

app.getServer().listen(3000)

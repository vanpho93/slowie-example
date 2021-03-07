import { app } from './app'

import './models/user'
import './models/country'
import './models/phone'

import './models/user.hook'

app.mongoose.connect(
  'mongodb://localhost:27017/slowie',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)

app.getServer().listen(
  3000,
  () => console.log('Play server started at http://localhost:3000')
)

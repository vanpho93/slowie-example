import * as _ from 'lodash'
import { User } from './user'
import { Phone } from './phone'
import { ICreateUserInput } from './user.interface'

User.hook.beforeCreate(async (context, input: ICreateUserInput) => {
  await Phone.withContext(context).validate(input.phone)
})

User.hook.afterCreate(async (context, created, input: ICreateUserInput) => {
  if (_.isNil(input.phone)) return
  await Phone.withContext(context).create({
    userId: created._id,
    ...input.phone,
  })
})

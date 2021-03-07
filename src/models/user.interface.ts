import { IPhone } from './phone.interface'
import { IBaseModel } from './shared'

export interface IUser extends IBaseModel {
  countryId: string
}

export interface ICreateUserInput {
  email: string
  phone: Omit<IPhone, 'userId'>
}

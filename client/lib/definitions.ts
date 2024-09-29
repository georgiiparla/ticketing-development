export type SerializedErrors = {
  message: string
  [key: string]: any
}[]

export interface SerializedErrorsObject {
  errors: SerializedErrors
}

export interface LoggedUserAttrs {
  email: string
  id: string
}

export interface UserAttrs {
  email: string
  password: string
}

export interface CurrentUserResponse {
  currentUser: CurrentUser
}

export interface CurrentUser {
  email: string
  id: string
  iat: number
}

import mongoose, { Document, Schema, Model } from 'mongoose'
import { Password } from '../services/password'

// Type definitions for build method
interface UserAttrs {
  email: string
  password: string
}

// Type definition for Document
interface UserDoc extends Document {
  email: string
  password: string
}

// Type definition for Model (Collection)
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// Schema for Document
const userSchema: Schema<UserDoc> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // User JSON representation of the account created
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        ret.id = ret._id
        delete ret._id
      },
    },
  },
)

// Function keyword is used to determine .this context correctly. If arrow function were used, it would determine .this as .this of user.ts context. If function keyword is used, .this context will equal to context of our user mongodb Document
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const saltedHashPassword = await Password.toSaltedHash(this.get('password'))
    this.set('password', saltedHashPassword)
  }
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User: UserModel = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }

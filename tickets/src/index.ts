import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
  try {
    await mongoose.connect('mongodb://tickets-mongo-srv:27017/tickets')
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!')
  })
}

start()

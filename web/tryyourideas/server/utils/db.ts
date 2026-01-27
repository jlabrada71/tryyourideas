import mongoose from 'mongoose'

let isConnected = false

export async function connectToDatabase() {
  if (isConnected) {
    return
  }

  try {
    const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/tryyourideas'

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })

    isConnected = true
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

// Handle connection events
mongoose.connection.on('disconnected', () => {
  isConnected = false
  console.log('MongoDB disconnected')
})

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error)
})

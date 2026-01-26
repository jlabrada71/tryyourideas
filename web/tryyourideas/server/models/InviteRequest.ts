import mongoose, { Schema, type Document } from 'mongoose'

export interface IInviteRequest extends Document {
  name: string
  email: string
  role: 'creator' | 'developer' | 'investor'
  description: string
  createdAt: Date
  updatedAt: Date
}

const inviteRequestSchema = new Schema<IInviteRequest>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    role: {
      type: String,
      required: true,
      enum: ['creator', 'developer', 'investor'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// Add index for email lookups
inviteRequestSchema.index({ email: 1 })
inviteRequestSchema.index({ createdAt: -1 })

export const InviteRequest = mongoose.models.InviteRequest || mongoose.model<IInviteRequest>('InviteRequest', inviteRequestSchema)

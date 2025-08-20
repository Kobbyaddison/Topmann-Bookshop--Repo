import { Schema, model } from 'mongoose';

const AddressSchema = new Schema({
  fullName: String,
  phone: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
  default: { type: Boolean, default: false }
}, { _id: true });

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  resetPasswordToken: String,
  addresses: [AddressSchema],
  avatarUrl: String
}, { timestamps: true });

export default model('User', UserSchema);

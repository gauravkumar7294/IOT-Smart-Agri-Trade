import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ['Farmer', 'Trader'],
  },
  // This will store the farmer's IoT device URL
  deviceApiUrl: {
    type: String,
    default: "",
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
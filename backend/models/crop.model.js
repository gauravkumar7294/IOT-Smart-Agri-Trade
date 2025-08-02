import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL to the image
    required: true,
  },
  weight: {
    type: Number, // in tons
    required: true,
  },
  price: {
    type: Number, // per ton
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;
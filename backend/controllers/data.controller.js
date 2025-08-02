import User from '../models/user.model.js';
import Crop from '../models/crop.model.js';

// Controller for farmer's IoT sensor data
export const getSensorData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.deviceApiUrl) {
      return res.status(404).json({ error: "Device API URL not configured for this user." });
    }

    // Server-side fetch to the IoT device
    const tempRes = await fetch(`${user.deviceApiUrl}&v0`);
    const temperature = await tempRes.text();

    const humRes = await fetch(`${user.deviceApiUrl}&v1`);
    const humidity = await humRes.text();

    res.status(200).json({ temperature, humidity });
  } catch (error) {
    console.log("Error in getSensorData controller", error.message);
    res.status(500).json({ error: "Failed to fetch data from device." });
  }
};

// Controller for Trade Center data
export const getTradeData = async (req, res) => {
  try {
    const farmers = await User.find({ role: 'Farmer' }).select("-password");
    const traders = await User.find({ role: 'Trader' }).select("-password");
    const crops = await Crop.find({}).populate("seller", "fullName");

    res.status(200).json({ farmers, traders, crops });
  } catch (error) {
    console.log("Error in getTradeData controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
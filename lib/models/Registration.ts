import mongoose, { Schema, model, models } from "mongoose";

const RegistrationSchema = new Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = models.Registration || model("Registration", RegistrationSchema);

export default Registration;

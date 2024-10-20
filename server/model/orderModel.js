import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderItems: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        image: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    user: {
      type: mongoose.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const ORDER = mongoose.model("order", orderSchema);
export default ORDER;

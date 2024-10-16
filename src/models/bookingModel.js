const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    customerId: {
      type: Schema.ObjectId,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("bookings", bookingSchema);

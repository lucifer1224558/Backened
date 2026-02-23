const mongoose = require("mongoose");
const Counter = require("./Counter");

const billingSchema = new mongoose.Schema({
    orderNo: {
        type: String,
        unique: true
        // required: true is NOT here, but pre("validate") will fill it anyway
    },
    dineType: {
        type: String,
        enum: ["Dine In", "Takeaway", "Delivery"],
        required: true
    },
    tableNo: {
        type: String
    },
    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            subtotal: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    gst: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "UPI", "Card"],
        required: true
    },
    billed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// ✅ CRITICAL: Use "validate" instead of "save".
// Mongoose runs validation BEFORE "save". If you use "save",
// it checks if fields are valid (and sometimes if they are present)
// before your hook even has a chance to set the orderNo.
billingSchema.pre("validate", async function (next) {
    if (!this.orderNo) {
        try {
            const counter = await Counter.findOneAndUpdate(
                { name: "billing" },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );

            this.orderNo = "ORD" + counter.seq.toString().padStart(4, "0");
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model("Billing", billingSchema);

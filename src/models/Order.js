const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    id: Number, // Frontend ID
    name: String,
    price: Number,
    quantity: Number,
    category: String,
    image: String
});

const orderSchema = new mongoose.Schema({
    orderNo: {
        type: String,
        required: true
    },
    tableNo: String,
    items: [orderItemSchema],
    subtotal: Number,
    taxes: Number,
    total: Number,
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    source: {
        type: String,
        enum: ['Zomato', 'Swiggy', 'Website', 'Direct'],
        default: 'Direct'
    },
    customerName: String,
    customerPhone: String,
    address: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

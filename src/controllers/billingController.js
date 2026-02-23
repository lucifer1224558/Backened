const Billing = require('../models/Billing');

// @desc Get all billing records
// @route GET /api/billings
exports.getBillings = async (req, res) => {
    try {
        const billings = await Billing.find().sort({ createdAt: -1 });
        res.status(200).json(billings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get all billed records (billed=true)
// @route GET /api/billings/paid
exports.getPaidBillings = async (req, res) => {
    try {
        const billings = await Billing.find({ billed: true }).sort({ createdAt: -1 });
        res.status(200).json(billings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get single billing record
// @route GET /api/billings/:id
exports.getBillingById = async (req, res) => {
    try {
        const billing = await Billing.findById(req.params.id);
        if (!billing) return res.status(404).json({ message: 'Billing record not found' });
        res.status(200).json(billing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Create new billing record
// @route POST /api/billings
exports.createBilling = async (req, res) => {
    try {
        const billing = await Billing.create(req.body);
        res.status(201).json(billing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Update billing record
// @route PUT /api/billings/:id
exports.updateBilling = async (req, res) => {
    try {
        const billing = await Billing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!billing) return res.status(404).json({ message: 'Billing record not found' });
        res.status(200).json(billing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Delete billing record
// @route DELETE /api/billings/:id
exports.deleteBilling = async (req, res) => {
    try {
        const billing = await Billing.findByIdAndDelete(req.params.id);
        if (!billing) return res.status(404).json({ message: 'Billing record not found' });
        res.status(200).json({ message: 'Billing record deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

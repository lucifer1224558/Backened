const express = require('express');
const router = express.Router();
const {
    getBillings,
    getPaidBillings,
    getBillingById,
    createBilling,
    updateBilling,
    deleteBilling
} = require('../controllers/billingController');

const { protect, restrictTo } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, restrictTo('admin', 'staff'), getBillings)
    .post(protect, createBilling);

router.route('/paid')
    .get(protect, restrictTo('admin', 'staff'), getPaidBillings);

router.route('/:id')
    .get(protect, restrictTo('admin', 'staff'), getBillingById)
    .put(protect, restrictTo('admin'), updateBilling)
    .delete(protect, restrictTo('admin'), deleteBilling);

module.exports = router;

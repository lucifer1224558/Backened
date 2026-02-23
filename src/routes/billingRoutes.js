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

router.route('/')
    .get(getBillings)
    .post(createBilling);

router.route('/paid')
    .get(getPaidBillings);

router.route('/:id')

    .get(getBillingById)
    .put(updateBilling)
    .delete(deleteBilling);

module.exports = router;

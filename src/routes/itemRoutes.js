const express = require('express');
const router = express.Router();
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');

const { protect, restrictTo } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getItems)
    .post(protect, restrictTo('admin'), createItem);

router.route('/:id')
    .put(protect, restrictTo('admin'), updateItem)
    .delete(protect, restrictTo('admin'), deleteItem);

module.exports = router;

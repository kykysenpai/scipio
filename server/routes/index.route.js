import express from 'express';
import index from '../controllers/index.controller';

const router = express.Router();

router.route('/')
    .get(index.index)

module.exports = router;
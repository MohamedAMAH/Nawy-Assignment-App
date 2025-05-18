import express from 'express';
import { getApartments, getApartmentById, createApartment } from '../controllers/apartmentController';

const router = express.Router();

// GET all apartments
router.get('/', getApartments);

// GET apartment by ID
router.get('/:id', getApartmentById);

// POST create new apartment
router.post('/', createApartment);

export default router; 
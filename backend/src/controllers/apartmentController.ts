import { Request, Response } from 'express';
import Apartment from '../models/apartmentModel';

// Get all apartments
export const getApartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json({
      success: true,
      count: apartments.length,
      data: apartments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single apartment by ID
export const getApartmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const apartment = await Apartment.findById(req.params.id);    
    if (!apartment) {
      res.status(404).json({
        success: false,
        error: 'Apartment not found'
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: apartment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new apartment
export const createApartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const apartment = await Apartment.create(req.body);    
    res.status(201).json({
      success: true,
      data: apartment
    });
  } catch (error: any) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);     
      res.status(400).json({
        success: false,
        error: messages
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
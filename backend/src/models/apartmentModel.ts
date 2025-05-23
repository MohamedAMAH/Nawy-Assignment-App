import mongoose, { Document } from 'mongoose';

// Interface to define the Apartment document structure
interface IApartment extends Document {
  name: string;
  apartmentNumber: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  project: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Apartment DB Schema
const ApartmentSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true,
      trim: true
    },
    apartmentNumber: { 
      type: String,
      required: true,
      trim: true 
    },
    address: { 
      type: String,
      required: true 
    },
    price: { 
      type: Number,
      required: true,
      min: 0 
    },
    bedrooms: { 
      type: Number,
      required: true,
      min: 0 
    },
    bathrooms: { 
      type: Number,
      required: true,
      min: 0 
    },
    area: { 
      type: Number,
      required: true,
      min: 0 
    },
    description: { 
      type: String,
      required: true 
    },
    project: {
      type: String,
      required: true,
      trim: true
    },
    images: [{ 
      type: String
    }],
    available: { 
      type: Boolean,
      default: true 
    }
  },
  {
    timestamps: true
  }
);

const Apartment = mongoose.model<IApartment>('Apartment', ApartmentSchema);

export default Apartment;
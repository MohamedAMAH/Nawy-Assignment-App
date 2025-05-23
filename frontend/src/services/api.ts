import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Apartment {
  _id: string;
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
}

export interface CreateApartmentData {
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
}

export const getApartments = async (): Promise<Apartment[]> => {
  const response = await axios.get(`${API_URL}/apartments`);
  return response.data.data;
};

export const getApartmentById = async (id: string): Promise<Apartment> => {
  const response = await axios.get(`${API_URL}/apartments/${id}`);
  return response.data.data;
};

export const createApartment = async (apartmentData: CreateApartmentData): Promise<Apartment> => {
  const response = await axios.post(`${API_URL}/apartments`, apartmentData);
  return response.data.data;
};
import axios from 'axios';
import { House } from '../types/house';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchHouses = async (): Promise<House[]> => {
  try {
    const response = await api.get('/houses');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getHouse = async (id: string): Promise<House> => {
  try {
    const response = await api.get(`/houses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const createHouse = async (house: House): Promise<House> => {
  try {
    const response = await api.post('/houses', house);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const updateHouse = async (id: string, house: House): Promise<House> => {
  try {
    const response = await api.put(`/houses/${id}`, house);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response.data);
  }
};

export const deleteHouse = async (id: string): Promise<void> => {
  try {
    await api.delete(`/houses/${id}`);
  } catch (error) {
    throw new Error(error.response.data);
  }
};
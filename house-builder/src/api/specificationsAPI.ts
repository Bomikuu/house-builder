import axios from 'axios';
import { Specification } from '../types/specification';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchSpecifications = async (): Promise<Specification[]> => {
  const response = await api.get(`/specifications`);
  return response.data;
};

export const createSpecification = async (specification: Omit<Specification, 'id'>): Promise<Specification> => {
  const response = await api.post(`/specifications`, specification);
  return response.data;
};

export const updateSpecification = async (specification: Specification): Promise<Specification> => {
  const response = await api.put(`/specifications/${specification.id}`, specification);
  return response.data;
};

export const deleteSpecification = async (id: number): Promise<void> => {
  await axios.delete(`/specifications/${id}`);
};
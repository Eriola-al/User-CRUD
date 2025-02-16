import { User } from '../../types/user';
import { API_BASE_URL, DEFAULT_HEADERS } from './config';

export const userApi = {
  fetchUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  updateUser: async (id: number, userData: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ ...userData, id }),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  deleteUser: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
  },
};
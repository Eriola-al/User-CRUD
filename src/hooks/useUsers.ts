import { useState, useCallback } from 'react';
import { message } from 'antd';
import { User } from '../types/user';
import { userApi } from '../services/api/users';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userApi.fetchUsers();
      setUsers(data);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (values: Omit<User, 'id'>): Promise<boolean> => {
    try {
      await userApi.createUser(values);
      message.success('User created successfully');
      await fetchUsers();
      return true;
    } catch (error) {
      message.error('Failed to create user');
      return false;
    }
  }, [fetchUsers]);

  const updateUser = useCallback(async (id: number, values: Omit<User, 'id'>): Promise<boolean> => {
    try {
      await userApi.updateUser(id, values);
      message.success('User updated successfully');
      await fetchUsers();
      return true;
    } catch (error) {
      message.error('Failed to update user');
      return false;
    }
  }, [fetchUsers]);

  const deleteUser = useCallback(async (id: number): Promise<boolean> => {
    try {
      await userApi.deleteUser(id);
      message.success('User deleted successfully');
      await fetchUsers();
      return true;
    } catch (error) {
      message.error('Failed to delete user');
      return false;
    }
  }, [fetchUsers]);

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
};
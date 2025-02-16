import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { User } from '../../types/user';
import { useUsers } from '../../hooks/useUsers';
import { UserTable } from '../user_management_system/components/users/user_table';
import { UserForm } from '../user_management_system/components/users/user_form';
import { StyledModal } from '../../components/styled_modal';
import { Container, Header } from '../user_management_system/components/users/styles';

export const UserManagementSystem: React.FC = () => {
  const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const handleCreateClick = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleSubmit = async (values: Partial<User>) => {
    const success = editingUser
      ? await updateUser(editingUser.id, values as Omit<User, 'id'>)
      : await createUser(values as Omit<User, 'id'>);

    if (success) {
      handleModalClose();
    }
  };

  return (
    <Container>
      <Header>
        <Button
          style={{ fontWeight: 500, backgroundColor: "#E33131" }}
          type="primary"
          icon={<PlusOutlined style={{ fontSize: 13 }} />}
          onClick={handleCreateClick}
        >
          Create New User
        </Button>
      </Header>

      <UserTable
        users={users}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={deleteUser}
      />

      <StyledModal
        title={editingUser ? 'Edit User Info' : 'New User Info'}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        closable
        destroyOnClose
      >
        <UserForm
          key={editingUser?.id || 'new'}
          initialValues={editingUser || undefined}
          onSubmit={handleSubmit}
          onCancel={handleModalClose}
        />
      </StyledModal>
    </Container>
  );
};

import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { User } from '../../types/user';
import { useUsers } from '../../hooks/useUsers';
import { UserTable } from './user_table';
import { UserForm } from '../../views/user_management_system/user_form/index';
import { StyledModal } from '../../components/styled_modal';
import { Container, Header } from '../../views/user_management_system/user_table/styles';
import { CreateUserButton } from '../../views/user_management_system/user_table/styles'
import { Empty } from 'antd';

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
  

  if (!users) return <Empty />;

  return (
    <Container>
      <Header>
        <CreateUserButton
          type="primary"
          icon={<PlusOutlined/>}
          onClick={handleCreateClick}
        >
          Create New User
        </CreateUserButton>
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

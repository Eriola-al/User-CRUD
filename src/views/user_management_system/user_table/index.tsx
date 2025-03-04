import React, { useMemo } from 'react';
import { columns } from './config';
import { User } from '../../../types/user';
import { StyledTable } from '../../user_management_system/user_table/styles';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionButton } from '../../../components/action_button';

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  onEdit,
  onDelete
}) => {

  const userColumns = useMemo(() => {
    const actionColumn = {
      key: "actions",
      title: "Actions",
      render: (_: unknown, record: User) => (
        <div>
          <ActionButton
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(record);
            }}
            color="default"
            variant="text"
            aria-label="Edit user"
          />
          <ActionButton
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(record.id);
            }}
            color="default"
            variant="text"
            aria-label="Delete user"
          />
        </div>
      ),
    };

    return [...columns, actionColumn]
  }, [onEdit, onDelete]);

  return (
    <StyledTable
      dataSource={users}
      columns={userColumns}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 6,
        position: ['bottomRight'],
        showSizeChanger: false,
      }}
    />
  );
};
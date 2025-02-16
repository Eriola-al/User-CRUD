import React from 'react';
import { columns } from './config';
import { User } from '../../../../types/user';
import { Cell, RowWrapper, StyledTable } from './styles';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionButton } from '../../../../components/action_button';

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
  const CustomRow: React.FC<any> = ({ children, ...props }) => {
    const record = props['data-row-key'] && 
      Array.isArray(children) && 
      children[0]?.props?.record;
    
    if (!record) return null;
    
    return (
      <tr {...props}>
        <td colSpan={React.Children.count(children)}>
          <RowWrapper>
            <Cell align="center">{record.id}</Cell>
            <Cell align="left">{record.name}</Cell>
            <Cell align="left">{record.username}</Cell>
            <Cell align="left">{record.email}</Cell>
            <Cell align="left">{record.phone}</Cell>
            <Cell align="left">
              {`${record.address?.street || ''}, ${record.address?.city || ''}`}
            </Cell>
            <Cell align="center">
              <ActionButton
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(record);
                }}
                color="default" 
                variant="text"
              />
              <ActionButton
                type="text"
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(record.id);
                }}
                color="default" 
                variant="text"
              />
            </Cell>
          </RowWrapper>
        </td>
      </tr>
    );
  };

  return (
    <StyledTable
      components={{ body: { row: CustomRow } }}
      dataSource={users}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 6,
        position: ['bottomRight'],
        showSizeChanger: false,
      }}
      onRow={() => ({
        onClick: () => {}
      })}
    />
  );
};
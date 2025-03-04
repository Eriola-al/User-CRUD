import { User } from "../../../types/user";

export const columns = [
  { 
    title: 'ID', 
    dataIndex: 'id', 
    key: 'id',
    width: '10%',
    className: 'column-center'
  },
  { 
    title: 'Name', 
    dataIndex: 'name', 
    key: 'name',
    width: '15%',
    className: 'column-left'
  },
  { 
    title: 'Username', 
    dataIndex: 'username', 
    key: 'username',
    width: '15%',
    className: 'column-left'
  },
  { 
    title: 'Email', 
    dataIndex: 'email', 
    key: 'email',
    width: '20%',
    className: 'column-left'
  },
  { 
    title: 'Phone', 
    dataIndex: 'phone', 
    key: 'phone',
    width: '15%',
    className: 'column-left'
  },
  { 
    title: 'Address', 
    key: 'address',
    width: '15%',
    className: 'column-left',
    render: (_: unknown, record: User) => 
      `${record.address.street}, ${record.address.city}`
  },
];


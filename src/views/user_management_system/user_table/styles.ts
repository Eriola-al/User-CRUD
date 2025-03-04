import styled from 'styled-components';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { User } from '../../../types/user';
import { ActionButton } from '../../../components/action_button';

export const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  width: 100%;

  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const RowWrapper = styled.div`
  display: grid;
  width: 100%;
  height: 45px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: #fff;
  align-items: center;
  overflow: hidden;

  grid-template-columns: 10% 15% 15% 20% 15% 15% 10%;
  
  @media (max-width: 768px) {
    height: auto;
  }
`;

export const Cell = styled.div<{ align?: 'left' | 'center' }>`
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.align === 'center' ? 'center' : 'flex-start'};

  @media (max-width: 768px) {
    padding: 4px 0;
  }
`;

export const StyledTable = styled(Table)<TableProps<User>>`
  width: 100%;

  .ant-table {
    width: 100%;
    table-layout: fixed;
    word-wrap: break-word;
  }

  .ant-table thead > tr > th,
  .ant-table tbody > tr > td {
    white-space: normal;
    word-wrap: break-word;
    padding: 8px;
  }

  table {
    width: 100%;
    min-width: 0 !important; 
  }

  .ant-table-tbody > tr > td {
    border: none;
    background: transparent;
  }

  .ant-table-thead > tr > th {
    background: white;
    font-weight: 500;
    font-size: 14px;
    color: #333;
    border: none !important;
    
    &::before {
      display: none !important;
    }
    
    &.column-center {
      text-align: center;
    }
    &.column-left {
      text-align: left;
    }
  }

  .ant-table-thead > tr {
    border: none;
  }

  .ant-table-cell::before {
    display: none !important;
  }
`;

export const CreateUserButton = styled(ActionButton)`
  background-color: #e33131;
  border-color: #e33131;
  color: white;

  &:hover {
    background-color: #e33131 !important;
    border-color: #e33131 !important;
  }
`;
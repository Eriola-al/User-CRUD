import styled from 'styled-components';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { User } from '../../../../types/user';
import { ActionButton } from '../../../../components/action_button';

export const Container = styled.div`
  /* A fluid container that scales down on mobile */
  padding: 20px;
  margin: 0 auto;
  width: 100%;

  /* Allow horizontal scroll only if the table is truly wider than the screen */
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
  /* Use a fixed grid layout that remains consistent across screen sizes */
  display: grid;
  width: 100%;
  height: 45px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 10px;
  align-items: center;
  overflow: hidden;

  /* Example 7-column layout; adjust percentages to match your data needs */
  grid-template-columns: 10% 15% 15% 20% 15% 15% 10%;

  /* On mobile, keep the same column layout, 
     just allow the container to scroll horizontally if needed. */
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

  /* No change on mobile, so alignment remains consistent. */
  @media (max-width: 768px) {
    padding: 4px 0;
  }
`;

export const StyledTable = styled(Table)<TableProps<User>>`
  width: 100%;

  /* Make columns auto-wrap instead of pushing the layout wide */
  .ant-table {
    width: 100%;
    table-layout: fixed; /* Key for responsive column widths */
    word-wrap: break-word;
  }

  /* Allow text to wrap in cells */
  .ant-table thead > tr > th,
  .ant-table tbody > tr > td {
    white-space: normal;
    word-wrap: break-word;
    padding: 8px;
  }

  /* Remove any default min-width so it doesn't force horizontal scroll on mobile */
  table {
    width: 100%;
    min-width: 0 !important; 
  }

  /* Optional: 
     If you want the table to keep some spacing, keep your original styling
     for the "separate" border spacing if you like. */
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
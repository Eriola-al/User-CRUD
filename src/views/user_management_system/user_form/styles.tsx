import { Form, FormProps } from 'antd';
import styled from 'styled-components';
import { User } from '../../../types/user';

const TypedForm = Form as unknown as React.FC<FormProps<Partial<User>>>;

export const TwoColumnForm = styled(TypedForm)`
  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .full-width {
    grid-column: 1 / -1;
  }

  .submit-button {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px;
    
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: flex-end;
      gap: 16px;
    }

    .ant-btn {
      width: 100%;
      height: 40px;
      
      @media (min-width: 768px) {
        width: 120px;
      }
    }

    .ant-btn-primary {
      background-color: #E33131;
      border-color: #E33131;
      order: -1;
      
      @media (min-width: 768px) {
        order: 0;
      }
    }

    .ant-btn-primary:hover {
      background-color: #E33131 !important;
      border-color: #E33131 !important;
    }
  }

  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-input {
    padding: 8px 12px;
    border-radius: 4px;
    
    &::placeholder {
      color: #9CA3AF;
    }
  }

  .ant-form-item-label {
    padding-bottom: 4px;
    
    label {
      font-size: 14px;
      font-weight: 500;
    }
  }
`;
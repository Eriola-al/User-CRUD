import React, { ReactNode } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #e8e8e8;
  margin: 0 -24px 24px -24px; 
  width: calc(100% + 48px);
`;

const StyledModalWrapper = styled(Modal)`
  .ant-modal-content {
    padding: 24px;
    border-radius: 8px;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .ant-modal-body {
    padding: 0;
  }

  .ant-form-item-label {
    padding-bottom: 4px;
  }

  .ant-input {
    padding: 8px;
    border-radius: 4px;
  }

  .ant-btn-primary {
    background-color: #dc2626;
    border-color: #dc2626;
    height: 40px;
    border-radius: 6px;
    
    &:hover {
      background-color: #b91c1c;
      border-color: #b91c1c;
    }
  }
`;

interface ModalProps {
  title?: string;
  footer?: boolean | null;
  open?: boolean;
  closable?: boolean;
  children?: ReactNode;
  onCancel?: () => void;
  centered?: boolean;
  destroyOnClose?: boolean;
  [x: string]: unknown;
}

export const StyledModal: React.FC<ModalProps> = ({
  title,
  children,
  onCancel,
  ...props
}) => (
  <StyledModalWrapper
    {...props}
    title={null}
    closable={true}
    onCancel={onCancel}
    centered
    width={720}
  >
    {title && (
      <>
        <ModalTitle>{title}</ModalTitle>
        <Divider />
      </>
    )}
    {children}
  </StyledModalWrapper>
);
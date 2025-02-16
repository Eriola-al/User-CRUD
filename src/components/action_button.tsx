import styled from 'styled-components';
import { Button } from 'antd';

export const ActionButton = styled(Button)`
  margin: 0 4px;
  
  &.ant-btn-dangerous {
    background-color: #E33131;
    border-color: #E33131;
    
    &:hover {
      background-color: #E33131;
      border-color: #E33131;
    }
  }
`;
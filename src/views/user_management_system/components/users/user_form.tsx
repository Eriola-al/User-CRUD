import React, { useEffect } from 'react';
import { Form, FormProps, Input, Button } from 'antd';
import { User } from '../../../../types/user';
import { FORM_VALIDATION_MESSAGES } from '../../../../utils/constants';
import styled from 'styled-components';
import { 
  emailValidator, 
  phoneValidator, 
  zipCodeValidator 
} from '../../../../utils/validators';
import { ActionButton } from '../../../../components/action_button';

const TypedForm = Form as unknown as React.FC<FormProps<Partial<User>>>;

const TwoColumnForm = styled(TypedForm)`
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

interface UserFormProps {
  initialValues?: Partial<User>;
  onSubmit: (values: Partial<User>) => Promise<void>;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<Partial<User>>();

  useEffect(() => {
    if (initialValues) {
      const flattenedValues = {
        ...initialValues,
        street: initialValues.address?.street,
        suite: initialValues.address?.suite,
        city: initialValues.address?.city,
        zipcode: initialValues.address?.zipcode,
      };
      form.setFieldsValue(flattenedValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        address: {
          street: values.street,
          suite: values.suite,
          city: values.city,
          zipcode: values.zipcode,
        },
      };
      
      delete formattedValues.street;
      delete formattedValues.suite;
      delete formattedValues.city;
      delete formattedValues.zipcode;

      await onSubmit(formattedValues);
      form.resetFields();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <TwoColumnForm
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleFinish}
      validateTrigger={['onBlur', 'onChange']} 
    >
      <div className="form-row">
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: FORM_VALIDATION_MESSAGES.required }]}
        >
          <Input placeholder="John Gonzales" />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: FORM_VALIDATION_MESSAGES.required }]}
        >
          <Input placeholder="johngonzales13" />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: FORM_VALIDATION_MESSAGES.required },
            { validator: emailValidator },
          ]}
          validateTrigger={['onBlur']} 
        >
          <Input 
            placeholder="johngonzales1332@gmail.com"
            type="email" 
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: FORM_VALIDATION_MESSAGES.required },
            { validator: phoneValidator },
          ]}
          validateTrigger={['onBlur']}
        >
          <Input 
            placeholder="+355 69 76 76 654"
            maxLength={20}
          />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          name="street"
          label="Street"
          rules={[{ required: true, message: FORM_VALIDATION_MESSAGES.required }]}
        >
          <Input placeholder="Reter 43" maxLength={100} />
        </Form.Item>

        <Form.Item
          name="suite"
          label="Suite"
        >
          <Input placeholder="Apt 4B" maxLength={50} />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: FORM_VALIDATION_MESSAGES.required }]}
        >
          <Input placeholder="Tirana" maxLength={50} />
        </Form.Item>

        <Form.Item
          name="zipcode"
          label="Zip Code"
          rules={[
            { required: true, message: FORM_VALIDATION_MESSAGES.required },
            { validator: zipCodeValidator },
          ]}
          validateTrigger={['onBlur']}
        >
          <Input placeholder="10600" maxLength={10} />
        </Form.Item>
      </div>

      <div className="submit-button">
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <ActionButton type="primary" htmlType="submit" style={{height: "10px !important"}}>
          Save
        </ActionButton>
      </div>
    </TwoColumnForm>
  );
};
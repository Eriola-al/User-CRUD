import React from 'react';
import { Form, Input, Button } from 'antd';
import { User } from '../../../types/user';
import { FORM_VALIDATION_MESSAGES } from '../../../utils/constants';
import {
  emailValidator,
  phoneValidator,
  zipCodeValidator
} from '../../../utils/validators';
import { ActionButton } from '../../../components/action_button';
import { TwoColumnForm } from './styles';

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
      initialValues={{
        ...initialValues,
        street: initialValues?.address?.street,
        suite: initialValues?.address?.suite,
        city: initialValues?.address?.city,
        zipcode: initialValues?.address?.zipcode,
      }}
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
          name="street"
          label="Address"
          rules={[{ required: true, message: FORM_VALIDATION_MESSAGES.required }]}
        >
          <Input placeholder="Reter 43" maxLength={100} />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: FORM_VALIDATION_MESSAGES.required }]}
        >
          <Input placeholder="johngonzales13" />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: FORM_VALIDATION_MESSAGES.required }]}
        >
          <Input placeholder="Tirana" maxLength={50} />
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

      <div className="form-row">
        <Form.Item
          name="phone"
          label="Phone Nr"
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

        <Form.Item
          name="suite"
          label="Suite"
        >
          <Input placeholder="Apt 4B" maxLength={50} />
        </Form.Item>
      </div>

      <div className="submit-button">
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <ActionButton type="primary" htmlType="submit" style={{ height: "10px !important" }}>
          Save
        </ActionButton>
      </div>
    </TwoColumnForm>
  );
};
import React from 'react';
import { Form, Input } from 'antd';

interface TextInputProps {
  label: string;
  name: string;
  rules?: object[];
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  rules = [],
  placeholder = '',
  type = 'text',
  value,
  onChange,
  className = '',
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      className={className}
    >
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default TextInput;

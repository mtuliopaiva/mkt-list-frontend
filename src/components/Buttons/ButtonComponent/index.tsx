import React from 'react';
import { Button } from 'antd';

interface ButtonComponentProps {
  label: string;
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  icon?: React.ReactNode;
  size?: 'large' | 'middle' | 'small';
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  shape?: 'circle' | 'round' | 'default';
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  type = 'default',
  icon,
  size = 'middle',
  onClick,
  className = '',
  loading = false,
  disabled = false,
  shape = 'default',
}) => {
  return (
    <Button
      type={type}
      icon={icon}
      size={size}
      className={className}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      shape={shape}
      
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;

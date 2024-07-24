import React from 'react';
import { Image } from 'antd';

interface ImgComponentProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  preview?: boolean;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ImgComponent: React.FC<ImgComponentProps> = ({
  src,
  alt = '',
  width = '100%',
  height = 'auto',
  preview = false,
  fallback,
  className,
  style,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      preview={preview}
      fallback={fallback}
      className={className}
      style={style}
    />
  );
};

export default ImgComponent;

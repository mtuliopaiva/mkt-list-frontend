
interface TextComponentProps {
  children: React.ReactNode;
  color?: string;
  size?: string;
  weight?: string;
  fontFamily?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TextComponent: React.FC<TextComponentProps> = ({
  children,
  color = 'rgba(255, 255, 255, 0.87)',
  size = '1em',
  weight = '400',
  fontFamily = 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  className = '',
  style = {},
}) => {
  return (
    <span
      className={`text-component ${className}`}
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        fontFamily,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export default TextComponent;

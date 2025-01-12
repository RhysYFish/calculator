export default function Button({
  bgColor = 'var(--primary)',
  color = '#fff',
  onClick,
  style,
  children,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        backgroundColor: bgColor,
        color: color,
      }}
    >
      {children}
    </button>
  );
}

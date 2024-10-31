interface DemoProps {
  children: React.ReactNode;
  className?: string;
}

const Demo = ({ children, className }: DemoProps): JSX.Element => {
  return <div className={className}>{children}</div>;
};

export default Demo;

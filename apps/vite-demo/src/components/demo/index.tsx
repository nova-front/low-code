interface DemoBoxProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const DemoBox = ({ title, children }: DemoBoxProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default DemoBox;

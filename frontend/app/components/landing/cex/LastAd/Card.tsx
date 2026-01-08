interface CardProps {
  children?: React.ReactNode;
  title: string;
  content: string;
  move?: string | number;
}

const Card = ({ children, title, content, move = "0px" }: CardProps) => {
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <div className="self-end">{children}</div>
      <div style={{ transform: `translateY(${move})` }}>
        <h3 className="text-black font-bold text-2xl">{title}</h3>
        <p className="text-black text-base">{content}</p>
      </div>
    </div>
  );
};

export default Card;

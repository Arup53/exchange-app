interface MiniContent {
  heading: string;
  content: string;
}

const MiniContent = ({ heading, content }: MiniContent) => {
  return (
    <div className="flex items-center mb-12 gap-12">
      <h3 className="text-2xl text-black font-bold">{heading}</h3>
      <p className="text-base text-gray-400">{content}</p>
    </div>
  );
};

export default MiniContent;

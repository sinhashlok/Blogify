interface Blog {
  id: string;
  title: string;
  createdByName: string;
  onClick: (id: string) => void;
  coverImgURL: string;
}

const BlogCard: React.FC<Blog> = ({ id, title, createdByName, onClick, coverImgURL }) => {
  return (
    <div
      className="border-2 border-black p-4 rounded-lg hover:border-green-200 cursor-pointer"
      onClick={() => onClick(id)}
    >
      <img src={coverImgURL} width={256} alt="Cover-Img"/>
      <h1 className="text-2xl">{title}</h1>
      <h3 className="text-sm">{createdByName}</h3>
    </div>
  );
};

export default BlogCard;

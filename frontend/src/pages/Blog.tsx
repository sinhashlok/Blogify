import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInHeader from "../components/LoggedInHeader";
import AddBlogModal from "../components/AddBlogModal";
import Comment from "../components/Comment";
import ShimmerBlog from "../components/ShimmerBlog";

interface BlogType {
  createdByName: string;
  description: string;
  title: string;
  userId: string;
  _id: string;
  coverImgURL: string;
}

const Blog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<BlogType>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:8000/blogify/blog?id=${blogId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      setBlog(json.blog);
    }

    fetchData();
  }, []);

  const handleModalClick = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <div>
        <LoggedInHeader handleModalClick={handleModalClick} />
        <AddBlogModal modalOpen={modalOpen} />
      </div>
      {blog === undefined ? (
        <ShimmerBlog />
      ) : (
        <div className="w-[75%] md:w-[50%] mx-auto font-poppins mt-12 md:mt-32 lg:mt-0 flex flex-col">
          <img
            src={blog?.coverImgURL}
            alt="CoverImg"
            className="h-[250px] md:h-[500px] object-fit"
          />
          <div className="mt-8 md:mt-12">
            <h1 className="font-bold font-bebasNeue text-3xl md:text-7xl text-right">
              {blog?.title}
            </h1>
            <h3 className="text-sm font-semibold  text-right">
              {blog?.createdByName}
            </h3>
            <div className="mt-8">{blog?.description}</div>
          </div>
          <Comment blogId={blogId} />
        </div>
      )}
    </div>
  );
};

export default Blog;

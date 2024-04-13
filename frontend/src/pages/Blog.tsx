import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInHeader from "../components/LoggedInHeader";
import AddBlogModal from "../components/AddBlogModal";

interface BlogType {
  createdByName: string;
  description: string;
  title: string;
  userId: string;
  _id: string;
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
    </div>
  );
};

export default Blog;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInHeader from "../components/LoggedInHeader";
import checkLoggedIn from "../hooks/useCheckLoggedIn";
import AddBlogModal from "../components/AddBlogModal";
import BlogCard from "../components/BlogCard";

const Dashboard = () => {
  type AllBlogs = {
    _id: string;
    userId: string;
    title: string;
    description: string;
    createdByName: string;
    coverImgURL: string;
  };

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [allBlogs, setAllBlogs] = useState<AllBlogs[]>([]);

  useEffect(() => {
    const loggedIn: boolean = checkLoggedIn();
    if (!loggedIn) {
      navigate("/signin");
    }

    async function fetchData() {
      const response = await fetch("http://localhost:8000/blogify/blog", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setAllBlogs(json.blogs);
    }

    fetchData();
  }, []);

  const handleModalClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleClick = (id: string) => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <div>
      <div>
        <LoggedInHeader handleModalClick={handleModalClick} />
        <AddBlogModal modalOpen={modalOpen} />
      </div>
      <div className="mx-8 lg:mx-24 font-poppins mt-32 lg:mt-0">
        <div className="flex flex-row flex-wrap gap-4">
          {allBlogs.map((blog: AllBlogs) => {
            return (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                createdByName={blog.createdByName}
                coverImgURL={blog.coverImgURL}
                onClick={handleClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

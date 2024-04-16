import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInHeader from "../components/LoggedInHeader";
import checkLoggedIn from "../hooks/useCheckLoggedIn";
import AddBlogModal from "../components/AddBlogModal";
import BlogCard from "../components/BlogCard";
import { useGetAllBlogsQuery } from "../utils/store/apiSlice";
import ShimmerBlogCard from "../components/ShimmerBlogCard";

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
  const {
    data: data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetAllBlogsQuery("test");
  if (isError) {
    console.log(error);
  }

  useEffect(() => {
    const loggedIn: boolean = checkLoggedIn();
    if (!loggedIn) {
      navigate("/signin");
    }
  }, []);

  const handleModalClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleClick = (id: string) => {
    navigate(`/dashboard/${id}`);
  };

  return !isSuccess ? (
    <div>
      <div>
        <LoggedInHeader handleModalClick={handleModalClick} />
        <AddBlogModal modalOpen={modalOpen} />
      </div>
      <div className="mx-8 lg:mx-24 font-poppins mt-32 lg:mt-0 flex flex-row flex-wrap gap-4">
        <ShimmerBlogCard />
        <ShimmerBlogCard />
        <ShimmerBlogCard />
        <ShimmerBlogCard />
        <ShimmerBlogCard />
        <ShimmerBlogCard />
      </div>
    </div>
  ) : (
    <div>
      <div>
        <LoggedInHeader handleModalClick={handleModalClick} />
        <AddBlogModal modalOpen={modalOpen} />
      </div>
      <div className="mx-8 lg:mx-24 font-poppins mt-12 md:mt-32 lg:mt-0">
        <div className="flex flex-row flex-wrap gap-4">
          {data?.blogs.map((blog: AllBlogs) => {
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

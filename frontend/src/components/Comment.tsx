import { useEffect, useState } from "react";

interface Prop {
  blogId: string | undefined;
}

type getAllBlogReqType = {
  blogId: string | undefined;
};

type addCommentReqType = {
  blogId: string | undefined;
  createdByName: string;
  description: string;
};

type Comment = {
  blogId: string;
  createdByName: string;
  description: string;
  userId: string;
  _id: string;
};

const Comment = ({ blogId }: Prop) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [addComment, setAddComment] = useState("");
  const [whenFetch, setWhenFetch] = useState(false)
  useEffect(() => {
    async function getComments() {
      const reqBody: getAllBlogReqType = {
        blogId: blogId,
      };

      const response = await fetch("http://localhost:8000/blogify/comment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(reqBody),
      });
      const json = await response.json();

      if (json?.errorCode !== 0) {
        console.log("Something happend");
      } else {
        setComments(json?.comments);
      }
    }
    getComments();
  }, [whenFetch]);

  const handleClick = (): void => {
    async function addComments() {
      const reqBody: addCommentReqType = {
        blogId: blogId,
        description: addComment,
        createdByName: localStorage.getItem("userName") || "",
      };

      const response = await fetch("http://localhost:8000/blogify/comment/addComment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(reqBody),
      });
      const json = await response.json();
      if (json.errorCode !== 0) {
        console.log(json.me);
      } else {
        setWhenFetch(!whenFetch)
        setAddComment("");
        setComments([]);
      }
    }
    addComments();
  };

  return (
    <div className="mt-12 flex flex-col font-poppins">
      <h1 className="font-bold text-2xl">Comments</h1>
      <div className="mt-2 mb-6 flex flex-col">
        <input
          placeholder="Add comment"
          className="my-2 outline-none border-b-2 border-gray-300"
          onChange={(e: any) => setAddComment(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md text-sm text-white bg-green-400 px-4 py-2 w-[150px]"
          onClick={handleClick}
        >
          Add Comment
        </button>
      </div>
      {comments?.map((comment) => (
        <div key={comment._id} className="my-2">
          <div className="text-lg font-semibold">{comment.createdByName}</div>
          <div className=" ">{comment.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Comment;

import { useEffect, useState } from "react";
import Modal from "react-modal";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import InputForm from "./InputForm";
import TextAreaForm from "./TextAreaForm";
import { resType as ErrorType } from "../utils/config";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    outerWidth: "250px",
    transform: "translate(-50%, -50%)",
  },
};

interface Prop {
  modalOpen: boolean;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById("root") as HTMLElement);

const AddBlogModal: React.FC<Prop> = ({ modalOpen }) => {
  type requestType = {
    title: string;
    description: string;
    createdByName: string;
    coverImgURL: String | null | ArrayBuffer;
  };
  const [modalIsOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [postImage, setPostImage] = useState<string | ArrayBuffer | null>(null);
  const [formError, setFromError] = useState<ErrorType>({
    mssg: "",
    errorCode: 0,
  });

  useEffect(() => {
    setIsOpen(!modalIsOpen);
  }, [modalOpen]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const convertToBase64 = (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64: string | ArrayBuffer | null = await convertToBase64(file);
    setPostImage(base64);
  };

  const handleClick = (e: React.FormEvent): void => {
    e.preventDefault();

    async function addBlog() {
      const reqBody: requestType = {
        title: title,
        description: description,
        createdByName: localStorage.getItem("userName") || "",
        coverImgURL: postImage,
      };

      const response = await fetch(
        "http://localhost:8000/blogify/blog/addBlog",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(reqBody),
        }
      );
      const json = await response.json();
      setTitle("");
      setDescription("");

      if (json.errorCode !== 0) {
        console.log("Please Enter Title / Description");
      } else {
        alert("Blog Added!");
      }
    }
    addBlog();

    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="absolute bg-white top-8 md:top-32 left-[5%] md:left-[25%] w-[90%] md:w-[50%] rounded-xl outline-none border-4 border-black"
        contentLabel="Example Modal"
      >
        <div className="flex flex-col font-poppins p-3 md:p-5">
          <button
            onClick={closeModal}
            className="mb-2 ml-auto bg-black text-white text-lg md:text-2xl px-2 md:px-3 items-center rounded-full hover:bg-white border-2 border-black hover:text-black"
          >
            x
          </button>
          <form className="flex flex-col" onSubmit={handleClick}>
            <Heading title="Add Blog" />
            <SubHeading title="Create a new blog" />
            <label className="form-label text-sm md:text-lg">Cover Image</label>
            <input
              type="file"
              className="form-control text-sm md:text-lg mb-2"
              id="coverImage"
              name="coverImage"
              aria-describedby="coverImage"
              onChange={(e) => handleFileUpload(e)}
            />
            <InputForm
              id={5}
              label="Title"
              placeholderText="Enter Title of your Blog"
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
              error={formError}
            />
            <TextAreaForm
              label="Description"
              placeholderText="Write your blog..."
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
            <button
              type="submit"
              className="mt-2 md:mt-6 w-full rounded-md text-lg text-white font-semibold bg-green-400 px-8 py-2"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddBlogModal;

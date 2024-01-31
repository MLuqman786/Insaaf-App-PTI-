import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstnace from "../../../utils/Axios/Axiox";
import { FormikProvider, useFormik, Field, ErrorMessage } from "formik";
import { object, string, mixed } from "yup";
import { toast, ToastContainer } from "react-toastify";

const userSchema = object({
  newsTitle: string().min(8).max(100).required("Title is required feild "),
  newsContent: string()
    .min(8)
    .max(300)
    .required("News Content is a required feild"),
  file: mixed()
    .required("Select file to add")
    .test("file size ", "to big", (value) => value && value.size < 5020 * 5020)
    .test(
      "file type",
      "invalid",
      (value) =>
        value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
    ),
});

function Membernews() {
  //formik =>>>>>>>>>>>>>>>
  const formik = useFormik({
    initialValues: {
      newsTitle: "",
      newsContent: "",
      file: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => uploadNews(values),
  });

  //>>>>>>>>>>>> Axios for Adding news<<<<<<<<<<<<<<<<<<<<

  const uploadNews = async (data) => {
    const formData = new FormData();
    formData.append("newsTitle", data.newsTitle);
    formData.append("newsContent", data.newsContent);
    formData.append("file", data.file);

    try {
      const response = await AxiosInstnace.post("/news/news/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Make sure to set the content type
        },
      });
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        formik.resetForm();
        toast.success("Added succesfully");
        setOpenModel(false);
      }
      console.log(response);
    } catch (error) {
      toast.error("Unable to add news");

      console.log(error);
    }
  };

  const { id } = useParams();
  const [showCommentsIndex, setShowCommentsIndex] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [news, setnews] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  // const [likeToggle,setLikeToggle]=useState(null)
  


  //>>>>>>>>>>>>>>>>> Axios for Fetching <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const ShowNews = async () => {
    return await AxiosInstnace.get(`/members/${id}/news`);
  };

  const handleSubmit = async () => {
    try {
      const response = await ShowNews();
      setnews(response.data.response.news);
      setProfileInfo([response.data.response]);
      
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  //=>>>>>>>>>> toggle <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const handleToggle = (index) => {
    setShowCommentsIndex((previousIndex) =>
      previousIndex === index ? null : index
    );
    console.log(index,"hello");
  };
  const opnModel = () => {
    setOpenModel(true);
  };
  const clsModel = () => { 
    setOpenModel(false);
  };

  const updateLikes = async (newsId) => {
    const newsItem = news.find(items => newsId ===items.id)
    if (newsItem) {
      const isLiked = newsItem.isLiked || false;
      console.log(isLiked);
      const newsLikes = isLiked
        ? newsItem.totalLikes - 1
        : newsItem.totalLikes + 1;

        const response = await AxiosInstnace.put(`/news/${newsId}/updateLikes`,{
                totalLikes:newsLikes
              }
            )
   
          if(response.status ===200){
            setnews((previousNews)=>
                previousNews.map((ele)=>
                    ele.id===newsId ? {...ele,totalLikes:newsLikes ,isLiked:!isLiked} : ele
                 )
            )
          }
          
    }

}
        
  useEffect(() => {
    handleSubmit();
  }, [id]);

  return (
    <>
      {/* Pop-up */}
      {openModel && (
        <>
          <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded">
            <FormikProvider value={formik}>
        <ToastContainer />
              <div className="mt-10 mb-16">
                <form className="flex flex-col w-96 px-5 rounded-2xl shadow-xl justify-center mx-auto">
                  <h1 className="text-center text-green-600 text-2xl mb-5">
                    Add News
                  </h1>
  
                  <label htmlFor="newsTitle">Title</label>
                  <Field
                    className="mt-3 bg-transparent border-b-2"
                    placeholder="Enter title of news"
                    name="newsTitle"
                  />
                  <div className="h-4">
                    <ErrorMessage name="newsTitle">
                      {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                    </ErrorMessage>
                  </div>
  
                  <label className="mt-5" htmlFor="newsContent">
                    News Content
                  </label>
                  <Field
                    className="mt-3 bg-transparent border-b-2"
                    placeholder="Enter News Content"
                    name="newsContent"
                  />
                  <div className="h-4">
                    <ErrorMessage name="newsContent">
                      {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                    </ErrorMessage>
                  </div>
  
                  <label className="mt-5" htmlFor="file">
                    Add Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      formik.setFieldValue("file", e.target.files[0])
                    }
                    className="mt-3 bg-transparent border-b-2"
                    name="file"
                    id=""
                  />
                  <div className="h-4">
                    <ErrorMessage name="file">
                      {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                    </ErrorMessage>
                  </div>
  
                  <button
                    className="mt-5 mb-4 p-1 text-xl hover:text-white hover:transition duration-300 bg-green-500 rounded-md"
                    onClick={formik.handleSubmit}
                    type="submit"
                  >
                    Submit
                  </button>
                  <h3 className="mb-5 text-center text-xl">
                     Don't want to add?
                    <span>
                      <button className="ml-2  text-green-600" onClick={clsModel}>Exit</button>
                    </span>
                  </h3>
                </form>
              </div>
            </FormikProvider>
          </div>
        </>
      )}
  
  <button
  onClick={opnModel}
  className="p-3 md:p-5 shadow-lg shadow-green-600 font-bold rounded-lg ml-auto mb-5 mr-5"
>
  ADD News
</button>

  
      <div className="flex flex-col justify-center items-center">
        {news.map((e, index) => (
          <div
            key={index}
            className="w-full md:w-96 shadow-lg rounded-lg border-4 overflow-hidden my-5 p-4 bg-white"
          >
            {/* Profile information */}
            {profileInfo.map((ele, profileIndex) => (
              <div key={profileIndex} className="flex items-center mb-3">
                <img
                  src={ele.picture}
                  alt="Profile"
                  className="rounded-full h-14 w-14 inline border-2 border-gray-200"
                />
                <div className="ml-3">
                  <h1 className="font-bold text-lg md:text-xl">{ele.name}</h1>
                  <h2 className="text-gray-500 text-xs md:text-sm">
                    {new Date(e.updatedAt).toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </h2>
                </div>
              </div>
            ))}
  
            {/* News content */}
            <h1 className="text-xl md:text-2xl font-bold mb-2">{e.newsTitle}</h1>
            <p className="text-gray-600 mb-4">{e.newsContent}</p>
  
            {/* News image */}
            <img className="w-full rounded mb-4" src={e.newsPicture} alt="not found" />
  
            {/* Interaction buttons */}
            <div className="flex justify-between items-center mt-4">
              <div>
              <button
            onClick={() => updateLikes(e.id)}
            className={`bg-blue-500 text-white rounded-full px-4 py-2 transition duration-300 hover:bg-blue-700 text-sm md:text-base `}
          >
            {e.isLiked?"Liked":"Likes" } {e.totalLikes}
          </button>
              </div>
              <div>
                <button
                  onClick={() => handleToggle(index)}
                  className="bg-gray-300 text-gray-700 transition duration-300 rounded-full px-4 py-2 hover:bg-gray-400 text-sm md:text-base"
                >
                  {`${e.newsComents.length} comments`}
                </button>
              </div> 
              <div>
                <button
                  className="bg-green-500 transition duration-300 text-white rounded-full px-4 py-2 hover:bg-green-700 text-sm md:text-base"
                >
                  Share
                </button>
              </div>
            </div>
  
            {/* Comments section */}
            {showCommentsIndex === index && (
              <div>
                {e.newsComents.map((items, commentIndex) => (
                  <div key={commentIndex} className="bg-gray-100 p-3 my-2 rounded-md">
                    <p className="text-gray-700">{items.comments}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
  
}

export default Membernews;

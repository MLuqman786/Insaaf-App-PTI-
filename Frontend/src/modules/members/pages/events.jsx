import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstnace from "../../../utils/Axios/Axiox";
import { FormikProvider, useFormik, Field, ErrorMessage } from "formik";
import { object, string, mixed } from "yup";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from 'yup';

const userSchema = object({
  eventTitle: string().min(8).max(50).required("Title is required feild "),
  eventDescription: string().min(8).max(100).required("Event Content is a required feild"),
  // eventDate: Yup.date ()
  // .required("Event Date is a required field")
  // .min(date),

  file: mixed()
    .required("Select file to add")
    .test("file size ", "to big", (value) => value && value.size < 2020 * 2020)
    .test(
      "file type",
      "invalid",
      (value) =>
        value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
    ),
});

function MemberEvents() {
  //formik =>>>>>>>>>>>>>>>
  const formik = useFormik({
    initialValues: {
      eventTitle: "",
      eventDate: "",
      eventDescription: "",
      file: "",
    },
    validationSchema: userSchema,

    onSubmit: (values) => uploadevents(values)
  
  });

  //>>>>>>>>>>>> Axios for Adding events<<<<<<<<<<<<<<<<<<<<

  const uploadevents = async (data) => {
    const formData = new FormData();
    formData.append("eventTitle", data.eventTitle);
    formData.append("eventDescription", data.eventDescription);
    formData.append("eventDate", eventDate);
    formData.append("file", data.file);

    try {
      const response = await AxiosInstnace.post("/events/events/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Make sure to set the content type
        },
      }); 
      if (response.status == 201 ||response.status == 201) {
        formik.resetForm();
        toast.success("Added succesfully");
        setOpenModel(false);
      }
      
    } catch (error) {
      toast.error("Unable to add events");

      console.log(error);
    }
  };

  const { id } = useParams();
  const [openModel, setOpenModel] = useState(false);
  const [events, setEvents] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const[eventDate,setEventDate]=useState("")
  
  // const [likeToggle,setLikeToggle]=useState(null)
  


  //>>>>>>>>>>>>>>>>> Axios for Fetching <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const ShowEvents = async () => {
    return await AxiosInstnace.get(`/members/${id}/event`);
  };

  const handleSubmits = async () => {
    try {
      const response = await ShowEvents()
      // console.log(response.data.events);
      setEvents(response.data.events);
      setProfileInfo([response.data]);
      
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  //=>>>>>>>>>> toggle <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  
  const opnModel = () => {
    setOpenModel(true);
  };
  const clsModel = () => { 
    setOpenModel(false);
  };
        
  useEffect(() => {
    handleSubmits();
  }, [id]);

 

  return (
    <>
      <ToastContainer />
      {/* Pop-up */}
      {openModel && (
        <>
          <div className="fixed z-50 inset-0 bg-black opacity-50"></div>
          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded">
            <FormikProvider value={formik} >
              <div className="mt-10 mb-16">
                <form className="flex flex-col w-96 px-5 rounded-2xl shadow-xl justify-center mx-auto">
                  <h1 className="text-center text-green-600 text-2xl mb-5 ">
                    Add Event
                  </h1>
  
                  <label htmlFor="eventTitle">Title</label>
                  <Field
                    className="mt-3 bg-transparent border-b-2"
                    placeholder="Enter title of event"
                    name="eventTitle"
                  />
                  <div className="h-4">
                    <ErrorMessage name="eventTitle">
                      {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                    </ErrorMessage>
                  </div>
  
                  <label className="mt-5" htmlFor="eventDescription">
                    Content
                  </label>
                  <Field
                    className="mt-3 bg-transparent border-b-2"
                    placeholder="Enter event Content"
                    name="eventDescription"
                  />
                  <div className="h-4">
                    <ErrorMessage name="eventDescription">
                      {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  
                  <label className="mt-5" htmlFor="eventDate">
                  Event Date
                  </label>
                  <input
                    type="date"
                    className="mt-3 bg-transparent border-b-2"
                    name="eventDate"
                    onChange={(e)=>setEventDate(e.target.value)}
                    id=""
                  />
                  <div className="h-4">
                    <ErrorMessage name="eventDate">
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
  className="p-3 md:p-5 shadow-lg hover:text-green-600 shadow-green-600 font-bold rounded-lg ml-auto mb-5 mr-5"
>
  ADD Events
</button>
<div className="flex flex-col items-center gap-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="max-w-md mx-auto mb-8 overflow-hidden rounded-lg shadow-lg bg-white"
        >
          {/* Event Image */}
          <img
            className="object-cover w-full h-48"
            src={event.eventPicture}
            alt="Event"
          />

          {/* Event Details */}
          <div className="p-4">
            {/* Profile Information */}
            {profileInfo.map((profile, profileIndex) => (
              <div key={profileIndex} className="flex items-center mb-2">
                <img
                  src={profile.picture}
                  alt="Profile"
                  className="w-8 h-8 mr-2 rounded-full"
                />
                <div>
                  <p className="font-bold text-sm">{profile.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(event.updatedAt).toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Event Title */}
            <h2 className="text-xl font-bold mb-2">{event.eventTitle}</h2>

            {/* Event Date */}
            <p className="text-sm text-gray-700 mb-4">
              <span className="font-bold mr-2">Event Date:</span>
              {new Date(event.eventDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>

            {/* Event Description */}
            <p className="text-gray-600  ">{event.eventDescription}</p>
          </div>
        </div >
      ))}
    </div>
  
    </>
  );
  
}

export default MemberEvents;

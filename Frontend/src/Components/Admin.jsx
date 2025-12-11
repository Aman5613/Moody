import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { FaUpload } from "react-icons/fa";
import { useState } from "react";
import { getSongs } from "../axiosConfig";

const Admin = ({close}) => {
  const [songLoading, setsongLoading] = useState(false);
  const [songdetails, setsongDetails] = useState({
    title: "",
    artist: "",
    emotion: "",
  });
  const [correctPassword, setcorrectPassword] = useState(false);
  const [addSongLoading, setaddSongLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setsongDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const inputSongHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("No file selected!");

    // Check MIME type → audio/*
    if (!file.type.startsWith("audio/")) {
      toast.error("Please upload a valid audio file!");
      return;
    }

    setsongLoading(true);

    const formData = new FormData();
    formData.append("audio", file);
    // console.log("Song Selected: ", file);
    await getSongs
      .post("/api/uploadsong", formData)
      .then((resp) => {
        // console.log("Song Uploaded: ", resp.data.mood);
        setsongDetails({
          emotion: resp.data.mood.emotion,
          title: resp.data.mood.title,
          artist: resp.data.mood.artist,
        });
        toast.success("Song Uploaded Successfully!");
        setsongLoading(false);
      })
      .catch((err) => {
        // console.log("Error in uploading song: ", err?.message);
        toast.error("Error in uploading song! " + (err?.message || ""));
        setsongLoading(false);
      });
  };

  const uploadSongHandler = async (e) => {
    e.preventDefault();
    setaddSongLoading(true);
    setsongDetails({
      ...songdetails,
      audio: e.target.audio.files[0],
    });

    const formData = new FormData();
    formData.append("audio", e.target.audio.files[0]);
    formData.append("title", songdetails.title);
    formData.append("artist", songdetails.artist);
    formData.append("mood", songdetails.emotion);

    await getSongs
      .post("/api/addsong", formData)
      .then((resp) => {
        if (resp.data.success) {
          toast.success("Song added successfully!");
          // console.log(resp.data);
          setaddSongLoading(false);
          e.target.reset();
          setsongDetails({
            title: "",
            artist: "",
            emotion: "",
          });
        } else {
          toast.error("Error in adding song! " + (resp.data.message || ""));
          // console.log("Error in adding song: ", resp.data);
        }
      })
      .catch((err) => {
        toast.error("Error in adding song! " + (err?.message || ""));
        // console.log("Error in adding song: ", err);
      });
  };

  const submitPasswordHandler = (e) => {
    e.preventDefault();
    if (e.target[0].value === "12345") {
      toast.success("Access Granted! Welcome to Admin Panel.");
        setcorrectPassword(true);
    } else {
      toast.error("Access Denied! Incorrect Password.");
    }
  };
  return (
    <section className="flex top-0 right-0 left-0 bottom-0 bg-gray-200 w-screen min-h-screen fixed justify-center px-2 py-1 ">
      <div className="w-full md:w-1/2 h-fit rounded-2xl bg-white px-4 py-3 flex flex-col justify-start items-center mt-20 gap-4">
        <ImCross onClick={close} className="text-black ml-auto cursor-pointer hover:scale-110 active:scale-95" />
        <h1 className="font-bold text-2xl underline tracking-tighter">
          Welcome to Admin Panel
        </h1>
        {!correctPassword ? (
          <form action="" onSubmit={submitPasswordHandler}>
            <div className="flex flex-col gap-3 items-center w-full">
              <label className="font-semibold text-lg">
                Enter the Password to access admin controls:
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 px-3 py-2 rounded-md focus:outline-teal-600"
                />
              </label>
              <button className="px-3 py-2 bg-teal-600 hover:bg-teal-700 cursor-pointer active:scale-95 font-semibold text-xl text-white rounded-md ">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <form action="" onSubmit={uploadSongHandler}>
            <div className="flex flex-col gap-2 items-center mt-10">
              <label htmlFor="inputsong">
                <div className="px-3 py-3 bg-gray-600 hover:bg-gray-700 cursor-pointer active:scale-95 font-semibold text-xl text-white rounded-md flex gap-2 items-center">
                  <FaUpload />{" "}
                  {songLoading ? "Uploading..." : "choose Song File"}
                </div>
              </label>
              <input
                type="file"
                id="inputsong"
                name="audio"
                className="hidden"
                required
                onChange={inputSongHandler}
              />
              <input
                type="text"
                name="title"
                placeholder="Enter song title"
                value={songdetails.title}
                onChange={handleInputChange}
                required
                className="w-full border-2 border-gray-300 px-3 py-2 rounded-md focus:outline-teal-600 mt-5"
              />
              <input
                type="text"
                name="artist"
                placeholder="Enter artist name"
                value={songdetails.artist}
                onChange={handleInputChange}
                className="w-full border-2 border-gray-300 px-3 py-2 rounded-md focus:outline-teal-600"
              />
              <select
                required
                name="emotion"
                className="w-full border-2 text-gray-600 border-gray-300 px-3 py-2 rounded-md focus:outline-teal-600"
                value={songdetails.emotion}
                onChange={handleInputChange}
                placeholder="Select Emotion"
              >
                {/* <option value="">Select Emotion</option> */}
                <option value="neutral">Neutral</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="angry">Angry</option>
                <option value="fearful">Fearful</option>
                <option value="disgusted">Disgusted</option>
                <option value="surprised">Surprised</option>
              </select>

              <button className="px-3 py-2 bg-teal-600 hover:bg-teal-700 cursor-pointer active:scale-95 font-semibold text-xl text-white rounded-md mt-10">
                {addSongLoading ? "Adding Song..." : "Add Song"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Admin;

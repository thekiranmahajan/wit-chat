import { useState } from "react";
import { logo } from "../assets";
import { FormField, Button } from "../components";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const uploadAvatar = async (avatar) => {
    console.log(avatar);
    if (!avatar) {
      toast.warn("Please select an avatar.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (avatar.type === "image/jpeg" || avatar.type === "image/png") {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("upload_preset", "image_preset");
      formData.append("cloud_name", "ray69wit");
      console.log(formData);

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/ray69wit/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { secure_url } = response.data;
        console.log("Image uploaded successfully:", secure_url);
        setAvatarURL(secure_url);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.warn("Please select an image file.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.warn("Please fill required fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords did not matched", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          avatarURL,
        },
        config
      );
      toast.success("User registration is successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
      navigate("/chat");
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-[url('./assets/background.svg')] bg-center bg-no-repeat bg-cover min-h-screen w-full text-white flex flex-col items-center ">
      <img
        className="h-24 w-24 rounded-2xl mt-10 sm:mt-8"
        src={logo}
        alt="logo"
      />
      <form
        onSubmit={handleFormSubmit}
        className="mt-10  bg-[#0C1C30] max-w-[500px] w-3/4 sm:w-2/3 p-5 flex flex-col rounded-2xl pb-4 font-Marvel select-none"
      >
        <div className="w-full flex items-center justify-around gap-1 mb-4 sm:mb-1">
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`font-extrabold text-2xl  text-center focus:bg-[#FA9845] focus:px-10 px-1 py-1 rounded-md transition-all duration-300 ${
              isLogin ? "" : "bg-[#FA9845] px-10"
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`font-extrabold text-2xl text-center focus:bg-[#FA9845] focus:px-10 px-1 py-1 rounded-md transition-all duration-300 ${
              isLogin ? "bg-[#FA9845] px-10" : ""
            }`}
          >
            Login
          </button>
        </div>
        {!isLogin && (
          <>
            <FormField
              label="Name"
              inputType="text"
              iconName={faUser}
              placeholder="Wit"
              id="name"
              isRequired={true}
              onChange={(e) => setName(e.target.value)}
            />
            <FormField
              label="Email"
              inputType="email"
              iconName={faEnvelope}
              placeholder="wit@example.com"
              id="email"
              isRequired={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative ">
              <FormField
                label="Create a Password"
                inputType={showPassword ? "text" : "password"}
                iconName={faLock}
                placeholder="Enter a strong password"
                id="password"
                isRequired={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                className="cursor-pointer absolute top-12 right-8"
                onClick={() => setShowPassword((prev) => !prev)}
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
            <div className="relative">
              <FormField
                label="Confirm Password"
                inputType={showConfirmPassword ? "text" : "password"}
                iconName={faLock}
                placeholder="Re-enter your password"
                id="confirmPassword"
                isRequired={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FontAwesomeIcon
                className="cursor-pointer absolute top-12 right-8"
                onClick={() => setConfirmShowPassword((prev) => !prev)}
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </div>
            <FormField
              label="Choose a Avatar"
              inputType="file"
              iconName={faUserAstronaut}
              id="avatar"
              isFileInput={true}
              onChange={(e) => uploadAvatar(e.target.files[0])}
            />
          </>
        )}
        {isLogin && (
          <>
            <FormField
              label="Email"
              inputType="email"
              iconName={faEnvelope}
              placeholder="wit@example.com"
              id="email"
              isRequired={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative ">
              <FormField
                label="Password"
                inputType={showPassword ? "text" : "password"}
                iconName={faLock}
                placeholder="Enter your password"
                id="password"
                isRequired={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                className="cursor-pointer absolute top-12 right-8"
                onClick={() => setShowPassword((prev) => !prev)}
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </>
        )}
        <div className="flex flex-col items-center w-full mt-8 gap-2">
          <Button
            type="submit"
            styles="bg-[#E9705A]"
            title={isLogin ? "Login" : "Sign-Up"}
            isLoading={isLoading}
          />
          {isLogin && (
            <Button
              type="button"
              styles="bg-[#623965]"
              title={"Use Guest Login"}
              isLoading={isLoading}
              onClick={() => {
                setEmail("guest@mail.com");
                setPassword("guest@12345");
              }}
            />
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
export default Home;

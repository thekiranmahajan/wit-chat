import { useEffect, useState, useRef } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [cloudName, setCloudName] = useState(null);
  const [uploadPreset, setUploadPreset] = useState(null);
  const fetchEnv = async () => {
    try {
      const { data } = await axios.get("/api/env");
      setUploadPreset(data.UPLOAD_PRESET);
      setCloudName(data.CLOUD_NAME);
    } catch (error) {
      console.error("There was a problem fetching the env:", error);
    }
  };

  useEffect(() => {
    fetchEnv();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chat");
  }, [navigate]);

  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.warn("Please select an avatar.", {
        theme: "dark",
      });
      return;
    }
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloudName);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { secure_url } = response.data;
        setAvatar(secure_url);
        toast.success("Avatar uploaded successfully!", {
          theme: "dark",
        });
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed. Please try again.", {
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.warn("Please select an image file.", {
        theme: "dark",
      });
      e.target.value = "";
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.warn("Please fill required fields", {
        theme: "dark",
      });
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords did not matched", {
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
          avatar,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
      toast.success("User registration is successful!", {
        theme: "dark",
      });
      navigate("/chat");
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        theme: "dark",
      });
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password) {
      toast.warn("Please fill required fields", {
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
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
      toast.success("User Logged In successful!", {
        theme: "dark",
      });
      navigate("/chat");
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
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
        onSubmit={!isLogin ? handleSignUp : handleLogin}
        className="mt-10  bg-[#0C1C30] max-w-[500px] w-11/12 sm:w-2/3 p-5 flex flex-col rounded-2xl pb-4 font-Marvel select-none"
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
              onChange={(e) => uploadAvatar(e)}
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
              value={email}
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
                value={password}
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
    </div>
  );
};
export default Home;

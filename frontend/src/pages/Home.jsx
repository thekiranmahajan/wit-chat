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
  const [cloudName, setCloudName] = useState(null);
  const [uploadPreset, setUploadPreset] = useState(null);
  const navigate = useNavigate();

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
      const userData = {
        name,
        email,
        password,
      };

      if (avatar.trim() !== "") userData.avatar = avatar;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user", userData, config);

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
    <div className="w-full h-full flex flex-col items-center ">
      <img
        className="h-24 w-24 rounded-2xl mt-5 sm:mt-8"
        src={logo}
        alt="logo"
      />
      <form
        onSubmit={!isLogin ? handleSignUp : handleLogin}
        className="mt-7 sm:mt-10  bg-[#0021332c] max-w-[500px] w-11/12 sm:w-2/3 p-5 flex flex-col rounded-2xl pb-4 font-Marvel select-none shadow-xl backdrop-blur-lg"
      >
        <div className="w-full flex items-center justify-around gap-2 mb-4 sm:mb-1">
          <Button
            type="button"
            title="Sign Up"
            onClick={() => setIsLogin(false)}
            styles={` text-2xl   focus:bg-[#00213333] focus:px-10 px-1 py-1 rounded-md transition-all duration-300  ${
              isLogin
                ? ""
                : "bg-[#00213333] px-10 shadow-slate-700 shadow-inner"
            }`}
          />
          <Button
            type="button"
            title="Login"
            onClick={() => setIsLogin(true)}
            styles={` text-2xl  focus:bg-[#00213333] focus:px-10 px-1 py-1 rounded-md transition-all duration-300 ${
              isLogin
                ? "bg-[#00213333] px-10 shadow-slate-700 shadow-inner"
                : ""
            }`}
          />
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
            styles="bg-[#4A8B65]"
            title={isLogin ? "Login" : "Sign-Up"}
            isLoading={isLoading}
          />
          {isLogin && (
            <Button
              type="button"
              styles="bg-[#B8B86A]"
              title={"Use Guest Login"}
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

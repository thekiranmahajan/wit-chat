import { useState } from "react";
import { logo } from "../assets";
import { FormField } from "../components";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  return (
    <div className="bg-[url('./assets/background.svg')] bg-center bg-no-repeat bg-cover min-h-screen w-full text-white flex flex-col items-center ">
      <img className="h-24 w-24 rounded-2xl mt-8" src={logo} alt="logo" />
      <form className="mt-10 bg-[#0C1C30] max-w-[500px] w-3/4 sm:w-2/3 p-5 flex flex-col rounded-2xl pb-4 font-Marvel select-none">
        <h2 className="font-extrabold text-2xl mb-1 text-center">Sign Up</h2>
        <FormField
          label="Name"
          inputType="text"
          iconName={faUser}
          placeholder="Wit"
          id="name"
          isRequired={true}
        />
        <FormField
          label="Email"
          inputType="email"
          iconName={faEnvelope}
          placeholder="wit@example.com"
          id="email"
          isRequired={true}
        />
        <div className="relative ">
          <FormField
            label="Create a Password"
            inputType={showPassword ? "text" : "password"}
            iconName={faLock}
            placeholder="Enter a strong password"
            id="password"
            isRequired={true}
          />
          <FontAwesomeIcon
            className="cursor-pointer absolute top-12 right-8"
            onClick={() => setShowPassword((prev) => !prev)}
            icon={showPassword ? faEyeSlash : faEye}
          />
        </div>
        <div className="relative ">
          <FormField
            label="Confirm Password"
            inputType={showConfirmPassword ? "text" : "password"}
            iconName={faLock}
            placeholder="Re-enter your password"
            id="confirmPassword"
            isRequired={true}
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
        />
        <div className="flex flex-col items-center w-full mt-5 gap-2">
          <input
            type="submit"
            value="Sign-Up"
            className="h-10 bg-[#E9705A] w-3/5 rounded-lg font-extrabold text-lg"
          />
          <input
            type="submit"
            value="Sign-Up as Guest"
            className="h-10 w-3/5 bg-[#96446E] rounded-lg font-extrabold text-lg"
          />
        </div>
      </form>
    </div>
  );
};
export default Home;

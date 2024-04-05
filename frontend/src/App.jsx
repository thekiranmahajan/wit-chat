import React from "react";
import { Outlet } from "react-router-dom";
import { ChatProvider } from "./context/ChatProvider";

const App = () => {
  return (
    <ChatProvider>
      <div className="bg-[url('./assets/bgVertical.svg')] sm:bg-[url('./assets/bgHorizontal.svg')] bg-center bg-no-repeat bg-cover min-h-screen w-full text-white flex justify-center">
        <Outlet />
      </div>
    </ChatProvider>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Chat, Home } from "./pages";
import { ChatProvider } from "./context/ChatProvider";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "chat", element: <Chat /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <RouterProvider router={router} />
  </ChatProvider>
);

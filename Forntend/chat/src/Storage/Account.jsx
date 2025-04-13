import { useNavigate } from "react-router";
import API_BASE_URL from "../config";
import { useContext } from "react";
import { AllStorage } from "./StorageProvider";
import { io } from "socket.io-client";
import { SocketContext } from "./Sockets";

export const createUser = async (data) => {
  console.log("Sending user data:", data);
  const { user_name, user_email, user_ph_no, user_password } = data;
  if (!user_name || !user_email || !user_ph_no || !user_password) {
    console.log("All fields are required");
    return { error: "All fields are required" };
  }
  try {
    const response = await fetch(`${API_BASE_URL}create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();  // <-- Convert response to JSON
    if (!response.ok) {
      console.error("Error response from server:", responseData);
      return { error: responseData.error || "Something went wrong" };
    }
    console.log("User created successfully:", responseData);

    return responseData;
  } catch (error) {
    console.error("Network or server error:", error);
    return { error: "Failed to connect to the server" };
  }
};

export const loginUser = async (data) => {
  const { user_email, user_password } = data;
  if (!user_email || !user_password) {
    console.log("All fields are required");
    return { error: "All fields are required" };
  }
  try {
    const response = await fetch(`${API_BASE_URL}loginUser/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error("Error response from server:", responseData);
      return { error: responseData.error || "Something went wrong" };
    }
    return responseData;
  } catch (error) {
    console.error("Network or server error:", error);
    return { error: "Failed to connect to the server" };
  }
}

export function LogOut() {
  const { userData, setuserData, chatSidebarOptions,setallContectS } = useContext(AllStorage);
  const { setmessages } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      const response = await fetch(API_BASE_URL + "logOutUser/", {
        method: "POST",
        credentials: "include",
      })
      const responseData = await response.json();
      if (!response.ok) {
        console.error("Error response from server:", responseData);
        return { error: responseData.error || "Something went wrong" };
      }
      console.log("resp--------------------");
      console.log(response);
      console.log("resp--------------------!");

      localStorage.clear();
      setuserData(null);
      setallContectS(null);
      setmessages(null);
      navigate("/Login"); // Redirect after logout
    } catch (error) {
      console.error("Network or server error:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="w-full h-full cursor-pointer">
      Logout
    </button>
  );
}

export const addContect = async (data) => {
  const { ContactEmail, ContactName, phoneNumber } = data;
  console.log(`${ContactEmail} --- ${ContactName} --- ${phoneNumber}`);
  if (!ContactName || !phoneNumber) {
    return { error: "All fields are required" };
  }
  try {
    const response = await fetch(API_BASE_URL + "addContect/", {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error("Error response from server:", responseData);
      return { error: responseData.error || "Something went wrong" };
    }
    return responseData;
  } catch (error) {
    console.error("Error fetching addContect:", error);
    return { error: "Failed to connect to the server" };
  }
}

export const getAllContect = async (data) => {
  try {
    const response = await fetch(API_BASE_URL + "getAllContect/", {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const responseData = await response.json();
    if (!response.ok) {
      console.error("Error response from server:", responseData);
      return { error: responseData.error || "Something went wrong" };
    }
    return responseData
  } catch (error) {
    console.log("error is ->", error);
    return { message: "somthing Woring" }
  }
}

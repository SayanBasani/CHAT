import API_BASE_URL from "../config";

export const getContactData = async (data) => {
  if (data) {
    const response = await fetch(`${API_BASE_URL}getUserData/`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const responseData = await response.json();
    return responseData;
  } else {
    return { error: "Invalid Request", message: "Invalid Request" }
  }

};

export const getAllMessagesBW_S_R = async(data) => {
  try {
    if (!data) {
      return { message: "No data" }
    }
    const response = await fetch(`${API_BASE_URL}chats/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const responseData = await response.json();
    // console.log(response);
    if(!response.ok){return {message:"Somthing Wrong!"}}
    return responseData;
  } catch (error) {
    return error;
  }
};

export const checkIsUserValid = async (data) =>{
  console.log("checkIsUserValed------>");
  try {
    const response = await fetch(`${API_BASE_URL}CheckLogin/`,{
      method:"POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
    return "";
  } catch (error) {
    return {isValid : false};
  }
}
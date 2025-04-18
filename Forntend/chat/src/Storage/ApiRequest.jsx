import API_BASE_URL from "../config";

export const getContactData = async (data) => {
  if (data) {
    const response = await fetch(`${API_BASE_URL}getContactData/`, {
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
  // console.log("checkIsUserValed------>");
  try {
    const response = await fetch(`${API_BASE_URL}CheckLogin/`,{
      method:"POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    // console.log(responseData);
    return "";
  } catch (error) {
    return {isValid : false};
  }
}

export const getMessagesF = async(data,lastMessageId=90 ) => {
  // console.log("get limited message ---------------------");
  // console.log(data.phoneNumber , data.lastMessageId);
  try {
    if (!data) {
      return { message: "No data" }
    }
    data.limit = 11;
    const response = await fetch(`${API_BASE_URL}chats/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      // param: {lastMessageId },
    })
    const responseData = await response.json();
    // console.log(response);
    if(!response.ok){return {message:"Somthing Wrong!"}}
    // console.log(responseData);
    
    // console.log("get limited message ---------------------!");
    return responseData;
  } catch (error) {
    return error;
  }
};

export const getUserData = async (data) =>{
  // console.log("get user data -->",data);
  try {
    const response = await fetch(`${API_BASE_URL}getUserData/`,{
      method:"POST",
      credentials: "include",
      body:JSON.stringify(data)
    })
    if (!response.ok) {
      // Handle HTTP errors
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return { error: true, message: "Failed to fetch user data" };
    }
    // console.log("get user data -->");
    const responseData = await response.json();
    // console.log(response);
    // console.log(responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export const updateUserData = async(data) => {
  try {
    console.log("/changeUserData/--------->",data);
    const response = await fetch(`${API_BASE_URL}updateUserData/`,{
      method:"PUT",
      credentials:"include",
      headers:{"Content-Type": "application/json",},
      body:JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log("responseData --->" ,responseData);
    console.log("/changeUserData/--------->!");
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export const deleteUserContect = async(data) => {
  try {
    console.log("/changeUserData/--------->",data);
    const response = await fetch(`${API_BASE_URL}deleteContect/`,{
      method:"DELETE",
      credentials:"include",
      headers:{"Content-Type": "application/json",},
      body:JSON.stringify(data),
    });
    const responseData = await response.json();
    // console.log("responseData --->" ,responseData);
    return responseData
    // console.log("/changeUserData/--------->!");
  } catch (error) {
    console.error(error);
    return 0;
  }
}

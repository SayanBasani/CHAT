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

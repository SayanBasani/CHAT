import API_BASE_URL from "../config";

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
          headers: {"Content-Type": "application/json"},
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

export const loginUser = async (data)=>{
  const { user_email, user_password } = data;
  if (!user_email || !user_password) {
    console.log("All fields are required");
    return { error: "All fields are required" };
  }
  try {
    const response = await fetch(`${API_BASE_URL}loginUser/`,{
      method : "POST",
      headers:{"Content-Type": "application/json"},
      body : JSON.stringify(data),
    });
    const responseData = await response.json();    
    if(!response.ok){
      console.error("Error response from server:", responseData);
      return { error: responseData.error || "Something went wrong" };
    }
    return responseData;
  } catch (error) {
    console.error("Network or server error:", error);
    return { error: "Failed to connect to the server"};
  }
}
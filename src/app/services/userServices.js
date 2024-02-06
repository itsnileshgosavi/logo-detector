
import { httpAxios } from "@/app/helper/httpHelper";

export async function logout() {
  try {
    const result = await httpAxios.post("/api/logout");
    console.log(result.data); // Logging the response data
    return result.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

export async function currentUser() {
  try {
    const result = await httpAxios.get("/api/current-user");
    console.log(result.data); // Logging the response data
    return result.data;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}
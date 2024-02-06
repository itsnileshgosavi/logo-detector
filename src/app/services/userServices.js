
import { httpAxios } from "@/app/helper/httpHelper";

export async function logout() {
    const result = await httpAxios
      .post("/api/logout")
      .then((response) => response.data);
    return result;
  };
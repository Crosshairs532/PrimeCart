import { AxiosInstance } from "@/app/lib/Axios/axios";

const Registration = async (registrationData: any) => {
  // console.log(registrationData, "clicked server ");
  const res = await AxiosInstance.post("/user/registration", registrationData);
  // console.log(res);
  return res.data;
};
const Login = async (loginData: any) => {
  console.log(loginData, "clicked server ");
  const res = await AxiosInstance.post("/auth/login", loginData);
  console.log(res);
  return res.data;
};
export const authService = {
  Registration,
  Login,
};

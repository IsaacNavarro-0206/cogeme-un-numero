import axios from "axios";

type LoginTypes = {
  correoElectronico: string;
  contraseña: string;
};

type SignupTypes = {
  nombre: string;
  telefono: string;
} & LoginTypes;

export function Login(data: LoginTypes) {
  return axios({
    method: "POST",
    url: "/auth/login",
    baseURL: import.meta.env.VITE_API_URL_LOCAL,
    validateStatus: null,
    data,
  });
}

export function Signup(data: SignupTypes) {
  return axios({
    method: "POST",
    url: "/user",
    baseURL: import.meta.env.VITE_API_URL_LOCAL,
    validateStatus: null,
    data,
  });
}

export function RefreshToken(refreshToken: string | null) {
  return axios({
    method: "POST",
    url: "/auth/refresh",
    baseURL: import.meta.env.VITE_API_URL_LOCAL,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
}

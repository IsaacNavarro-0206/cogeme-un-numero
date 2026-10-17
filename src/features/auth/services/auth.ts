import { axiosInstance } from "@/config/axiosConfig";

type LoginTypes = {
  correoElectronico: string;
  contraseña: string;
};

type SignupTypes = {
  nombre: string;
  telefono: string;
} & LoginTypes;

export function Login(data: LoginTypes) {
  return axiosInstance.post("/auth/login", data, {
    _skipAuth: true,
  });
}

export function Signup(data: SignupTypes) {
  return axiosInstance.post("/user", data, {
    _skipAuth: true,
  });
}

export function RefreshToken(refreshToken: string | null) {
  return axiosInstance.post(
    "/auth/refresh",
    {},
    {
      _skipAuth: true,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
}

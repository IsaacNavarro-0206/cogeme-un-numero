export type LoginTypes = {
  correoElectronico: string;
  contraseña: string;
};

export type SignupTypes = {
  nombre: string;
  telefono: string;
} & LoginTypes;

type LocalUser = SignupTypes;

const USERS_KEY = "cogeme_local_users";

const getUsers = (): LocalUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as LocalUser[];
  } catch {
    return [];
  }
};

const createToken = (email: string) =>
  `local-${btoa(`${email}:${Date.now()}`)}`;

export async function Login(data: LoginTypes) {
  const user = getUsers().find(
    (candidate) =>
      candidate.correoElectronico.toLowerCase() ===
        data.correoElectronico.toLowerCase() &&
      candidate.contraseña === data.contraseña,
  );

  if (!user) {
    return {
      status: 401,
      data: { message: "Correo o contraseña incorrectos" },
    };
  }

  return {
    status: 201,
    data: {
      access_token: createToken(user.correoElectronico),
      refresh_token: createToken(`${user.correoElectronico}:refresh`),
    },
  };
}

export async function Signup(data: SignupTypes) {
  const users = getUsers();
  const exists = users.some(
    (user) =>
      user.correoElectronico.toLowerCase() ===
      data.correoElectronico.toLowerCase(),
  );

  if (exists) {
    return { status: 409, data: { message: "Este correo ya está registrado" } };
  }

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, data]));
  return { status: 201, data: { message: "Cuenta creada" } };
}

export async function RefreshToken(refreshToken: string | null) {
  return {
    status: refreshToken ? 201 : 401,
    data: { access_token: refreshToken ? createToken(refreshToken) : null },
  };
}


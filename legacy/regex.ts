export const regex = {
  fullName: /^([A-Za-z\s])+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/,
  email: /^[A-Za-z0-9-_.]+([^-_.])@[a-zA-Z]+(\.[a-zA-Z]+)+$/,
};

let navigator: (path: string) => void;

export const setNavigator = (navigatorFn: (path: string) => void) => {
  navigator = navigatorFn;
};

export const navigate = (path: string) => {
  if (navigator) {
    navigator(path);
  }
};

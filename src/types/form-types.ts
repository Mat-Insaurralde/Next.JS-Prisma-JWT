export type FormRegisterState = {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string | null;
  };



  
  export type FormLoginState = {
    errors?: {
      email?: string[];
      password?: string[];
    };
    message?: string | null;
  };
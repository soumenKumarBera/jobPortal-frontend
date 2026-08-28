const SignupValidation = (data: string, value: string) => {
  switch (data) {
    case "name":
      if (value.length == 0) {
        return "Name is required";
      } else {
        return "";
      }

    case "email":
      if (value.length == 0) {
        return "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return "Invalid email address";
      } else {
        return "";
      }

    case "password":
      if (value.length == 0) {
        return "Password is required";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
          value,
        )
      ) {
        return "Password must contain uppercase, lowercase, number, special character and be 8-15 characters long";
      } else {
        return "";
      }

    default:
      return "";
  }
};

const LoginValidation = (data: string, value: string) => {
  switch (data) {
    case "email":
      if (value.length == 0) {
        return "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return "Invalid email address";
      } else {
        return "";
      }
    case "password":
      if (value.length == 0) {
        return "Password is required";
      } else {
        return "";
      }

    default:
      return "";
  }
};

export { SignupValidation, LoginValidation };

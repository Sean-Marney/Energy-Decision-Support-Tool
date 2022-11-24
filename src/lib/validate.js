export default function loginValidate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5 || values.password.length > 20) {
    errors.password =
      "Password must be greater than 5 characters and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }

  return errors;
}

export function registerUserValidate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5 || values.password.length > 20) {
    errors.password =
      "Password must be greater than 5 characters and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }

  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Passwords do not match";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid confirm password";
  }

  if (!values.role) {
    errors.role = "Required";
  }

  return errors;
}

export function registerOrgValidate(values) {
  const errors = {};

  if (!values.orgName) {
    errors.orgName = "Required";
  }

  return errors;
}

export function registerEnergyDataValidate(values) {
  const errors = {};

  // if (!values.file) {
  //   errors.email = "Required";
  // } else{
  //   // errors.email = "Invalid email address";
  //   alert(values.file.value);
  // }
  if (!values.site) {
    errors.email = "Required to select a site";
  } else if (values.site = "Select A Site") {
    errors.email = "Invalid site";
  }
  return errors;
}
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

export function createOptimisationValidate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Required";
  }

  if (!values.body) {
    errors.body = "Required";
  }

  if (!values.priority) {
    errors.priority = "Required";
  }

  if (!values.archived) {
    errors.archived = "Required";
  }

  return errors;
}

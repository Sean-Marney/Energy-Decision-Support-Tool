import signup from "../pages/api/auth/signup-user";

test("test", () => {
  const req = {
    method: "POST",
    body: {
      email: "test@email.com",
      password: "12345",
      role: "manager",
      organisation: "Test Organisation",
    },
  };

  const json = jest.fn();
  const status = jest.fn(() => {
    return {
      json,
    };
  });

  const res = {
    status,
  };

  signup(req, res);
  console.log(json.mock);
});

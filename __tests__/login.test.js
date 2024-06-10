const { login } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../utils/db");
const { jwtSecret } = require("../config");

describe("login", () => {
  it("should return 401 and Username Or password is Invalid when Password is wrong", async () => {
    db.execute = jest.fn().mockResolvedValueOnce([
      [
        {
          id: 1,
          username: "testuser",
          password: "$2b$10$3t6g4",
          role: "customer",
        },
      ],
    ]);

    //Mocking bcrypt compare
    bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

    const req = {
      body: {
        username: "testuser",
        password: "wrongpassword",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid Username or Password",
    });
  });
});

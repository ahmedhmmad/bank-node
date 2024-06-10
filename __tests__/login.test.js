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

//should return 200 if matched password and user found
  it("should return 200 and accessToken, redirect, userId when Password is correct", async () => {
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
    bcrypt.compare = jest.fn().mockResolvedValueOnce(true);

    //Mocking jwt sign
    jwt.sign = jest.fn().mockReturnValueOnce("token");

    const req = {
      body: {
        username: "testuser",
        password: "password",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      accessToken: "token",
      redirect: "/dashboard",
      userId: 1
    });
  });

  it('should return Database Error when database error occurs', async () => {
    db.execute=jest.fn().mockResolvedValueOnce(new Error('Database Error'));
    const req = {
      body: {
        username: "testuser",
        password: "password",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({message: 'Internal Server Error'});
  },);
});

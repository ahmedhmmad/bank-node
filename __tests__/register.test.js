const db = require("../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { register } = require("../controllers/authController");

describe("Register", () => {
  it("should return 400 if username, password or role is missing", async () => {
    const req = {
      body: {},
      headers: {},
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Username, password and role are required",
    });
  });

  it("should return 201 if user is saved successfully", async () => {
    const authorization = "Bearer faketoken";
    const req = {
      headers: {
        authorization,
      },
      body: {
        username: "test",
        password: "test",
        role: "customer",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    jwt.verify = jest.fn(() => ({ role: "admin" }));

    const mockConnection = {
      release: jest.fn(),
    };

    db.getConnection = jest.fn().mockResolvedValue(mockConnection);
    const saveUser = jest.fn().mockResolvedValue();

    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
    expect(mockConnection.release).toHaveBeenCalled();
  });
});
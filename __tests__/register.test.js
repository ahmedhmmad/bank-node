const db = require("../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { register, saveUser } = require("../controllers/authController");

jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../utils/db");
jest.mock("../controllers/authController", () => ({
  saveUser: jest.fn(),
  register: jest.requireActual("../controllers/authController").register,
}));

describe("Register", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        password: "testpassword",
        role: "customer",
      },
      headers: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a customer without authorization header", async () => {
    bcrypt.hash.mockResolvedValue("hashedPassword");
    saveUser.mockResolvedValue();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });

  it("should return 403 if role is not customer, and no authorization header", async () => {
    req.body.role = "admin";
    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Only customers can be registered without authorization",
    });
  });
  it("should return 401 if JWT token is invalid", async () => {
    req.headers.authorization = "Bearer invalidToken";
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid JWT token" });
  });

  it("should register an admin user with valid token", async () => {
    req.headers.authorization = "Bearer validToken";
    req.body.role = "admin";

    jwt.verify.mockReturnValue({ role: "admin" });
    bcrypt.hash.mockResolvedValue("hashedPassword");
    saveUser.mockResolvedValue();

    await register(req, res);
    expect(jwt.verify).toHaveBeenCalledWith("validToken", jwtSecret);

    saveUser.mockResolvedValue();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });
});

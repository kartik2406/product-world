const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

describe("Test /users API", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Positive cases
  it("Should allow a new user to register", async (done) => {
    const res = await request.post("/api/users/register").send({
      username: "Test user",
      password: "welcome",
    });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBeDefined();
    done();
  });

  it("Should allow user to login", async (done) => {
    const res = await request.post("/api/users/login").send({
      username: "Test user",
      password: "welcome",
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    done();
  });

  it("Should verify that token does not leak any sensitive data, eg: Password", async (done) => {
    const res = await request.post("/api/users/login").send({
      username: "Test user",
      password: "welcome",
    });
    let token = res.body.token;
    let tokenKeys = Object.keys(jwt.decode(token));

    expect(res.status).toBe(200);
    expect(token).toBeDefined();
    expect(tokenKeys.length).toBe(4);
    expect(tokenKeys).toContain("id");
    expect(tokenKeys).toContain("username");
    expect(tokenKeys).toContain("role");
    expect(tokenKeys).not.toContain("password");
    done();
  });

  // Error cases
  it("Should return an error if username already exists for register call", async (done) => {
    const res = await request.post("/api/users/register").send({
      username: "Test user",
      password: "welcome",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    done();
  });
  it("Should return an error if username does not exist when trying to log in", async (done) => {
    const res = await request.post("/api/users/login").send({
      username: "Invalid user",
      password: "welcome",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    done();
  });
  it("Should return an error if password is invalid when trying to log in", async (done) => {
    const res = await request.post("/api/users/login").send({
      username: "Test user",
      password: "wrongpass",
    });
    console.log("res", res.body);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    done();
  });
});

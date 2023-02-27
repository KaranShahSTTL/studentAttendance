const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/testingggg");
});

// // /* Dropping the database and closing connection after each test. */
afterEach(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Student Test case", () => {

  it("Check IN Out ", async () => {
    const res = await request(app).get("/student/checkInOut/63edf5c63fc34460ceefe1c5");
   console.log('res.body inout', res.body)
    expect(res.statusCode).toBe(200);
  });

  it("register student ", async () => {
    //test case for register student
    const res = await request(app).post("/student/register").send(
      {
        "Name": "test Bhai",
        "Email": "test132@gmail.com",
        "Gender": "Male",
        "DOB": "1999-11-25",
        "password": "Admin@123"
      }
    );
    console.log('res.body', res.body)
    expect(res.statusCode).toBe(200);
    



    });
  });
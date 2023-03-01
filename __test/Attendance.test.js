const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/attendanceTestCase");
});

// // /* Dropping the database and closing connection after each test. */
afterAll (async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Student Test case", () => {

  describe("Check IN Out", () => {
    it("Check IN Out ", async () => {
      const response = await request(app).get("/student/checkInOut/63edf5c63fc34460ceefe1c5");
      expect(response.statusCode).toBe(200);
    });
  });


  describe("register student", () => {
    it("register student ", async () => {
      //test case for register student
      const response = await request(app).post("/student/register").send(
        {
          "Name": "test Bhai",
          "Email": "test@gmail.com",
          "Gender": "Male",
          "DOB": "1999-11-25",
          "password": "Admin@123"
        }
      );
      expect(response.body["code"]).toBe("200");
    });

    it("register student with same email", async () => {
      const response = await request(app).post("/student/register").send(
        {
          "Name": "test Bhai",
          "Email": "test@gmail.com",
          "Gender": "Male",
          "DOB": "1999-11-25",
          "password": "Admin@123"
        }
      );
      expect(response.body["code"]).toBe("500");
      expect(response.body["flag"]).toBe(false);
      expect(response.body["message"]).toEqual('Student already registered');
    })

    //test case for register student without email

    it("register student without email", async () => {
      const response = await request(app).post("/student/register").send(
        {
          "Name": "test Bhai",
          "Gender": "Male",
          "DOB": "1999-11-25",
          "password": "Admin@123"
        }
      );
      expect(response.body["code"]).toBe("500");
      expect(response.body["flag"]).toBe(false);
      expect(response.body["data"]["errors"]["Email"]["message"]).toEqual('Path `Email` is required.');
    })


  });


  describe('POST /sign-in', () => {
    it('should return a JWT token when the correct email and password are provided', async () => {
      const response = await request(app)
        .post('/student/sign_in')
        .send({ Email: 'test@gmail.com', Password: 'Admin@123' });
      expect(response.statusCode).toBe(200);
      expect(response.body["data"][0]).toHaveProperty('Token');
    });

    it('should return a 500 error when an incorrect Password is provided', async () => {
      const response = await request(app)
        .post('/student/sign_in')
        .send({ Email: 'test@gmail.com', Password: 'Adminn@1234' });
      expect(response.body["code"]).toBe("500");
      expect(response.body["message"]).toEqual('Authentication failed. Invalid user or password.');
    });

    it('should return a 500 error when an incorrect Email is provided', async () => {
      const response = await request(app)
        .post('/student/sign_in')
        .send({ Email: 'test123@gmail.com', Password: 'Admin@123' });

      expect(response.body["code"]).toBe("500");
      expect(response.body["message"]).toEqual('Authentication failed. Invalid user or password.');
    });
  });

  describe("leaveApplication", () => {
    it("leaveApplication ", async () => {
      const response = await request(app).post("/student/leaveApplication").send(
        {
          "studentId": "63edf9c867f386077a512a2a",
          "leaveType": "Leave",
          "leaveFrom": "2023-02-17",
          "leaveTo": "2023-02-19",
          "reason": "holiday"
      }
      );
      expect(response.body["code"]).toBe("200");
      expect(response.body["flag"]).toBe(true);
    });

    it("leaveApplication without studentId", async () => {
      const response = await request(app).post("/student/leaveApplication").send(
        {
          "leaveType": "Leave",
          "leaveFrom": "2023-02-17",
          "leaveTo": "2023-02-19",
          "reason": "holiday"
      }
      );
      expect(response.body["code"]).toBe("500");
      expect(response.body["flag"]).toBe(false);
    } );

  });

});
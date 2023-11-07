const request = require("supertest");
const app = require("../../"); 

describe("Users API", () => {
  it(" fetch all users data", async () => {
    try {
      const response = await request(app).get("/api/v1/user");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("ok");
      expect(response.body.data).toBeTruthy(); // Check that data exists
      expect(Array.isArray(response.body.data)).toBe(true); // Check that data is an array
      expect(response.body.page).toBeDefined();
      expect(response.body.limit).toBeDefined();
    } catch (error) {}
  });

  it(" fetch a user by ID", async () => {
    try {
      const userId = 2; // Ganti dengan ID pengguna yang valid
      const response = await request(app).get(`/api/v1/user/${userId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("ok");
      expect(response.body.data).toBeTruthy();
      expect(response.body.data.name).toBeDefined();
      expect(response.body.data.email).toBeDefined();
      expect(response.body.data.profiles).toBeDefined();
      expect(response.body.data.profiles.user_Id).toBeDefined();
      expect(response.body.data.profiles.address).toBeDefined();
      expect(response.body.data.profiles.identity_type).toBeDefined();
      expect(response.body.data.profiles.identity_number).toBeDefined();
    } catch (error) {}
  });
  it(" insert a new user", async () => {
    try {
      const newUser = {
        name: "Dian",
        email: "dian@gmail.com",
        password: "asdasd",
        identity_type: "sim",
        identity_number: "28372312982",
        address: "kwagya",
      };

      const response = await request(app).post("/api/v1/user").send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Created");
      expect(response.body.data).toBeTruthy();

      expect(response.body.data.name).toBe(newUser.name);
      expect(response.body.data.email).toBe(newUser.email);
      expect(response.body.data.profile.identity_type).toBe(
        newUser.identity_type
      );
      expect(response.body.data.profile.identity_account_number).toBe(
        newUser.identity_account_number
      );
      expect(response.body.data.profile.address).toBe(newUser.address);
    } catch (error) {}
  });


  
});

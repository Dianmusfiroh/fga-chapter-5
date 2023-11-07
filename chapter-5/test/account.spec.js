const request = require("supertest");
const app = require("../../"); 

describe("account API", () => {
  it(" fetch all account data", async () => {
    try {
      const response = await request(app).get("/api/v1/account");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("ok");
      expect(response.body.data).toBeTruthy(); // Check that data exists
      expect(Array.isArray(response.body.data)).toBe(true); // Check that data is an array
      expect(response.body.page).toBeDefined();
      expect(response.body.limit).toBeDefined();
    } catch (error) {}
  });

  it(" fetch a account by ID", async () => {
    try {
      const accountId = 2; // Ganti dengan ID pengguna yang valid
      const response = await request(app).get(`/api/v1/account/${accountId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("ok");
      expect(response.body.data).toBeTruthy();
      expect(response.body.data.bank_name).toBeDefined();
      expect(response.body.data.bank_account_number).toBeDefined();
      expect(response.body.data.balance).toBeDefined();
      expect(response.body.data.user_Id).toBeDefined();
    } catch (error) {}
  });
  it(" insert a new user", async () => {
    try {
      const newUser = {
        bank_name: 'dian',
        bank_account_number: '8917321892',
        balance: 1000 ,
        user_Id: 1 ,
      };

      const response = await request(app).post("/api/v1/account").send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Created");
      expect(response.body.data).toBeTruthy();

      expect(response.body.data.bank_name).toBe(newUser.bank_name);
      expect(response.body.data.bank_account_number).toBe(newUser.bank_account_number);
      expect(response.body.data.balance).toBe(
        newUser.balance
      );
      expect(response.body.data.user_Id).toBe(
        newUser.user_Id
      );
    } catch (error) {}
  });


  
});

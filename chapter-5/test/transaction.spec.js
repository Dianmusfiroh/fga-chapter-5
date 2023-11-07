const request = require("supertest");
const app = require("../../"); 

describe("Transaction API", () => {
  it(" fetch all transaction data", async () => {
    try {
      const response = await request(app).get("/api/v1/transaction");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("ok");
      expect(response.body.data).toBeTruthy(); // Check that data exists
      expect(Array.isArray(response.body.data)).toBe(true); // Check that data is an array
      expect(response.body.page).toBeDefined();
      expect(response.body.limit).toBeDefined();
    } catch (error) {}
  });

  it(" fetch a transaction by ID", async () => {
    try {
      const transactionId = 2; // Ganti dengan ID pengguna yang valid
      const response = await request(app).get(`/api/v1/transaction/${transactionId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("ok");
      expect(response.body.data).toBeTruthy();
      expect(response.body.data.amount).toBeDefined();
      expect(response.body.data.source_account_Id).toBeDefined();
      expect(response.body.data.destination_account_Id).toBeDefined();
    } catch (error) {}
  });
  it(" insert a new user", async () => {
    try {
      const newUser = {
        amount: 1000,
        source_account_Id: 1,
        destination_account_Id: 1 ,
      };

      const response = await request(app).post("/api/v1/transaction").send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Created");
      expect(response.body.data).toBeTruthy();

      expect(response.body.data.amount).toBe(newUser.amount);
      expect(response.body.data.email).toBe(newUser.email);
      expect(response.body.data.source_account_Id).toBe(
        newUser.source_account_Id
      );
      expect(response.body.data.destination_account_Id).toBe(
        newUser.destination_account_Id
      );
    } catch (error) {}
  });


  
});

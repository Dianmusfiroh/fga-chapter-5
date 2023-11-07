const express = require("express");
const router = express.Router();
const {
  GetUser,
  GetByPK,
  TestUser,
  TestUserPost,
} = require("../controller/user.controller");
const {
  PrintSuccess,
  PrintSuccessRoute,
  CheckPostReq,
} = require("../middleware/middleware");

router.use(PrintSuccess);
/**
 * @swagger
 * /api/v1/user:
 *  get:
 *      tags : 
 *      - "user"
 *      summary: Get all user
 *      responses:
 *          200:
 *              description: Seccesfull response
 */
router.get("/", GetUser);
/**
 * @swagger
 * /API/v1/user/{id}:
 *   get:
 *     tags : 
 *      - "user"
 *     summary: Example to get user user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: internal server error
 */
router.get("/:id", GetByPK);

     
/**
 * @swagger
 * /API/v1/user:
 *   post:
 *     tags:
 *       - user
 *     summary: Create a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               identity_type:
 *                 type: string
 *               identity_number:
 *                 type: integer
 *               address:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.post("/", CheckPostReq, TestUserPost);

module.exports = router;

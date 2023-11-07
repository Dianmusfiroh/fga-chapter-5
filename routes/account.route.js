const express = require('express')
const router = express.Router()
const { GetAccount,GetByPK,TestUser, AccountPost } = require('../controller/account.controller')
const { PrintSuccess,
    CheckPostAccount } = require('../middleware/middleware')


router.use(PrintSuccess)
/**
 * @swagger
 * /api/v1/account:
 *  get:   
 *      tags : 
 *          - "account"
 *      summary: Get all account
 *      responses:
 *          200:
 *              description: Seccesfull response
 */
router.get('/',  GetAccount)
/**
 * @swagger
 * /API/v1/account/{id}:
 *   get:
 *     tags : 
 *      - "account"
 *     summary: Example to get account account by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: internal server error
 */
router.get('/:id',  GetByPK)

/**
 * @swagger
 * /API/v1/account:
 *   post:
 *     tags:
 *       - account
 *     summary: Create a account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bank_name:
 *                 type: string
 *               bank_account_number:
 *                 type: string
 *               balance:
 *                 type: integer
 *               user_Id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.post('/',  CheckPostAccount,AccountPost)

module.exports = router
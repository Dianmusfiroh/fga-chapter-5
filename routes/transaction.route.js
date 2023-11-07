const express = require('express')
const router = express.Router()
const { GetTransaction,GetByPK, TransactionPost } = require('../controller/transaction.controller')
const { PrintSuccess,
    CheckPostTransaction } = require('../middleware/middleware')


router.use(PrintSuccess)
/**
 * @swagger
 * /api/v1/transaction:
 *  get:
 *      tags : 
 *      - "transaction"
 *      summary: Get all transaction
 *      responses:
 *          200:
 *              description: Seccesfull response
 */
router.get('/',  GetTransaction)
/**
 * @swagger
 * /API/v1/transaction/{id}:
 *   get:
 *     tags : 
 *      - "transaction"
 *     summary: Example to get transaction transaction by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the transaction
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
 * /API/v1/transaction:
 *   post:
 *     tags:
 *       - transaction
 *     summary: Create a transaction
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *               source_account_Id:
 *                 type: integer
 *               destination_account_Id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.post('/',  CheckPostTransaction,TransactionPost)

module.exports = router
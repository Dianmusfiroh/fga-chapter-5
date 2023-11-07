const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function HelloWord(req, res) {  
    res.status(200).json({
        status: true,
        message: 'Hello world!',
    });
}


async function TransactionPost(req, res) {
    const {  amount ,source_account_Id, destination_account_Id } = req.body
    const transactions ={
        amount ,
        source_account_Id, 
        destination_account_Id
    }
    try {
     
            const source_account = await prisma.bank_accounts.findFirst({
                where: 
                {
                  id:Number(source_account_Id)  
                    },
              })
              const destination_account = await prisma.bank_accounts.findFirst({
                where: 
                {
                  id:Number(destination_account_Id)  
                    },
              })
            if (source_account == null || destination_account == null ) {
                
                let resp = ResponseTemplate(null, 'periksa kembali nomor  bank anda', null, 400)
                res.json(resp)
                return
            } else {
             const transaction = await prisma.transaction.create({
                    data: {
                        amount : Number(transactions.amount),
                        source_account_Id : Number(transactions.source_account_Id),
                        destination_account_Id :Number(transactions.destination_account_Id),
                    }
                })

                const updateBalance = await prisma.bank_accounts.update({
                    where: {
                        id: Number(destination_account_Id)
                    },
                    data: {
                    balance: Number(source_account.balance) + Number(transactions.amount),
                    },
                })
                console.log(updateBalance)
        
                let resp = ResponseTemplate(transaction, 'success', null, 200)
                res.json(resp)
                return
               
        }
        

    } catch (error) {
        
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
       

    }
    
}
async function GetTransaction(req, res) {
    const { page, limit } = req.query;

    try {
            if (page == undefined || limit == undefined) {
                const account = await prisma.transaction.findMany({
                   
                });
                let resp = ResponseTemplate(account, 'success', null, 200)
                res.json(resp)
                return
            } else {
                const account = await prisma.transaction.findMany({
                    skip: Number(page),
                    take: Number(limit),
                });
                let resp = ResponseTemplate(account, 'success', null, 200)
                res.json(resp)
                return

            }
            
        
        


    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}
async function GetByPK(req, res) {

    const { id } = req.params

    try {
        const bank_accounts = await prisma.transaction.findFirst({
            where: {
                        id: Number(id)
                    },
            include: {
                source_account: true,
                destination_account: true,
            },
          })
console.log(bank_accounts)
        let resp = ResponseTemplate(bank_accounts, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

module.exports = {
    TransactionPost,
    GetTransaction,
    GetByPK,
    HelloWord
}
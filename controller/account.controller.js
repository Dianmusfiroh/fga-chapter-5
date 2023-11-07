const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



async function AccountPost(req, res) {
    const {  bank_name ,bank_account_number, balance,user_Id } = req.body
    const accounts ={
        bank_name ,
        bank_account_number,
        balance,
        user_Id 
    }
    // const balances = useParam('balance', 'number')

    try {
        const account = await prisma.bank_accounts.create({
            data: {
                bank_name : accounts.bank_name ,
                bank_account_number : accounts.bank_account_number,
                balance :Number(accounts.balance),
                user_Id : Number(accounts.user_Id)
            }
        })
        

        let resp = ResponseTemplate(account, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {

        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
       

    }
    
}
async function GetAccount(req, res) {
    const { page, limit } = req.query;

    try {
            if (page == undefined || limit == undefined) {
                const account = await prisma.bank_accounts.findMany({
                   
                });
                let resp = ResponseTemplate(account, 'success', null, 200)
                res.json(resp)
                return
            } else {
                const account = await prisma.bank_accounts.findMany({
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
        const bank_accounts = await prisma.bank_accounts.findFirst({
            where: {
                        id: Number(id)
                    },
          })

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
    AccountPost,
    GetAccount,
    GetByPK
}
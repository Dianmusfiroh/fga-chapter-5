const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function TestUser(req,res) { 

    let resp = ResponseTemplate(null, 'success', null, 200)
    res.json(resp)
}

async function TestUserPost(req, res) {
    const {  name ,email, password,  identity_type,
        identity_number,
        address } = req.body
    const users ={
        name,
        email,
        password,
    }
    const profiles = {
        
        identity_type,
        identity_number,
        address
    }
    try {
        const user = await prisma.user.create({
            data: users
        })
        const profile = await prisma.profiles.create({
            data: {
                user_Id : user.id,
                identity_type : profiles.identity_type,
                identity_number : profiles.identity_number,
                address : profiles.address
            }
        })

        let resp = ResponseTemplate([user,profile], 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
       

    }
    // try {
    //     if (!name || !email) {
    //         let resp = ResponseTemplate(null, 'bad-request', new Error('Bad request'),400)
    //         res.json(resp)
    //         return
    //     }
    //     console.log(req.query.name)
    //     let objResp = {
    //         name: req.body.name,
    //         address: req.body.address
    //     }
    //     let resp = ResponseTemplate(objResp, 'success', null, 200)
    //     res.json(resp)
    //     return
    // } catch (error) {
    //     let resp = ResponseTemplate(null, 'internal server error', new Error('internal server error'),500)
    //     res.json(resp)
    //     return  
    // }
    
}
async function GetUser(req, res) {

    const { page, limit } = req.query;

    try {

        if (page == undefined || limit == undefined) {
            const users = await prisma.user.findMany({
               
            });
            let resp = ResponseTemplate(users, 'success', null, 200)
            res.json(resp)
            return
        } else {
            const users = await prisma.user.findMany({
                skip: Number(page),
                take: Number(limit),
            });
            let resp = ResponseTemplate(users, 'success', null, 200)
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
        const users = await prisma.user.findFirst({
            where: {
                        id: Number(id)
                    },
            include: {
                profiles: true,
            },
          })

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}
module.exports = {
    TestUser,
    TestUserPost,
    GetUser,
    GetByPK
}
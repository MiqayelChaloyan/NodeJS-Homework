import express from "express";
import cors from 'cors'

import { prisma } from './prisma.js'
const hostname = "127.0.0.1";
const PORT = 3000;

const app = express()
app.use(cors())



// //GET
app.get('/users', async (req, res) => {
    let { page, limit } = req.query
    console.log(page, limit)
    let startIndex = (page - 1) * limit;


    const users = await prisma.user.findMany({
        skip: startIndex,
        take: Number(limit)
    })

    res.json(users)

})

// //GET
app.get('/usersCount', async (req, res) => {
    const usersCount = await prisma.user.count();
    res.json({ usersCount })
})

// //GET by id
app.get('/user/:userId', async (req, res) => {
    const { userId: userIdStr } = req.params
    const userId = Number(userIdStr) || 0

    if (!userId) {
        return res.status(400).json({ message: 'Bad request' })
    }

    const user = await prisma.user.findMany({
        where: {
            id: userId
        }
    })
    console.log(user)
    res.json(user)
})

// //DELETE
app.delete('/user/:userId', async (req, res) => {
    const { userId: userIdStr } = req.params
    const userId = Number(userIdStr) || 0

    if (!userId) {
        return res.status(400).json({ message: 'Bad request' })
    }
    const userDelete = await prisma.user.findMany({
        where: {
            id: userId
        }
    })
    console.log(userDelete)
    res.json('User Deleted')
})

// //POST
app.post('/users', async (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", async () => {
        const { name, email } = JSON.parse(body)
        if (!name || !email) {
            return res.status(400).json({ message: 'Bad request' })
        }
        console.log(JSON.parse(body))
        const newUser = await prisma.user.create({
            data: {
                name,
                email
            },
        })
        console.log(newUser)
        res.json('User Added')
    });
})

// //PUT
app.put('/user/:userId', async (req, res) => {
    const { userId: userIdStr } = req.params
    const userId = Number(userIdStr) || 0

    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", async () => {
        const { name, email } = JSON.parse(body)
        if (!name || !email) {
            return res.status(400).json({ message: 'Bad request' })
        }
        const newUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                email
            },
        })
        console.log(newUser)
    });

    res.json('User Updated')
})


app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}`);
})
import express from "express";
import cors from 'cors'
import { prisma } from './prisma.js'
const hostname = "127.0.0.1";
const PORT = 3000;

const app = express()
app.use(cors())



// //GET /cars
app.get('/cars', async (req, res) => {

    let { filter } = req.query
    let filterNum = 0
    if (!isNaN(Number(filter))) {
        filterNum = Number(filter)
    }

    console.log(filter)
    const users = await prisma.car.findMany({
        where: {
            OR:[
                {name: {contains: filter || ""}

                }, {
                    color: {contains: filter || ""}
                },
                {
                    year: {equals: Number(filter) || 0}
                },
                {
                    brandId: {equals: Number(filter) || 0}
                }
                ]
        },
        include: { brand: true },
    })
    res.send(users)
})


// //GET by id /cars/:carId
app.get('/cars/:carId', async (req, res) => {
    const { carId: carIdStr } = req.params
    const carId = Number(carIdStr) || 0

    if (!carId) {
        return res.status(400).json({ message: 'Bad request' })
    }
    const cars = await prisma.car.findMany({
        where: {
            id: carId
        },
        include: { brand: true },
    })
    res.json(cars)
})

// //GET /brands
app.get('/brands', async (req, res) => {
    const brands = await prisma.brand.findMany()
    res.send(brands)
})

// //DELETE /cars/:carId
app.delete('/cars/:carId', async (req, res) => {
    const { carId: carIdStr } = req.params
    const carId = Number(carIdStr) || 0

    if (!carId) {
        return res.status(400).json({ message: 'Bad request' })
    }
    await prisma.car.delete({
        where: {
            id: carId
        }
    })
    res.json('User Deleted')
})

// //DELETE /brands/:brandId
app.delete('/brands/:brandId', async (req, res) => {
    const { brandId: brandIdStr } = req.params
    const brandId = Number(brandIdStr) || 0

    if (!brandId) {
        return res.status(400).json({ message: 'Bad request' })
    }
    await prisma.brand.delete({
        where: {
            id: brandId
        }
    })
    res.json('Brand Deleted')
})

// //POST /cars
app.post('/cars', async (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", async () => {
        const { name, color, year, brandId } = JSON.parse(body)
        if (!name || !color || !year || !brandId) {
            return res.status(400).json({ message: 'Bad request' })
        }
        // console.log(JSON.parse(body))
        const newCar = await prisma.car.create({
            data: {
                name,
                color,
                year: Number(year),
                brandId: Number(brandId)
            },
        })
        res.json('Car Added')
    });
})

// //POST /brands
app.post('/brands', async (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", async () => {
        const { brand } = JSON.parse(body)
        if (!brand) {
            return res.status(400).json({ message: 'Bad request' })
        }
        const newbrand = await prisma.brand.create({
            data: {
                brand: brand
            },
        })

    });
    res.json('Brand Added')
})

// //PUT /cars/:carId
app.put('/cars/:carId', async (req, res) => {
    const { carId: carIdStr } = req.params
    const carId = Number(carIdStr) || 0
    // console.log(carId)
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", async () => {
        const { name, color, year, brandId } = JSON.parse(body)
        if (!name || !color || !year || !brandId || !carId) {
            return res.status(400).json({ message: 'Bad request' })
        }
        const newCar = await prisma.car.update({
            where: {
                id: carId
            },
            data: {
                name,
                color,
                year: Number(year),
                brandId: Number(brandId)
            },
        })

    });
    res.json('Car Updated')
})




app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}`);
})
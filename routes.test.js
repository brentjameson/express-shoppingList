process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
const items = require('./fakeDB');

const itemOne = {name: 'popsicle', price: 1.45}
const itemTwo = {name: 'cheerios', price: 3.40}

beforeEach(function () {
    items.push(itemOne);
    items.push(itemTwo);
});

afterEach(function () {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([{"name":"popsicle","price":1.45},{"name":"cheerios","price":3.40}])
    })
})

describe("Get /items/:name", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${itemOne.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"item": itemOne})
    })
})

describe("POST /items", () => {
    test("Creating an item", async () => {
        const res = await request(app).post("/items").send({"name": "bread", "price": 1.99})
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            "name": "bread",
            "price": 1.99
        })
    })
})

describe("PATCH /items/:name", () => {
    test("Updating an item's name and/or price", async () => {
        const newItem = {"name": "purple-popsicles", "price": 2.09}
        const res = await request(app).patch(`/items/${itemOne.name}`).send(newItem)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"item": newItem})
    })
})

describe("DELETE /items", () => {
    test("Deleting an item", async () => {
        const res = await request(app).delete(`/items/${itemOne.name}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"})
    })
})






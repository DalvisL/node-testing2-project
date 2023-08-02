const db = require('../database/dbConfig.js')
const request = require('supertest')
const server = require('./server.js')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('foo', () => {
    it('should foo', () => {
        expect(true).toBe(true)
    })
})

describe('[GET] /api/pokemon', () => {
    it('should return all pokemon', async () => {
        const res = await request(server).get('/api/pokemon')
        expect(res.body).toHaveLength(10)
    })
    it('should return a 200 OK status code', async () => {
        const res = await request(server).get('/api/pokemon')
        expect(res.status).toBe(200)
    })
    it('should return the correct shape for pokemon with only a primary type', async () => {
        const res = await request(server).get('/api/pokemon')
        expect(res.body[0]).toMatchObject({
            id: 1,
            name: 'pikachu',
            level: 80,
            trainer: 'ash',
            types: {
                primary: 'electric',
                secondary: null
            }
        })
    })
    it('should return the correct shape for pokemon with both a primary and secondary type', async () => {
        const res = await request(server).get('/api/pokemon')
        expect(res.body[9]).toMatchObject({
            id: 10,
            name: 'emboar',
            level: 50,
            trainer: 'ash',
            types: {
                primary: 'fire',
                secondary: 'fighting'
            }
        })
    })
})

describe('[GET] /api/pokemon/:id', () => {
    it('should return a 404 if the pokemon is not found', async () => {
        const res = await request(server).get('/api/pokemon/100')
        expect(res.status).toBe(404)
    })
    it('should return the correct shape for pokemon with only a primary type', async () => {
        const res = await request(server).get('/api/pokemon/1')
        expect(res.body).toMatchObject({
            id: 1,
            name: 'pikachu',
            level: 80,
            trainer: 'ash',
            types: {
                primary: 'electric',
                secondary: null
            }
        })
    })
    it('should return the correct shape for pokemon with both a primary and secondary type', async () => {
        const res = await request(server).get('/api/pokemon/10')
        expect(res.body).toMatchObject({
            id: 10,
            name: 'emboar',
            level: 50,
            trainer: 'ash',
            types: {
                primary: 'fire',
                secondary: 'fighting'
            }
        })
    })
    it('should return a 200 OK status code', async () => {
        const res = await request(server).get('/api/pokemon/1')
        expect(res.status).toBe(200)
    })
    it('should return the corresponding pokemon', async () => {
        const res = await request(server).get('/api/pokemon/3')
        expect(res.body).toMatchObject({
            id: 3,
            name: 'squirtle',
            level: 15,
            trainer: 'ash',
            types: {
                primary: 'water',
                secondary: null
            }
        })
    })
})

describe('[POST] /api/pokemon', () => {
    it('should return a 400 if the body is missing a required field', async () => {
        const res = await request(server).post('/api/pokemon').send({
            name: 'charizard',
            level: 99,
            trainer_id: 1
        })
        expect(res.status).toBe(400)
    })
    it('should return a 404 if the primary type is not found', async () => {
        const res = await request(server).post('/api/pokemon').send({
            name: 'charizard',
            level: 99,
            trainer_id: 1,
            primary_type: '88ef'
        })
        expect(res.status).toBe(404)
    })
    it('should create a new pokemon', async () => {
        const res = await request(server).post('/api/pokemon').send({
            name: 'charizard',
            level: 99,
            trainer_id: 1,
            primary_type: 'fire'
        })
        expect(res.body).toMatchObject({
            id: 11,
            name: 'charizard',
            level: 99,
            trainer: 'ash',
            types: {
                primary: 'fire',
                secondary: null
            }
        })
    })
    it('should return a 201 CREATED status code', async () => {
        const res = await request(server).post('/api/pokemon').send({
            name: 'charizard',
            level: 99,
            trainer_id: 1,
            primary_type: 'fire'
        })
        expect(res.status).toBe(201)
    })
    
})
describe('[GET] /api/trainers', () => {
    it('should return all trainers', async () => {
        const res = await request(server).get('/api/trainers')
        expect(res.body).toHaveLength(3)
    })
    it('should return a 200 OK status code', async () => {
        const res = await request(server).get('/api/trainers')
        expect(res.status).toBe(200)
    })
    it('should return the correct shape for trainers', async () => {
        const res = await request(server).get('/api/trainers')
        expect(res.body[0]).toMatchObject({
            id: 1,
            name: 'ash'
        })
    })
})   
describe('[GET] /api/trainers/:id', () => {
    it('should return a 404 if the trainer is not found', async () => {
        const res = await request(server).get('/api/trainers/100')
        expect(res.status).toBe(404)
    })
    it('should return the correct shape for trainers', async () => {
        const res = await request(server).get('/api/trainers/1')
        expect(res.body).toMatchObject({
            id: 1,
            name: 'ash'
        })
    })
    it('should return a 200 OK status code', async () => {
        const res = await request(server).get('/api/trainers/1')
        expect(res.status).toBe(200)
    })
    it('should return the corresponding trainer', async () => {
        const res = await request(server).get('/api/trainers/3')
        expect(res.body).toMatchObject({
            id: 3,
            name: 'brock'
        })
    })
})
describe('[GET] /api/trainers/:id/pokemon', () => {
    it('should return a 404 if the trainer is not found', async () => {
        const res = await request(server).get('/api/trainers/100/pokemon')
        expect(res.status).toBe(404)
    })
    it('should return a 200 OK status code', async () => {
        const res = await request(server).get('/api/trainers/1/pokemon')
        expect(res.status).toBe(200)
    })
    it('should return the corresponding pokemon', async () => {
        const res = await request(server).get('/api/trainers/2/pokemon')
        expect(res.body).toMatchObject([
            {
                "id": 7,
                "level": 50,
                "name": "snorlax",
                "trainer_id": 2
            },
            {
                "id": 8,
                "level": 5,
                "name": "piplup",
                "trainer_id": 2
            },
            {
                "id": 9,
                "level": 2,
                "name": "pidgey",
                "trainer_id": 2
            }
        ])
    })
})
describe('[POST] /api/trainers', () => {
    it('should return a 400 if the body is missing a required field', async () => {
        const res = await request(server).post('/api/trainers').send({
            name: null
        })
        expect(res.status).toBe(400)
    })
    it('should create a new trainer', async () => {
        const res = await request(server).post('/api/trainers').send({
            name: 'foo'
        })
        expect(res.body).toMatchObject({
            id: 4,
            name: 'foo'
        })
    })
    it('should return a 201 CREATED status code', async () => {
        const res = await request(server).post('/api/trainers').send({
            name: 'misty'
        })
        expect(res.status).toBe(201)
    })
})       

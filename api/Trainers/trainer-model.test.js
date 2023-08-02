const Trainer = require('./trainers-model');
const db = require('../../database/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
});

beforeEach(async () => {
    await db.seed.run()
});

describe('Sanity test', () => {
    it('should run tests', () => {
        expect(true).toBe(true);
    });
});

describe('getAll', () => {
    it('should return all trainers', async () => {
        const trainers = await Trainer.getAll();
        expect(trainers).toHaveLength(3);
    });
    it('should return the correct shape', async () => {
        const trainers = await Trainer.getAll();
        expect(trainers[0]).toMatchObject({
            id: 1,
            name: 'ash'
        });
    });
})

describe('getById', () => {
    it('should return the trainer with the specified id', async () => {
        const trainer = await Trainer.getById(1);
        expect(trainer).toMatchObject({
            id: 1,
            name: 'ash'
        });
    });
    it('should return undefined if the trainer is not found', async () => {
        const trainer = await Trainer.getById(100);
        expect(trainer).toBeUndefined();
    });
});

describe('add', () => {
    it('should add the trainer to the database', async () => {
        const newTrainer = {
            name: 'misty'
        };
        const trainer = await Trainer.add(newTrainer);
        expect(trainer).toMatchObject({
            id: 4,
            name: 'misty'
        });
    });
    it('should return the added trainer', async () => {
        const newTrainer = {
            name: 'misty'
        };
        const trainer = await Trainer.add(newTrainer);
        expect(trainer).toMatchObject({
            id: 4,
            name: 'misty'
        });
    });
})
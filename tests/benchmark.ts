import { JSONDriver } from '../src/drivers/JSONDriver';
import { Megdb } from '../src/Base';

// Define a type for the data
interface User {
    name: string;
    age: number;
    hobbies: string[];
}

// Create a new JSONDriver instance
const jsonDriver = new JSONDriver<User>('benchmark.json');

// Create a new MegDB instance with the JSONDriver instance
const megDB = new Megdb<User>(jsonDriver);

// Benchmark function to measure the performance of set and get operations
async function benchmark() {
    const startTime = new Date().getTime();

    // Perform a large number of set operations
    for (let i = 0; i < 1000; i++) {
        await megDB.set(`name`, `name`);
    }

    // Perform a large number of get operations
    for (let i = 0; i < 1000; i++) {
        await megDB.get(`name`);
    }

    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;

    console.log(`Benchmark completed in ${elapsedTime} milliseconds.`);
}

// Execute the benchmark function
benchmark();

import { JSONDriver } from '../src/drivers/JSONDriver';
import { Megdb } from '../src/Base';

// Define a type for the data
interface format {
    [key: string]: string
}

// Create a new JSONDriver instance
const jsonDriver = new JSONDriver<format>('benchmark.json');

// Create a new MegDB instance with the JSONDriver instance
const megDB = new Megdb<format>(jsonDriver);

// Benchmark function to measure the performance of set and get operations
async function benchmark() {
    const startTime = new Date().getTime();

    // Perform a large number of set operations
    for (let i = 0; i < 1000; i++) {
        await megDB.set(`count-${i}`, `count-${i}`);
    }

    // Perform a large number of get operations
    for (let i = 0; i < 1000; i++) {
        await megDB.get(`count-${i}`);
    }

    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;

    console.log(`Benchmark completed in ${elapsedTime} milliseconds.`);
}

// Execute the benchmark function
benchmark();

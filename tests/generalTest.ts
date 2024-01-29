import { JSONDriver } from '../src/drivers/JSONDriver';
import { Megdb } from '../src/Base';

// Define a type for the data
interface User {
    name: string;
    age: number;
    hobbies: string[];
};

// Create a new JSONDriver instance
const jsonDriver = new JSONDriver<User>('users.json');

// Create a new Megdb instance with the JSONDriver instance
const megDB = new Megdb<User>(jsonDriver);

// Use the MegDB instance
async function main() {
    // Set a value
    await megDB.set('name', 'John Doe');
    await megDB.set('age', 30);
    await megDB.set('hobbies', ['reading', 'coding']);

    // Get a value
    const name = await megDB.get('name');
    console.log(name);  // Outputs: John Doe

    // Add a value
    await megDB.add('age', 1);

    // Get the updated value
    const age = await megDB.get('age');
    console.log(age);  // Outputs: 31

    // Push a value into an array
    await megDB.push('hobbies', 'gaming');

    // Get the updated array
    const hobbies = await megDB.get('hobbies');
    console.log(hobbies);  // Outputs: ['reading', 'coding', 'gaming']

    // Pull a value from an array
    await megDB.pull('hobbies', 'coding');

    // Get the updated array
    const updatedHobbies = await megDB.get('hobbies');
    console.log(updatedHobbies);  // Outputs: ['reading', 'gaming']

    // Delete a value
    await megDB.delete('age');

    // Try to get the deleted value
    const deletedValue = await megDB.get('age');
    console.log(deletedValue);  // Outputs: undefined

    // Get all data
    const allData = await megDB.all();
    console.log(allData);  // Outputs: { JohnDoe: { name: 'John Doe', hobbies: ['reading', 'gaming'] } }
}

main();

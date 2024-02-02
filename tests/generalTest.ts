import { JSONDriver } from '../src/drivers/JSONDriver';
import { Megdb } from '../src/Base';

// Define a type for the data
interface User {
    name: string;
    age: number;
    hobbies: string[];
};

interface format {
    "john": User;
};

// Create a new JSONDriver instance
const jsonDriver = new JSONDriver<format>('users.json');

// Create a new Megdb instance with the JSONDriver instance
const megDB = new Megdb<format>(jsonDriver);

// Use the MegDB instance
async function main() {
    // Set a value
    await megDB.set('john', { name: 'John Doe', age: 30, hobbies: ['reading', 'coding'] });

    // Get a value
    const john = await megDB.get('john.name');
    console.log(john.name);  // Outputs: John Doe

    // Update a value
    await megDB.add('john.age', 1);

    // Get the updated value
    const updatedJohn = await megDB.get('john.age');
    console.log(updatedJohn);  // Outputs: 31

    // Push a value into an array
    await megDB.push('john.hobbies', "gaming");

    // Get the updated array
    const updatedHobbies = await megDB.get('john.hobbies');
    console.log(updatedHobbies);  // Outputs: ['reading', 'coding', 'gaming']

    // Pull a value from an array
    await megDB.filter('john', hobby => hobby !== 'coding');

    // Get the updated array
    const finalHobbies = await megDB.get('john.hobbies');
    console.log(finalHobbies);  // Outputs: ['reading', 'gaming']

    // Delete a value
    await megDB.delete('john.age');

    // Try to get the deleted value
    const deletedValue = await megDB.get('john.age');
    console.log(deletedValue);  // Outputs: undefined

    // Get all data
    const allData = await megDB.all();
    console.log(allData);  // Outputs: { john: { name: 'John Doe', hobbies: ['reading', 'gaming'] } }
}


main();

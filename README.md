# MegDB-light: A Robust TypeScript Database Module 🚀

MegDB-light is a robust, lightweight database module crafted in TypeScript. It offers a user-friendly and extensible API for seamless data manipulation, enabling you to execute common operations such as set, get, delete, and more with ease. The module's design is flexible, accommodating different data storage drivers.

## Key Features

- **Super Lightweight:** MegDB-light is incredibly lightweight, ensuring your applications remain efficient and high-performing. 🚀

- **Type-Safe Operations:** MegDB-light exploits TypeScript’s type system to ensure type safety across your database interactions, enhancing reliability and robustness. 🛡️

- **Extensibility:** MegDB-light is easily extendable. You can implement custom data storage drivers, making the module compatible with a variety of storage solutions. 📚

## Installation

You can incorporate MegDB-light into your TypeScript project by installing it via npm:

```bash
npm install meg.db-light
```

## How to Use

### MegDB Class

The `Megdb` class offers a high-level API for data interaction.

```typescript
import { Megdb, JSONDriver } from 'meg.db-light';

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

async function main() {
    // Set a value
    await megDB.set('john', { name: 'John Doe', age: 30, hobbies: ['reading', 'coding'] });

    // Get a value
    const john = await megDB.get('john');
    console.log(john!.name);  // Outputs: John Doe

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
    await megDB.filter('john.hobbies', hobby => hobby !== 'coding');

    // Get the updated array
    const finalHobbies = await megDB.get('john.hobbies');
    console.log(finalHobbies);  // Outputs: ['reading', 'gaming']

    // Delete a value
    await megDB.delete('john.age');

    // Try to get the deleted value
    const deletedValue = await megDB.get('john.age');
    console.log(deletedValue);  // Outputs: undefined

    // Get the type of the 'john.hobbies' property
    const typeofhobbies = await megDB.typeof('john.hobbies');
    console.log(typeofhobbies); // Outputs: object

    // Get the type of the 'john.name' property
    const typeofname = await megDB.typeof('john.name');
    console.log(typeofname); // Outputs: string

    // Get all data
    const allData = await megDB.all();
    console.log(allData);  // Outputs: { john: { name: 'John Doe', hobbies: ['reading', 'gaming'] } }
};

main();
```

### Custom Driver

You can create your custom driver by extending the `BaseDriver` class and implementing the `loadData` and `saveData` methods.

```typescript
import { BaseDriver } from 'meg.db-light';

export class CustomDriver<T> extends BaseDriver<T> {
    constructor(filePath: string) {
        super(filePath);
    }

    public async loadData(): Promise<T> {
        // Implement loading data from your custom storage
    }

    public async saveData(data: T): Promise<void> {
        // Implement saving data to your custom storage
    }
}
```

## Examples

### JSONDriver

A built-in driver for storing data in a JSON file.

```typescript
import { Megdb } from 'meg.db-light';
import { JSONDriver } from 'megdb/drivers/JSONDriver';

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

async function main() {
    // Operations with MegDB...
}

main();
```

## License
This project is licensed under the GNU General Public License v3.0 License - see the LICENSE file for details.
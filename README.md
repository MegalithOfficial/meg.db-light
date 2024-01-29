# MegDB-light: A Robust TypeScript Database Module 🚀

MegDB-light is a robust, lightweight database module crafted in TypeScript. It offers a user-friendly and extensible API for seamless data manipulation, enabling you to execute common operations such as set, get, delete, and more with ease. The module's design is flexible, accommodating different data storage drivers.

## Key Features

- **Super Lightweight:** MegDB-light is incredibly lightweight, ensuring your applications remain efficient and high-performing. 🚀

- **Type-Safe Operations:** MegDB-light exploits TypeScript’s type system to ensure type safety across your database interactions, enhancing reliability and robustness. 🛡️

- **Extensibility:** MegDB-light is easily extendable. You can implement custom data storage drivers, making the module compatible with a variety of storage solutions. 📚

## Installation

You can incorporate MegDB-light into your TypeScript project by installing it via npm:

```bash
npm install megdb-light
```

## How to Use

### MegDB Class

The `Megdb` class offers a high-level API for data interaction.

```typescript
import { Megdb, JSONDriver } from 'megdb-light';

// Define a type for the data
interface User {
    name: string;
    age: number;
    hobbies: string[];
}

// Instantiate a new JSONDriver
const customDriver = new JSONDriver<User>('path-to-your-data');

// Instantiate a new MegDB with the CustomDriver
const megDB = new MegDB<User>(customDriver);

// Utilize the MegDB instance
async function main() {
    // Set a value
    await megDB.set('JohnDoe.name', 'John Doe');
    await megDB.set('JohnDoe.age', 25);
    await megDB.set('JohnDoe.hobbies', ['reading', 'gaming']);

    // Get a value
    const name = await megDB.get('JohnDoe.name');
    console.log(name);  // Outputs: John Doe

    // Add a value
    await megDB.add('JohnDoe.age', 1);

    // Get the updated value
    const age = await megDB.get('JohnDoe.age');
    console.log(age);  // Outputs: 26

    // Other operations...

    // Get all data
    const allData = await megDB.all();
    console.log(allData);
}

main();
```

### Custom Driver

You can create your custom driver by extending the `BaseDriver` class and implementing the `loadData` and `saveData` methods.

```typescript
import { BaseDriver } from 'megdb-light';

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
import { MegDB } from 'megdb-light';
import { JSONDriver } from 'megdb/drivers/JSONDriver';

// Define a type for the data
interface User {
    name: string;
    age: number;
    hobbies: string[];
}

// Instantiate a new JSONDriver
const jsonDriver = new JSONDriver<User>('users.json');

// Instantiate a new MegDB with the JSONDriver
const megDB = new MegDB<User>(jsonDriver);

// Utilize the MegDB instance
async function main() {
    // Operations with MegDB...
}

main();
```

## License
This project is licensed under the GNU General Public License v3.0 License - see the LICENSE file for details.
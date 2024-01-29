import _ from 'lodash';
import { BaseDriver } from './drivers/baseDriver';

export class Megdb<T> {
    private driver: BaseDriver<T>;

    constructor(driver: BaseDriver<T>) {
        if(!driver || !(driver instanceof BaseDriver)) throw new Error("Invalid or missing database driver. Please provide an instance of a class that implements the BaseDriver interface.");
        this.driver = driver;
    };

    public async get<K extends keyof T>(path: K): Promise<T[K] | undefined> {
        const data = await this.driver.loadData();
        return _.get(data, path);
    };

    public async set<K extends keyof T>(path: K, value: T[K]): Promise<void> {
        let data = await this.driver.loadData();
        _.set(data as object, path, value);
        await this.driver.saveData(data);
    };

    public async delete<K extends keyof T>(path: K): Promise<void> {
        const data = await this.driver.loadData();
        _.unset(data, path);
        await this.driver.saveData(data);
    };

    public async exists(key: string): Promise<boolean> {
        const data = await this.driver.loadData() as any;
        return data.hasOwnProperty(key);
    };

    public async deleteAll(): Promise<void> {
        await this.driver.saveData({} as any);
    };

    public async typeof<K extends keyof T>(key: K): Promise<string> {
        const userObject = await this.get(key);

        if (userObject !== null && userObject !== undefined) {
            const propertyType = typeof userObject;
            return propertyType;
        } else {
            throw new Error(`User with key '${String(key)}' not found.`);
        };
    };

    public async add<K extends keyof T>(path: K, value: number): Promise<void> {
        const data = await this.driver.loadData();
        const currentValue = _.get(data, path, 0);
        _.set(data as object, path, currentValue + value);
        await this.driver.saveData(data);
    };

    public async subtract<K extends keyof T>(path: K, value: number): Promise<void> {
        const data = await this.driver.loadData();
        const currentValue = _.get(data, path, 0);
        _.set(data as object, path, currentValue - value);
        await this.driver.saveData(data);
    };

    public async push<K extends keyof T, U>(path: K, value: U): Promise<void> {
        const data = await this.driver.loadData();
        const currentArray = _.get(data, path, []) as U[];
        if (Array.isArray(currentArray)) {
            currentArray.push(value);
            _.set(data as object, path, currentArray);
            await this.driver.saveData(data);
        };
    };

    public async pull<K extends keyof T, U>(path: K, value: U): Promise<void> {
        const data = await this.driver.loadData();
        const currentArray = _.get(data, path, []) as U[];
        if (Array.isArray(currentArray)) {
            _.pull(currentArray, value);
            _.set(data as object, path, currentArray);
            await this.driver.saveData(data);
        };
    };

    public async filter<K extends keyof T>(path: K, predicate: (value: T[K]) => boolean): Promise<void> {
        const data = await this.driver.loadData();
        const currentArray = _.get(data, path, []);
        if (Array.isArray(currentArray)) {
            const filteredArray = currentArray.filter(predicate);
            _.set(data as object, path, filteredArray);
            await this.driver.saveData(data);
        };
    };

    public async all(): Promise<T> {
        return await this.driver.loadData();
    };
}
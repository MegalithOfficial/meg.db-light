import _ from 'lodash';
import { BaseDriver } from './drivers/baseDriver';
import { Path, PathValue } from './types';


export class Megdb<T> {
    private driver: BaseDriver<T>;

    constructor(driver: BaseDriver<T>) {
        if (!driver || !(driver instanceof BaseDriver)) throw new Error("Invalid or missing database driver. Please provide an instance of a class that implements the BaseDriver interface.");
        this.driver = driver;
    };

    public async get<K extends Path<T>>(path: K): Promise<PathValue<T, K> | undefined> {
        const data = await this.driver.loadData();
        return _.get(data, path);
    };

    public async set<K extends Path<T>>(path: K, value: PathValue<T, K>): Promise<void> {
        let data = await this.driver.loadData();
        _.set(data as object, path, value);
        await this.driver.saveData(data);
    };

    public async delete<K extends Path<T>>(path: K): Promise<void> {
        const data = await this.driver.loadData();
        _.unset(data, path);
        await this.driver.saveData(data);
    };

    public async exists<K extends Path<T>>(path: K): Promise<boolean> {
        const data = await this.driver.loadData() as any;
        return data.hasOwnProperty(path);
    };

    public async deleteAll(): Promise<void> {
        await this.driver.saveData({} as any);
    };

    public async typeof<K extends Path<T>>(key: K): Promise<string> {
        const userObject = await this.get(key);

        if (userObject !== null && userObject !== undefined) {
            const propertyType = typeof userObject;
            return propertyType;
        } else {
            throw new Error(`User with key '${String(key)}' not found.`);
        };
    };

    public async add<K extends Path<T>>(path: K, value: PathValue<T, K> extends number ? number : never): Promise<void> {
        const data = await this.driver.loadData();
        const currentValue = _.get(data, path, 0);
        _.set(data as object, path, currentValue + value);
        await this.driver.saveData(data);
    };

    public async subtract<K extends Path<T>>(path: K, value: PathValue<T, K> extends number ? number : never): Promise<void> {
        const data = await this.driver.loadData();
        const currentValue = _.get(data, path, 0);
        _.set(data as object, path, currentValue - value);
        await this.driver.saveData(data);
    };

    public async push<K extends Path<T>, U>(path: K, value: PathValue<T, K> extends Array<infer I> ? I : never): Promise<void> {
        const data = await this.driver.loadData();
        const currentArray = _.get(data, path, []);
        if (!Array.isArray(currentArray)) {
            throw new Error(`Cannot perform 'push' operation on non-array property '${path as string}'.`);
        }
        currentArray.push(value);
        _.set(data as object, path, currentArray);
        await this.driver.saveData(data);
    };

    public async pull<K extends Path<T>, U>(path: K, value: PathValue<T, K> extends Array<infer I> ? I : never): Promise<void> {
        const data = await this.driver.loadData();
        const currentArray = _.get(data, path, []);
        if (!Array.isArray(currentArray)) {
            throw new Error(`Cannot perform 'pull' operation on non-array property '${path as string}'.`);
        }
        _.pull(currentArray, value);
        _.set(data as object, path, currentArray);
        await this.driver.saveData(data);
    };

    public async filter<K extends Path<T>>(path: K, predicate: (value: PathValue<T, K> extends Array<infer I> ? I : never) => boolean): Promise<void> {
        const data = await this.driver.loadData();
        const currentArray = _.get(data, path) as Array<any>;
        if (Array.isArray(currentArray)) {
            const filteredArray = currentArray.filter(item => predicate(item));
            _.set(data, path, filteredArray);
            await this.driver.saveData(data);
        };
    };

    public async all(): Promise<T> {
        return await this.driver.loadData();
    };
};
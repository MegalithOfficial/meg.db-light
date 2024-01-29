"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Megdb = void 0;
const lodash_1 = __importDefault(require("lodash"));
const baseDriver_1 = require("./drivers/baseDriver");
class Megdb {
    driver;
    constructor(driver) {
        if (!driver || !(driver instanceof baseDriver_1.BaseDriver))
            throw new Error("Invalid or missing database driver. Please provide an instance of a class that implements the BaseDriver interface.");
        this.driver = driver;
    }
    ;
    async get(path) {
        const data = await this.driver.loadData();
        return lodash_1.default.get(data, path);
    }
    ;
    async set(path, value) {
        let data = await this.driver.loadData();
        lodash_1.default.set(data, path, value);
        await this.driver.saveData(data);
    }
    ;
    async delete(path) {
        const data = await this.driver.loadData();
        lodash_1.default.unset(data, path);
        await this.driver.saveData(data);
    }
    ;
    async exists(key) {
        const data = await this.driver.loadData();
        return data.hasOwnProperty(key);
    }
    ;
    async deleteAll() {
        await this.driver.saveData({});
    }
    ;
    async typeof(key) {
        const userObject = await this.get(key);
        if (userObject !== null && userObject !== undefined) {
            const propertyType = typeof userObject;
            return propertyType;
        }
        else {
            throw new Error(`User with key '${String(key)}' not found.`);
        }
        ;
    }
    ;
    async add(path, value) {
        const data = await this.driver.loadData();
        const currentValue = lodash_1.default.get(data, path, 0);
        lodash_1.default.set(data, path, currentValue + value);
        await this.driver.saveData(data);
    }
    ;
    async subtract(path, value) {
        const data = await this.driver.loadData();
        const currentValue = lodash_1.default.get(data, path, 0);
        lodash_1.default.set(data, path, currentValue - value);
        await this.driver.saveData(data);
    }
    ;
    async push(path, value) {
        const data = await this.driver.loadData();
        const currentArray = lodash_1.default.get(data, path, []);
        if (Array.isArray(currentArray)) {
            currentArray.push(value);
            lodash_1.default.set(data, path, currentArray);
            await this.driver.saveData(data);
        }
        ;
    }
    ;
    async pull(path, value) {
        const data = await this.driver.loadData();
        const currentArray = lodash_1.default.get(data, path, []);
        if (Array.isArray(currentArray)) {
            lodash_1.default.pull(currentArray, value);
            lodash_1.default.set(data, path, currentArray);
            await this.driver.saveData(data);
        }
        ;
    }
    ;
    async filter(path, predicate) {
        const data = await this.driver.loadData();
        const currentArray = lodash_1.default.get(data, path, []);
        if (Array.isArray(currentArray)) {
            const filteredArray = currentArray.filter(predicate);
            lodash_1.default.set(data, path, filteredArray);
            await this.driver.saveData(data);
        }
        ;
    }
    ;
    async all() {
        return await this.driver.loadData();
    }
    ;
}
exports.Megdb = Megdb;

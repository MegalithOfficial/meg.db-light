import * as fs from 'fs';
import { BaseDriver } from './baseDriver';

export class JSONDriver<T> extends BaseDriver<T> {
    private data: T | undefined;

    constructor(filePath: string) {
        super(filePath);
    }

    public loadData(): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf-8', (error, fileContent) => {
                if (error) {
                    this.data = {} as T;
                    resolve(this.data);
                } else {
                    try {
                        this.data = JSON.parse(fileContent) as T;
                        resolve(this.data);
                    } catch (parseError) {
                        reject(parseError);
                    }
                }
            });
        });
    }

    public saveData(data: T): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filePath, JSON.stringify(data), (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}
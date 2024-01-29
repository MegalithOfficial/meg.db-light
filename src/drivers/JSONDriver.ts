import * as fs from 'fs/promises';
import writeFileAtomic from 'write-file-atomic';
import { BaseDriver } from './baseDriver';


export class JSONDriver<T> extends BaseDriver<T> {
    private data: T | undefined;

    constructor(filePath: string) {
        super(filePath);
    }

    public async loadData(): Promise<T> {
        try {
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            this.data = JSON.parse(fileContent) as T;
        } catch (error) {
            this.data = {} as T;
        }
        return this.data;
    }

    public async saveData(data: T): Promise<void> {
        await writeFileAtomic(this.filePath, JSON.stringify(data));
    }
}
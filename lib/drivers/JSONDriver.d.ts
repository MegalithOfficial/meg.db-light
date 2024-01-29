import { BaseDriver } from './baseDriver';
export declare class JSONDriver<T> extends BaseDriver<T> {
    private data;
    constructor(filePath: string);
    loadData(): Promise<T>;
    saveData(data: T): Promise<void>;
}
//# sourceMappingURL=JSONDriver.d.ts.map
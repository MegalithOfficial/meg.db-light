export declare abstract class BaseDriver<T> {
    protected filePath: string;
    constructor(filePath: string);
    abstract loadData(): Promise<T>;
    abstract saveData(data: T): Promise<void>;
}
//# sourceMappingURL=baseDriver.d.ts.map
export abstract class BaseDriver<T> {
    protected filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    };

    public abstract loadData(): Promise<T>;
    public abstract saveData(data: T): Promise<void>;
};
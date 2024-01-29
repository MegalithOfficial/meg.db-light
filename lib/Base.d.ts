import { BaseDriver } from './drivers/baseDriver';
export declare class Megdb<T> {
    private driver;
    constructor(driver: BaseDriver<T>);
    get<K extends keyof T>(path: K): Promise<T[K] | undefined>;
    set<K extends keyof T>(path: K, value: T[K]): Promise<void>;
    delete<K extends keyof T>(path: K): Promise<void>;
    exists(key: string): Promise<boolean>;
    deleteAll(): Promise<void>;
    typeof<K extends keyof T>(key: K): Promise<string>;
    add<K extends keyof T>(path: K, value: number): Promise<void>;
    subtract<K extends keyof T>(path: K, value: number): Promise<void>;
    push<K extends keyof T, U>(path: K, value: U): Promise<void>;
    pull<K extends keyof T, U>(path: K, value: U): Promise<void>;
    filter<K extends keyof T>(path: K, predicate: (value: T[K]) => boolean): Promise<void>;
    all(): Promise<T>;
}
//# sourceMappingURL=Base.d.ts.map
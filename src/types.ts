type OptionalKeys<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];
type NonOptionalKeys<T> = { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T];

export type PathImpl<T, Key extends keyof any = keyof T> =
  Key extends NonOptionalKeys<T>
  ? T[Key] extends Record<string, any>
    ? | `${Key & string}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
      | `${Key & string}.${Exclude<keyof T[Key], keyof any[]> & string}`
      | Key
    : never
  : Key extends OptionalKeys<T>
  ? T[Key] extends Record<string, any> | undefined
    ? | `${Key & string}.${PathImpl<NonNullable<T[Key]>, Exclude<keyof NonNullable<T[Key]>, keyof any[]>> & string}`
      | `${Key & string}.${Exclude<keyof NonNullable<T[Key]>, keyof any[]> & string}`
      | Key
    : never
  : never;

export type Path<T> = PathImpl<T, keyof T> | keyof T;

export type PathValue<T, P extends Path<T>> =
  P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;
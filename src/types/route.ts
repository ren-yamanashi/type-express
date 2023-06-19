export type ExtractRouteParams<T extends string> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : undefined;

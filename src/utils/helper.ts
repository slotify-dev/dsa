export function copyArray<T>(arr: T[]): T[] {
    return JSON.parse(JSON.stringify(arr));
}

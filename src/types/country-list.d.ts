// // types/country-list.d.ts
// declare module 'country-list' {
//     export function getCodeList(): Record<string, string>;
//     export function getNameList(): Record<string, string>;
//     export function getCode(name: string): string | undefined;
//     export function getName(code: string): string | undefined;
//     export function getData(): Array<{ code: string; name: string }>;
//     export function overwrite(countries: Array<{ code: string; name: string }>): void;
// }
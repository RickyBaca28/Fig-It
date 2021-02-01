import { Request } from 'express';
// eslint-disable no-restricted-globals */
export function parseOrDefault(x: string | number, defaultValue: number): number {
    let result: number;

    if (typeof x === 'string') {
        result = parseInt(x, 10);
        if (isNaN(result)) result = defaultValue;
    } else {
        result = x;
    }
    return result;
}

export function parseSwStatsUrls(req: Request): boolean {
    const swRequestRegex = new RegExp('/(swagger-stats+/[sS]*');
    return swRequestRegex.test(req.originalUrl);
}
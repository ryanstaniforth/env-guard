import { EnvInvalidPossibility, EnvMissing } from '../../errors';
import { getStringEnv } from '../../getStringEnv';

describe('getEnv', (): void => {
    beforeEach((): void => {
        process.env = {};
    });

    test('should return value of environment variable', (): void => {
        process.env = {
            A: 'a',
            B: 'b',
            C: 'c',
        };

        expect(getStringEnv('A')).toBe('a');
        expect(getStringEnv('B')).toBe('b');
        expect(getStringEnv('C')).toBe('c');

        expect(getStringEnv('A', ['a', 'b', 'c'])).toBe('a');
        expect(getStringEnv('B', ['a', 'b', 'c'])).toBe('b');
        expect(getStringEnv('C', ['a', 'b', 'c'])).toBe('c');
    });

    test('should throw error for missing environment variables', (): void => {
        expect((): string => getStringEnv('DOES')).toThrowError(EnvMissing);
        expect((): string => getStringEnv('NOT')).toThrowError(EnvMissing);
        expect((): string => getStringEnv('EXIST')).toThrowError(EnvMissing);
    });

    test('should throw error for invalid value', (): void => {
        process.env = {
            A: 'z',
        };

        expect((): string => getStringEnv('A', ['a', 'b', 'c'])).toThrowError(EnvInvalidPossibility);
    });
});

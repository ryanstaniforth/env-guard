import { EnvInvalidPossibility, EnvMissing } from '../../errors';
import { getStringEnv } from '../../getStringEnv';

describe('getEnv', () => {
    beforeEach(() => {
        process.env = {};
    });

    test('should return value of environment variable', () => {
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

    test('should throw error for missing environment variables', () => {
        expect(() => getStringEnv('DOES')).toThrowError(EnvMissing);
        expect(() => getStringEnv('NOT')).toThrowError(EnvMissing);
        expect(() => getStringEnv('EXIST')).toThrowError(EnvMissing);
    });

    test('should throw error for invalid value', () => {
        process.env = {
            A: 'z',
        };

        expect(() => getStringEnv('A', ['a', 'b', 'c'])).toThrowError(EnvInvalidPossibility);
    });
});

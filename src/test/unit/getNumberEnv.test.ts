import { EnvInvalidPossibility, EnvInvalidType } from '../../errors';
import { getNumberEnv } from '../../getNumberEnv';

describe('getNumberEnv', () => {
    beforeEach(() => {
        process.env = {};
    });

    test('to accept any number', () => {
        process.env = {
            A: '0',
            B: '1',
            C: '-1',
            D: '1234',
            E: '1.1',
        };

        expect(getNumberEnv('A')).toBe(0);
        expect(getNumberEnv('B')).toBe(1);
        expect(getNumberEnv('C')).toBe(-1);
        expect(getNumberEnv('D')).toBe(1234);
        expect(getNumberEnv('E')).toBe(1.1);

        expect(getNumberEnv('A', [0, 1, -1])).toBe(0);
        expect(getNumberEnv('B', [0, 1, -1])).toBe(1);
        expect(getNumberEnv('C', [0, 1, -1])).toBe(-1);
    });

    test('to throw if invalid value given', () => {
        process.env = {
            A: '9',
        };

        expect(() => getNumberEnv('A', [1, 2, 3])).toThrow(EnvInvalidPossibility);
    });

    test('should throw for any invalid value', () => {
        process.env = {
            A: '',
            B: 'abc',
            C: ' 1',
            D: '1 ',
            E: 'blah',
        };

        expect(() => getNumberEnv('A')).toThrow(EnvInvalidType);
        expect(() => getNumberEnv('B')).toThrow(EnvInvalidType);
        expect(() => getNumberEnv('C')).toThrow(EnvInvalidType);
        expect(() => getNumberEnv('D')).toThrow(EnvInvalidType);
        expect(() => getNumberEnv('E')).toThrow(EnvInvalidType);
    });
});

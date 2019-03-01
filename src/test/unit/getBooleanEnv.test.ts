import { EnvInvalidType } from '../../errors';
import { getBooleanEnv } from '../../getBooleanEnv';

describe('getBooleanEnv', () => {
    beforeEach(() => {
        process.env = {};
    });

    test('should accept true or false', () => {
        process.env = {
            A: 'true',
            B: 'TRUE',
            C: 'false',
            D: 'FALSE',
        };

        expect(getBooleanEnv('A')).toBe(true);
        expect(getBooleanEnv('B')).toBe(true);
        expect(getBooleanEnv('C')).toBe(false);
        expect(getBooleanEnv('D')).toBe(false);
    });

    test('should throw for any invalid value', () => {
        process.env = {
            A: '',
            B: '1',
            C: '0',
            D: 'blah',
        };

        expect(() => getBooleanEnv('A')).toThrow(EnvInvalidType);
        expect(() => getBooleanEnv('B')).toThrow(EnvInvalidType);
        expect(() => getBooleanEnv('C')).toThrow(EnvInvalidType);
        expect(() => getBooleanEnv('D')).toThrow(EnvInvalidType);
    });
});

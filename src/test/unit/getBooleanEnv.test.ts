import { EnvInvalidType } from '../../errors';
import { getBooleanEnv } from '../../getBooleanEnv';

describe('getBooleanEnv', (): void => {
    beforeEach((): void => {
        process.env = {};
    });

    test('should accept true or false', (): void => {
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

    test('should throw for any invalid value', (): void => {
        process.env = {
            A: '',
            B: '1',
            C: '0',
            D: 'blah',
        };

        expect((): boolean => getBooleanEnv('A')).toThrow(EnvInvalidType);
        expect((): boolean => getBooleanEnv('B')).toThrow(EnvInvalidType);
        expect((): boolean => getBooleanEnv('C')).toThrow(EnvInvalidType);
        expect((): boolean => getBooleanEnv('D')).toThrow(EnvInvalidType);
    });
});

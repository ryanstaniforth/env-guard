import { EnvInvalidPossibility, EnvMissing } from './errors';

export const getStringEnv = (name: string, possibilities?: string[]): string => {
    const value = process.env[name];

    if (value === undefined) {
        throw new EnvMissing(name);
    }

    if (possibilities !== undefined && possibilities.indexOf(value) === -1) {
        throw new EnvInvalidPossibility(name, value);
    }

    return value;
};

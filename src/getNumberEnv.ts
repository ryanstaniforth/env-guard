import { EnvInvalidPossibility, EnvInvalidType } from './errors';
import { getStringEnv } from './getStringEnv';

export const getNumberEnv = (name: string, possibilities?: number[]): number => {
    const value = getStringEnv(name);
    const numberValue = Number(value);

    if (value === '' || value !== value.trim() || isNaN(numberValue)) {
        throw new EnvInvalidType(name, 'number');
    }

    if (possibilities !== undefined && possibilities.indexOf(numberValue) === -1) {
        throw new EnvInvalidPossibility(name, value);
    }

    return numberValue;
};

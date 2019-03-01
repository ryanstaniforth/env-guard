import { EnvInvalidType } from './errors';
import { getStringEnv } from './getStringEnv';

export const getBooleanEnv = (name: string): boolean => {
    const value = getStringEnv(name).toLowerCase();

    if (['true', 'false'].indexOf(value) === -1) {
        throw new EnvInvalidType(name, 'boolean');
    }

    return value === 'true';
};

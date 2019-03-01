export class EnvInvalidType extends Error {
    public constructor(name: string, type: string) {
        super(`Envionment variable [${name}] does not match type [${type}]`);
    }
}

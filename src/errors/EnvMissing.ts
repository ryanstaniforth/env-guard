export class EnvMissing extends Error {
    public constructor(name: string) {
        super(`Envionment variable [${name}] is not set.`);
    }
}

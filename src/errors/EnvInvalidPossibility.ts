export class EnvInvalidPossibility extends Error {
    public constructor(name: string, value: string) {
        super(
            `Envionment variable [${name}] with value [${value}] does not match an available possibility.`,
        );
    }
}

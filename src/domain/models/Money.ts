export class Money {
    public readonly amount: number;

    constructor(amount: number) {
        if (amount <= 0) {
            throw new Error("Regla de Negocio: El monto de un gasto debe ser estrictamente mayor a cero.");
        }
        this.amount = amount;
    }
}
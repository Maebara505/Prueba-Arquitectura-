export class Participant {
    constructor(
        public readonly id: number,
        public readonly name: string,
        private _balance: number = 0
    ) {}

    // Encapsulamiento: El saldo no se modifica libremente, obedece reglas.
    public get balance(): number {
        return this._balance;
    }

    public applyDebt(debtAmount: number): void {
        this._balance -= debtAmount;
    }

    public applyCredit(creditAmount: number): void {
        this._balance += creditAmount;
    }
}
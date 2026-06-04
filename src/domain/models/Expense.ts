import { Money } from './Money.js';

export class Expense {
    constructor(
        public readonly id: number,
        public readonly description: string,
        public readonly amount: Money,
        public readonly payerId: number,
        public readonly date: Date = new Date()
    ) {}
}
import { Expense } from '../models/Expense.js';
import { Participant } from '../models/Participant.js';

// El dominio define QUÉ necesita guardar, no CÓMO se guarda.
export interface ParticipantRepository {
    findAll(): Participant[];
    findById(id: number): Participant | null;
    update(participant: Participant): void;
    saveExpense(expense: Expense): void;
    getExpenses(): Expense[];
}
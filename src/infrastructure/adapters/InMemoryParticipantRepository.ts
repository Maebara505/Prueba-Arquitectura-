import { ParticipantRepository } from '../../domain/ports/ParticipantRepository.js';
import { Participant } from '../../domain/models/Participant.js';
import { Expense } from '../../domain/models/Expense.js'; // Importamos la nueva entidad

export class InMemoryParticipantRepository implements ParticipantRepository {
    private participants: Map<number, Participant> = new Map();
    private expenses: Expense[] = []; // Memoria para el historial de gastos

    constructor() {
        // Datos semilla simulando una BBDD
        this.participants.set(1, new Participant(1, 'Luis', 0));
        this.participants.set(2, new Participant(2, 'Jonathan', 0));
        this.participants.set(3, new Participant(3, 'Esteban', 0));
    }

    // --- Métodos de Participantes ---

    public findAll(): Participant[] {
        return Array.from(this.participants.values());
    }

    public findById(id: number): Participant | null {
        return this.participants.get(id) || null;
    }

    public update(participant: Participant): void {
        this.participants.set(participant.id, participant);
    }

    // --- Nuevos métodos del historial de Gastos ---

    public saveExpense(expense: Expense): void {
        this.expenses.push(expense);
    }

    public getExpenses(): Expense[] {
        return this.expenses;
    }
}
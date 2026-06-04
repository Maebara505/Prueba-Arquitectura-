import { ParticipantRepository } from '../domain/ports/ParticipantRepository.js';
import { Money } from '../domain/models/Money.js';
import { Expense } from '../domain/models/Expense.js';

export class RegisterSharedExpenseUseCase {
    constructor(private participantRepo: ParticipantRepository) {}

    public execute(payerId: number, amountValue: number, description: string): void {
        // 1. Validaciones de Dominio
        const totalAmount = new Money(amountValue);
        
        if (!description || description.trim() === "") {
            throw new Error("La descripción del gasto es obligatoria.");
        }

        const payer = this.participantRepo.findById(payerId);
        if (!payer) throw new Error("El participante que paga no existe.");

        // 2. Lógica Financiera
        const allParticipants = this.participantRepo.findAll();
        const splitAmount = totalAmount.amount / allParticipants.length;

        for (const participant of allParticipants) {
            if (participant.id !== payer.id) {
                participant.applyDebt(splitAmount);
            } else {
                participant.applyCredit(totalAmount.amount - splitAmount);
            }
            this.participantRepo.update(participant);
        }

        // 3. Registro Histórico (Nueva responsabilidad)
        const newExpense = new Expense(
            Date.now(), // ID simple basado en tiempo
            description,
            totalAmount,
            payerId
        );
        
        this.participantRepo.saveExpense(newExpense);
    }
}
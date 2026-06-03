import { usersTable, expensesTable } from '../repositories/Database.js';
import { User, Expense } from '../models/types.js';

export class ExpenseService {
    
    public getAllUsers(): User[] {
        return usersTable;
    }

    public getAllExpenses(): Expense[] {
        return expensesTable;
    }

    public registerExpense(payerId: number, amount: number, description: string) {
        if (amount <= 0) throw new Error("El monto debe ser mayor a cero.");

        const payer = usersTable.find(u => u.id === payerId);
        if (!payer) throw new Error("El usuario que paga no existe.");

        // Lógica dura acoplada a las estructuras de datos
        const participants = usersTable;
        const splitAmount = amount / participants.length;

        for (let user of participants) {
            if (user.id !== payerId) {
                user.balance -= splitAmount;
                payer.balance += splitAmount;
            }
        }

        const newExpense: Expense = {
            id: expensesTable.length + 1,
            payerId,
            amount,
            description,
            date: new Date().toISOString()
        };

        expensesTable.push(newExpense);
    }
}
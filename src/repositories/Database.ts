import { User, Expense } from '../models/types.js';

// Simulamos las tablas de una base de datos relacional
export const usersTable: User[] = [
    { id: 1, name: 'Luis', balance: 0 },
    { id: 2, name: 'Jonathan', balance: 0 },
    { id: 3, name: 'Esteban', balance: 0 }
];

export const expensesTable: Expense[] = [];
// Modelos anémicos: Solo datos, sin reglas de negocio
export interface User {
    id: number;
    name: string;
    balance: number;
}

export interface Expense {
    id: number;
    payerId: number;
    amount: number;
    description: string;
    date: string;
}
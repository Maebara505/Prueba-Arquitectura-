import { Request, Response } from 'express';
import { ExpenseService } from '../services/ExpenseService.js';

const expenseService = new ExpenseService();

export class ExpenseController {
    
    public renderDashboard(req: Request, res: Response) {
        const users = expenseService.getAllUsers();
        const expenses = expenseService.getAllExpenses();

        // Mantenemos la interfaz visual para la demostración
        const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>RoomieSmart - Monolito por Capas</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f9; }
                .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                h1, h2 { color: #333; }
                .balance-list, .expense-list { background: #eef; padding: 10px; border-radius: 5px; }
                .positive { color: green; font-weight: bold; }
                .negative { color: red; font-weight: bold; }
                input, select, button { display: block; width: 100%; margin-bottom: 15px; padding: 10px; box-sizing: border-box; }
                button { background-color: #28a745; color: white; border: none; cursor: pointer; font-size: 16px; }
                button:hover { background-color: #218838; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🍕 RoomieSmart (Monolito por Capas)</h1>
                <h2>Saldos Actuales</h2>
                <ul class="balance-list">
                    ${users.map(u => `<li>${u.name}: <span class="${u.balance >= 0 ? 'positive' : 'negative'}">$${u.balance.toFixed(2)}</span></li>`).join('')}
                </ul>
                <h2>Registrar Nuevo Gasto</h2>
                <form action="/api/expenses" method="POST">
                    <label>¿Quién pagó?</label>
                    <select name="payerId" required>
                        ${users.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
                    </select>
                    <label>Monto Total ($):</label>
                    <input type="number" name="amount" step="0.01" min="1" required>
                    <label>Descripción:</label>
                    <input type="text" name="description" required>
                    <button type="submit">Calcular y Registrar</button>
                </form>
                <h2>Historial</h2>
                <ul class="expense-list">
                    ${expenses.map(e => `<li><strong>${e.description}</strong>: $${e.amount} (Pagó: ${users.find(u => u.id === e.payerId)?.name})</li>`).join('')}
                </ul>
            </div>
        </body>
        </html>
        `;
        res.send(html);
    }

    public createExpense(req: Request, res: Response) {
        try {
            const payerId = parseInt(req.body.payerId as string);
            const amount = parseFloat(req.body.amount as string);
            const description = req.body.description as string;

            // Delegamos la lógica matemática al Servicio
            expenseService.registerExpense(payerId, amount, description);

            res.redirect('/');
        } catch (error: any) {
            res.status(400).send(`Error: ${error.message} <a href='/'>Volver</a>`);
        }
    }
}
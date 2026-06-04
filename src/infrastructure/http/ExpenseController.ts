import { Request, Response } from 'express';
import { RegisterSharedExpenseUseCase } from '../../application/RegisterSharedExpenseUseCase.js';
import { ParticipantRepository } from '../../domain/ports/ParticipantRepository.js';

export class ExpenseController {
    // El controlador recibe el Caso de Uso, no sabe nada de implementaciones técnicas de BBDD
    constructor(
        private registerExpenseUseCase: RegisterSharedExpenseUseCase,
        private participantRepo: ParticipantRepository 
    ) {}

    // Mantenemos una vista simple para demostrar el funcionamiento
    public renderView(req: Request, res: Response): void {
        const participants = this.participantRepo.findAll();
        
        let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>RoomieSmart - DDD & Hexagonal</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f9; }
                .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                h1, h2 { color: #333; }
                .balance-list { background: #eef; padding: 10px; border-radius: 5px; list-style-type: none; margin-bottom: 20px;}
                .balance-list li { margin-bottom: 5px; font-size: 1.1em; }
                .positive { color: green; font-weight: bold; }
                .negative { color: red; font-weight: bold; }
                input, select, button { display: block; width: 100%; margin-bottom: 15px; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
                button { background-color: #0056b3; color: white; border: none; cursor: pointer; font-size: 16px; }
                button:hover { background-color: #004494; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>💎 RoomieSmart (DDD & Hexagonal)</h1>
                <h2>Saldos Actuales</h2>
                <ul class="balance-list">
        `;
        
        participants.forEach(p => {
            const cssClass = p.balance >= 0 ? 'positive' : 'negative';
            html += `<li>${p.name}: <span class="${cssClass}">$${p.balance.toFixed(2)}</span></li>`;
        });

        html += `
                </ul>
                <h2>Registrar Nuevo Gasto</h2>
                <form action="/api/expenses" method="POST">
                    <label>ID del Pagador (1=Luis, 2=Jonathan, 3=Esteban):</label>
                    <input type="number" name="payerId" min="1" max="3" required>
                    
                    <label>Monto Total ($):</label>
                    <input type="number" step="0.01" name="amount" min="0.01" required>

                    <label>Descripción del gasto:</label>
                    <input type="text" name="description" placeholder="Ej: Pizza, Netflix..." required>
                    
                    <button type="submit">Registrar Gasto Compartido</button>
                </form>
            </div>
        </body>
        </html>`;
        
        res.send(html);
    }

    public registerExpense(req: Request, res: Response): void {
    try {
        const payerId = parseInt(req.body.payerId as string);
        const amount = parseFloat(req.body.amount as string);
        const description = req.body.description as string; // Capturamos el campo

        // Pasamos el nuevo parámetro al caso de uso
        this.registerExpenseUseCase.execute(payerId, amount, description);

        res.redirect('/');
    } catch (error: any) {
        res.status(400).send(`<h3>Error: ${error.message}</h3><a href="/">Volver</a>`);
    }
}
}
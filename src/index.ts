import express from 'express';
import { ExpenseController } from './controllers/ExpenseController.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const controller = new ExpenseController();

// El enrutador solo conecta rutas con métodos del controlador
app.get('/', (req, res) => controller.renderDashboard(req, res));
app.post('/api/expenses', (req, res) => controller.createExpense(req, res));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Monolito por Capas corriendo en http://localhost:${PORT}`);
});
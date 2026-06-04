import express from 'express';
import { InMemoryParticipantRepository } from './infrastructure/adapters/InMemoryParticipantRepository.js';
import { RegisterSharedExpenseUseCase } from './application/RegisterSharedExpenseUseCase.js';
import { ExpenseController } from './infrastructure/http/ExpenseController.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- INYECCIÓN DE DEPENDENCIAS (Wiring) ---
// 1. Instanciamos la Infraestructura (El adaptador de BBDD)
const participantRepo = new InMemoryParticipantRepository();

// 2. Instanciamos la Aplicación pasándole el puerto de BBDD
const registerExpenseUseCase = new RegisterSharedExpenseUseCase(participantRepo);

// 3. Instanciamos el Controlador (Adaptador Web) pasándole el Caso de Uso
const expenseController = new ExpenseController(registerExpenseUseCase, participantRepo);

// --- RUTAS ---
app.get('/', (req, res) => expenseController.renderView(req, res));
app.post('/api/expenses', (req, res) => expenseController.registerExpense(req, res));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Hexagonal/DDD corriendo en http://localhost:${PORT}`);
});
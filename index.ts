import express, { type Request, type Response } from "express";

const app = express();
// Permite leer JSON y también datos de formularios web estándar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulamos la Base de Datos en memoria
let users = [
  { id: 1, name: "Luis", balance: 0 },
  { id: 2, name: "Jonathan", balance: 0 },
  { id: 3, name: "Esteban", balance: 0 },
];

let expenses: any[] = [];

// RUTA GET: Muestra la Interfaz Gráfica (HTML mezclado en el backend)
app.get("/", (req: Request, res: Response) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>RoomieSmart - Espagueti</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f9; }
            .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h1, h2 { color: #333; }
            .balance-list, .expense-list { background: #eef; padding: 10px; border-radius: 5px; }
            .positive { color: green; font-weight: bold; }
            .negative { color: red; font-weight: bold; }
            input, select, button { display: block; width: 100%; margin-bottom: 15px; padding: 10px; box-sizing: border-box; }
            button { background-color: #0056b3; color: white; border: none; cursor: pointer; font-size: 16px; }
            button:hover { background-color: #004494; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🍕 RoomieSmart (Rama Espagueti)</h1>
            
            <h2>Saldos Actuales</h2>
            <ul class="balance-list">
                ${users
                  .map(
                    (u) => `
                    <li>
                        ${u.name}: 
                        <span class="${u.balance >= 0 ? "positive" : "negative"}">
                            $${u.balance.toFixed(2)}
                        </span>
                    </li>
                `,
                  )
                  .join("")}
            </ul>

            <h2>Registrar Nuevo Gasto</h2>
            <form action="/api/expenses" method="POST">
                <label>¿Quién pagó?</label>
                <select name="payerId" required>
                    ${users.map((u) => `<option value="${u.id}">${u.name}</option>`).join("")}
                </select>

                <label>Monto Total ($):</label>
                <input type="number" name="amount" step="0.01" min="1" required>

                <label>Descripción (Ej. Pizza, Internet):</label>
                <input type="text" name="description" required>

                <button type="submit">Calcular y Registrar</button>
            </form>

            <h2>Historial de Gastos</h2>
            <ul class="expense-list">
                ${expenses.length === 0 ? "<li>No hay gastos registrados aún.</li>" : ""}
                ${expenses
                  .map(
                    (e) => `
                    <li><strong>${e.description}</strong>: $${e.amount} (Pagó: ${users.find((u) => u.id === e.payerId)?.name})</li>
                `,
                  )
                  .join("")}
            </ul>
        </div>
    </body>
    </html>
    `;
  res.send(html);
});

// RUTA POST: Procesa el formulario web y recalcula saldos
app.post("/api/expenses", (req: Request, res: Response) => {
  try {
    // Los datos de un formulario web llegan como strings, hay que convertirlos
    const payerId = parseInt(req.body.payerId as string);
    const amount = parseFloat(req.body.amount as string);
    const description = req.body.description;

    // Para simplificar la demo, asumimos que el gasto siempre se divide entre todos los usuarios
    const participants = users.map((u) => u.id);

    if (amount <= 0)
      return res
        .status(400)
        .send("El monto debe ser mayor a cero. <a href='/'>Volver</a>");

    const payerExists = users.find((u) => u.id === payerId);
    if (!payerExists)
      return res.status(404).send("Usuario no existe. <a href='/'>Volver</a>");

    const splitAmount = amount / participants.length;

    // Lógica de cálculo mezclada
    for (let i = 0; i < participants.length; i++) {
      const participantId = participants[i];
      const user = users.find((u) => u.id === participantId);

      if (user && participantId !== payerId) {
        user.balance -= splitAmount;
        payerExists.balance += splitAmount;
      }
    }

    // Guardar el gasto
    expenses.push({
      id: expenses.length + 1,
      payerId,
      amount,
      description,
      date: new Date().toISOString(),
    });

    // En lugar de devolver un JSON aburrido, recargamos la página web para ver los cambios
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error en el servidor. <a href='/'>Volver</a>");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(
    `Servidor Espagueti VISUAL corriendo en http://localhost:${PORT}`,
  );
});

# 🍕 RoomieSmart - Fase 1: Código Espagueti (Big Ball of Mud)

Este repositorio contiene la primera fase de la Evaluación Sumativa I. El objetivo de esta rama (`spaghetti-code`) es demostrar el antipatrón de diseño conocido como "Código Espagueti", como punto de partida para evidenciar la evolución arquitectónica hacia un Monolito por Capas y, finalmente, hacia un enfoque de Diseño Guiado por el Dominio (DDD) con Arquitectura Hexagonal.

El dominio elegido es **RoomieSmart**, un gestor de gastos compartidos donde un grupo de usuarios puede registrar pagos comunes y el sistema calcula automáticamente las deudas cruzadas y saldos a favor.

---

## 🚀 Requisitos Previos

Para ejecutar este proyecto, necesitas tener instalado en tu entorno:

- [Node.js](https://nodejs.org/) (v16 o superior)
- npm (Gestor de paquetes de Node)

---

## 🛠️ Instalación y Configuración

1. Clona el repositorio y posiciónate en esta rama:
   \`\`\`bash
   git checkout feature/spaghetti-code
   \`\`\`

2. Instala las dependencias del proyecto (Express y TypeScript):
   \`\`\`bash
   npm install
   \`\`\`

3. Asegúrate de que tu archivo `package.json` tenga la propiedad `"type": "module"` configurada para soportar la sintaxis moderna de importaciones de ECMAScript.

---

## ▶️ Cómo ejecutar el proyecto

Dado que el proyecto utiliza TypeScript de forma directa sin un paso de compilación manual previo, levantaremos el servidor utilizando `ts-node`.

Ejecuta el siguiente comando en la terminal, en la raíz del proyecto:

\`\`\`bash
npx ts-node --esm index.ts
\`\`\`

Si la ejecución es exitosa, verás el siguiente mensaje en la consola:

> `Servidor Espagueti VISUAL corriendo en http://localhost:3000`

---

## 🖥️ Pruebas de Funcionamiento (Interfaz)

Para facilitar la evaluación de la lógica de negocio, esta rama incluye una interfaz gráfica acoplada.

1. Abre tu navegador web de preferencia.
2. Ingresa a la URL: **http://localhost:3000**
3. **Flujo de prueba:**
   - Observa los saldos iniciales (en $0.00).
   - Utiliza el formulario "Registrar Nuevo Gasto" seleccionando un pagador, ingresando un monto (ej. 30) y una descripción.
   - Haz clic en "Calcular y Registrar".
   - El sistema recargará la página automáticamente, mostrando el historial actualizado y los nuevos saldos calculados (saldos negativos en rojo indican deuda, saldos positivos en verde indican saldo a favor).

---

## 🛑 Análisis Arquitectónico: ¿Por qué esto es un antipatrón?

Como ingeniero de sistemas, es crucial identificar las deficiencias de esta implementación. Todo el sistema reside en el archivo `index.ts`, lo cual genera los siguientes problemas críticos:

1. **Violación del Principio de Responsabilidad Única (SRP):** El archivo inicializa el servidor web, define las estructuras de datos (simulando una base de datos en memoria), renderiza vistas HTML completas y procesa las matemáticas financieras de los saldos.
2. **Alto Acoplamiento y Baja Cohesión:** La lógica matemática pura de dividir los gastos está atrapada dentro de la función de enrutamiento web (`app.post`). Si quisiéramos reutilizar esta lógica en una aplicación móvil o en un proceso automatizado, sería imposible sin duplicar código.
3. **Ausencia de Modelado de Dominio:** Entidades clave del negocio como `Gasto`, `Cuota` o `Liquidación` no existen como objetos. Son simplemente variables primitivas manipuladas directamente.
4. **Imposibilidad de Pruebas Unitarias:** Para verificar si un cálculo de $120 entre 3 personas da como resultado una deuda de $40, es obligatorio levantar el servidor web completo y simular un evento HTTP POST a través de la red o un navegador.

**Siguiente paso evolutivo:** Rama `feature/layered-monolith` (Transición hacia una arquitectura de 3 capas impulsada por bases de datos).

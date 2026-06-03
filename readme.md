# 🍕 RoomieSmart - Fase 2: Monolítico por Capas (Data-Driven)

Esta rama (`feature/layered-monolith`) contiene la segunda fase evolutiva de la Evaluación Sumativa I. Tras abandonar el antipatrón de "Código Espagueti", el sistema ha sido refactorizado hacia una clásica **Arquitectura de 3 Capas**.

El objetivo de esta fase es demostrar la separación de responsabilidades técnicas y evidenciar el enfoque tradicional guiado por la base de datos (**BBDD vs DDD**), utilizando Modelos Anémicos.

---

## 🏗️ Estructura Arquitectónica

El código ahora se divide lógicamente en componentes con responsabilidades únicas (SRP):

1. **Capa de Presentación (`src/controllers`):** * Se encarga exclusivamente de recibir las peticiones HTTP, renderizar la interfaz HTML (vista) y manejar las redirecciones.
   * Delega toda la lógica de cálculo a la capa subyacente.
2. **Capa de Lógica de Negocio (`src/services`):** * Centraliza las reglas matemáticas (cálculo de cuotas y actualización de saldos). 
   * Actúa como intermediario entre los controladores y los datos.
3. **Capa de Acceso a Datos (`src/repositories`):** * Abstrae la persistencia de los datos. En este proyecto, simula las tablas de una base de datos relacional en memoria.
4. **Modelos Anémicos (`src/models`):** * Estructuras de datos puras (`User`, `Expense`) que solo contienen atributos (propiedades). No poseen comportamiento ni validaciones propias.

---

## 🚀 Requisitos y Ejecución

**Requisitos:** Node.js instalado en el sistema.

**Instalación:**
Si acabas de clonar esta rama, asegúrate de instalar las dependencias:
\`\`\`bash
npm install
\`\`\`

**Ejecución:**
Utilizamos `tsx` para compilar y ejecutar TypeScript al vuelo sin problemas de módulos:
\`\`\`bash
npx tsx src/index.ts
\`\`\`

La interfaz estará disponible en: **http://localhost:3000**

---

## 🛑 Análisis Crítico: Limitaciones de esta Arquitectura

Aunque esta estructura es infinitamente superior al Código Espagueti (es más fácil de mantener, leer y testear), presenta deficiencias típicas de los sistemas tradicionales que justifican la migración a **Domain-Driven Design (DDD)**:

1. **Enfoque Data-Driven (BBDD vs DDD):** El diseño del sistema comenzó pensando en "qué tablas necesito" (Usuarios, Gastos) en lugar de "qué comportamientos tiene el negocio".
2. **Modelos Anémicos:** Entidades como `User` son simples contenedores de datos. El cálculo de saldos ocurre en un `ExpenseService` gigante que extrae la información del usuario, la modifica y la vuelve a guardar. Esto rompe el principio de encapsulamiento de la Programación Orientada a Objetos.
3. **Falta de Lenguaje Ubicuo:** Los nombres de las clases y métodos son muy técnicos (`ExpenseService`, `createExpense`). En el negocio real de finanzas compartidas, conceptos como `Liquidación`, `Grupo`, o `Cuota` no están representados explícitamente en el código.
4. **Acoplamiento a la Infraestructura:** La lógica de negocio (`ExpenseService`) sigue conociendo directamente las herramientas de acceso a datos (`Database.ts`), lo que dificulta cambiar de motor de base de datos sin alterar las reglas del negocio.

**Siguiente paso evolutivo:** Rama `feature/ddd-hexagonal` (Implementación de Lenguaje Ubicuo, Contextos Acotados, Agregados, Puertos y Adaptadores).

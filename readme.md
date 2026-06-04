# 💎 RoomieSmart - Fase 3: DDD & Arquitectura Hexagonal

Esta rama (`feature/ddd-hexagonal`) contiene la fase final de la Evaluación Sumativa I. El sistema ha sido refactorizado aplicando **Domain-Driven Design (DDD)** y **Arquitectura Hexagonal (Puertos y Adaptadores)**.

El objetivo de esta fase es demostrar el aislamiento absoluto de la lógica de negocio, creando un sistema altamente testeable, mantenible y agnóstico a la infraestructura.

---

## 🏗️ Estructura Arquitectónica

El código se divide en tres capas concéntricas, respetando la Regla de Dependencia (de afuera hacia adentro):

1. **Capa de Dominio (`src/domain`):** El corazón del software.
   * **Modelos Ricos:** Entidades como `Participant` encapsulan su estado y exponen comportamientos explícitos (`applyDebt`, `applyCredit`).
   * **Value Objects:** Objetos como `Money` se autovalidan, garantizando que reglas de negocio críticas (ej. "el monto debe ser mayor a cero") se cumplan desde la instanciación.
   * **Puertos:** Interfaces (`ParticipantRepository`) que definen los contratos que la infraestructura debe cumplir.
2. **Capa de Aplicación (`src/application`):**
   * Contiene los Casos de Uso (`RegisterSharedExpenseUseCase`) que orquestan a las entidades del dominio para cumplir un flujo de negocio, sin conocer detalles técnicos de la web o bases de datos.
3. **Capa de Infraestructura (`src/infrastructure`):** Los Adaptadores.
   * **Adaptador de Entrada (HTTP):** Controladores de Express que traducen las peticiones web en llamadas al Caso de Uso.
   * **Adaptador de Salida (Base de Datos):** Implementación en memoria (`InMemoryParticipantRepository`) que cumple con el contrato del Puerto.

---

## 🚀 Ejecución

**Requisitos:** Node.js instalado.

\`\`\`bash
npm install
npx tsx src/index.ts
\`\`\`
La interfaz estará disponible en: **http://localhost:3000**

---

## 🏆 Justificación del Salto Arquitectónico

A diferencia de la rama anterior (Monolito por Capas / Data-Driven), donde las entidades eran modelos anémicos y el servicio era un script procedimental gigante, esta arquitectura ofrece:
* **Trazabilidad y Lenguaje Ubicuo:** El código habla el idioma del negocio financiero, no el idioma de la base de datos.
* **Inversión de Dependencias:** El dominio dicta las reglas a través de Puertos. Si en el futuro se requiere migrar de la memoria RAM a PostgreSQL, la lógica de negocio (Dominio y Casos de Uso) permanecerá intacta; solo se creará un nuevo Adaptador.

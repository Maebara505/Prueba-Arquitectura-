# 📊 Evaluación Sumativa I: Arquitectura de Software

**Proyecto:** RoomieSmart - Gestor de Gastos Compartidos
**Lenguaje:** TypeScript (Node.js)

Este repositorio contiene la evolución arquitectónica de un sistema de gestión de finanzas compartidas, demostrando la transición desde un código altamente acoplado hasta un diseño guiado por el dominio (DDD).

## 🗂️ Estructura del Repositorio

El proyecto está dividido en tres ramas, cada una representando una fase arquitectónica distinta con su respectiva documentación y código ejecutable:

1. **[Rama 1: feature/spaghetti-code]** * Implementación del antipatrón "Big Ball of Mud".
   * Interfaz, lógica de negocio y acceso a datos acoplados en un solo archivo.

2. **[Rama 2: feature/layered-monolith]** * Refactorización a Arquitectura de 3 Capas.
   * Enfoque Data-Driven (BBDD vs DDD) con Modelos Anémicos y servicios centralizados.

3. **[Rama 3: feature/ddd-hexagonal]** * *(En desarrollo)*
   * Implementación de Domain-Driven Design (DDD) y Arquitectura Hexagonal.
   * Uso de Lenguaje Ubicuo, Contextos Acotados y separación por Puertos y Adaptadores.

---
**Instrucciones de revisión:**
Por favor, cambie a la rama deseada (`git checkout <nombre-de-la-rama>`) y lea el `README.md` específico de esa fase para obtener las instrucciones de ejecución y el análisis arquitectónico.
# Automatización con Maestro

- Los escenarios Gherkin viven en `features/` y los pasos en `steps/`.
- Los escenarios Cucumber describen los resultados en español. `steps/verification.ts` ejecuta el flujo YAML `.maestro/verification.yaml` sobre la app de prueba Android. Usa identificadores de accesibilidad o Android comprobados en la jerarquía.
- Usa `npm run qa:check` para validar sintaxis y trazabilidad. Usa `npm run dry-run` para validar el enlace de Cucumber y `npm test` con la app instalada para ejecutar.
- Consulta [la guía ISTQB](docs/qa.md) para diseñar pruebas y [la skill de diagnóstico](.agents/skills/qa-triage/SKILL.md) para analizar fallos. Conserva los IDs y usa datos sintéticos.

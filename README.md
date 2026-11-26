# Maestro + Cucumber + Allure

Automatización Android con flujos Maestro en YAML, escenarios Cucumber en español, pasos en TypeScript y evidencias en Allure y JUnit. El repositorio incluye una app Android mínima y datos sintéticos para repetir las pruebas localmente y en GitHub Actions.

## Requisitos

- Node.js 24, JDK 17, Android SDK Platform 35 y Build Tools 35.0.0.
- Gradle 8.11.1 y un emulador Android iniciado, por ejemplo API 35. Comprueba la conexión con `adb devices`.
- Maestro CLI 2.12.1 disponible en el PATH. [Instalación oficial](https://docs.maestro.dev/maestro-cli/how-to-install-maestro-cli)

## Ejecutar

Desde la raíz del repositorio, apunta `ANDROID_HOME` a tu SDK y ejecuta:

```bash
npm ci
gradle :android-fixture:assembleDebug
adb install -r android-fixture/build/outputs/apk/debug/android-fixture-debug.apk
npm test
npm run report
```

El flujo positivo se puede ejecutar directamente con `maestro test -e PIN=2468 -e EXPECTED_ID=qa_accepted .maestro/verification.yaml`. Para ejecutar un solo escenario, usa `npm test -- --tags @QA-MOB-102`.

Cucumber ejecuta los casos en serie sobre un dispositivo. Cada caso genera su JUnit y diagnóstico en `artifacts/maestro/`. Allure guarda sus resultados en `allure-results/` y agrega el XML y las capturas de fallo cuando Maestro las produce. Los resultados Allure se acumulan en el directorio configurado. Usa un directorio nuevo por ejecución con `ALLURE_RESULTS_DIR` cuando necesites aislar los resultados.

## Verificar sin emulador

```bash
npm run qa:check
npm run typecheck
npm run dry-run
```

Para inspeccionar la app y ejecutar flujos con un agente local, la [guía de pruebas](docs/qa.md) explica la configuración de Maestro MCP, las skills de Codex, los hooks y las prácticas ISTQB de diseño y diagnóstico.

## Conexiones con herramientas de QA

La [guía de conexiones](docs/integraciones-qa.md) explica cómo configurar Figma, Jira, Zephyr y Slack desde tu cliente de IA y cómo usar la skill de QA del repositorio para relacionar requisitos, pruebas y evidencias.

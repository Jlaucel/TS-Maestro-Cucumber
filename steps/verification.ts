import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync } from 'node:fs';
import { Before, Then, When, setDefaultTimeout } from '@cucumber/cucumber';
import type { IWorld } from '@cucumber/cucumber';

interface VerificationWorld extends IWorld {
  caseId: string;
  pin: string;
}

setDefaultTimeout(180_000);

Before(function (this: VerificationWorld, { pickle }) {
  const tag = pickle.tags.find(({ name }) => /^@QA-MOB-\d{3,}$/.test(name));
  assert.ok(tag, 'El escenario requiere un ID @QA-MOB-NNN.');
  this.caseId = tag.name.slice(1);
});

When('ingreso el código sintético {string}', function (this: VerificationWorld, pin: string) {
  assert.match(pin, /^\d{1,8}$/, 'El fixture solo admite códigos sintéticos de hasta ocho dígitos.');
  this.pin = pin;
});

Then('el resultado de la verificación es {string}', async function (this: VerificationWorld, state: string) {
  assert.ok(state === 'accepted' || state === 'rejected', 'Estado esperado: accepted o rejected.');
  assert.ok(this.pin, 'El escenario debe proporcionar el código sintético.');
  const base = 'artifacts/maestro';
  mkdirSync(base, { recursive: true });
  const directory = mkdtempSync(`${base}/${this.caseId}-`);
  const report = `${directory}/junit.xml`;
  const debug = `${directory}/debug`;
  const args = [
    'test', '--format', 'junit', '--output', report,
    '--test-output-dir', debug, '--debug-output', debug,
    '-e', `PIN=${this.pin}`, '-e', `EXPECTED_ID=qa_${state}`,
    '.maestro/verification.yaml',
  ];

  // Maestro usa un lanzador .bat en Windows. Estos argumentos son constantes o valores validados.
  const result = process.platform === 'win32'
    ? spawnSync('cmd.exe', ['/d', '/s', '/c', `maestro.bat ${args.join(' ')}`],
        { stdio: 'inherit', timeout: 150_000, windowsHide: true })
    : spawnSync('maestro', args, { stdio: 'inherit', timeout: 150_000 });

  try {
    await this.attach(readFileSync(report).toString('utf8'), 'application/xml');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }

  if (result.status !== 0) {
    const screenshots = readdirSync(directory, { recursive: true, withFileTypes: true })
      .filter((file) => file.isFile() && file.name.toLowerCase().endsWith('.png'));
    for (const screenshot of screenshots) {
      await this.attach(readFileSync(`${screenshot.parentPath}/${screenshot.name}`), 'image/png');
    }
  }

  if (result.error) {
    throw new Error('No se pudo ejecutar Maestro. Verifica el CLI, Java y el dispositivo Android.', { cause: result.error });
  }
  assert.equal(result.status, 0, `Maestro falló en ${this.caseId}. Evidencia en ${directory}.`);
});

# language: es
Característica: Verificación de código en la app Android de prueba

  @QA-MOB-101 @risk-high @smoke
  Escenario: Aceptar el código registrado de cuatro dígitos
    Cuando ingreso el código sintético "2468"
    Entonces el resultado de la verificación es "accepted"

  @QA-MOB-102 @risk-high @smoke
  Escenario: Rechazar un código de tres dígitos
    Cuando ingreso el código sintético "246"
    Entonces el resultado de la verificación es "rejected"

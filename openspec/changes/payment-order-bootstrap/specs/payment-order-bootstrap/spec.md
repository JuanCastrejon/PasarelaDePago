## ADDED Requirements

### Requirement: Crear payment order independiente del proveedor

El sistema SHALL permitir crear una `payment_order` sin requerir proveedor,
`payment_attempt` ni `checkout_session` en la primera vertical.

#### Scenario: Creacion exitosa de orden minima

- **GIVEN** una solicitud valida para crear una orden
- **WHEN** la plataforma procesa el request
- **THEN** crea una `payment_order` independiente del proveedor
- **AND** no crea automaticamente un `payment_attempt`

### Requirement: Respuesta inicial canonica

El sistema SHALL responder la creacion inicial de orden con una estructura
canonica agnostica del proveedor.

#### Scenario: Respuesta HTTP inicial

- **GIVEN** una `payment_order` creada exitosamente
- **WHEN** la API responde al cliente
- **THEN** devuelve `201`
- **AND** la respuesta no incluye campos tecnicos propios de un proveedor

### Requirement: Alcance excluye ejecucion de cobro

El sistema SHALL dejar explicito que la capacidad inicial no ejecuta cobro ni
crea `payment_attempt`.

#### Scenario: Rechazo de expectativas fuera de alcance

- **GIVEN** una revision del contrato de la capacidad
- **WHEN** se inspecciona el alcance funcional de `payment-order-bootstrap`
- **THEN** queda explicito que no hay routing, fallback, proveedor real ni persistencia completa

# ShipNow API

API REST para administrar la operación de una logística de distribución: usuarios, productos, pedidos y entregas. También incluye generación de datos de prueba y documentación interactiva con Swagger.

## Funcionalidades

- CRUD de usuarios, productos, pedidos y entregas.
- Suite automatizada de pruebas de servicios, rutas HTTP y generadores/endpoints de mocks, ejecutada contra una base de datos de prueba aislada.
- Gestión de roles, estados y prioridades mediante constantes centralizadas.
- Cálculo del total de un pedido a partir de los productos y cantidades recibidos.
- Validación de referencias entre entidades: un pedido requiere un usuario y productos existentes; una entrega requiere un pedido existente y, si se asigna, un usuario con rol `courier`.
- Módulo de mocks para usuarios, productos, pedidos y entregas, con opción de persistirlos en MongoDB fuera de producción.
- Manejo centralizado de errores y logging con rotación diaria de archivos.
- Documentación OpenAPI disponible desde Swagger UI.

## Tecnologías

- Node.js con Express 5 y ECMAScript Modules.
- MongoDB con Mongoose.
- Swagger (`swagger-jsdoc` y `swagger-ui-express`).
- Winston y `winston-daily-rotate-file` para logs.
- Faker para la generación de datos de prueba.
- pnpm como gestor de dependencias.

## Requisitos e instalación

Se necesita una instancia de MongoDB accesible mediante URI (Atlas o local), Node.js y pnpm.

```bash
git clone <url-del-repositorio>
cd ShipNow
pnpm install
```

Crear un archivo `.env` en la raíz a partir de `.env.example`:

```env
PORT=3000
MONGO_KEY=mongodb+srv://<usuario>:<password>@<cluster>/<base-de-datos>
MONGO_KEY_TEST=mongodb+srv://<usuario>:<password>@<cluster>/<base-de-datos-de-prueba>
NODE_ENV=development
JWT_SECRET=<secreto>
```

La aplicación valida `PORT`, `MONGO_KEY`, `NODE_ENV` y `JWT_SECRET` antes de iniciar. Al ejecutar pruebas, también requiere `MONGO_KEY_TEST`. `MONGO_KEY` se usa fuera de pruebas y `MONGO_KEY_TEST` es la URI exclusiva de la suite; deben apuntar a bases de datos diferentes. Luego ejecutar:

```bash
pnpm run dev
```

El servidor queda disponible en `http://localhost:<PORT>`.

## Documentación Swagger

Con el servidor en ejecución, la documentación interactiva está disponible en:

```text
GET http://localhost:<PORT>/api/docs
```

La especificación se construye en `src/config/swagger.js` con OpenAPI 3.0. Allí se registra el servidor de desarrollo, las etiquetas de cada módulo y el patrón que carga los archivos `src/docs/**/*.yaml`.

Los YAML definen los paths y operaciones documentadas, separados por dominio:

| Archivo | Contenido |
|---|---|
| `health.yaml` | Estado del servidor. |
| `logger.yaml` | Endpoint de diagnóstico del logger. |
| `users.yaml` | Operaciones y filtros de usuarios. |
| `products.yaml` | Operaciones de productos y catálogo disponible. |
| `orders.yaml` | Operaciones de pedidos. |
| `deliveries.yaml` | Operaciones de entregas. |
| `mocks.yaml` | Generación y persistencia de datos de prueba. |

Para evitar repetir definiciones, los YAML usan referencias a los grupos declarados en `src/docs/components/`:

| Archivo | Grupo de componentes | Qué almacena |
|---|---|---|
| `schemas.js` | `GoodRqSchemas`, `BadRqSchemas` | Estructuras y ejemplos de cuerpos de respuesta exitosos y de error. |
| `responses.js` | `GoodResponses`, `BadResponses` | Respuestas HTTP reutilizables para los distintos endpoints, incluidas las respuestas de error. |
| `requestBodies.js` | `RequestBodies` | Cuerpos JSON reutilizables para crear o actualizar recursos y para generar mocks. |
| `parameters.js` | `Parameters` | Parámetros de ruta (`uid`, `pid`, `oid`, `did`) y de consulta (`role`, `email`, `count`). |

Por ejemplo, un YAML referencia un recurso compartido con `$ref: "#/components/<grupo>/<componente>"`. Al agregar un endpoint, se debe documentar su path en el YAML del dominio y reutilizar —o incorporar— el componente correspondiente para sus parámetros, cuerpo y respuestas.

## Arquitectura

La aplicación separa responsabilidades en tres capas:

```text
Router → Controller → Service → Repository → Model (Mongoose)
```

- **Router:** asocia métodos y paths HTTP con controllers.
- **Controller:** recibe la petición, delega en el servicio y envía la respuesta HTTP.
- **Service:** concentra reglas de negocio y validaciones del dominio.
- **Repository:** encapsula el acceso a Mongoose/MongoDB.
- **Model:** define los esquemas y restricciones de persistencia.

Estructura principal:

```text
src/
├── config/        # Entorno, base de datos, Swagger y logger
├── constants/     # Roles, estados y prioridades del dominio
├── controllers/   # Adaptadores HTTP
├── docs/          # Paths YAML y componentes reutilizables de Swagger
├── errors/        # CustomError y catálogo de códigos
├── middlewares/   # Rutas inexistentes y manejo global de errores
├── mocks/         # Router, controller, service y repository de datos de prueba
├── models/        # Esquemas de Mongoose
├── repositories/  # Acceso a datos
├── routes/        # Definición de endpoints
└── services/      # Lógica de negocio
```

## Dominio y reglas principales

| Entidad | Descripción |
|---|---|
| `User` | Tiene nombre, apellido, email único, contraseña y rol: `user`, `admin` o `courier`. |
| `Product` | Tiene código único, precio, stock, categoría, imágenes y estado: `draft`, `available`, `out_of_stock`, `arriving_soon` o `discontinued`. |
| `Order` | Pertenece a un usuario y contiene uno o más productos con cantidad. El total se calcula en el servicio. Sus estados son `pending`, `payment_validated`, `packaged`, `dispatched` y `cancelled`; sus prioridades son `low`, `medium` y `high`. |
| `Delivery` | Se asocia a un pedido y opcionalmente a un repartidor. Sus estados son `pending`, `on_the_way`, `delivered` y `not_delivered`. La fecha estimada final debe ser posterior a la inicial. |

## Endpoints

La especificación de Swagger es la referencia para cuerpos, ejemplos y respuestas por operación. Este es el mapa de rutas implementadas:

| Recurso | Operaciones |
|---|---|
| Salud | `GET /api/health` |
| Logger | `GET /logger-test` |
| Usuarios | `GET`, `POST /api/users`; `GET /api/users/role?role=<rol>`; `GET /api/users/email?email=<email>`; `GET`, `PUT`, `DELETE /api/users/:uid` |
| Productos | `GET`, `POST /api/products`; `GET /api/products/available`; `GET`, `PUT`, `DELETE /api/products/:pid` |
| Pedidos | `GET`, `POST /api/orders`; `GET`, `PUT`, `DELETE /api/orders/:oid` |
| Entregas | `GET`, `POST /api/deliveries`; `GET`, `PUT`, `DELETE /api/deliveries/:did` |
| Mocks* | `GET`, `POST /api/mocks/users`; `GET`, `POST /api/mocks/products`; `GET`, `POST /api/mocks/orders`; `GET`, `POST /api/mocks/deliveries` |

\* Las rutas de mocks solo se montan cuando `NODE_ENV` es distinto de `production`.

## Carga de documentos en actualizaciones

Los endpoints de actualizacion de usuarios y pedidos usan Multer. Las actualizaciones sin archivo pueden enviarse como `application/json`; para adjuntar un archivo se debe usar `multipart/form-data`.

| Ruta | Middleware | Campo de archivo | Destino | Tipo de documento admitido |
|---|---|---|---|---|
| `PUT /api/users/:uid` | `uploadDocument.single("documents")` | `documents` | `src/uploads/documents/` | `id_document`, `profile_photo`, `courier_license` o `payment_receipt`. `courier_license` solo es valido para usuarios con rol `courier`. |
| `PUT /api/orders/:oid` | `uploadReceipt.single("documents")` | `documents` | `src/uploads/receipts/` | Solo `payment_receipt`. |

Aunque el campo se llama `documents`, cada solicitud acepta un unico archivo porque ambas rutas usan `.single("documents")`. Multer crea el directorio de destino cuando no existe y genera un nombre con prefijo y marca de tiempo para evitar colisiones: `document-<timestamp>-<nombre-original>` para usuarios y `receipt-<timestamp>-<nombre-original>` para pedidos.

Al enviar un archivo, `documentType` es obligatorio. La API guarda en el recurso el nombre original, nombre generado, tipo MIME, tamano, tipo de documento y fecha de carga. Cada usuario y pedido puede conservar hasta tres documentos; no se permite repetir el nombre original dentro del mismo recurso.

Las validaciones de Multer son comunes a ambos endpoints:

- Formatos permitidos: `image/png`, `image/jpeg` y `application/pdf`.
- Tamano maximo: 5 MB por archivo.
- Campo esperado: `documents`.

Ejemplo de actualizacion de usuario sin archivo:

```bash
curl -X PUT http://localhost:3000/api/users/<uid> \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Jane","role":"courier"}'
```

Ejemplo de carga de una licencia para un repartidor existente. Si el usuario todavia no tiene rol `courier`, se envia `role=courier` en la misma solicitud:

```bash
curl -X PUT http://localhost:3000/api/users/<uid> \
  -F "documents=@./licencia.pdf;type=application/pdf" \
  -F "documentType=courier_license" \
  -F "role=courier"
```

Ejemplo de carga de comprobante de pago en un pedido:

```bash
curl -X PUT http://localhost:3000/api/orders/<oid> \
  -F "documents=@./comprobante.pdf;type=application/pdf" \
  -F "documentType=payment_receipt"
```

En ambos casos la respuesta exitosa es `200` e incluye el recurso actualizado, el arreglo `documents` y `uploadedDocumentType` cuando se adjunto un archivo. Los errores esperados durante una actualizacion con archivo son:

| Estado | Codigo | Cuando ocurre |
|---|---|---|
| `400` | `INVALID_FILE_TYPE` | El archivo no es PNG, JPEG o PDF. |
| `400` | `INVALID_DOCUMENT_TYPE` | Falta `documentType` al adjuntar un archivo, el tipo no es valido para un usuario o se intenta cargar `courier_license` en un usuario que no es repartidor. |
| `400` | `BAD_REQUEST` | No se envian campos para actualizar, el campo de archivo es distinto de `documents`, se alcanza el limite de tres documentos o un pedido recibe un tipo diferente de `payment_receipt`. |
| `400` | `INVALID_ID` | El parametro `uid` u `oid` no tiene un formato valido. |
| `404` | `NOT_FOUND` | No existe el usuario, pedido o recurso relacionado indicado. |
| `409` | `DUPLICATE_KEY` | Ya existe un documento con el mismo nombre original en el recurso. |
| `413` | `FILE_TOO_LARGE` | El archivo supera los 5 MB. |
| `422` | `VALIDATION_ERROR` | Un campo de la actualizacion no cumple las validaciones del modelo. |

Swagger documenta los dos formatos de cuerpo, los campos condicionalmente requeridos y estas respuestas en `PUT /api/users/{uid}` y `PUT /api/orders/{oid}`.

## Mocks

Los endpoints `GET /api/mocks/<recurso>?count=N` generan datos sin persistirlos. Si `count` no se envía, se generan 100 elementos; el valor se convierte a entero y debe quedar entre 1 y 100.

Los endpoints `POST /api/mocks/<recurso>` aceptan:

```json
{
  "count": 10,
  "saveToDatabase": true
}
```

`count` es obligatorio en las solicitudes `POST`, se convierte a entero y debe estar entre 1 y 100. Un valor ausente o inválido devuelve `400` con el código `INVALID_MOCK_COUNT`. Con `saveToDatabase: true`, los datos se insertan en MongoDB y la respuesta es `201`. Si es `false` o se omite, se generan pero no se guardan y se responde `200`.

- Los mocks de usuarios generan roles válidos al azar.
- Los de productos generan código, precio, stock, categoría, miniaturas y un estado válido.
- Los de pedidos requieren usuarios y productos ya existentes.
- Los de entregas requieren pedidos existentes; solo asignan repartidor si hay usuarios con rol `courier`.

Para persistir datos relacionados, el orden recomendado es: usuarios, productos, pedidos y finalmente entregas.

Cuando se solicita persistencia, la respuesta `201` incluye en `payload` los documentos devueltos por MongoDB, por lo que incorpora los datos asignados durante el guardado (por ejemplo, identificadores). Esto permite usar la respuesta inmediatamente en operaciones posteriores. Si no se solicita persistencia, la respuesta es `200` y contiene solamente los mocks generados.

## Pruebas automatizadas

El proyecto cuenta con una suite basada en **Mocha**, **Chai** y **Supertest**. Faker se utiliza para preparar datos válidos y variables en las pruebas. Los archivos se encuentran bajo `test/` y Mocha detecta los que terminan en `.test.js` dentro de sus subdirectorios.

La suite se ejecuta con:

```bash
pnpm test
```

El script configurado es:

```json
"test": "cross-env NODE_ENV=test mocha \"test/**/*.test.js\""
```

`cross-env` establece `NODE_ENV=test` solo para el proceso de esa ejecución, de forma compatible con distintos sistemas operativos; no modifica el archivo `.env` ni el entorno de la terminal. Al iniciarse las pruebas, `getDbUri()` selecciona `MONGO_KEY_TEST` en lugar de `MONGO_KEY`. Si esa variable no está definida, la aplicación detiene el inicio con un error para evitar ejecutar pruebas contra la base de datos habitual.

Antes de correrlas, completar el archivo `.env` con todas las variables requeridas. Un ejemplo de separación segura es:

```env
PORT=3000
MONGO_KEY=mongodb+srv://<usuario>:<password>@<cluster>/shipnow
MONGO_KEY_TEST=mongodb+srv://<usuario>:<password>@<cluster>/shipnow_test
NODE_ENV=development
JWT_SECRET=<secreto>
```

Aunque `NODE_ENV` figure como `development` en `.env`, `pnpm test` lo reemplaza temporalmente por `test`. `PORT`, `MONGO_KEY` y `JWT_SECRET` siguen siendo necesarios porque la validación de entorno exige todas las variables declaradas; la conexión efectiva de la suite usa únicamente `MONGO_KEY_TEST`.

Las pruebas son de integración con MongoDB, no usan una base de datos en memoria. El helper `src/utils/test.utils.js` abre la conexión y el servidor antes de cada bloque de pruebas, y los cierra al finalizar. Las pruebas que persisten entidades eliminan los registros de prueba que generan como parte de su limpieza; de todos modos, la URI de pruebas debe ser una base de datos desechable y nunca la de producción.

La cobertura actual se organiza de esta manera:

| Ubicación | Alcance |
|---|---|
| `test/services/` | Reglas de negocio de usuarios, productos, pedidos y entregas: altas, actualizaciones, eliminaciones y validaciones de datos, estados, roles y referencias. |
| `test/routes/` | Respuestas HTTP de usuarios, productos, pedidos y entregas, además de las rutas de Swagger y logger. Se comprueban casos correctos y errores esperados. |
| `test/mocks/` | Generación de mocks de usuarios, productos, pedidos y entregas, validación de cantidades y rutas `GET`/`POST` de mocks. |

En particular, las pruebas de rutas de mocks verifican los tres comportamientos principales para cada recurso: generación sin persistir (`200`), generación con persistencia (`201`) y rechazo de una cantidad inválida (`400` con `INVALID_MOCK_COUNT`). Para pedidos y entregas, la base de prueba debe disponer de las entidades relacionadas que exigen sus generadores; de lo contrario, la API responde `MOCK_DATA_NOT_FOUND`.

## Errores y logging

Los controllers delegan los errores en un middleware centralizado. `CustomError` y `ERROR_CODES` definen códigos como `NOT_FOUND`, `INVALID_ID`, `BAD_REQUEST`, `VALIDATION_ERROR`, `DUPLICATE_KEY`, `INVALID_MOCK_COUNT` y `MOCK_DATA_NOT_FOUND`. Los errores de Mongoose y de conexión también se convierten a una respuesta segura y uniforme:

```json
{
  "status": "Error",
  "error": "NOT_FOUND",
  "message": "Producto no encontrado."
}
```

Winston registra en consola y guarda errores en `logs/error.log`; además crea archivos diarios `logs/error-YYYY-MM-DD.log` y conserva los últimos 14 días. El nivel mínimo es `debug` en desarrollo e `info` en producción. `GET /logger-test` emite un mensaje en cada nivel configurado.

## Estado actual y consideraciones de seguridad

La autenticación con JWT y la autorización por rol aún no están implementadas, aunque `JWT_SECRET` ya es una variable requerida. En particular, `GET /api/users/email` actualmente devuelve la contraseña almacenada y no está protegido. No se debe exponer esta API en producción hasta implementar autenticación, autorización y hasheo de contraseñas.

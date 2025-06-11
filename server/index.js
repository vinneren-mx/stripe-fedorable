const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

// Importar función para obtener productos desde Stripe
const obtenerProductos = require('./stripe');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middlewares
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.json());

// Rutas
app.get('/', async (req, res) => {
    const productos = await obtenerProductos();
    const destacados = productos.slice(0, 3); // los primeros 3
    res.render('home', { productos: destacados });
  });

app.get('/productos', async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.render('productos', { productos });
  } catch (error) {
    console.error('Error cargando productos:', error.message);
    res.status(500).send('Error al cargar productos.');
  }
});

app.get('/contacto', (req, res) => res.render('contacto'));
app.get('/quienes-somos', (req, res) => res.render('quienes'));
app.get('/checkout', (req, res) => res.render('checkout'));

app.get('/success', (req, res) => res.render('success'));
app.get('/cancel', (req, res) => res.render('cancel'));


// BEGIN YOUR CODING CHALLENGES HERE (Creación de sesión de pago con Stripe)
// Desafío 1: Crear una ruta POST '/create-checkout-session'
// Esta ruta debe recibir un arreglo con los productos del carrito desde el frontend.
// Usar 'stripe.checkout.sessions.create' para crear una sesión de pago con esos productos.
// Recuerda que cada producto debe incluir:
// - product_data: { name }
// - unit_amount (precio en centavos)
// - currency
// Luego, enviar al cliente el 'session.url' para redirigirlo al Checkout de Stripe.

// Desafío 2: Agregar validación de datos del carrito
// Asegurarse de que el arreglo de productos existe y que cada ítem tiene id, nombre y precio.

// Desafío 3: Manejar errores
// Si Stripe lanza un error, devolver un status 500 con el mensaje.

// Desafío 4 (opcional): Registrar en consola cada sesión creada con su total y hora.

// Ejemplo de estructura esperada (pseudocódigo):
// const session = await stripe.checkout.sessions.create({
//   line_items: [...],
//   mode: 'payment',
//   success_url: 'http://localhost:3000/success',
//   cancel_url: 'http://localhost:3000/cancel',
// });
// res.json({ url: session.url });
// app.post('/create-checkout-session', async (req, res) => { ... });





// BEGIN YOUR CODING CHALLENGES HERE (Escucha y firmado de eventos WebHook de Stripe)

// Desafío Webhook: Escuchar eventos desde Stripe

// Paso 1: Crea un endpoint POST '/webhook'
// Este endpoint debe usar 'express.raw({type: 'application/json'})' para leer el cuerpo sin parsear
// Debes verificar la firma del webhook con stripe.webhooks.constructEvent

// Paso 2: Usa tu STRIPE_WEBHOOK_SECRET para validar los eventos entrantes
// En el archivo del servidor, navega al mensaje del ejercicio de firma de webhook. Copia todo el mensaje.
// Navega a tu implementación del endpoint /webhook. Dentro del endpoint, justo después de la definición del endpoint, pega el mensaje del ejercicio.

// Usando los comentarios como guía, crea lógica para verificar que el evento provenga de Stripe.

// Para probarlo:
// 1. Inicia la aplicación Fedorable con `npm run dev`
// 2. En la otra terminal, reenvía los eventos a tu endpoint:
//    stripe listen --forward-to localhost:3000/webhook
// 3. Navega a la tienda y realiza un pago de prueba exitoso (tarjeta: 4242 4242 4242 4242)
// 4. Observa el registro de la consola para validar que la firma del webhook ocurrió.
//
// Para ver la verificación en acción:
// - Detén la aplicación Fedorable (deja activo el escucha de webhook)
// - En el archivo .env, comenta la variable STRIPE_WEBHOOK_SECRET
// - Reinicia la app y realiza otro pago exitoso
// - Observa que ahora se lanza un error al intentar verificar la firma
//
// Por último:
// - Detén la aplicación y el escucha del webhook con Ctrl+C
// - Descomenta la variable STRIPE_WEBHOOK_SECRET en .env para validar los eventos entrantes
// Puedes capturar eventos como:
// - 'checkout.session.completed'
// - 'payment_intent.succeeded'
// - 'payment_intent.payment_failed'

// Paso 3: Imprime en consola el tipo de evento y su ID para confirmar que lo recibiste
// Ejemplo:
// console.log(`🔔 Evento recibido: ${event.type}`);

// Paso 4: Para probarlo:
// 1. Inicia el servidor con `npm run dev`
// 2. En otra terminal, corre:
//    stripe listen --forward-to localhost:3000/webhook
// 3. Realiza una compra con tarjeta de prueba (por ejemplo: 4242 4242 4242 4242)
// 4. Observa la consola del servidor y la de Stripe CLI

// Recuerda detener ambos procesos con Ctrl+C cuando termines.

// --- Aquí es donde puedes implementar la lógica del webhook ---
// app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.log(`⚠️  Webhook error: ${err.message}`);
//     return res.sendStatus(400);
//   }
//   console.log(`🔔 Evento recibido: ${event.type}`);
//   res.send();
// });


// BEGIN YOUR CODING CHALLENGES HERE (Configuracion de envio)

// ✅ Paso 1: Habilitar la recopilación de dirección de envío
// Dentro del objeto de configuración de la sesión de Checkout,
// agrega una propiedad llamada `shipping_address_collection`.
// Dentro de ella, define qué países se permiten para la dirección de envío.
// Por ejemplo, puedes permitir solo 'MX' si solo haces envíos dentro de México.

// ✅ Paso 2: Definir las opciones de envío
// Agrega una propiedad `shipping_options`, que será un arreglo.
// Dentro del arreglo, crea al menos dos opciones de envío usando `shipping_rate_data`.
// Cada opción debe incluir:
// - El tipo de tarifa (usa 'fixed_amount')
// - El monto fijo y la moneda (por ejemplo, 0 MXN o 1500 MXN en centavos)
// - Un nombre visible (`display_name`), como "Envío estándar" o "Exprés"
// - Un estimado de entrega (`delivery_estimate`) con días mínimos y máximos.

// ✅ Paso 3: Insertar estas propiedades antes de `success_url` y `cancel_url`
// Asegúrate de que estas configuraciones se encuentren dentro del objeto pasado a `stripe.checkout.sessions.create()`.
// Esto permitirá que el usuario vea los métodos de envío disponibles al momento de pagar.

// ✅ Paso 4: Probar en la app
// Ejecuta la aplicación Fedorable, agrega productos al carrito y procede al pago.
// Deberías ver que se solicita una dirección de envío y aparecen las dos opciones de envío que configuraste.


// BEGIN YOUR CODING CHALLENGES HERE (Fraude temprano y reembolsos)

// Desafío 1: Detectar eventos de alerta temprana de fraude
// Stripe envía un evento llamado 'charge.dispute.created' cuando detecta una posible actividad fraudulenta.

// Verificamos si el evento es de tipo 'charge.dispute.created'
// if (event.type === 'charge.dispute.created') {
//   const chargeId = event.data.object.charge;

//   // Desafío 2: Reembolsar automáticamente el cargo asociado
//   stripe.refunds.create({ charge: chargeId })
//     .then(refund => {
//       console.log(`💰 Reembolso exitoso por alerta de fraude. ID de cargo: ${chargeId}, ID de reembolso: ${refund.id}`);
//     })
//     .catch(err => {
//       console.error('❌ Error al reembolsar automáticamente:', err.message);
//     });
// }


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`));

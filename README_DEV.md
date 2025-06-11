# 🧪 Fedorable - Coding Challenges para Stripe Checkout

Este archivo contiene los retos que el equipo de desarrollo debe completar para habilitar Stripe Checkout dentro de la tienda Fedorable.

---

## ✅ Desafío 1: Crear la ruta `/create-checkout-session`

Crea una ruta `POST` en el backend que:

- Reciba desde el frontend un arreglo llamado `carrito` con productos.
- Cada producto debe contener:
  - `id`
  - `nombre`
  - `precio` (en pesos MXN)

**Objetivo:** Usar `stripe.checkout.sessions.create()` para crear una sesión de pago.

```js
const session = await stripe.checkout.sessions.create({
  line_items: [...],
  mode: 'payment',
  success_url: 'http://localhost:3000/success',
  cancel_url: 'http://localhost:3000/cancel',
});
```

Debes retornar:

```js
res.json({ url: session.url });
```

---

## 🧪 Desafío 2: Validación del carrito

Antes de procesar el pago:

- Validar que `carrito` sea un arreglo.
- Validar que cada ítem tenga `nombre` y `precio` como mínimo.
- Si algo falla, responder con status 400 y mensaje claro.

---

## 🚨 Desafío 3: Manejo de errores

- Atrapa errores de Stripe (`try/catch`)
- Si algo sale mal al crear la sesión, responder con status 500.
- Loguea el error en consola para depuración.

---

## 🔍 Desafío 4 (opcional): Registro de sesiones

- Cada vez que se cree una sesión, imprimir en consola:
  - Hora de creación
  - Número de productos
  - Total del carrito

Esto ayudará a monitorear la actividad y detectar errores rápidamente.

---

## 🛠️ Recursos útiles

- Documentación de Checkout:
  https://stripe.com/docs/checkout/quickstart
- Formato de `line_items`:
  https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-line_items

---

¡Mucho éxito equipo! Vamos a hacer que esta sombrerería facture. 🧢💸

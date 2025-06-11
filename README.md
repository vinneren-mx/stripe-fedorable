<div align="center">
  <img src="https://stripe.com/img/v3/home/twitter.png" alt="Fedorable Logo" width="120" />
  <h1>Fedorable Store</h1>
  <p><em>Una tienda de sombreros hecha con Node.js, Express y EJS</em></p>
</div>

---

## 🚀 Comenzando

Fedorable es una tienda eCommerce que te permite vender sombreros con estilo, preparada para integrar **Stripe Checkout**.

### 📦 Instalación

```bash
git clone https://github.com/tuusuario/tienda-fedorable.git
cd tienda-fedorable
npm install
```

### 🔑 Configura tu archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con lo siguiente:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### ▶️ Ejecutar el proyecto

```bash
npm run dev
```

Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

---

## 🧠 Estructura del Proyecto

```
tienda-fedorable/
│
├── server/             # Código backend con Express
├── views/              # Plantillas EJS
├── public/             # Archivos estáticos
├── .env                # Llaves API de Stripe
└── package.json        # Configuración del proyecto
```

---

## ✨ Secciones Disponibles

- `/` - Página de inicio
- `/productos` - Catálogo de sombreros
- `/quienes-somos` - Historia de la marca
- `/contacto` - Formulario de contacto
- `/checkout` - Checkout embebido con Stripe

---

## 💳 Integración Stripe Checkout (pendiente)

Dentro de `views/checkout.ejs` hay un bloque comentado para insertar el botón de Stripe:

```html
<script async src="https://js.stripe.com/v3/buy-button.js"></script>
<stripe-buy-button
  buy-button-id="tu-id-de-boton"
  publishable-key="tu-public-key">
</stripe-buy-button>
```

Alternativamente, puedes implementar el endpoint:

```js
app.post('/create-checkout-session', async (req, res) => {
  // lógica stripe.checkout.sessions.create(...)
});
```

---

## 📌 Siguientes pasos

- [ ] Crear productos con `npm run setup`
- [ ] Implementar `/create-checkout-session`
- [ ] Agregar `/webhook` y manejar eventos
- [ ] Incluir opciones de envío
- [ ] Reembolsar alertas de fraude automáticamente

---

<div align="center">
  <strong>¿Listo para vender sombreros? 🧢</strong><br/>
  <em>Construido con 💙 y JavaScript</em>
</div>

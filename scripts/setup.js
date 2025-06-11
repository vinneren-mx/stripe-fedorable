// scripts/setup.js
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

(async () => {
  try {
    const productos = [
      { nombre: 'Sombrero Fedora Clásico', precio: 35000 },
      { nombre: 'Sombrero Panameño', precio: 42000 },
      { nombre: 'Sombrero de Lluvia Elegante', precio: 28000 }
    ];

    for (const item of productos) {
      const product = await stripe.products.create({
        name: item.nombre
      });

      await stripe.prices.create({
        product: product.id,
        unit_amount: item.precio,
        currency: 'mxn'
      });
    }

    console.log('🛍️ Productos y Precios creados!');
  } catch (error) {
    console.error('🚨 Error creando productos:', error.message);
  }
})();

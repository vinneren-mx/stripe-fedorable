require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function obtenerProductos() {
  const products = await stripe.products.list({ limit: 10 });
  const prices = await stripe.prices.list({ limit: 50 });

  return products.data.map(product => {
    const price = prices.data.find(p => p.product === product.id);
    return {
      id: product.id,
      nombre: product.name,
      descripcion: product.description || '',
      precio: (price?.unit_amount || 0) / 100,
      moneda: price?.currency.toUpperCase() || 'MXN'
    };
  });
}

module.exports = obtenerProductos;

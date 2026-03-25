export const restaurants = [
  { id: 1, name: 'Bráz Pizzaria',   cat: 'Pizza',      rating: 4.8, time: '35–45min', free: true,  promo: false, emoji: '🍕', deliveryFee: 0,    minOrder: 30 },
  { id: 2, name: 'Temakeria & Cia', cat: 'Japonês',    rating: 4.7, time: '25–35min', free: false, promo: true,  emoji: '🍣', deliveryFee: 6.99, minOrder: 25 },
  { id: 3, name: 'Madero Burger',   cat: 'Hambúrguer', rating: 4.6, time: '30–40min', free: true,  promo: false, emoji: '🍔', deliveryFee: 0,    minOrder: 40 },
  { id: 4, name: 'Ciao Bella',      cat: 'Pizza',      rating: 4.5, time: '40–50min', free: false, promo: false, emoji: '🍕', deliveryFee: 5.99, minOrder: 35 },
  { id: 5, name: 'Haru Sushi',      cat: 'Japonês',    rating: 4.8, time: '20–30min', free: true,  promo: true,  emoji: '🍱', deliveryFee: 0,    minOrder: 50 },
  { id: 6, name: 'Burguer Bros',    cat: 'Hambúrguer', rating: 4.4, time: '25–35min', free: false, promo: true,  emoji: '🍔', deliveryFee: 4.99, minOrder: 20 },
]

export const products = [
  {
    name: 'Margherita',
    emoji: '🍕',
    items: [
      { rest: 'Bráz Pizzaria', price: 52.90 },
      { rest: 'Ciao Bella',    price: 47.90 },
      { rest: 'Haru Sushi',    price: 55.00 },
    ],
  },
  {
    name: 'Temaki Salmão',
    emoji: '🍣',
    items: [
      { rest: 'Temakeria & Cia', price: 32.90 },
      { rest: 'Haru Sushi',      price: 29.90 },
      { rest: 'Madero Burger',   price: 35.00 },
    ],
  },
  {
    name: 'Smash Burger',
    emoji: '🍔',
    items: [
      { rest: 'Madero Burger', price: 45.90 },
      { rest: 'Burguer Bros',  price: 39.90 },
      { rest: 'Bráz Pizzaria', price: 48.00 },
    ],
  },
  {
    name: 'Combo Família',
    emoji: '👨‍👩‍👧‍👦',
    items: [
      { rest: 'Bráz Pizzaria', price: 129.90 },
      { rest: 'Haru Sushi',    price: 119.90 },
      { rest: 'Burguer Bros',  price: 109.90 },
    ],
  },
]
export const restaurants = [
  { id: 1, name: 'Bráz Pizzaria',   cat: 'Pizza',      rating: 4.8, time: '35–45min', free: true,  promo: false, emoji: '🍕' },
  { id: 2, name: 'Temakeria & Cia', cat: 'Japonês',    rating: 4.7, time: '25–35min', free: false, promo: true,  emoji: '🍣' },
  { id: 3, name: 'Madero Burger',   cat: 'Hambúrguer', rating: 4.6, time: '30–40min', free: true,  promo: false, emoji: '🍔' },
  { id: 4, name: 'Ciao Bella',      cat: 'Pizza',      rating: 4.5, time: '40–50min', free: false, promo: false, emoji: '🍕' },
  { id: 5, name: 'Haru Sushi',      cat: 'Japonês',    rating: 4.8, time: '20–30min', free: true,  promo: true,  emoji: '🍱' },
  { id: 6, name: 'Burguer Bros',    cat: 'Hambúrguer', rating: 4.4, time: '25–35min', free: false, promo: true,  emoji: '🍔' },
]

export const products = [
  {
    name: 'Margherita',
    items: [
      { rest: 'Bráz Pizzaria', price: 52.90 },
      { rest: 'Ciao Bella',    price: 47.90 },
      { rest: 'Haru Sushi',    price: 55.00 },
    ],
  },
  {
    name: 'Temaki Salmão',
    items: [
      { rest: 'Temakeria & Cia', price: 32.90 },
      { rest: 'Haru Sushi',      price: 29.90 },
      { rest: 'Madero Burger',   price: 35.00 },
    ],
  },
  {
    name: 'Smash Burger',
    items: [
      { rest: 'Madero Burger', price: 45.90 },
      { rest: 'Burguer Bros',  price: 39.90 },
      { rest: 'Bráz Pizzaria', price: 48.00 },
    ],
  },
  {
    name: 'Combo Família',
    items: [
      { rest: 'Bráz Pizzaria', price: 129.90 },
      { rest: 'Haru Sushi',    price: 119.90 },
      { rest: 'Burguer Bros',  price: 109.90 },
    ],
  },
]
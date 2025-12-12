type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
};

// Electronics product type extends BaseProduct
// and introduces specific fields for electronics
// (brand, warranty months, etc.)
type Electronics = BaseProduct & {
  category: 'electronics';
  brand: string;
  warrantyMonths: number;
};

// Clothing product type extends BaseProduct
// with size, color and material
// fields relevant to clothing items
type Clothing = BaseProduct & {
  category: 'clothing';
  size: string;
  color: string;
  material: string;
};

// Optional Book product type demonstrating another category
// including author and pages
// You can remove or add more fields as needed
type Book = BaseProduct & {
  category: 'book';
  author: string;
  pages: number;
};

// Generic function to find a product by id in an array of products.
// Returns the product if found, otherwise undefined.
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
  // Validate id is a non-negative integer
  if (!Number.isInteger(id) || id < 0) {
    console.warn('Invalid id provided');
    return undefined;
  }
  return products.find((p) => p.id === id);
};

// Generic function to filter products by a maximum price.
// Returns a new array containing only products priced below or equal to maxPrice.
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
  if (maxPrice < 0) {
    console.warn('maxPrice must be non-negative');
    return [];
  }
  return products.filter((p) => p.price <= maxPrice);
};

// Generic CartItem type associates a product with a quantity.
type CartItem<T> = {
  product: T;
  quantity: number;
};

// Adds a product to the cart or increases its quantity if it already exists.
// If quantity is less than or equal to zero, the cart is unchanged.
const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  if (quantity <= 0) {
    console.warn('Quantity must be greater than zero');
    return cart;
  }
  const existingItem = cart.find((item) => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  return cart;
};

// Computes the total cost of all items in the cart.
// Each item's price is multiplied by its quantity, and the sums are accumulated.
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
};

// Example data for electronics products
const electronics: Electronics[] = [
  {
    id: 1,
    name: 'Телефон',
    price: 10000,
    description: 'Смартфон з камерою 48MP',
    category: 'electronics',
    brand: 'Samsung',
    warrantyMonths: 24
  },
  {
    id: 2,
    name: 'Ноутбук',
    price: 25000,
    description: 'Легкий ноутбук для роботи',
    category: 'electronics',
    brand: 'Apple',
    warrantyMonths: 12
  }
];

// Example data for clothing products
const clothes: Clothing[] = [
  {
    id: 3,
    name: 'Футболка',
    price: 500,
    description: 'Бавовняна футболка',
    category: 'clothing',
    size: 'M',
    color: 'білий',
    material: 'Cotton'
  },
  {
    id: 4,
    name: 'Джинси',
    price: 1200,
    description: 'Класичні джинси',
    category: 'clothing',
    size: 'L',
    color: 'синій',
    material: 'Denim'
  }
];

// Example data for book products
const books: Book[] = [
  {
    id: 5,
    name: 'Книга',
    price: 300,
    description: 'Цікава книга',
    category: 'book',
    author: 'Автор',
    pages: 200
  }
];

// Demonstration usage of generic functions
const foundPhone = findProduct(electronics, 1);
const foundTshirt = findProduct(clothes, 3);

// Initialize an empty cart that can hold any type of BaseProduct
let cart: CartItem<BaseProduct>[] = [];

if (foundPhone) {
  cart = addToCart(cart, foundPhone, 1);
}

if (foundTshirt) {
  cart = addToCart(cart, foundTshirt, 2);
}

// Try adding a book to the cart
const foundBook = findProduct(books, 5);
if (foundBook) {
  cart = addToCart(cart, foundBook, 1);
}

console.log('Cart contents:', cart);
console.log('Total price:', calculateTotal(cart));

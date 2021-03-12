
class Hamburger {
  constructor(size, stuffing) { 
  	this.size = size;
  	this.stuffing = stuffing;
  	this.toppings = [];
   }
  addTopping(topping) {  
  	this.toppings.push(topping)
  }  // Добавить добавку }
  removeTopping(topping) {
  	this.toppings = this.toppings.filter(item => item.name !== topping)
  } // Убрать добавку }
  getToppings() {
  	let toppingsList = '';
  	this.toppings.forEach(item => toppingsList += item.name += ', ')
  	console.log(`Список добавок: ${toppingsList}`)
  }   // Получить список добавок }
  getSize() {  
  	console.log(`Размер бургера: ${this.size.name}`)
  }            // Узнать размер гамбургера }
  getStuffing() { 
  	console.log(`Ваш бургер с ${this.stuffing.name}`)
  }         // Узнать начинку гамбургера }
  calculatePrice() { 
  	let toppingsPrice = 0;
  	this.toppings.forEach(item => toppingsPrice += item.price);
  	console.log(`Сумма вашего заказа: ${this.size.price + this.stuffing.price + toppingsPrice} rub`)
  }      // Узнать цену }
  calculateCalories() {
  	let toppingsColories = 0;
  	this.toppings.forEach(item => toppingsColories += item.colori);
  	console.log(`В вашем бургере ${this.size.colori + this.stuffing.colori + toppingsColories} коллорий!`)
  }        // Узнать калорийность }
}

class ColoriTable {
	constructor(name, price, colori) {
		this.name = name;
		this.price = price;
		this.colori = colori;
	}
}

const big = new ColoriTable('big',100, 40),
	small = new ColoriTable('small', 50, 20),
	cheese = new ColoriTable('cheese', 10, 20),
	salad = new ColoriTable('salad', 20, 0),
	potato = new ColoriTable('potato', 15, 10),
	priprava = new ColoriTable('priprava', 15, 0),
	mayonez = new ColoriTable('mayonez', 20, 5);

console.log('fastfood.js')

const ChiefBurger = new Hamburger(big, cheese);
ChiefBurger.addTopping(salad);
ChiefBurger.addTopping(potato);
ChiefBurger.addTopping(mayonez);
ChiefBurger.removeTopping('salad');
ChiefBurger.getToppings();
ChiefBurger.getSize();
ChiefBurger.getStuffing();
ChiefBurger.calculatePrice();
ChiefBurger.calculateCalories();
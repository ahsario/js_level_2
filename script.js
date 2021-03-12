class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
	  { title: 'Shoes', price: 250 },
    ];
  }
  sumPrice() {
  		let sum = 0;
		this.goods.forEach(item => sum += item.price);
		return sum;
	}
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

}

class Bascket{
	constructor() {
		this.basketItemList = []
		this.sum = 0
	}
	addBascetItem(obj) {
		this.bascketItem.push(obj)
	}
	sumPrice() {
		this.basketItemList.forEach(item => this.sum += item.price)
	}
}

class BascetItem {
	constructor({name, price}) {
		this.name = name;
		this.price = price;
	}
}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.sumPrice());

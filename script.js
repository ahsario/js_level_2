const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ApiMock {
  constructor() {

  }

  fetch() {
    return [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
      ];
  }
}

class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}



class GoodsList {
  constructor() {
    this.api = new ApiMock();
    this.$goodsList = document.querySelector('.goods-list');
    this.goods = [];
  }

  fetchGoods() {
    return new Promise((resolve,reject) => {
      makeGETRequest(`${API_URL}/catalogData.json`).
        then( goods => this.goods = goods,
          () => console.log('error')
        ).
        then(() => this.render())
    })
  }
  sumPrice() {
    let sum = 0;
    this.goods.forEach(item => sum += item.price);
    return sum;
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}


const goodsList = new GoodsList();
goodsList.fetchGoods()
  

function makeGETRequest(url) {
  return new Promise( (resolve, reject) => {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response) 
      }  
    }
  })
}

class Bascket{
  constructor() {
    this.basketItemList = []
    this.sum = 0
  }
  getBascketItem() {
    makeGETRequest(`${API_URL}/getBasket.json`).then(data => console.log(data.contents));
  }
  addBascetItem() {
    makeGETRequest(`${API_URL}//addToBasket.json`).then(data => console.log(data));
  }
  deleteBascetItem() {
    makeGETRequest(`${API_URL}//deleteFromBasket.json`).then(data => console.log(data));
  }
  sumPrice() {
    makeGETRequest(`${API_URL}/getBasket.json`).then(data => console.log(data.amount));
  }
}

class BascetItem {
  constructor({name, price}) {
    this.name = name;
    this.price = price;
  }
}

let bascket = new Bascket;
bascket.getBascketItem()
bascket.addBascetItem()
bascket.sumPrice()
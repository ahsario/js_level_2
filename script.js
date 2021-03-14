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
    this.goods = [];
    this.filteredGoods = [];
  }

  fetchGoods() {
    return new Promise((resolve,reject) => {
      makeGETRequest(`${API_URL}/catalogData.json`).
        then( goods => {
          this.goods = goods;
          this.filteredGoods = goods;},
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
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  filterGoods(value) {
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    this.render();
  }
}
  
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

const goodsList = new GoodsList();
goodsList.fetchGoods();

document.querySelector('.search-button').addEventListener('click', (e) => {
  const value = document.querySelector('.goods-search').value;
  goodsList.filterGoods(value);
})

let bascket = new Bascket;
bascket.getBascketItem()
bascket.addBascetItem()
bascket.sumPrice()

// 1
// let str = "dfgh 'hjkl' rftgyhuji 'ghj' gghj's ";
// const regexp = /'/gi;
// str.replace(regexp, '"');

// 2
// let str = "dfgh 'hjkl' rftgyhuji 'ghj' gghj's ";
// const regexp = /'(\w+)'/gi;
// str.replace(regexp, '"$1"');

//3
const regName = /^\b[a-z]+\b/gi,
  regPhone = /^\+7\(\d{3}\)\d{3}-\d{4}/,
  regMail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
  regText = /^./;

const nameInp = document.querySelector('#name'),
  phoneInp = document.querySelector('#phone'),
  mailInp = document.querySelector('#mail'),
  submit = document.querySelector('#submit'),
  text = document.querySelector('#text'),
  form = document.querySelector('#form');

const validation = (event) => {
  event.preventDefault();
  if (regName.test(nameInp.value)) {
    nameInp.classList.remove('error')
    nameInp.classList.add('valid')
  } else {
    nameInp.classList.remove('valid')
    nameInp.classList.add('error')
  }
  if (regPhone.test(phoneInp.value)) {
    phoneInp.classList.remove('error')
    phoneInp.classList.add('valid')
  } else {
    phoneInp.classList.remove('valid')
    phoneInp.classList.add('error')
  }
  if (regMail.test(mailInp.value)) {
    mailInp.classList.remove('error')
    mailInp.classList.add('valid')
  } else {
    mailInp.classList.remove('valid')
    mailInp.classList.add('error')
  }
  if (regText.test(text.value)) {
    text.classList.remove('error')
    text.classList.add('valid')
  } else {
    text.classList.remove('valid')
    text.classList.add('error')
  }
}

submit.addEventListener('click', validation)
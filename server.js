// const express = require('express');
const fs = require('fs');

// const app = express();

// app.use(express.static('.'));

fs.readFile('catalog.json', 'utf8', (err, data) => {
	if(!err) {
		let goods = JSON.parse(data);
		console.log(goods);
		goods.push({id:7, title: "fghj", price: 789});

		fs.writeFile('catalog.json', JSON.stringify(goods),(err) => {
		});
	}
	
})
// app.listen(3000, function() {
//   console.log('server is running on port 3000!');
// });
// header('Access-Control-Allow-Origin: www.serverAdomain.ru');
// //Установим типы запросов, которые следует разрешить (все неуказанные будут отклоняться)
// header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
// //Разрешим передавать Cookie и Authorization заголовки для указанновго в Origin домена
// header('Access-Control-Allow-Credentials: true');
// //Установим заголовки, которые можно будет обрабатывать
// header('Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type');
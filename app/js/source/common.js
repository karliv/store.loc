window.onload = function() {

    // Отрисовка корзины
    var basket = new Basket('basket_window');
    basket.render('basket_window');

    if (document.querySelector('.product-box')) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './json/getGoodById.json', true); //Асинхронный запрос

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            if(xhr.status === 200){
                renderGoods(JSON.parse(xhr.responseText));
            } else {
                console.log('Error', xhr.status, xhr.statusText);
            }
        };

        xhr.send();

        function renderGoods(items) {
            for (var itemGoods in items) {
                if (items.hasOwnProperty(itemGoods)) {
                    new Good(items[itemGoods].product_id, items[itemGoods].product_name, items[itemGoods].product_price, items[itemGoods].product_image).render('.product-box');
                }
            }
        }

        var goodBtn = document.querySelector('.product-box');
        goodBtn.addEventListener('click', function(event) {addGoods(event)});

        // Функция добавления товара по клику
        function addGoods(event) {
            if (!event.target.classList.contains('spanAddCart')) {
                return;
            }

            var idProduct = parseInt(event.target.getAttribute('data-id'));
            var price = parseFloat(event.target.parentNode.parentNode.querySelector('.inform-box span')
                .textContent.replace(/[^0-9\.]/g, ""));
            var title = event.target.parentNode.parentNode.querySelector('.inform-box p').textContent;
            basket.add(idProduct, price, title);
            console.log(basket.basketItems);
        }
    }

    // Объявление обработчика событий по клику для кнопки в карзине
    var basketBtn = document.querySelector('.basket');
    basketBtn.addEventListener('click', function(event) {changeBasket(event)});

    // Функция добавления/убавления кол-во товара на 1, по клику или же полное его удаление
    function changeBasket(event) {
        if (event.target.tagName === 'SPAN' || event.target.tagName === 'BUTTON') {
            var getID = parseInt(event.target.parentNode.parentNode.getAttribute('data-id-item'));
            var quantity = parseInt(event.target.parentNode.parentNode.querySelector('td.item-count .count').textContent);
            var price = parseFloat(event.target.parentNode.parentNode.querySelector('.item-price').textContent);

            if (event.target.classList.contains('basket-btn')) {
                basket.remove(getID, quantity, price);
            } else if (event.target.classList.contains('minus')) {
                basket.countMinus(getID, quantity, price);
            } else if (event.target.classList.contains('plus')) {
                basket.countPlus(getID, quantity, price);
            }
        } else {
            return;
        }
    }

    var basketWindow = document.getElementById('basket_window');

    //document.body.addEventListener('click', function() {
    //    if (!basketWindow.classList.contains('none')) {
    //        basketWindow.classList.toggle('none');
    //    }
    //});

    document.querySelector('.basket-img').addEventListener('click', function(event) {
        if (basketWindow.classList.contains('none') || !event.target) {
            basketWindow.classList.toggle('none')
        } else {
            basketWindow.classList.toggle('none');
        }
    });

    document.addEventListener('click', function(event) {
        console.log(event.target.className);
    });

    if (document.querySelector('.product-details')) {
        var bssketList = new BasketList('product-details');
    }

};
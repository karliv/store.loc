function BasketList(idBasket) {
    Basket.call(this, idBasket);

}

BasketList.prototype = Object.create(Basket.prototype);
BasketList.prototype.constructor = BasketList;

BasketList.prototype.loadBasketItems = function() {
    var SBI = showBasketItems.bind(this);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './json/basket.json', true); //Асинхронный запрос

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if(xhr.status === 200){
            SBI(JSON.parse(xhr.responseText));
        } else {
            console.log('Error', xhr.status, xhr.statusText);
        }
    };

    xhr.send();

    function showBasketItems(items) {
        var basketData = document.createElement('div');
        basketData.classList.add('prodItem');

        this.amount = parseFloat(items.amount);

        //var allProducts = document.createElement('p');
        //allProducts.innerHTML = 'Total goods: <span>'+ this.countGoods +'</span>';
        //
        //var totalAmount = document.createElement('p');
        //totalAmount.innerHTML = 'Total amount: <span>'+ Math.abs(this.amount).toFixed(2) +' $</span>';
        //
        //basketData.appendChild(allProducts);
        //basketData.appendChild(totalAmount);
        //appendClassItem[0].appendChild(basketData);
        var subTotal = document.querySelector('.check-info p span');
        subTotal.textContent = this.amount + ' $';

        var grandTotal = document.querySelectorAll('.check-info > span')[1];
        grandTotal.textContent = this.amount + ' $';

        for (var itemKey in items.basket) {
            if (items.basket.hasOwnProperty(itemKey)) {
                this.basketItems.push(items.basket[itemKey]);
            }
        }

        //Отабразить уже имеющиеся предметы в корзине
        this.release();
    }
};

BasketList.prototype.release = function() {
    var basketItemsDiv = document.querySelector('.prodItemList');
    basketItemsDiv.innerHTML = '';

    for (var i in this.basketItems) {
        if (this.basketItems.hasOwnProperty(i)) {
            var itemList = document.createElement('div');
            itemList.classList.add('prodItem');
            itemList.setAttribute('data-id-item', this.basketItems[i].id_product);

            itemList.innerHTML = '<div class="prodItem__col_big">' +
                '<div class="prod-image"><img src="' + this.basketItems[i].img + '" alt=""></div>' +
                '<div class="prod-info">' +
                    '<div class="prod-name"><a href="">' + this.basketItems[i].title + '</a></div>' +
                    '<div class="pord-descr">' +
                        '<ul>' +
                            '<li>Color: <span>Red</span></li>' +
                            '<li>Size: <span>Xll</span></li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="prodItem__col">' +
                '<span>' + this.basketItems[i].price + '</span>' +
            '</div>' +
            '<div class="prodItem__col">' +
                '<input name="text" type="text" value="' + this.basketItems[i].quantity + '" required>' +
            '</div>' +
            '<div class="prodItem__col">' +
                '<span>Free</span>' +
            '</div>' +
            '<div class="prodItem__col">' +
                '<span>' + (this.basketItems[i].price * this.basketItems[i].quantity).toFixed(2) + '</span>' +
            '</div>' +
            '<div class="prodItem__col prodItem__col_btn">' +
                '<span><i class="fa fa-times-circle" aria-hidden="true"></i></span>' +
            '</div>';

            basketItemsDiv.appendChild(itemList);
        }
    }
};

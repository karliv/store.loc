function ExtendedGoodsGood(id, title, price, img) {
    Container.call(this, id);
    this.title = title;
    this.price = price;
    this.img = img;
}

ExtendedGoodsGood.prototype = Object.create(Good.prototype);
ExtendedGoodsGood.prototype.constructor = ExtendedGoodsGood;

Good.prototype.render = function(jsSelector) {
    var selector = document.querySelector(jsSelector);

    var goodContainer = document.createElement('div');
    goodContainer.className = 'product__item';

    var goodContainerCol = document.createElement('div');
    goodContainerCol.className = 'col-item';
    goodContainerCol.appendChild(goodContainer);

    goodContainer.innerHTML = '<div class="add-cart">' +
            '<span class="flex-center spanAddCart" data-id="'+ this.id +'">' +
                '<span class="cart-img"></span><span>Add to Cart</span>' +
            '</span>' +
        '</div>' +
        '<div class="prod-elem">' +
            '<a href="single-page.html" class="link-prod">' +
                '<div class="img-box">' +
                    '<img src="'+ this.img +'" alt="">' +
                    '<div class="port_item_cont flex-center"></div>' +
                '</div>' +
                '<div class="inform-box">' +
                    '<p>'+ this.title +'</p>' +
                    '<span>$'+ this.price +'</span>' +
                '</div>' +
            '</a>' +
        '</div>';

    selector.appendChild(goodContainerCol);
};
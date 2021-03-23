function Item({ id, name, price, image, quantity }) {
	this.id = id;
	this.name = name;
	this.image = image;
	this.price = price;
	this.quantity = quantity ?? 1;
}

module.exports = Item;

function Item({ id, name, price, quantity }) {
	this.id = id;
	this.name = name;
	this.price = price;
	this.quantity = quantity ?? 1;
}

module.exports = Item;

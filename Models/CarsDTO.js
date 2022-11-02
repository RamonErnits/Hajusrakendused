module.exports = class CarDTO {
    id;
    brand;
    model;
    year;
    price;
    owner;
    seller;
    location;
    color;

    constructor(data) {
        this.id = data.id;
        this.brand = data.brand;
        this.model = data.model;
        this.year = data.year;
        this.price = data.price;
        this.owner = data.owner;
        this.seller = data.seller;
        this.location = data.location;
        this.color = data.color;
    }
}


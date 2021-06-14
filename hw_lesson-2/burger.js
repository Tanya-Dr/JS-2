let menu = [
    {title: 'small', price: 50, calories: 20},
    {title: 'big', price: 100, calories: 40},
    {title: 'cheese', price: 10, calories: 20},
    {title: 'salad', price: 20, calories: 5},
    {title: 'fries', price: 15, calories: 10},
    {title: 'seasoning', price: 15, calories: 0},
    {title: 'mayonnaise', price: 20, calories: 5},
];

class Hamburger {
    constructor() {
        this.size = '';
        this.stuffing = '';
        this.toppings = [];
    }

    getToppings() {
        this.toppings = [];
        document.querySelectorAll('input[type = "checkbox"]:checked').forEach((top) => {
            this.toppings.push(top.getAttribute('data-topping'));
        });
    }

    getSize() {
        this.size = document.querySelector('input[name = "size__name"]:checked').getAttribute('data-size');
    }

    getStuffing() {
        this.stuffing = document.querySelector('input[name = "stuffing__name"]:checked').getAttribute('data-stuffing');
    }

    calculatePriceAndCalories() {        
        let price = 0;
        let cal = 0;
        menu.forEach((item) => {
            if (item.title == this.size || item.title == this.stuffing) {
                price += item.price;
                cal += item.calories;
            }
            this.toppings.forEach((topping) => {
                if (topping == item.title) {
                    price += item.price;
                    cal += item.calories;
                }
            });
        });
        document.querySelector('.result').innerHTML = `<p class = "text">Стоимость полученного гамбургера = ${price}</p><p class = "text">Калорийность полученного гамбургера = ${cal}</p>`;
    }

}

const init = () => {
    const burger = new Hamburger();
    document.querySelector('.button__result').addEventListener('click', function(){
        burger.getSize();
        burger.getStuffing()
        burger.getToppings();
        burger.calculatePriceAndCalories();
    });
};

window.onload = init;
const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const moment = require('moment');
var cors = require('cors')

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(express.static("."));
app.use(cors())

app.listen(3000, () => {
  console.log("server is running at port 3000!!");
});

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err,data) => {
        res.send(data)
    })
})

app.get("/catalogData", (req, res) => {
  fs.readFile("catalogData.json", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/addToCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;

      const findItem = cart.find(good => good.id == item.id);
      if (findItem === undefined) {
        cart.push({quantity: 1, ...item});
      } else {
        findItem.quantity += 1;
      }

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });

  fs.readFile("stats.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const stats = JSON.parse(data);
      const item = req.body;
      const date = new moment().format('MMMM Do YYYY, h:mm:ss a');

      stats.push({dateOfOperation: date, operation: 'add', ...item});

      fs.writeFile("stats.json", JSON.stringify(stats), (err) => {
      });
    }
  });
});


app.post("/deleteFromCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;

      cart.forEach((good,index) => {
        if (good.id == item.id) {
          if (good.quantity == 1) {
            cart.splice(index, 1);
          } else {
            good.quantity -= 1;
          }
          return false;
        }
      });

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });

  fs.readFile("stats.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const stats = JSON.parse(data);
      const item = req.body;
      const date = new moment().format('MMMM Do YYYY, h:mm:ss a');

      stats.push({dateOfOperation: date, operation: 'delete', product_name: item.product_name, price: item.price, id: item.id});

      fs.writeFile("stats.json", JSON.stringify(stats), (err) => {
      });
    }
  });
});

app.post("/clearCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = [];

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });

  fs.readFile("stats.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const stats = JSON.parse(data);
      const date = new moment().format('MMMM Do YYYY, h:mm:ss a');

      stats.push({dateOfOperation: date, operation: 'clear all cart'});

      fs.writeFile("stats.json", JSON.stringify(stats), (err) => {
      });
    }
  });
});
const express = require("express");
const data = require("./data");

const app = express();

app.use("/", (req, res) => {
  const filters = req.query;

  console.log(filters); // ** with a GET request like http://localhost:5050?city=Metropolis&age=21 it prints { city: 'Metropolis', age: '21' }

  const filteredUsers = data.filter((user) => {
    let isValid = true;

    for (let key in filters) {
      //   console.log(key, user[key], filters[key]);
      console.log("key", key);
      console.log("user[key]", user[key]);
      console.log("filters[key]", filters[key]);

      // ** prints the following:

      // key name
      // user[key] Alan Wake
      // filters[key] Jimmy Olsen
      // key age
      // user[key] 21
      // filters[key] 21
      // key city
      // user[key] New York
      // filters[key] Metropolis

      // ETC..

      // If the user's field is a number, convert the filter to a number too
      if (typeof user[key] === "number") {
        isValid = isValid && user[key] === Number(filters[key]);
      } else {
        isValid = isValid && user[key] === filters[key];
      }
    }

    return isValid;
  });

  res.send(filteredUsers);
});

app.listen(5050, () => {
  console.log("Server started!");
});

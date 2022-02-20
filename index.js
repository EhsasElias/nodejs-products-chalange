const Joi = require('joi');
const http = require('http');
const express = require('express');
const fs = require('fs');

const fetch = require('node-fetch');
const res = require('express/lib/response');
const { query } = require('express');


// const data = fs.readFileSync('word.json');
// const words = JSON.parse(data);
// console.log(words);

// fetch('https://dummyjson.com/products')
//     .then(res => res.json())
//     .then(console.log);









// fetch('https://dummyjson.com/products')
//     .then(res => res.json())
//     .then(console.log);


const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

// app.get('/', (req, res) => {
//     res.send('Hello')
// });

// app.get('/api/courses', (req, res) => {
//     res.send(courses);
// });

const weburl = 'https://dummyjson.com/products/';
app.get('/products/:id?', async (req, res) => {

    const iduser = req.params.id;

if(!iduser){
    const url = 'https://dummyjson.com/products/';

const options = {
    "method": "GET"
};
const response = await fetch(url, options)
.then(res => res.json())
.catch(e => {
console.error({
    "message":"oh opps",
    error: e,
});
});
console.log("response:" ,response);
res.json(response);
}

else{
    const url = 'https://dummyjson.com/products/'+iduser;

const options = {
    "method": "GET"
};
const response = await fetch(url, options)
.then(res => res.json())
.catch(e => {
console.error({
    "message":"oh opps",
    error: e,
});
});
console.log("response:" ,response);
res.json(response);
}


});

app.get('/products/:search?', async (req, res) => {

    const usersearch = req.query.search;


    if (!usersearch) {
        const url = 'https://dummyjson.com/products/';

        const options = {
            "method": "GET"
        };
        const response = await fetch(url, options)
            .then(res => res.json())
            .catch(e => {
                console.error({
                    "message": "oh opps",
                    error: e,
                });
            });
        console.log("response:", response);
        res.json(response);
    }

    else {
        const url = 'https://dummyjson.com/products/' + usersearch;

        const options = {
            "method": "GET"
        };
        const response = await fetch(url, options)
            .then(res => res.json())
            .catch(e => {
                console.error({
                    "message": "oh opps",
                    error: e,
                });
            });
        console.log("response:", response);
        res.json(response);
    }


});

app.get('/products/categories', async (req, res) => {
     const url = 'https://dummyjson.com/products/categories';

        const options = {
            "method": "GET"
        };
        const response = await fetch(url, options)
            .then(res => res.json())
            .catch(e => {
                console.error({
                    "message": "oh opps",
                    error: e,
                });
            });
        console.log("response:", response);
        res.json(response);
    
});

app.get('/products/category/:cateName', async (req, res) => {
    const cate = req.params.cateName;
    const url = 'https://dummyjson.com/products/category/'+cate;

       const options = {
           "method": "GET"
       };
       const response = await fetch(url, options)
           .then(res => res.json())
           .catch(e => {
               console.error({
                   "message": "oh opps",
                   error: e,
               });
           });
       console.log("response:", response);
       res.json(response);
   
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(port));
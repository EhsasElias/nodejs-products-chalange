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

// app.get('/products/:search?', async (req, res) => {

//     const usersearch = req.params.search;


//     if (!usersearch) {
//         const url = 'https://dummyjson.com/products/';

//         const options = {
//             "method": "GET"
//         };
//         const response = await fetch(url, options)
//             .then(res => res.json())
//             .catch(e => {
//                 console.error({
//                     "message": "oh opps",
//                     error: e,
//                 });
//             });
//         console.log("response:", response);
//         res.json(response);
//     }

//     else {
//         const url = 'https://dummyjson.com/products/' + usersearch;

//         const options = {
//             "method": "GET"
//         };
//         const response = await fetch(url, options)
//             .then(res => res.json())
//             .catch(e => {
//                 console.error({
//                     "message": "oh opps",
//                     error: e,
//                 });
//             });
//         console.log("response:", response);
//         res.json(response);
//     }


// });







app.post('/api/courses', (req, res) => {
    const { error } = validating(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    return res.send(course);
});



app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with this id is not found');

    const { error } = validating(req.body);

    if (error) return res.status(400).send(error.details[0].message);



    course.name = req.body.name;
    return res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with this id is not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    return res.send(course);

});

// app.get('/api/courses/:year/:month', (req ,res) => {
//     res.send(req.query); or res.send(req.params);
//     });
// const server = http.createServer((req, res) => {
//     if(req.url === '/'){
//         res.write('Hello');
//         res.end();
//     }
//     if(req.url === '/api/courses') {
//         res.write(JSON.stringify[1, 2, 3]);
//         res.end();
//     }
// });
function validating(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(port));
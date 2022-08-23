const mysql = require('mysql')
const fs = require('fs')
const url = require('url')
const qs = require('qs')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abcd1234',
    database: 'quanlysanpham',
    charset: 'utf8_general_ci'
})

connection.connect(err => {
    if (err) {
        console.error(err)
    }
    console.log('connect success')
})

class Controller {
    showHomePage(req, res) {
        let html = '';
        const sqlShow = `SELECT * FROM products;`;
        connection.query(sqlShow, async (err, results) => {
            if (err) {
                throw err.stack;
            }
            results.forEach((item, index) => {
                html += `<tr>`
                html += `<td>${index + 1}</td>`
                html += `<td>${item.name}</td>`
                html += `<td>${item.price}</td>`
                html += `<td><a class="btn btn-danger" href="/delete?id=${item.id}">Delete</a></td>`
                html += `<td><a class="btn btn-info" href="/update?id=${item.id}">Update</a></td>`
            })
            fs.readFile('./view/homePage.html', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err)
                }
                res.writeHead(200, {'Content-Type': 'text/html'})
                data = data.replace('{List-products}', html)
                res.write(data)
                res.end()
            })
        })
    }

    createProduct(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./view/createProductForm.html','utf-8' , (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', () => {
                let newData = qs.parse(data)
                if (newData.name === '' || newData.price === '' ) {
                    fs.readFile('./view/createProductForm.html', 'utf-8' , (err, data) => {
                        res.writeHead(200, {'Content-Type' : 'text/html'})
                        res.write(data)
                        res.end();
                    })
                } else {
                    const sqlInsert = `INSERT INTO products (name, price) VALUES ('${newData.name}', '${newData.price}');`;
                    connection.query(sqlInsert, (err, result) => {
                        if (err) {
                            throw err.stack;
                        }
                    })
                    res.writeHead(301, {'Location' : '/'})
                    res.end();
                }
            })
        }
    }

    deleteProduct(req, res , idData) {
        const sqlDelete = `DELETE FROM products WHERE id = ${idData};`;
        connection.query(sqlDelete, (err, result) => {
            if (err) {
                throw err.stack;
            }
        })
        res.writeHead(301, {'Location' : '/'})
        res.end()
    }

    updateProduct(req, res, idData) {
        const sql = `SELECT * FROM products WHERE id = ${idData};`;
        connection.query(sql, (err,result) => {
            if (err) {
                throw err.stack;
            }
            if (req.method === 'GET') {
                fs.readFile('./view/updateProductForm.html','utf-8' , (err, data) => {
                    data = data.replace(`<input type="text" class="form-control" name="newName" id="exampleInput" style="margin-left: 20px">`,
                        `<input type="text" class="form-control" name="newName" id="exampleInput" style="margin-left: 20px" value="${result[0].name}">`);
                    data = data.replace(`<input type="number" class="form-control" name="newPrice" id="exampleInputPrice" style="margin-left: 20px">`,
                        `<input type="number" class="form-control" name="newPrice" id="exampleInputPrice" style="margin-left: 20px" value="${result[0].price}">`);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    res.end();
                })
            } else {
                let data = '';
                req.on('data', chunk => {
                    data += chunk;
                })
                req.on('end', () => {
                    let newData = qs.parse(data)
                    if (newData.newName === '' || newData.newPrice === '' ) {
                        fs.readFile('./view/updateProductForm.html', 'utf-8' , (err, data) => {
                            res.writeHead(200, {'Content-Type' : 'text/html'})
                            res.write(data)
                            res.end();
                        })
                    } else {
                        const price = parseInt(newData.newPrice)
                        const sqlAlter = `UPDATE products SET name = '${newData.newName}', price = ${price} WHERE id = ${idData};`;
                        connection.query(sqlAlter, (err) => {
                            if (err) {
                                throw err.stack;
                            }
                        })
                        res.writeHead(301, {'Location' : '/'})
                        res.end();
                    }
                })
            }
        })

    }
}

module.exports = Controller;
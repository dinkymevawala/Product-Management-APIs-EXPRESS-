const express = require('express');
const companys = require('./companys');
const products = require('./products');
const sallers = require('./sallers');
const app = express()
const port = 3000
const { router } = require("express").Router();
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "API is working"
    })
});

app.get("/api/products", (req, res) => {
    res.json({
        products
    })
});

app.post("/api/products", (req, res) => {
    if (!req.body.title) {
        res.send(400)
        return res.json({
            error: "Title is Required"
        })
    }
    const details = {
            id: products.length + 1,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            companyid: req.body.companyid,
            sellerid: req.body.sellerid
        }
        
    products.push(details)
        
    res.json(
        details
    )
});

app.put('/api/products/:name', (req, res) => {
    const name = req.params.name
    const newName = req.body.title
    console.log(name);

    const index = products.findIndex((product) => {
        return (product.title == name)
    })
    console.log(index);

    if (index >= 0) {
        const prd = products[index]
        prd.title = newName
        res.json(prd)
    } else {
        res.status(404)
    }
    res.json(name)
});

app.delete('/api/products/:id', (req, res) => {
    let id = req.params.id
    let index = products.findIndex((product) => {
        return (product.id == Number.parseInt(id))
    })
    console.log(id);
    if (index >= 0) {
        let prd = products[index]
        products.splice(index, 1)
        res.json(prd)
    } else {
        res.status(404)
    }
})

app.get('/api/company/product/:name', (req, res) => {
    const name = req.params.name

    const index = products.findIndex((product) => {
        return (product.title == name)
    })
    console.log(index);

    if (index >= 0) {
        const prd = products[index]
        const companyid = prd.companyid
        const companyIndex = companys.findIndex((company) => {
            return (company.companyid == companyid)
        })
        console.log(companyIndex);
        if (companyIndex >= 0) {
            res.json(companys[companyIndex])
        } else {
            res.status(404)
        }
    } else {
        res.status(404)
    }
});

app.get('/api/company', (req, res) => {
    res.json({
        companys
    })
})

app.delete('/api/company/:id', (req, res) => {
    let id = req.params.id
    let index = companys.findIndex((company) => {
        return (company.companyid == Number.parseInt(id))
    })
    console.log(id);
    if (index >= 0) {
        let prd = companys[index]
        companys.splice(index, 1)
        res.json(prd)
    } else {
        res.status(404)
    }
})

app.get('/api/company/allproducts', (req, res) => {
    const allproducts = products
    const copanies = companys
    const data = []
    for (var i = 0; i < copanies.length; i++) {
        var name = copanies[i].name
        var productNames = ""
        for (var j = 0; j < copanies[i].productid.length; j++) {
            const index = products.findIndex((product) => {
                return (product.id == copanies[i].productid[j])
            })

            productNames += products[index].title + ",";

        }
        var jsonData = {
            "Company Name": name,
            "Product Names": productNames
        }
        data.push(jsonData)
    }
    res.json(data)
})

app.delete('/api/company/:id', (req, res) => {
    let id = req.params.id
    let index = companys.findIndex((company) => {
        return (company.companyid == Number.parseInt(id))
    })
    console.log(id);
    if (index >= 0) {
        let prd = companys[index]
        companys.splice(index, 1)
        res.json(prd)
    } else {
        res.status(404)
    }
})

app.get('/api/saller/products/:name', (req, res) => {
    const name = req.params.name
    const index = products.findIndex((product) => {
        return (product.title == name)
    })

    if (index >= 0) {
        const prd = products[index]
        const a = []
        var id = prd.sellerid
        for (var i = 0; i < id.length; i++) {
            const Sindex = sallers.findIndex((saller) => {
                return (saller.sallerid == id[i])
            })
            a.push(sallers[index])
        }
        res.json(a)
    } else {
        res.status(404)
    }
});

app.get('/api/saller/allproducts', (req, res) => {
    const allproducts = products
    const data = []
    for (var i = 0; i < sallers.length; i++) {
        var name = sallers[i].name
        var productNames = ""
        for (var j = 0; j < sallers[i].productid.length; j++) {
            const index = products.findIndex((product) => {
                return (product.id == sallers[i].productid[j])
            })

            productNames += products[index].title + ",";
        }
        var jsonData = {
            "Company Name": name,
            "Product Names": productNames
        }
        data.push(jsonData)
    }
    res.json(data)
})

app.delete('/api/saller/:id', (req, res) => {
    let id = req.params.id
    let index = sallers.findIndex((saller) => {
        return (saller.sellerid == Number.parseInt(id))
    })
    console.log(index);
    if (index >= 0) {
        let prd = sallers[index]
        sallers.splice(index, 1)
        res.json(prd)
    } else {
        res.status(404)
    }
})

app.get('/api/saller', (req, res) => {
    res.json({
        sallers
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const Product = require('../models/productModel');
const { getPostData } = require('../utils');
// description - get all products
// route - get/api/products
async function getProducts(req, res) {
    try{
        const products = await Product.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    }catch(err){
        console.log(err);
    }
}

// description - get single products
// route - get/api/product/:id
async function getProduct(req, res ,id) {
    try{
        const products = await Product.findById(id);

        if(!products){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found'}));
        }else{
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        }
        
    }catch(err){
        console.log(err);
    }
}

// description - create a product
// route - post/api/products
async function createProduct(req, res) {
    try{
        const body = await getPostData(req);

        const { title , description , price}=JSON.parse(body);

        const product ={
            title,
            description,
            price
        } 

        const newProduct = await Product.create(product);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newProduct));

    }catch(err){
        console.log(err);
    }
}

// description - update a product
// route - PUT/api/products/:id
async function updateProduct(req, res ,id) {
    try{
        const product = await Product.findById(id);

        if(!product){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found'}));
        }else{
            
            const body = await getPostData(req);
    
            const { title , description , price}=JSON.parse(body);
    
            const productData ={
                title: title || product.title,
                description: description || product.description ,
                price: price || product.price
            } 
    
            const updProduct = await Product.update(id,productData);
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(updProduct));

        }


    }catch(err){
        console.log(err);
    }
}

// description - delete products
// route - delete/api/product/:id
async function deleteProduct(req, res ,id) {
    try{
        const products = await Product.findById(id);

        if(!products){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found'}));
        }else{
            await Product.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Product ${id} deleted` }));
        }
        
    }catch(err){
        console.log(err);
    }
}
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
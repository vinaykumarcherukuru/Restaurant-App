const Products = require('../models/productModel') 

// Filter, Sorting and Paginating

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ... this.queryString } // queryString = req.query
        // console.log({ before: queryObj }) // before delete page

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete (queryObj[el]))
        // console.log({ after: queryObj }) // after delete page

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        // console.log({ queryStr })

        // gte = greater than or equal
        // lte = lesser than or equal
        // Lt = lesser than
        // gt = greater than
        this.query.find(JSON.parse(queryStr))

        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            // console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }
        else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        
        this.query = this.query.skip(skip).limit(limit)
        return this;
     }
}


const productCtrl = {
    getProducts: async (req, res) => {
        try {
             const products = await Products.find().sort('name:1')
            // res.json(products)
            // const features = new APIfeatures(Products.find(), req.query)
            //     .filtering().sorting().paginating()

            // const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProductsById: async (req, res) => {
        try {   
            const products = await Products.find({category_id: req.params.id})  
            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

         
    },
    createProduct: async (req, res) => {
        try { 
            const {name, price, description, available, images, category_id } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload." })

            const product = await Products.findOne({ name : name.toLowerCase() })
            if (product)
                return res.status(400).json({ msg: "This product already exists." })
  

            const newProduct = new Products({
                name: name.toLowerCase(), price, description, available, images, category_id
            })

            await newProduct.save()
            res.json({ msg: "Created a product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            // await Products.updateMany({}, {$set:{"inCart": false}}) 
            
            const {name, price, description, available, images, category_id } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload." })

            await Products.findByIdAndUpdate({ _id: req.params.id }, {
                name, price, description, available, images, category_id
            }) 
            res.json({ msg: "Updated a Product" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = productCtrl
const Category = require('../models/categoryModel')

const categoryController = {
    getCategories: async (req, res) => { 
        try {
            // const categories = await Category.find().sort('-createdAt') 
            const categories = await Category.find().sort('name:1')           
            res.json(categories)
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    
    // 1-Admin, 0-User
    // If user have role = 1
    // Only Admin can Create, Update and Delete Category
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name })
            if (category)
                return res.status(400).json({ msg: "This category already exists." })

            const newCategory = new Category({ name }) 

            const response = await newCategory.save()
            res.send({ category: response, msg: "Created a category." })

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.send({ msg: "Deleted a category." })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findByIdAndUpdate({ _id: req.params.id }, { name })

            res.send({ msg: "Updated a category." })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = categoryController
const { categories } = require('../data');
const db = require('../database/models');

module.exports = {
    category: (req, res) => {
        Categories.findOne({
            where: {
                id: req.params.id
            },
                include: [{
                    association: 'products',
                    include: [{
                        association: 'productImages'
                    }]
                }]
        })
        .then((category) => {
            let subcategories = category.subcategories;
            let products = [];
            subcategories.forEach((subcategory) => {
                subcategory.products.forEach((product) => {
                    products.push(product);
                });
            });
            res.render('categories', {
                products,
                category,
                subcategories,
                session: req.session
            });
        })
        .catch(error => console.log(error))
    },
    subcategory: (req, res) => {
        Subcategories.findByPk(req.params.subcategory, {
            include: [{
                association: 'products',
                include: [{
                    association: 'productImages'
                }]
            }]
        })
        .then((subcategory) => {
            Categories.findByPk(req.params.categoryId, {
                include: [{association: 'subcategories'}]
            })
            .then((category) => {
                res.render('subcategory', {
                    products: subcategory.products,
                    category,
                    subcategories: category.subcategories,
                    session: req.session
                })
            })
        })
    },
    }

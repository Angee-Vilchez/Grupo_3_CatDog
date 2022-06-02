const fs = require('fs');
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../../data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const writeCategories = (data) => fs.writeFileSync(categoriesFilePath, JSON.stringify(data), 'utf-8');

module.exports = {
    categoryList: (req, res) => {
        res.render('admin/categories/listCategory',{
            categorias: categories
        })
    },

    categoryAdd: (req, res) => {
        res.render('admin/categories/addCategory')
    },
    createCategory: (req, res) => {
        let lastId = 0;
        cateogires.forEach(category => {
            if(category.id > lastId){
                lastId = category.id
            }
        });
        
        let newCategory = {
            ...req.body,
            id: lastId + 1
        }

        categories.push(newCategory);

        writeCategories(categories);

        res.redirect('/admin/categorias/lista')
    },
    categoryEdit: (req, res) => {
        let idCategory = +req.params.id;

        let categoria = categories.find( categoria => categoria.id === idCategory)

        res.render('admin/categories/editCategory', {categoria})
    },
    categoryUpdate: (req, res) => {
        let categoryId = +req.params.id;

        categories.forEach(categoria => {
            if(categoria.id === categoryId){
                categoria.name = req.body.name
            }
        });

        writeCategories(categories);

        res.redirect('/admin/categorias/lista');
    },
    categoryDelete: (req, res) => {
        let categoryId = +req.params.id;

        let categoryDelete;

        categories.forEach(category => {
            if(category.id === categoryId){
                categoryDelete = category.name
                let categoryDeleteIndex = categories.indexOf(category);
                categories.splice(categoryDeleteIndex, 1);
            }
        });

        writeCategories(categories)

        res.redirect('/admin/categorias/lista')
    },
}
const fs = require ('fs')
const path = require('path')

module.exports = {
    index: (req, res) => {
        res.render('admin/adminIndex', {
            titulo: "ADMIN",
            session: req.session,
        })
    }
}
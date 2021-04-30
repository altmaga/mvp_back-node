/*
Imports
*/
const { session } = require('passport');
const Models = require('../models/index');
//

/*
CRUD methods
*/
const createOne = req => {
    return new Promise((resolve, reject) => {
        Models.product.create(req.body)
            .then(data => {
                resolve(data)
                Models.organization.findById(data.organization)
                .then(organization => {
                    console.log(organization);
                    console.log(data)
                    organization.products.push(data);

                    organization.save()
                    .then( updatedorganization => resolve(updatedorganization) )
                    .catch( updateError => reject(updateError) )
                })
            })
            .catch(err => reject(err))
    })
}

const readAll = () => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.product.find()
            .populate('author', ['-password'])
            .populate('organization')
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const readOne = id => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.product.findById(id)
            .populate('author', ['-password'])
            .populate('organization')
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const updateOne = req => {
    return new Promise((resolve, reject) => {
        // Get product by ID
        Models.product.findById(req.body.id)
            .then(product => {

                // check user
                if (String(product.author) !== String(req.user._id)) {
                    reject('User not authorized')
                }

                // Update object
                product.name = req.body.name;
                product.desc = req.body.desc;
                product.dateModified = new Date();

                // Save product changes
                product.save()
                    .then(updatedproduct => resolve(updatedproduct))
                    .catch(updateError => reject(updateError))
            })
            .catch(err => reject(err))
    })
}

const deleteOne = req => {
    return new Promise((resolve, reject) => {
        Models.product.findById(req.params.id)
            .then(product => {
                // check user
                if (String(product.author) !== String(req.user._id)) {
                    reject('User not authorized')
                }
                // Delete object
                Models.product.findByIdAndDelete(req.params.id, (err, deleted) => {
                    if (err) { return reject(err) }
                    else { return resolve(deleted) };
                })

            })
            .catch(err => reject(err));
    });
}
//

/*
Export controller methods
*/
module.exports = {
    readAll,
    readOne,
    createOne,
    updateOne,
    deleteOne
}
//

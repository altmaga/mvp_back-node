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
        Models.category.create(req.body)
            .then(data => {
                resolve(data)
                Models.organization.findById(data.organizations)
                .then(organization => {
                    organization.categories.push(data);

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
        Models.category.find()
            .populate('author', ['-password'])
            .populate('organizations', ['-categories'])
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const readOne = id => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.category.findById(id)
            .populate('author', ['-password'])
            .populate('organizations', ['-categories'])
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const updateOne = req => {
    return new Promise((resolve, reject) => {
        // Get category by ID
        Models.category.findById(req.params.id)
            .then(category => {
                // check user
                if (String(category.author) !== String(req.user._id)) {
                    reject('User not authorized')
                }

                // Update object
                category.name = req.body.name;
                category.desc = req.body.desc;
                category.organizations = req.body.organizations;
                category.dateModified = new Date();

                // Save category changes
                category.save()
                    .then(updatedcategory => resolve(updatedcategory))
                    .catch(updateError => reject(updateError))
            })
            .catch(err => reject(err))
    })
}

const deleteOne = req => {
    return new Promise((resolve, reject) => {
        Models.category.findById(req.params.id)
            .then(category => {
                // check user
                if (String(category.author) !== String(req.user._id)) {
                    reject('User not authorized')
                }
                // Delete object
                Models.category.findByIdAndDelete(req.params.id, (err, deleted) => {
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

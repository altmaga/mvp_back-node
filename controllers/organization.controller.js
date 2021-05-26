/*
Imports
*/
const Models = require('../models/index');
//

/*
CRUD methods
*/
    const createOne = req => {
        return new Promise( (resolve, reject) => {
            Models.organization.create( req.body )
            .then( data => resolve(data) )
            .catch( err => reject(err) )
        })
    }

    const readAll = () => {
        return new Promise( (resolve, reject) => {
            // Mongoose population to get associated data
            Models.organization.find()
            .populate('author', [ '-password' ])
            .populate("products", ["-organization"])
            .populate("categories", ["-organization"])
            .exec( (err, data) => {
                if( err ){ return reject(err) }
                else{ return resolve(data) }
            })
        })
    }

    const readOne = id => {
        return new Promise( (resolve, reject) => {
            // Mongoose population to get associated data
            Models.organization.findById( id )
            .populate('author', [ '-password' ])
            .populate("products", ["-organization"])
            .populate("categories", ["-organization"])
            .exec( (err, data) => {
                if( err ){ return reject(err) }
                else{ return resolve(data) }
            })
        })
    }

    const updateOne = req => {
        return new Promise( (resolve, reject) => {
            // Get organization by ID
            Models.organization.findById( req.params.id )
            .then( organization => {
                // Update object
                organization.legalName = req.body.legalName;
                organization.bg = req.body.bg;
                organization.address = req.body.address;
                organization.hours = req.body.hours;
                organization.delivery = req.body.delivery;
                organization.description = req.body.description;
                organization.phone = req.body.phone;
                organization.fb = req.body.fb;
                organization.insta = req.body.insta;
                organization.dateModified = new Date();

                // Check author
                if (String(organization.author) !== String(req.user._id)) {
                    reject('User not authorized')
                }

                // Save organization changes
                organization.save()
                .then( updatedOrganization => resolve(updatedOrganization) )
                .catch( updateError => reject(updateError) )
            })
            .catch( err => reject(err) )
        })
    }

    const deleteOne = req => {
        return new Promise((resolve, reject) => {
            Models.organization.findById(req.params.id)
                .then(organization => {
                    // check user
                    if (String(organization.author) !== String(req.user._id)) {
                        reject('User not authorized')
                    }
                    // Delete object
                    Models.organization.findByIdAndDelete(req.params.id, (err, deleted) => {
                        if (err) { return reject(err) }
                        else { return resolve(deleted) };
                    })

                })
                .catch(err => reject(err));
        });
    }

    const readAllbyCategoryId = id => {

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
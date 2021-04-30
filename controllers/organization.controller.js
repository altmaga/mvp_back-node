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
            .exec( (err, data) => {
                if( err ){ return reject(err) }
                else{ return resolve(data) }
            })
        })
    }

    const updateOne = req => {
        return new Promise( (resolve, reject) => {
            // Get organization by ID
            // console.log(req.params.id);
            Models.organization.findById( req.params.id )
            .then( organization => {
                // Update object
                organization.legalName = req.body.legalName;
                organization.category = req.body.category;
                organization.dateModified = new Date();

                // TODO: Check author
                // if( organization.author !== req.user._id ){ return reject('User not authorized') }

                // Save organization changes
                organization.save()
                .then( updatedOrganization => resolve(updatedOrganization) )
                .catch( updateError => reject(updateError) )
            })
            .catch( err => reject(err) )
        })
    }

    const deleteOne = req => {
        return new Promise( (resolve, reject) => {
             // Delete object
             Models.organization.findByIdAndDelete( req.params.id, (err, deleted) => {
                if( err ){ return reject(err) }
                else{ return resolve(deleted) };
            })

            // // Get organization by ID
            // Models.organization.findById( req.params.id )
            // .then( organization => {
            //     // TODO: Check author
            //     if( organization.author !== req.user._id ){ return reject('User not authorized') }
            //     else{
            //         // Delete object
            //         Models.organization.findByIdAndDelete( req.params.id, (err, deleted) => {
            //             if( err ){ return reject(err) }
            //             else{ return resolve(deleted) };
            //         })
            //     }
            // })
            .catch( err => reject(err) );
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
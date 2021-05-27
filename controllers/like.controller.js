/*
Imports
*/
const e = require('express');
const Models = require('../models/index');
//

/*
CRUD methods
*/
const createOne = req => {
    return new Promise((resolve, reject) => {
        Models.like.create(req.body)
            .then(data => {
                var apiResponse = {
                    data: data,
                    nbLikeOrganization: 0,
                };

                Models.organization.findById(data.organization)
                .then(organization => {
                  organization.likes.push(data);

                  organization.save()
                  .then(updatedOrganization => {
                      apiResponse.nbLikeOrganization = updatedOrganization.likes.length;
                      resolve(apiResponse)
                  })
                  .catch(updateError => reject(updateError))
                })
                .catch(err => reject(err))
                resolve(apiResponse)
            })
            .catch(err => reject(err))
    })
}

const readAll = () => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.like.find()
            .populate('like', ['author'])
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
        Models.like.findById(id)
            .populate('like', ['author'])
            .populate('organization')
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const updateOne = req => {
    return new Promise((resolve, reject) => {
        // Get like by ID
        Models.like.findById(req.params.id)
            .then(like => {

                if (like.author !== req.user._id) {
                    return reject('User not authorized')
                }

                // Update object
                like.dateModified = new Date();

                // Save like changes
                like.save()
                    .then(updatedlike => resolve(updatedlike))
                    .catch(updateError => reject(updateError))
            })
            .catch(err => reject(err))
    })
}

const deleteOne = req => {
  return new Promise((resolve, reject) => {
      Models.like.findById(req.params.id)
      .then(like => {
          // check user
          if (String(like.author) !== String(req.user._id)) {
              reject('User not authorized')
          }
          // Delete object
          Models.like.findByIdAndDelete(req.params.id, (err, deleted) => {
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

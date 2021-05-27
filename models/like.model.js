/*
Import
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
//

/*
Definition
*/
const MySchema = new Schema({
    // Schema.org
    '@context': { type: String, default: 'http://schema.org' },
    '@type': { type: String, default: 'Like' },

    // Associer le profil utilisateur
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    // Associer l'organisation
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organization'
    },

    // Définir une valeur par défaut
    creationDate: { type: Date, default: new Date() },
    dateModified: { type: Date, default: new Date() },
    isPublished: { type: Boolean, default: true }
})
//

/*
Export
*/
module.exports = mongoose.model('like', MySchema)
//

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
    '@type': { type: String, default: 'Organization' },

    legalName: String,
    bg: String,
    address: String,
    hours: String,
    delivery: String,
    description: String,
    phone: String,
    fb: { type: String, default: null },
    insta: { type: String, default: null},

    // Associer le profil utilisateur
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    // Associer les produits
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],

    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],

    // Définir une valeur par défaut
    creationDate: { type: Date, default: new Date() },
    dateModified: { type: Date, default: new Date() },
    banished: { type: Boolean, default: false }
})
//

/*
Export
*/
module.exports = mongoose.model('organization', MySchema)
//
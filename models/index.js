/*
Definition
*/
    const Models = {
        user: require('./user.model'),
        organization: require('./organization.model'),
        product: require('./product.model'),
        category: require('./category.model'),
        like: require('./like.model')
    }
//

/*
Export
*/
    module.exports = Models;
//
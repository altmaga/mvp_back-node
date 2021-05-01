/*
Definition
*/
    const Controllers = {
        auth: require('./auth.controller'),
        product: require('./product.controller'),
        organization: require('./organization.controller'),
        category: require('./category.controller'),
    }
//

/*
Export
*/
    module.exports = Controllers;
//
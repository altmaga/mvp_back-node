/*
Definition
*/
    const Mandatory = {
        register: [ 'givenName', 'familyName', 'password', 'email', 'isOrganization' ],
        login: [ 'password', 'email' ],
        organization: [ 'legalName', 'bg', 'address', 'hours', 'delivery', 'description', 'phone', 'fb', 'insta'],
        product: [ 'name', 'desc', 'img', 'organization'],
        category: [ 'name', 'desc', 'organizations']
    }
//

/*
Export
*/
    module.exports = Mandatory;
//
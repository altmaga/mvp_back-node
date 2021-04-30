/*
Definition
*/
    const Mandatory = {
        register: [ 'givenName', 'familyName', 'password', 'email', 'isOrganization' ],
        login: [ 'password', 'email' ],
        organization: [ 'legalName', 'category' ],
        product: [ 'name', 'desc', 'organization']
    }
//

/*
Export
*/
    module.exports = Mandatory;
//
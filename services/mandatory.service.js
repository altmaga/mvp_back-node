/*
Definition
*/
    const Mandatory = {
        register: [ 'givenName', 'familyName', 'password', 'email', 'isOrganization' ],
        login: [ 'password', 'email' ],
        organization: [ 'legalName'],
        product: [ 'name', 'desc', 'organization'],
        category: [ 'name', 'desc', 'organization']
    }
//

/*
Export
*/
    module.exports = Mandatory;
//
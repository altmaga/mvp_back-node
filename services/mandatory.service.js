/*
Definition
*/
    const Mandatory = {
        register: [ 'givenName', 'familyName', 'password', 'email', 'isOrganization', 'organizations' ],
        login: [ 'password', 'email' ],
        organization: [ 'legalName' ],
        product: [ 'name', 'desc', 'organization']
    }
//

/*
Export
*/
    module.exports = Mandatory;
//
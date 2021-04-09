/*
Definition
*/
    const Mandatory = {
        register: [ 'givenName', 'familyName', 'password', 'email', 'isOrganization' ],
        login: [ 'password', 'email' ],
        organization: [ 'legalName' ],
        post: [ 'headline', 'body' ]
    }
//

/*
Export
*/
    module.exports = Mandatory;
//
/**
 * Load the AcachaForm helper class.
 */
let Form  = require('./forms/form');

let axios   = require('axios');


//TODO : cal Form? i Errors aquí?
//TODO: Que pasa si csrfToken no existeix? (projecte no Laravel per exemple)

/**
 * Export the root Acacha object.
 */
module.exports = class {

    /**
     * Constructor.
     */
    constructor() {
        this.http       = axios.create({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': Laravel.csrfToken
            }
        });
    }

    /**
     * Helper method for making POST HTTP requests.
     */
    post(uri, form) {
        return this.submit('post', uri, form);
    }


    /**
     * Helper method for making PUT HTTP requests.
     */
    put(uri, form) {
        return this.submit('put', uri, form);
    }


    /**
     * Helper method for making PATCH HTTP requests.
     */
    patch(uri, form) {
        return this.submit('patch', uri, form);
    }


    /**
     * Helper method for making DELETE HTTP requests.
     */
    delete(uri, form) {
        return this.submit('delete', uri, form);
    }


    /**
     * Submit the form to the back-end api/server.
     *
     */
    submit(method, uri, form) {
        return new Promise((resolve, reject) => {
            form.startProcessing();

            this.http[method](uri, JSON.parse(JSON.stringify(form)))
                .then(response => {
                    form.finishProcessing();

                    resolve(response.data);
                })
                .catch(errors => {
                    form.errors.set(errors.response.data);
                    form.finishProcessingOnErrors();

                    reject(errors.data);
                });
        });
    }

};


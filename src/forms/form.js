
let Errors  = require('./errors');

module.exports = class {

    /**
     * Constructor.
     *
     * @param data
     */
    constructor(data) {

        this.clearOnSubmit  = false;

        this.errors     = new Errors();

        this.resetStatus();

        this.originalData   = data;
        for (let field in this.originalData) {

            this[field] = data[field];
        }

    }

    /**
     * Get form data.
     *
     * @returns {{}}
     */
    data() {

        let data   = {};

        for(let property in this.originalData) {

            data[property]  = this[property];

        }

        return data;
    }

    /**
     * Start processing the form.
     *
     */
    startProcessing = function () {
        this.errors.forget();
        this.submitting = true;
        this.succeeded = false;
    };

    /**
     * Finish processing the form.
     *
     */
    finishProcessing = function () {
        this.submitting = false;
        this.submitted  = false;
        this.succeeded  = true;
    };

    /**
     * Finish processing the form on Errors.
     *
     */
    finishProcessingOnErrors = function () {
        this.submitting = false;
        this.submitted  = false;
        this.succeeded = false;
    };


    /**
     * Reset form.
     *
     */
    reset() {

        for (let field in this.originalData) {

            this[field] = '';
        }

        this.errors.clear();
    }

    /**
     * Activates form clearing/reset after submit.
     *
     */
    clearOnSubmit()
    {
        this.clearOnSubmit  = true;
    }

    /**
     * Reset status.
     *
     */
    resetStatus() {
        this.errors.forget();
        this.submitting     = false;
        this.submitted      = false;
        this.succeeded      = false;
    }

    /**
     * Set the errors on the form.
     *
     */
    setErrors(errors) {
        this.submitting = false;
        this.errors.set(errors);
    };
}
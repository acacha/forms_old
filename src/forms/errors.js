/**
 * Acacha form error class.
 */
module.exports = class {

    /**
     * Constructor.
     */
    constructor() {
        this.errors = {}
    }

    /**
     * Get the first error message for a given field.
     */
    get(field) {

        if (this.has[field]) {

            return this.errors[field][0]
        }
    }

    /**
     * Get all of the errors for the collection in a flat array.
     */
    flatten() {
        return _.flatten(_.toArray(this.errors))
    }

    /**
     * Get all of the raw errors for the collection.
     */
    all() {
        return this.errors
    }

    /**
     * Check if there are any errors.
     *
     * @returns {boolean}
     */
    any() {
        return (Object.keys(this.errors).length > 0)
    }

    /**
     * Determine if the collection has errors for a given field.
     */
    has (field) {
        return this.errors.hasOwnProperty(field)
    }

    /**
     * Determine if the collection has any errors.
     */
    hasErrors() {
        return ! _.isEmpty(this.errors)
    }

    /**
     * Set the raw errors for the collection.
     */
    record(errors) {
        this.set(errors)
    }

    /**
     * Set the raw errors for the collection.
     */
    set(errors) {
        if (typeof errors === 'object') {
            this.errors = errors
        } else {
            this.errors = {'form': ['Something went wrong. Please try again or contact customer support.']}
        }
    }

    /**
     * Clear all errors if no field parameter is provided
     * or clear only field if provided.
     *
     * @param field (optional)
     */
    clear(field) {

        if (field) {
            delete this.errors[field]

            return
        }

        this.errors = {}
    }

    /**
     * Clear all errors if no field parameter is provided
     * or clear only field if provided.
     */
    forget(field) {
        this.clear(field)
    }
}

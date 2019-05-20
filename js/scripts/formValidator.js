var formValidator = {
    /**
     * @type {object} Messages to show on each type of error
     */
    messages: {
        nameError: 'Please enter a correct name',
        emailError: 'The E-Mail address you provided is invalid',
        phoneError: 'Provided phone number is invalid. Phone number should contain digits only',
        commentError: 'The comment must be longer than 0 and shorter than 500 characters'
    },

    /**
     * Runs validation of all fields of the form
     * @param {Object} formData Object containing data submitted by user.
     * @returns {Array} errors - Array with error messages in case of any errors, empty array otherwise
     */
    validateForm: function (formData) {
        var errors = [];

        if (!this.validateName(formData.get('name'))) {
            errors.push(this.messages.nameError);
        }
        if (!this.validateEmail(formData.get('email'))) {
            errors.push(this.messages.emailError);
        }
        if (!this.validatePhone(formData.get('phone'))) {
            errors.push(this.messages.phoneError);
        }
        if (!this.validateComment(formData.get('comment'))) {
            errors.push(this.messages.commentError);
        }

        return errors;
    },

    /**
     * Validates the input of the Name field
     * @param {string} value Input data
     * @returns {boolean} 
     */
    validateName: function (value) {
        var pattern = /^[a-zA-Z ]+$/;
        return value && pattern.test(value);
    },
    
    /**
     * Validates the input of the E-Mail field
     * @param {string} value Input data
     * @returns {boolean} 
     */
    validateEmail: function (value) {    
        var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        value = value.toLowerCase();
        return value && pattern.test(value);
    },
    
    /**
     * Validates the input of the Phone field
     * @param {string} value Input data
     * @returns {boolean} 
     */
    validatePhone: function (value) { 
        var pattern = /^[0-9]+$/;
        return !value || pattern.test(value);
    },
    
    /**
     * Validates the input of the Comment field
     * @param {string} value Input data
     * @returns {boolean} 
     */
    validateComment: function (value) {
        return value && value.length <= 500;
    }
}


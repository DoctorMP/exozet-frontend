var formHandler = {
    /** @type {object} form node */
    formEl: {},

    /** @type {object} submit button node */
    button: {},

    /** @type {string} destination url */
    url: '',

    /**
     * Initialize the form handler: cache elements and add event listeners
     * @param {object} element - the form element 
     */
    initialize: function (element) {
        this.formEl = element;
        this.button = this.formEl.querySelector('button');
        this.url = this.formEl.getAttribute('action');

        this.addEventListeners();
    },

    /**
     * Changes the state of the submit form and prevents the user form clicking it
     */
    blockSubmitButton: function () {
        this.button.oldText = this.button.innerText;
        this.button.addEventListener('click', this.blockClicking);
        this.button.innerText = 'Sending...';
    },
    
    /**
     * Restores the original state of the submit button
     */
    unblockSubmitButton: function () {
        this.button.innerText = this.button.oldText;
        this.button.removeEventListener('click', this.blockClicking);
    },

    /**
     * Prevents clicking on the element
     * @param {object} event 
     */
    blockClicking: function (event) {
        event.preventDefault();
    },

    /**
     * Removes any error or success messages if there are any
     */
    cleanUpMessages: function () {
        var oldInfo = document.getElementById('form-result-info');
        if (oldInfo) {
            this.formEl.removeChild(oldInfo);
        }
    },

    /**
     * Creates a result message node, works for success and errors
     * @param {string} messageText - the text of the message 
     * @param {boolean} error - if true - treat it as error message, a success message otherwise
     * @returns {object}
     */
    createResultMessage: function (messageText, error) {
        var messageClass = error ? 'form-error' : 'form-info',
            messageNode = document.createElement('p');

        messageNode.setAttribute('id', 'form-result-info');  
        messageNode.classList.add(messageClass);
        messageNode.innerHTML = messageText; 

        return messageNode;
    },

    /**
     * Resets the form
     */
    clearForm: function () {
        this.formEl.reset();
    },

    /**
     * Adds event listeners to elements that need them
     */
    addEventListeners: function () {
        this.formEl.addEventListener('submit', this.onFormSubmit);
        this.formEl.querySelector('#comment').addEventListener('change', this.onTextChange);
    },

    /**
     * Handles form submit event
     * @param {object} event 
     */
    onFormSubmit: function (event) {
        event.preventDefault();

        // get user input
        var formData = new FormData(event.target);

        // prevent user from submittng too many times
        formHandler.blockSubmitButton();
        
        // clean up messages it there are any
        formHandler.cleanUpMessages();

        // validate field values
        var errors = formValidator.validateForm(formData);

        if (errors.length) {
            // if there are any errors, display proper error messages
            var errMessages = errors.join('<br />');
            var errMessageNode = formHandler.createResultMessage(errMessages, true);
            formHandler.formEl.insertBefore(errMessageNode, formHandler.formEl.querySelector('.form-field'));
            formHandler.unblockSubmitButton();
        } else {
            // no errors - send AJAX request to the url specified in the action parameter
            // I'm not handling the response from the API, as there's no backend api - this code bases only on the request status
            var request = new XMLHttpRequest();

            // display a success message and reset the form on success
            request.addEventListener('load', function(event) {
                var messageNode = formHandler.createResultMessage('Comment added successfully', false);
                formHandler.formEl.appendChild(messageNode);
                formHandler.unblockSubmitButton();
                formHandler.clearForm();
            });

            // display an error message if the request fails
            request.addEventListener('error', function(event) {
                var messageNode = formHandler.createResultMessage('Something went wrong', true);
                formHandler.formEl.appendChild(messageNode);
                formHandler.unblockSubmitButton();
            });
    
            // send the request
            request.open('POST', formHandler.url);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send(formData);
        }
    },

    /**
     * Handles change on the textarea and updates its value so the FormData object can intercept it
     * @param {object} event 
     */
    onTextChange: function (event) {
        var field = event.target;
        field.setAttribute('value', field.innerText);
    } 
}
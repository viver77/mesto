
export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings
        this._formElement = formElement
    }

    _setEventListeners() {

        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector))
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector)

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement)

                this._toggleButtonState()
            })
        })

    }

    _isValid (inputElement) {

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(inputElement)
        }
    }

    _showInputError (inputElement, errorMessage) {
        inputElement.classList.add(this._settings.inputErrorClass)

        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        errorElement.classList.add(this._settings.errorClass)
        errorElement.textContent = errorMessage
    }

    _hideInputError (inputElement) {
        inputElement.classList.remove(this._settings.inputErrorClass)

        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        errorElement.classList.remove(this._settings.errorClass)
    }

    _toggleButtonState() {

        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass)
            this._buttonElement.disabled = true
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass)
            this._buttonElement.disabled = false
        }
    }

    _hasInvalidInput () {

        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    enableValidation() {
        this._setEventListeners()
    }

    hideInputsErrors(){
        this._inputList.forEach(inputElement =>{
            this._hideInputError (inputElement)
        })
    }
}

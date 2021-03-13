
export default class FormValidator {
    constructor(settings, formElement, handleFormSubmit) {
        this._settings = settings
        this._formElement = formElement

        this._handleFormSubmit = handleFormSubmit
    }

    _setEventListeners() {

        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector))
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector)

        this._handleMessageClickSubmit(buttonElement)

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement)

                this._toggleButtonState(inputList, buttonElement, this._settings)
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

    _handleMessageClickSubmit(buttonElement) {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault()

            if (!buttonElement.classList.contains(this._settings.inactiveButtonClass)) {
                this._handleFormSubmit(evt)
            }
        })
    }

    _toggleButtonState(inputList, buttonElement, settings) {

        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(settings.inactiveButtonClass)
        } else {
            buttonElement.classList.remove(settings.inactiveButtonClass)
        }
    }

    _hasInvalidInput (inputList) {

        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    enableValidation() {
        this._setEventListeners()
    }
}

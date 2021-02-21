
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    inputElement.classList.add(settings.inputErrorClass)

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.classList.add(settings.errorClass)
    errorElement.textContent = errorMessage
}

const hideInputError = (formElement, inputElement, settings) => {
    inputElement.classList.remove(settings.inputErrorClass)

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.classList.remove(settings.errorClass)
}

const isValid = (formElement, inputElement, settings) => {

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings)
    } else {
        hideInputError(formElement, inputElement, settings)
    }
}

const hasInvalidInput = (inputList) => {

    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

const toggleButtonState = (inputList, buttonElement, settings) => {

    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass)
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass)
    }
}

const setEventListeners = (formElement, settings) => {

    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
    const buttonElement = formElement.querySelector(settings.submitButtonSelector)

    formElement.addEventListener("submit", (evt) => {
        evt.preventDefault()

        if (!buttonElement.classList.contains(settings.inactiveButtonClass)) {
            handleFormSubmit(evt)
        }
    })

    toggleButtonState(inputList, buttonElement, settings)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, settings)

            toggleButtonState(inputList, buttonElement, settings)
        })
    })
}

const enableValidation = (settings) => {

    const formList = Array.from(document.querySelectorAll(settings.formSelector))

    formList.forEach((formElement) => {
        setEventListeners(formElement, settings)
    })
}

enableValidation(
    {
        formSelector: '.form',
        inactiveButtonClass: 'form__submit_inactive',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__submit',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
    }
)
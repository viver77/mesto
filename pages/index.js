
import {initialCards} from './initialCards.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Popup from './PopUp.js'

const profileTitle = document.querySelector('.profile__title')
const profileSubTitle = document.querySelector('.profile__subtitle')
const editBtn = document.querySelector('.profile__edit-btn')
const addBtn = document.querySelector('.profile__add-btn')
const elements = document.querySelector('.elements')
const formAdd = document.querySelector('.form-add')
const formEdit = document.querySelector('.form-edit')

const popupAdd = new Popup(document.querySelector('.popup-add'))
const popupEdit = new Popup(document.querySelector('.popup-edit'))

const settings = {
    inactiveButtonClass: 'form__submit_inactive',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

function generateCardElement(item, cardSelector) {
    return new Card(item, cardSelector).generateCard();
}

initialCards.forEach(item => {
    elements.append(generateCardElement(item, '.template-card'))
})

const formAddValidator = new FormValidator(settings, formAdd)
formAddValidator.enableValidation()

const formEditValidator = new FormValidator(settings, formEdit)
formEditValidator.enableValidation()

formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault()

    profileTitle.textContent = formEdit.elements.inputTitle.value
    profileSubTitle.textContent = formEdit.elements.inputSubTitle.value

    popupEdit.closePopup()
})

formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const cardElement = generateCardElement({
        name: formAdd.elements.inputTitle.value,
        link: formAdd.elements.inputSubTitle.value
    }, '.template-card')

    elements.prepend(cardElement)

    popupAdd.closePopup()

})

editBtn.addEventListener("click", () => {

    formEdit.elements.inputTitle.value = profileTitle.textContent
    formEdit.elements.inputSubTitle.value = profileSubTitle.textContent

    formEditValidator.hideInputsErrors()

    popupEdit.openPopup()

})

addBtn.addEventListener('click', () => {

    formAdd.elements.inputTitle.value = ''
    formAdd.elements.inputSubTitle.value = ''
    formAdd.elements.formSubmit.classList.add('form__submit_inactive')

    formAddValidator.hideInputsErrors()

    popupAdd.openPopup()
})


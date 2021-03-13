
 import Card from './Card.js'
 import FormValidator from './FormValidator.js'
 import Popup from './PopUp.js'

const profileTitle = document.querySelector('.profile__title')
const profileSubTitle = document.querySelector('.profile__subtitle')
const editBtn =  document.querySelector('.profile__edit-btn')
const addBtn = document.querySelector('.profile__add-btn')
const elements = document.querySelector('.elements')
const popupEdit = document.querySelector('.popup-edit')
const popupAdd = document.querySelector('.popup-add')
const formAdd = document.querySelector('.form-add')
const popups = document.querySelectorAll('.popup')

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]

initialCards.forEach(item => {

    const card = new Card(item, '.template-card', new Popup(document.querySelector('.popup-image')));
    const cardElement = card.generateCard();

    elements.append(cardElement)
})


function handleFormSubmit (evt) {

    const form = evt.target.closest('.form')

    if (form.name === 'form-edit') {
        profileTitle.textContent = form.elements.inputTitle.value
        profileSubTitle.textContent = form.elements.inputSubTitle.value
    }

    if (form.name === 'form-add') {

        const card = new Card( {
            name: form.elements.inputTitle.value,
            link: form.elements.inputSubTitle.value
        }, '.template-card');
        const cardElement = card.generateCard();

        elements.prepend(cardElement)
    }

    new Popup(evt.target.closest('.popup')).closePopup()
}

editBtn.addEventListener("click", () => {

    const popup = new Popup(popupEdit)
    const form = popupEdit.querySelector('form')
    form.elements.inputTitle.value = profileTitle.textContent
    form.elements.inputSubTitle.value = profileSubTitle.textContent

    popup.openPopup()

})

addBtn.addEventListener('click', () => {

    formAdd.elements.formSubmit.classList.add('form__submit_inactive')
    new Popup(popupAdd).openPopup()
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {

        if (evt.target.classList.contains('popup_opened')) {
            new Popup(popup).closePopup()
        }
        if (evt.target.classList.contains('popup__close-btn')) {
            new Popup(popup).closePopup()
        }
    })
})

Array.from(document.querySelectorAll('.form')).forEach(formElement => {

    const formValidator = new FormValidator({
        inactiveButtonClass: 'form__submit_inactive',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__submit',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
    },formElement,handleFormSubmit)

    formValidator.enableValidation()
})

const profileTitle = document.querySelector('.profile__title')
const profileSubTitle = document.querySelector('.profile__subtitle')
const editBtn =  document.querySelector('.profile__edit-btn')
const addBtn = document.querySelector('.profile__add-btn')
const elements = document.querySelector('.elements')
const cardTemplate = document.querySelector('.template-card')
const popupImage = document.querySelector('.popup-image')
const popupImageImage = document.querySelector('.popup-image__image')
const popupImageFigcaption = document.querySelector('.popup-image__figcaption')
const popupEdit = document.querySelector('.popup-edit')
const popupAdd = document.querySelector('.popup-add')
const formEdit = document.querySelector('.form-edit')
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

//--------------------------------------------//

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

function openPopup(popup) {

    document.addEventListener('keydown', closeByEscape);
    popup.classList.add('popup_opened')
}

function closePopup(popup) {

    document.removeEventListener('keydown', closeByEscape)
    popup.classList.remove('popup_opened')
}

function createNewCard(item) {

    const newCard = cardTemplate.content.cloneNode(true)
    const cardImage = newCard.querySelector('.card__image')
    const cardDescription = newCard.querySelector('.card__description')

    cardImage.src = item.link
    cardImage.alt = item.name
    cardDescription.textContent = item.name

    newCard.querySelector('.card__like').addEventListener('click', evt => {
        evt.target.classList.toggle('card__like_active')
    })

    newCard.querySelector('.card__trash').addEventListener('click', evt => {
        evt.currentTarget.parentElement.remove()
    })

    cardImage.addEventListener('click', () => {

        popupImageImage.src = item.link
        popupImageImage.alt = item.name
        popupImageFigcaption.textContent = item.name

        openPopup(popupImage)
    })

    return newCard
}


//--------------------------------------------//

initialCards.forEach(item => {
    elements.append(createNewCard(item))
})

//--------------------------------------------//

function handleFormSubmit (evt) {

    const form = evt.target.closest('.form')

    if (form.name === 'form-edit') {
        profileTitle.textContent = form.elements.inputTitle.value
        profileSubTitle.textContent = form.elements.inputSubTitle.value
    }

    if (form.name === 'form-add') {
        elements.prepend(createNewCard(
            {
                name: form.elements.inputTitle.value,
                link: form.elements.inputSubTitle.value
            }
        ))
    }

    closePopup(evt.target.closest('.popup'));

}

//------------------------------------------------------//

function hideInputErrors (popup) {

    const formElement = popup.querySelector('.form')
    const inputList = Array.from(formElement.querySelectorAll('.form__input'))

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement,  {inputErrorClass: 'form__input_type_error',
            errorClass: 'form__input-error_active'})

        inputElement.value = ''
    })
}

editBtn.addEventListener("click", () => {

    formEdit.elements.formSubmit.classList.remove('form__submit_inactive')
    hideInputErrors (popupEdit)

    formEdit.elements.inputTitle.value = profileTitle.textContent
    formEdit.elements.inputSubTitle.value = profileSubTitle.textContent

    openPopup(popupEdit);
})

addBtn.addEventListener('click', () => {

    formAdd.elements.formSubmit.classList.add('form__submit_inactive')
    hideInputErrors (popupAdd)
    openPopup(popupAdd);
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {

        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-btn')) {
            closePopup(popup)
        }
    })
})
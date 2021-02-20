
const profileTitle = document.querySelector('.profile__title')
const profileSubTitle = document.querySelector('.profile__subtitle')
const formTitle   = document.querySelector('.form__input_type_title')
const formSubTitle   = document.querySelector('.form__input_type_subtitle')
const editBtn =  document.querySelector('.profile__edit-btn')
const addBtn = document.querySelector('.profile__add-btn')
const popupCloseBtn = document.querySelectorAll('.popup__close-btn')
const elements = document.querySelector('.elements')
const cardTemplate = document.querySelector('.template-card')
const popupImage = document.querySelector('.popup-image')
const popupImageImage = document.querySelector('.popup-image__image')
const popupImageFigcaption = document.querySelector('.popup-image__figcaption')
const popupEdit = document.querySelector('.popup-edit')
const popupAdd = document.querySelector('.popup-add')
const formEdit = document.querySelector('.form-edit')
const formAdd = document.querySelector('.form-add')

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

const removeEventListeners = () => {
    document.removeEventListener('keydown', handleKeydownClose)
}

function closePopup(popup) {

    popup.classList.remove('popup_opened')

    const formElement = popup.querySelector('.form')
    const inputList = Array.from(formElement.querySelectorAll('.form__input'))
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement,  {inputErrorClass: 'form__input_type_error',
            errorClass: 'form__input-error_active'})

        inputElement.value = ''
    })

    removeEventListeners()
}

const handleKeydownClose = (evt, popup) => {
    if (evt.key === 'Escape') {
        closePopup(popup)
    }
}

function openPopup(popup) {

    if (!popup.classList.contains('popup-image')) {
        const formElement = popup.querySelector('.form')
        const inputList = Array.from(formElement.querySelectorAll('.form__input'))
        const buttonElement = formElement.querySelector('.form__submit')
        toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'form__submit_inactive'})
    }

    popup.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)}
    })

    document.addEventListener('keydown', (evt) => handleKeydownClose(evt, popup))

    popup.classList.add('popup_opened')
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

    cardImage.addEventListener('click', evt => {

        popupImageImage.src = evt.currentTarget.src
        popupImageImage.alt = evt.currentTarget.alt
        popupImageFigcaption.textContent = evt.currentTarget.alt

        openPopup(popupImage)
    })

    return newCard
}

//--------------------------------------------//

initialCards.forEach(item => {
    elements.append(createNewCard(item))
})

//--------------------------------------------//

formEdit.addEventListener('submit', evt => {
    evt.preventDefault();

    if (hasInvalidInput(Array.from(formEdit.querySelectorAll('.form__input')))) {
        return
    }

    profileTitle.textContent = evt.currentTarget.querySelector('.form__input_type_title').value
    profileSubTitle.textContent = evt.currentTarget.querySelector('.form__input_type_subtitle').value

    closePopup(popupEdit);
})

formAdd.addEventListener('submit', evt => {
    evt.preventDefault();

    if (hasInvalidInput(Array.from(formAdd.querySelectorAll('.form__input')))) {
        return
    }

    const formTitle = evt.currentTarget.querySelector('.form__input_type_title')
    const formSubtitle = evt.currentTarget.querySelector('.form__input_type_subtitle')

    elements.prepend(createNewCard(
        {
            name: formTitle.value,
            link: formSubtitle.value
        }
    ))

    closePopup(popupAdd);

    formTitle.value = ''
    formSubtitle.value = ''

});

//------------------------------------------------------//

editBtn.addEventListener("click", () => {

    formTitle.value = profileTitle.textContent
    formSubTitle.value = profileSubTitle.textContent

    openPopup(popupEdit);
})

addBtn.addEventListener('click', evt => {
    openPopup(popupAdd);
})

popupCloseBtn.forEach(item => {
    item.addEventListener('click', evt => {
        closePopup(evt.currentTarget.parentElement.parentElement)
    })
})


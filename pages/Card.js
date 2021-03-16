
const popup = document.querySelector('.popup-image')
const popupImage = popup.querySelector('.popup-image__image')
const popupFigcaption = popup.querySelector('.popup-image__figcaption')


export default class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector
        this._image = data.link
        this._description = data.name
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.cloneNode(true)
    }

    generateCard() {
        this._element = this._getTemplate()

        const cardImage = this._element.querySelector('.card__image')
        cardImage.src = this._image
        cardImage.alt = this._description

        this._element.querySelector('.card__description').textContent = this._description
        this._setEventListeners()

        return this._element
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', evt => {
            this._handleMessageClicklike(evt)
        })

        this._element.querySelector('.card__trash').addEventListener('click', evt => {
            this._handleMessageClickTrash(evt)
        })

        this._element.querySelector('.card__image').addEventListener('click', evt => {
            this._handleMessageClickImage()
        })
    }

    _handleMessageClicklike(evt) {
        evt.target.classList.toggle('card__like_active')
    }

    _handleMessageClickTrash( evt) {
        evt.target.closest('.card').remove()
    }

    _handleMessageClickImage() {

        popupImage.src = this._image
        popupImage.alt = this._description
        popupFigcaption.textContent = this._description

        popup.addEventListener('mousedown', evt => {
            if (evt.target.classList.contains('popup__close-btn')) {
                closePopup()
            }
            if (evt.target.classList.contains('popup_opened')) {
                closePopup()
            }
        })

        openPopup()
    }
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup()
    }
}

function openPopup() {
    document.addEventListener('keydown', (evt) => closeByEscape(evt));
    popup.classList.add('popup_opened')
}

function closePopup() {
    document.removeEventListener('keydown', (evt) => closeByEscape(evt))
    popup.classList.remove('popup_opened')
}
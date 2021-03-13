
export default class Card {
    constructor(data, cardSelector, Popup) {
        this._cardSelector = cardSelector
        this._image = data.link
        this._description = data.name
        this._Popup = Popup
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.cloneNode(true)
    }

    generateCard() {
        this._element = this._getTemplate()
        this._element.querySelector('.card__image').src = this._image
        this._element.querySelector('.card__image').alt = this._description
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

        const popup = document.querySelector('.popup-image')
        const popupImage = popup.querySelector('.popup-image__image')
        const popupFigcaption = popup.querySelector('.popup-image__figcaption')

        popupImage.src = this._image
        popupImage.alt = this._description
        popupFigcaption.textContent = this._description

        this._Popup.openPopup()
    }
}

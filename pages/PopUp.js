
export default class PopUp {
    constructor(popup) {
        this._popup = popup
    }

    openPopup() {
        this._setEventListeners()
        this._popup.classList.add('popup_opened')
    }

    closePopup() {
        document.removeEventListener('keydown', () => this._closeByEscape)
        this._popup.classList.remove('popup_opened')
    }

    _closeByEscape(evt) {
        if (evt.key === 'Escape') {
            this.closePopup()
        }
    }

    _setEventListeners() {
        this._popup.addEventListener('mousedown', evt => {
            if (evt.target.classList.contains('popup__close-btn')) {
                this.closePopup()
            }
            if (evt.target.classList.contains('popup_opened')) {
                this.closePopup()
            }
        })

        document.addEventListener('keydown', (evt) => this._closeByEscape(evt));
    }
}
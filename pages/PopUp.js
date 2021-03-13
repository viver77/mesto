
export default class PopUp {
    constructor(popup) {
        this._popup = popup
    }

    openPopup() {
        document.addEventListener('keydown', (evt) => this._closeByEscape(evt));

        if (!this._popup.classList.contains('popup-image')) {
            this._hideInputErrors()
        }
        this._popup.classList.add('popup_opened')
    }

    closePopup() {
        document.removeEventListener('keydown', () => this._closeByEscape)
        this._popup.classList.remove('popup_opened')
    }

    _closeByEscape(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened')
            this.closePopup(openedPopup)
        }
    }

    _hideInputErrors() {
        const form = this._popup.querySelector('.form')
        const inputList = Array.from(form.querySelectorAll('.form__input'))

        inputList.forEach((inputElement) => {
            inputElement.classList.remove('form__input_type_error')
            const errorElement = form.querySelector(`.${inputElement.id}-error`)
            errorElement.classList.remove('form__input-error_active')

            if (form.name === 'form-add') {
                inputElement.value = ''
            }
        })
    }
}

//-------Область объявления переменных-------------------------------------//

const $popup = document.querySelector('.popup')
const $profileTitle = document.querySelector('.profile__title')
const $profileSubTitle = document.querySelector('.profile__subtitle')
const $popupHeader = document.querySelector('.popup__title')
const $popupTitle   = document.querySelector('.popup__text_type_title')
const $popupSubTitle   = document.querySelector('.popup__text_type_subtitle')
const $editBtn =  document.querySelector('.profile__edit-btn')
const $addBtn = document.querySelector('.profile__add-btn')
const $formElement = document.querySelector('.popup__container')
const $elements = document.querySelector('.elements')
const $cardTemplate = document.querySelector('#card').content
const $popupSubmit = document.querySelector('.popup__submit-btn')
const $popupImage = document.querySelector('.popup-image')
const $popupImageImage = document.querySelector('.popup-image__image')
const $popupClose = document.querySelectorAll('.popup__close-btn')
const $popupImageFigcaption = document.querySelector('.popup-image__figcaption')

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

//-------Область объявления функций-------------------------------------//

function closePopup(currentTarget) {
    if (currentTarget.parentElement.classList.contains('popup-image__figure')) {
        $popupImage.classList.remove('popup_opened')
    }
    else {
        $popup.classList.remove('popup_opened')
    }
}

function openPopup() {
    $popup.classList.add('popup_opened')
}

function addCard(item) {

    const $card = $cardTemplate.querySelector('.card').cloneNode(true)
    const $cardImage = $card.querySelector('.card__image')
    const $cardDescription = $card.querySelector('.card__description')

    $cardImage.src = item.link
    $cardImage.alt = item.name

    $cardDescription.textContent = item.name

    $elements.prepend($card)
}

//-------Основная область-------------------------------------//

//------- Заполнить и открыть карточку профиля --------------//
$editBtn.addEventListener("click", () => {

    $popupHeader.textContent = 'Редактировать профиль'
    $popupTitle.placeholder = 'Здесь нужно ввести имя'
    $popupSubTitle.placeholder = 'Здесь нужно ввести описание'
    $popupSubmit.textContent = 'Сохранить'

    $popupTitle.value = $profileTitle.textContent
    $popupSubTitle.value = $profileSubTitle.textContent

    openPopup();
})

//------- Добавить новую карточку --------------//
$addBtn.addEventListener('click', evt => {

    $popupHeader.textContent = 'Новое место'
    $popupTitle.placeholder = 'Название'
    $popupSubTitle.placeholder = 'Ссылка на картинку'
    $popupSubmit.textContent = 'Создать'

    $popupTitle.value = ''
    $popupSubTitle.value = ''

    openPopup();
})


//-------Отправить данные на сервер-----------------------------//
$formElement.addEventListener('submit', evt => {
    evt.preventDefault();

    if ($popupHeader.textContent === 'Редактировать профиль') {

    $profileTitle.textContent = $popupTitle.value
    $profileSubTitle.textContent = $popupSubTitle.value}

    if ($popupHeader.textContent === 'Новое место') {

        addCard({
            name: $popupTitle.value,
            link: $popupSubTitle.value
        })
    }

    closePopup(evt.currentTarget);
});

initialCards.forEach(item => {
    addCard(item)
})


//------- Добавить обработчик на кнопки закрытия popup --------------//
$popupClose.forEach(item => {
    item.addEventListener('click', evt => {
        closePopup(evt.currentTarget)
    })
})

//------- Обработка событий карточки --------------//
$elements.addEventListener('click', evt => {
    if (evt.target.classList.contains('card__like')) {
        evt.target.classList.toggle('card__like_active')
    }

    if (evt.target.classList.contains('card__trash')) {
         evt.target.parentElement.remove()
    }

    if (evt.target.classList.contains('card__image')) {
        $popupImageImage.src = evt.target.src
        $popupImageFigcaption.textContent = evt.target.alt

        $popupImage.classList.add('popup_opened')
    }

})

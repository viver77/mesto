
let popup = document.querySelector('.popup');

let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');

let popupTitle   = document.querySelector('.popup__text_type_title');
let popupSubTitle   = document.querySelector('.popup__text_type_subtitle');

let editBtn =  document.querySelector(".profile__edit-btn");

//------- Заполнить и открыть карточку профиля --------------//

function editProfileInfo() {

    popupTitle.value = profileTitle.textContent;
    popupSubTitle.value = profileSubTitle.textContent;

    popup.classList.add("popup_opened");

}

editBtn.addEventListener("click", editProfileInfo);


//-------Закрыть карточку профиля-------------------------------//

let popup__closeBtn = document.querySelector(".popup__close-btn")

function closePopup() {

    popup.classList.remove("popup_opened");
}

popup__closeBtn.addEventListener("click", closePopup);


//-------Отправить данные на сервер-----------------------------//

let formElement = document.querySelector(".popup__container");

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileTitle.textContent = popupTitle.value;
    profileSubTitle.textContent = popupSubTitle.value;

    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);


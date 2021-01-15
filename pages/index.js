
let content = document.querySelector(".content");

// Открыть и заполнить карточку профиля
let editBtn =  content.querySelector(".profile__editBtn")
editBtn.addEventListener("click", editProfileInfo);
function editProfileInfo() {

    let popup = document.querySelector('.popup');
    popup.classList.add("popup_opened");

    // Заголовок
    let profileTitle = document.querySelector('.profile__title');
    let popupTitle   = document.querySelector('.popup__text_type_title');
    popupTitle.value = profileTitle.textContent;

    // Подзаголовок
    let profileSubTitle = document.querySelector('.profile__subtitle');
    let popupSubTitle   = document.querySelector('.popup__text_type_subtitle');
    popupSubTitle.value = profileSubTitle.textContent;

}

// Закрыть карточку профиля
let popup__closeBtn = document.querySelector(".popup__closeBtn")
popup__closeBtn.addEventListener("click", closePopup);
function closePopup() {
    let popup = document.querySelector('.popup');
    popup.classList.remove("popup_opened");
}

// Отправить данных на сервер
let formElement = document.querySelector(".popup__container");

function handleFormSubmit (evt) {
        evt.preventDefault();

    let popupTitle   = document.querySelector(".popup__text_type_title");
    let popupSubTitle   = document.querySelector(".popup__text_type_subtitle");

    let profileTitle = document.querySelector(".profile__title");
    let profileSubTitle = document.querySelector(".profile__subtitle");

    profileTitle.textContent = popupTitle.value;
    profileSubTitle.textContent = popupSubTitle.value;

    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

// Установка/Снятие лайка
let elements =  document.querySelector(".elements")
elements.addEventListener("click", editlikeBtn);
function editlikeBtn(obj) {

    if (obj.target.classList.contains("elements__likeBtn")) {
        obj.target.classList.toggle("elements__likeBtn_active");
    }
}

//Добавить микс, многоточие для текста
document.querySelectorAll(".elements__description").forEach(function (e) {
    e.classList.add("text-ellipsis");
});

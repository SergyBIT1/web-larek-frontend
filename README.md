# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

В данном проекте, качестве паттерна проектирования я выбираю MVP, то есть Model, View, Presenter. 

Для приложения важна масштабируемость и разделение ответственности и другие принципы ООП, поэтому логику проекта, рамках паттерна MVP, прописывают в слое Model, то что видно пользователю , или UI, прописывают в слое View. Логику соединения этих слоев выполняет Presenter. 

Типы данных проекта, базовый код, описываю в файле src/types/index.ts

Там описаны интерфейсы для данных и отображения. 

## Базовый код.

### 1. Класс Component<T>

абстрактный класс который наследуют все элементы

методы

`toggleClass` переключение класса, принимает в параметре разметку и имя класса

`setText` метод для установки текстового содержимого, принимает в параметр разметку и строковое значение

`setImage` задает изображение, принимает параметром разметку и ссылку

`render` возвращает корневой DOM - элемент

принимает необязательный параметр данные с типом дженерик <T>

### 2. Класс EventEmitter

Реализует паттерн “Наблюдатель”, чтобы уведомлять пользователя о происходящих событиях.

Имплементирует тип данных интерфейса `IEvents`

в конструкторе

событие `events`, типа `<Имя события, установка наблюдателя>`

Методы:

 `on` - установка обработчика на событие

 `off` - снятие обработчика с события

`emit` - инициализация события с данными


## Компоненты модели данных (бизнес-логика)

### 1. Класс Model<T>

тип данных <T>

принимает в конструктор данные типа `Partial<T>` для хранения и событие `IEvents`

в теле конструктора объект `Object` 

Метод : 

`emitChanges` сообщает об изменении в модели

### 2. Класс ModelProduct 

описывает методы работы с данными, 

наследует класс `Model` с типом данных `<IProduct>`

свойства:

`items` массив карточек, типа `IProduct[]`

`preview: string` просмотр товара при клике на карточку

`basket: IProduct[] = []` хранение заказов в корзине

`userData: IUser` хранение данных пользователя

`formErrors: FormErrors`  хранение ошибок валидации

в конструктор принимает данные типа `IProduct` и событие

методы:

```
setProductList(): добавление массива в модель
getProductList(): IProduct[] получение массива с товарами
setPreview(): подробный просмотр карточки с товаром
isProductInBasket(): boolean  проверка наличия товара в корзине
getQuantityFromBasket(): number получение количества товаров в корзине
addToBasket(): добавление товара в корзину
getIdCard(): IProduct ID товара
getAllPrice() цена товаров в корзине
deleteFromBasket() удаление товара из корзины
clearBasketData() очистка корзины
getBasketData(): IProduct[] массив товаров в корзине
getIdProductsFromBasket() получение списка ID товаров в корзине
getUserProfile() данные о пользователе
clearUserData()  очистка корзины после заказа
validateContact(): boolean валидации формы с полями ввода addreess, email, phone
fillUserContacts(): метод для заполнения полей с контактными данными пользователя
getFormErrors() получение ошибок формы
getFieldPayment() получение полей c выбором типа оплаты
```

### 3. Класс API

класс для создания запросов через `API`

в конструктор принимает адрес сервера и метод

имеет поле `url`

методы

`get`

`post`

при необходимости , метод `post` может меняться на `patch` и `delete`, прописывая нужный метод в третьим параметром

### 4. Класс LarekApi

наследует класс `Api` 

делает запросы к эндпоинтам `product` и `order` 

методы

`getProductData` получение данных с сервера, тип `Promise<IProduct[]>`

`orderProductsResponse` отправка данных на сервер


## Компоненты представления.

### 1. Класс Card

базовый класс для отображения карточек на странице, наследуется от класса `Component`, тип данных `IProduct`. 

Свойства, имеют тип `HTML элемента`:

`title` заголовок карточки

`price` цена продукта

`button` кнопка “Добавить в корзину”, для бесценного товара заблокирована

В конструктор принимает разметку и событие. Так же прописана реакция на клик по кнопке. К ней добавлен слушатель на разметку. 

Методы :

`set button`, тип `string`, отображение кнопки 

`set id`, тип `string`, получение id товара

`set price`, тип `string`, отображение цены товара с условиями блокировки кнопки для бесценного товара

`set title`, тип `string`, отображение заголовка

### 2. Класс CardOnPage

отображение карточки на странице

наследует класс `Card`

Свойства: 

`image` отображает картинку товара, на главной странице и в подробном виде

`category` категорию товара, на главной странице и в подробном виде

В конструктор принимает элемент разметки и событие.

методы: 

`set image`, типа тип `string`,  отображение картинки

`set category`, тип  `CategoryType` отображение категории

### 3. Класс CardPreview

подробное отображение карточки на странице (при открытии модального окна)

наследует класс `CardOnPage`

дополнительно отображает описание товара

свойства:

`description` описание товара

конструктор принимает разметку и событие

метод: 

`set description` тип string, отображает описание

### 4. Класс IndexCard 

наследует класс `Card`

отображает счетчик элементов в корзине

свойство:

`index` типа `HTML элемент`

метод

`set index`, типа `number`, отображение числа товаров в корзине 

### 5. Класс Page

Отображение стартовой страницы приложения

Наследует класс `Component` типа `IPage`

Свойства:

`catalog` массив карточек

`counter` счетчик товаров в корзине

`basket` значок корзины

`wrapper` оболочка страницы

методы:

`set catalog` отображение списка карточек

`set counter` отображение счетчика

`set locked` метод блокировки прокрутки страницы при всплытии модального окна

### 6. Класс Basket

отображение корзины с покупками

наследует класс `Component` типа `IOrderBasket`

свойства:

`list` массив добавленных товаров

`total` сумма стоимости товаров

`button` кнопка перехода на следующий этап 

методы:

`set list` отображение списка товаров

`set total` отображение суммы добавленных товаров

### 7. Класс Modal

отображение модального окна на всех этапах приложения

наследует класс `Component` типа `IModal`

свойства: 

`closeButton` кнопка закрытия окна

`content` содержимое окна

методы:

`set content` отображение содержимого

`open` открытие окна

`close` закрытие окна

`render`, тип `HTML элемент`, делает обновление отображаемых данных 

### 8. Класс Form

Реализует класс формы для стадий оформления заказа где вводятся данные: `Order` и `Contacts`

наследует класс `Component` типа `IForm`

свойства:

`submit` подтверждение этапа

`errors` ошибки валидации

методы:

`set valid` валидация ввода данных

`set errors` отображение ошибок

`render` обновление содержимого

### 9. Класс Order

отображение этапа оформления заказа 

наследует класс `Form` типа `IUser`

свойства:

`buttonPayCash` кнопка выбора типа оплаты наличными

`buttonPayCard` кнопка выбора типа оплаты картой

методы:

`set payment`  отображение ввода оплаты

`set address` отображение ввода адреса

`disableButtons` отключение кнопки перехода на след этап 

### 10. Класс Contacts

отображение этапа ввода почты и телефона

наследует класс `Form` типа `IUser`

Методы:

`set phone` отображение поля ввода телефона

`set email` отображение поля ввода почты

### 11. Класс Success

отображает финальное окно, с поздравлениями о завершении процесса. 

Показывает количество списанных средств. Позволяет закрыть окно, для повторения цикла покупок.

Наследует класс `Component` типа `ISuccess`

Свойства:

`close` HTML элемент закрытия окна

`total` HTML элемент суммы покупок

Методы:

`set total` отображение суммы

Все классы принимают в конструктор элемент разметки и событие.

Генерируемые события, это события, устанавливаемые разработчиком для оптимизации способа программирования и структуры проекта.

На генерируемые события происходит подписка заинтересованных обработчиков. 

### Ключевые типы данных

```
type HTMLElement = text/css | null ; // элемент разметки
type string = string; // данные о товаре в виде строки
type number = number; // данные о товаре в виде числа
type boolean = boollean; // отображение состояния
```

### События в приложении

```
	1. 'modal:open' // Событие, которое генерируется при клике на карточку товара 
	2. 'modal:close' // Событие, которое генерируется при клике на иконку "Закрыть" (крестик), 
при клике вне модального окна, происходит закрытие модального окна
	3. 'card:select' // Событие, которое генерируется при клике на карточку товара, 
что влечет за собой открытие модального окна с подробным описанием товара
	4. 'preview:change' // Событие, которое генерируется при  изменении данных в модели
	5. 'items:changed' // Событие, которое генерируется при изменении списка товаров на странице, происходит перерисовка списка товаров
	6. 'basket:open' // Событие, которое генерируется при клике на иконку корзины, 
открывается модальное окно со списком товаров, добавленных в корзину
	7. 'card:toBasket' // Событие, которое генерируется при добавление товара в корзину, 
клике на кнопку "В корзину" в карточке товара, 
происходит изменение списка товаров в корзине и счетчика на иконке корзины
	8. 'basket:change' // Событие, которое генерируется при очистке корзины, добавлении и удалении товаров в корзину
	9. 'basket:includeInOrder' // Событие, которое генерируется при клике на кнопку "Оформить", 
добавлении списка товаров из корзины в заказ, открывается модальное окно с выбором оплаты 
	10. 'basket:delete' // Событие, которое генерируется при удалении товара из списка в корзине, 
то есть нажатии на иконку удаления в корзине, происходит изменение списка товаров в корзине и изменение счетчика иконки корзины
	11. 'order:submit' // Событие, которое генерируется при нажатии на кнопку "Далее" в окне выбора адреса и оплаты , 
открыватся модальное окно контактных данных
	12. 'contacts:submit' // Событие, которое генерируется при нажатии на кнопку "Оплатить",
в окне ввода почты и телефона
	13. 'input:validate' // Событие, которое генерируется при вводе данных в поле формы, происходит запуск валидации
	14. 'input:error' // Событие, которое генерируется при вводе данных в поле формы, происходит проверка и возвращаются ошибки
	15. 'order:ready' // Событие, которое генерируется при готовности заказа
	16. 'order:success' // Событие, которое генерируется при успешном ответе от сервера, на запрос с оплатой,
открывается модальное окно с информированием об успешном оформлении заказа 
   
```

### Описание слоев.

Когда получаем данные с сервера через класс `Api`, они попадают в класс модели, где хранятся и изменяются. 

Для отображения, данные из модели передаются через презентер в классы представления.

Данные получаемые с сервера можем увидеть в коллекции `Postman`.

Это карточка товара с `id`, описанием, картинкой, заголовком, категорией, ценой.

Код слоя `Model` и `View` выделены в классы,

`Presenter`

без класса

код презентера не выделяется в отдельный класс и будет размещен в `src/types/index.ts`


### Автор Зуев Сергей

   
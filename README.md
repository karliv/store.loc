Frontend часть интернет магазина.

Основная работа проходит на главной страницой (index.html).
Товары подгружаются из json файлов с помощью ajax запросов. Организована работа карзины.
Имеется возможность манипулировать товарами, как в всплывающем окне корзины, посредством кнопак, так и в секции странци с товарами.

Для просмотра результа используйте команду gulp. Будет просматриваться директория app.
Так же можно использовать команду gulp build, она создаст директорию dist и положет в неё только нужные файлы, отсеев при этои ненужные (sass, прочие библиотеки).
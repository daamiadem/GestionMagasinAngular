// Toggle menu
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

toggle.onclick = function(){
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

$(".navigation li").hover(
        function () {
            //toggleClass() switches the active class
            $(this).toggleClass("active");
        }
    );

/*
// add hovered class in selected list item
let list = document.querySelectorAll('.navigation li');
function activeLink(){
    list.forEach((item) =>
    item.classList.remove('hovered'));
    item.classList.add('hovered');
}
list.forEach((item) =>
    item.addEventListener('mouseover',activeLink)); */

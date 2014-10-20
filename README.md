jQuery-Ultimate-Burger-Menu
================================

This is a small JavaScript files which allows you to add a burger menu to your websites. 
This one is really simple to use  :

1 . Make sure you included jQuery into your HTML

2 . Include the jQuery Ultimate Burger Menu script

    <script type="text/javascript" src="jquery.ultimate-burger-menu.js"></script>	

3 . Call the function burgerMenu() on your the element corresponding to your site navigation

    <script>
        $('#nav').burgerMenu();
    </script>
    
4 (optional) . Configure your burger menu.
There's a list of parameters you can pass to the burgerMenu() function. Here's the complete commented list :
    
    $('#nav').burgerMenu({
        buttonBg: 'white', // background of the burger button
        buttonWidth: '50px', // width of the burger button
        buttonHeight: '50px', // height of the burger button
        linkSelector: 'li a', // selector corresponding to your navigation links
        linkText: function($a){ return $a.text() }, // function used to get the text of your navigation links, it can be overriden
        fixed: true, // set to true if the burger menu has to follow the window scroll
        zIndex: 100, // zIndex of the burger menu
        top: 0, // offset top
        buttonMargin: 10, // spacing between burgers if there's multiple burger menus to be displayed
        lineColor: 'black', // color of the line into the burger
        lineWidth: '30px', // width of the line into the burger
        lineHeight: '5px', // height of the line into the burger
        lineMargin: '5px', // spacing between lines into the burger
        hideInitialNav: true, // hide your site navigation when the burger menu has to be displayed
        menuWidth: '100%', // width of the menu
        menuHeight: 'auto', // height of the menu
        menuBackground: 'white', // background color of the menu (menu is displayed when clicking on the burger)
        menuBorder: '1px solid black', // border around the menu
        linkColor: 'black', // color of the links into the menu
        linkBackground: 'white', // background of the links
        linkPadding: '10px 10px', // padding of the links
        linkTextDecoration: 'none', // text decoration on the links
        linkBorderBottom: '1px solid black', // border bottom on the links
        linkNoBorderOnLast: true, // make sure border bottom is not added on the last link
        position: 'left', // position of the burger menu, can be "left" or "right"
        keepButtonNextToMenu: false, // if set to true, the burger button will move if the menu is displayed
        animateSpeed: 0, // if set to 0, the displaying of the menu is immediate, otherwise this is the duration of the animation
        hideOnBodyClick: true, // hide the burger menu when clicking outside
        showFromWidth: 0, // show the burger menu if window width >= 0
        showUntilWidth: 640, // hide the burger menu if window width >= 640
        translate: false, // if set to true, the page is translated when the menu is displayed, so the menu is not on top of the page but beside it. 
        overlay: false, // allows setting a semi-transparent background over the page when displayed. Values are false or an hexadecimal color (ex : overlay: '#434343')
        customContent: false, // allows setting a custom html content that will fill the menu. Pass it an HTML string (customContent: '<p>Hello</p>')
        customButton: false // allows setting a custom button. Pass it a jQuery element. It can be an image (customButton: $('<img src="..." />'))
    });

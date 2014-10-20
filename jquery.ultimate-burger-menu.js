/* 
Ultimate Burger Menu
copyright 24 February 2014, by Thomas Rambaud http://thomasrambaud.com
Permission to use this Javascript on your web page is
granted provided that all of the code in this script (including
these comments) is used without any alteration 
*/ 
(function($){

    $.fn.burgerMenu = function(options) {
        var settings = $.extend({
            buttonBg: 'white',
            buttonWidth: '50px',
            buttonHeight: '50px',
            linkSelector: 'li a',
            linkText: function($a){ return $a.text() },
            linkAccept: function($a, eq, $links) { return true; },
            fixed: true,
            zIndex: 100,
            top: 0,
            buttonMargin: 10,
            lineColor: 'black',
            lineWidth: '30px',
            lineHeight: '5px',
            lineMargin: '5px',
            hideInitialNav: true,
            menuWidth: '100%',
            menuHeight: 'auto',
            menuBackground: 'white',
            menuBorder: '1px solid black',
            linkColor: 'black',
            linkBackground: 'white',
            linkPadding: '10px 10px',
            linkTextDecoration: 'none',
            linkBorderBottom: '1px solid black',
            linkNoBorderOnLast: true,
            position: 'left',
            keepButtonNextToMenu: false,
            animateSpeed: 0,
            hideOnBodyClick: true,
            showFromWidth: 0,
            showUntilWidth: 640,
            translate: false,
            overlay: false,
            customContent: false,
            customButton: false
        }, options);

        // function to create the burger menu button
        function createButton(eq){
            // create the burger button and define its CSS
            var $button = $('<div class="burger-menu-button burger-menu-button-' + eq + '"></div>'),
            buttonCss = {
                background: settings.buttonBg,
                width: settings.buttonWidth,
                height: settings.buttonHeight,
                zIndex: settings.zIndex,
                position: settings.fixed ? 'fixed' : 'absolute',
                top: settings.top,
                cursor: 'pointer'
            };
            
            // position the button to the right or to the left, and space him if there's multiple burger menus to be displayed
            buttonCss[settings.position] = (parseInt(settings.buttonWidth) + parseInt(settings.buttonMargin)) * eq;
            
            $button.css(buttonCss);
            
            if(settings.customButton == false){
                // create 3 lines in the button
                $button.append(createButtonLine(0));
                $button.append(createButtonLine(1));
                $button.append(createButtonLine(2));            
            }else{
                $button.append(settings.customButton);
            }
            
            return $button;
        }

        // function to create a line in the button, to shape the burger
        function createButtonLine(eq){
            // create a line and define its CSS
            var $line = $('<span class="burger-menu-line burger-menu-line-' + eq + '"></span>').css({
                position: 'absolute',
                backgroundColor: settings.lineColor,
                height: settings.lineHeight,
                width: settings.lineWidth,
                left: ((parseInt(settings.buttonWidth) - parseInt(settings.lineWidth)) / 2),
                top: ((parseInt(settings.buttonHeight) - (parseInt(settings.lineHeight) * 3 + parseInt(settings.lineMargin) * 2)) / 2) + (parseInt(settings.lineHeight) + parseInt(settings.lineMargin)) * eq,
                display: 'block'
            });

            return $line;
        }

        // function to add links into the burger menu
        function createMenuLink($a, eq, len){
            // create the link and define its CSS
            // the text of the link can be overloaded by the linkText setting (a function has to be provided)
            var $link = $('<a>').attr('href', $a.attr('href')).text(settings.linkText($a)),
            linkCss = {
                color: settings.linkColor,
                padding: settings.linkPadding,
                background: settings.linkBackground,
                display: 'block',
                textDecoration: settings.linkTextDecoration,
                borderBottom: settings.linkBorderBottom
            };
            
            $link.css(linkCss);
            
            // display (or not) a border on the last burger menu item
            if(settings.borderBottom != 'none' && settings.linkNoBorderOnLast && eq == len - 1){
                $link.css('borderBottom', 'none');
            }
            
            return $link;
        }

        // create the menu which is displayed when clicking on the burger
        function createMenu(eq, $nav){
            // create the menu and define its CSS
            var $menu = $('<div class="burger-menu burger-menu-' + eq + '"></div>'),
            menuCss = {
                height: settings.menuHeight,
                background: settings.menuBackground,
                top: settings.keepButtonNextToMenu ? 0 : parseInt(settings.buttonHeight) - 1,
                zIndex: settings.zIndex - 1,
                position: settings.fixed ? 'fixed' : 'absolute',
                border: settings.menuBorder,
                boxSizing: 'border-box'
            },
            $links = $nav.find(settings.linkSelector);
            
            // position the menu to the left or the right, and hide it by giving it a negative position, so it is offscreen
            menuCss[settings.position] = '-' + settings.menuWidth;
            // set the width of the menu
            menuCss.width = getMenuWidth();
            
            // affect the css to the menu, and remove the border to the left or the right (depending of the position setting)
            $menu.css(menuCss).css('border-' + (settings.position), 'none');

            if(settings.customContent == false){
                // loop through each link of the navigation
                $links.each(function(eq){
                    // for each, create new a link based and add it to the menu. The informations of the link (href, text), are get from the initial nav
                    if(settings.linkAccept($(this), eq, $links)){
                        $menu.append(createMenuLink($(this), eq, $links.length));
                    }
                });            
            }else{
                // append custom content to the menu
                $menu.append(settings.customContent);
            }
            
            return $menu;
        }

        function getMenuWidth(){
            // if the button has to stay next to the menu
            if(settings.keepButtonNextToMenu){
                // if the menu width is set in %
                if(settings.menuWidth.indexOf('%') > -1){
                    // calculate the menu width depending on the window width, and substract the space of the button to that width
                    return ((($(window).width() * (parseInt(settings.menuWidth) / 100))) - parseInt(settings.buttonWidth)) + 'px';
                }else{
                    // just to substract the button width to the set menu width
                    return (parseInt(settings.menuWidth) - parseInt(settings.buttonWidth)) + 'px';
                }
            }else{
                // just return the menu width, as is
                return settings.menuWidth;
            }
        }

        // function to show / hide the menu when clicking on the burger
        var lastMenuShown = null;
        function showHideMenu($menu, hide, $button){
            var menuAnimation = {},
            bodyAnimation = {},
            buttonAnimation = {},
            menuWidth = getMenuWidth();
            
            // if the page has to be translated
            if(settings.translate){
                // translate the body
                bodyAnimation[settings.position] = (hide ? 0 : menuWidth);
                $('body').animate(bodyAnimation, settings.animateSpeed);
            }
            
            // animate the menu to the left or right, depending to the set position
            menuAnimation[settings.position] = (hide ? '-' + menuWidth : 0);
            $menu.animate(menuAnimation, settings.animateSpeed);
            
            // if the button has to stay next to the menu
            if(settings.keepButtonNextToMenu){
                // animate the button too so it stays next to the menu, instead of staying at the corner
                buttonAnimation[settings.position] = (hide ? 0 : menuWidth);    
                $button.animate(buttonAnimation, settings.animateSpeed);
            }
            
            // show overlay, if desired
            if(settings.overlay !== false ){
                if(!hide){
                    // Add the overlay to the dom, then animate it
                    $('body').append($('<div>').attr('class', 'burger-menu-overlay').css({
                        opacity: 0,
                        background: settings.overlay,
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        zIndex: settings.zIndex - 2,
                        top: 0,
                        left: 0
                    }).animate({
                        opacity: 0.5
                    }, settings.animateSpeed));
                }else{
                    // fade overlay and remove it
                    $('.burger-menu-overlay').animate({
                        opacity: 0
                    }, function(){
                        $(this).remove();
                    });
                }
            }

            // hide the previous opened menu, if existing
            if(!hide){
                if(lastMenuShown != null){
                    showHideMenu(lastMenuShown, true);
                }
                lastMenuShown = $menu;
            }else{
                lastMenuShown = null;
            }
        }

        // for each element of the collection on which to apply burger menu
        return this.each(function(eq){
            var $this = $(this),
            $button = createButton(eq),
            $menu = createMenu(eq, $this),
            hideMenuIfVisible = function(){
                if($button.hasClass('burger-menu-active')){
                    $button.trigger('click');
                }
            },
            ensureVisibleOnlyInBreakpoint = function(w){
                if(w >= settings.showFromWidth && w <= settings.showUntilWidth){
                    // show burger and menu
                    $button.show();
                    $menu.show();
                    
                    // hide the initial navigation
                    if(settings.hideInitialNav){
                        $this.hide();
                    }
                }else{
                    // hide burger and menu
                    $button.hide();
                    $menu.hide();
                    
                    // show the initial navigation
                    if(settings.hideInitialNav){
                        $this.show();
                    }
                }
            };

            // when clicking on the burger
            $button.on('click', function(e){
                var hide = $button.hasClass('burger-menu-active');
                // show the menu, or hide if already opened
                showHideMenu($menu, hide, $button);
                $button.toggleClass('burger-menu-active');
            });

            // append the created button and menu to the DOM
            $('body').append($button, $menu);

            // on resize
            $(window).on('resize', function(){
                // hide the menu if visible
                hideMenuIfVisible();

                // reset the menu width so it fits the screen as it should
                var menuWidth = getMenuWidth(),
                menuCss = { width: menuWidth };
                menuCss[settings.position] = '-' + menuWidth;
                $menu.css(menuCss);

                // ensure the menu is only visible in the defined breakpoints
                ensureVisibleOnlyInBreakpoint($(this).width());
            }).trigger('resize');

            ensureVisibleOnlyInBreakpoint($(window).width());

            // hide the menu when clicking outside of it
            if(settings.hideOnBodyClick){
                // when clicking anywhere
                $('body').on('click', function(event){
                    var $target = $(event.target);
                    // check if the element clicked isn't the burger menu or button
                    if(!$target.hasClass('burger-menu-button') && !$target.hasClass('burger-menu') && 
                        $target.parents('.burger-menu').length === 0 && $target.parents('.burger-menu-button').length === 0){
                        // if not, hide the menu
                        hideMenuIfVisible();
                    }
                });
            }
            
            // if the page has to be translated when the menu is shown
            if(settings.translate){
                // set the overflow-x to hidden so the horizontal scrollbar does not appear
                // set position relative so we can animate the left/right property
                $('body').css({
                    'overflow-x': 'hidden',
                    'position': 'relative'
                });
            }
        });
    };

})(jQuery);
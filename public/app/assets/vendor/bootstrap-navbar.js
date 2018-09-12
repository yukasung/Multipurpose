"use strict";

var navbar = {
    LastScroll: 0,
    init: function () {

        var slideDownDuration = 100;
        var slideUpDuration = 50;

        $('.navbar-dropdown-hover .dropdown-menu').on('click', function (e) {
            e.stopPropagation();
        });

        $('#navbarCollapse').on('show.bs.collapse', function () {
            $('header').addClass('navbar-collapse-show');
            $('.navbar-action').css('transition', '');
        });

        $('#navbarCollapse').on('hide.bs.collapse', function () {
            $('header').removeClass('navbar-collapse-show');
        });

        if (!/Mobi|Android/i.test(navigator.userAgent)) {
            $('.navbar-dropdown-hover .dropdown').mouseenter(this.dropdownHandlerIn).mouseleave(this.dropdownHandlerOut);
        }

        $('.navbar .dropdown-menu .dropdown-toggle').on('click', function (e) {

            var $el = $(this);
            var $parent = $(this).offsetParent(".dropdown-menu");
            var $subMenu = $(this).next(".dropdown-menu");

            if (!$(this).next().hasClass('show')) {
                $(this).parents('.dropdown-menu').first().find('.show').removeClass("show").css({
                    'display': ''
                });
            }

            if ($subMenu.hasClass('show')) {
                $subMenu.stop(true, true).slideUp(slideUpDuration);
            } else {
                $subMenu.stop(true, true).slideDown(slideDownDuration);
            }

            $subMenu.toggleClass('show');

            $(this).parent("li").toggleClass('show');
            $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
                $('.dropdown-menu .show').removeClass("show").css({
                    'display': ''
                });
            });

            if (!$parent.parent().hasClass('navbar-nav') && !$('.navbar-toggler').is(':visible')) {

                $el.next().css({
                    "top": $el[0].offsetTop
                });

                if ($parent.hasClass('dropdown-left')) {
                    $el.next().css({
                        "left": $parent.outerWidth() * -1
                    });
                } else {
                    $el.next().css({
                        "left": $parent.outerWidth()
                    });
                }

            }

            return false;

        });

        $('.dropdown').on('show.bs.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(slideDownDuration);
        });

        $('.dropdown').on('hide.bs.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp(slideUpDuration);
        });

    },
    dropdownHandlerIn: function () {

        if (!$('.navbar-toggler').is(':visible')) {
            $(this).find('.dropdown-toggle').first().trigger('click');
        }

    },
    dropdownHandlerOut: function () {

        if (!$('.navbar-toggler').is(':visible')) {
            if ($(this).hasClass('show')) {
                $(this).find('.dropdown-toggle').first().trigger('click');
            }
        }

    },
    eventResize: function () {

        if ($('.navbar-toggler').is(":visible")) {
            $('.navbar-action').css('transition', 'none');
        } else {
            $('.navbar-action').css('transition', '');
            $('header').removeClass('navbar-collapse-show');
        }

    },
    eventScroll: function (element) {

        // sticky nav start
        var headerHeight = $('nav').outerHeight();
        if (!$('header').hasClass('no-sticky')) {
            if ($(document).scrollTop() >= headerHeight) {
                $('header').addClass('sticky');

            } else if ($(document).scrollTop() <= headerHeight) {
                $('header').removeClass('sticky');
            }
        }

        // header appear on scroll up
        var st = element.scrollTop();
        if (st > this.LastScroll) {
            $('.sticky').removeClass('header-appear');
        } else {
            $('.sticky').addClass('header-appear');
        }

        this.LastScroll = st;
        if (this.LastScroll <= headerHeight) {
            $('header').removeClass('header-appear');
        }

    }
};

$(document).ready(function () {
    navbar.init();
});

$(window).resize(function () {
    navbar.eventResize();
});

$(window).scroll(function () {
    navbar.eventScroll($(this));
});
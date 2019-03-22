(function ($) {
    "use strict";
    $(() => {

        $(document).ajaxError((event, jqxhr, settings, thrownError) => {
            if (!settings.noprint) {
                getAndLoadError(jqxhr.status);
            }
            if (!settings.nonotif) {
                toastE(jqxhr.responseText);
            }
        });

        $(document).ajaxStart(() => {
            $('#ajaxLoaderGifContainer').show();
        });

        $(document).ajaxStop(() => {
            $('#ajaxLoaderGifContainer').hide();
        });

        getAndLoadPage('index');

        // Configure tooltips for collapsed side navigation
        $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
            template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
        });
        // Toggle the side navigation
        $("#sidenavToggler").click(function (e) {
            e.preventDefault();
            $("body").toggleClass("sidenav-toggled");
            $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
            $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
        });
        // Force the toggled class to be removed when a collapsible nav link is clicked
        $(".navbar-sidenav .nav-link-collapse").click(function (e) {
            e.preventDefault();
            $("body").removeClass("sidenav-toggled");
        });
        // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
        $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function (e) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        });
        // Scroll to top button appear
        $(document).scroll(function () {
            var scrollDistance = $(this).scrollTop();
            if (scrollDistance > 100) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }
        });
        // Configure tooltips globally
        $('[data-toggle="tooltip"]').tooltip()
        // Smooth scrolling using jQuery easing
        $(document).on('click', 'a.scroll-to-top', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top)
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        });

        $('#navBarHomeButton').click((event) => {
            let route = $(event.currentTarget).attr('data-link');
            if (route) {
                getAndLoadPage(route);
            }
        });

        $('#loginModalButton').click((event) => {
            let data = getFormValuesFromClick(event);
            if (!data || data === {}) return false;
            $.ajax({
                url: '/api/auth',
                data: data,
                type: 'POST',
                noprint: true
            })
                .then((permissions) => {
                    loadNavBarLinks(permissions || {});
                    toastS('You\'re successfully authenticated');
                    $('.navLoggedIn').show("slow");
                    $('.navLoggedOut').hide("slow");
                    $('#loginModal').modal('hide');
                })
        });

        $('#signInCodeValidationButton').click((event) => {
            let data = getFormValuesFromClick(event);
            $.ajax({
                url: '/api/user/validate-code',
                data: data,
                type: 'POST',
                noprint: true
            })
                .then(ret => {
                    toastS('Your combination login/code is correct, you can now create your account');
                    $('#signInInputCode').val(ret.code);
                    $('#signInInputlogin').val(ret.user_login);
                })
        });

        $('#signInModalButton').click((event) => {
            let data = getFormValuesFromClick(event);
            $.ajax({
                url: '/api/user/create-user',
                data: data,
                type: 'POST',
                noprint: true
            })
                .then(ret => {
                    toastS('Your account has been created, check your emails to activate your account');
                    $('#signinModal').modal('hide');
                })
        });

        $('#logoutModalButton').click((event) => {
            $.ajax({
                url: '/api/auth',
                type: 'DELETE',
                noprint: true
            })
                .then(() => {
                    toastS('You successfully logged out');
                    $('.navLoggedOut').show("slow");
                    $('.navLoggedIn').hide("slow");
                    loadNavBarLinks([]);
                })
        });

        loadVersion();

        const keycloak = Keycloak({
            url: "https://keycloak.mytcc.be/auth",
            realm: "TCC",
            clientId: "scipio-frontend",
            credentials: {
                secret: "82b4106a-83f5-4d1c-bd75-880f96386906"
            }
        });

        keycloak.init({onLoad: 'login-required'}).success((authenticated) => {
            $('#loginNavButton').click(() => {
                $.ajax({
                    type: 'POST',
                    url: '/api/auth',
                    noprint: true,
                    nonotif: false,
                    data: {'token': keycloak.token}
                });
            });
            $('#logoutNavButton').click(() => {
                keycloak.logout()
            });
        });
    })
})(jQuery);

(function ($) {
    "use strict";
    $(() => {

        $(document).ajaxError((event, jqxhr, settings, thrownError) => {
            if(!settings.noprint){
                getAndLoadError(jqxhr.status);
            }
            if(!settings.nonotif){
                toastE(jqxhr.responseText);
            }
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

        $('#mainNav a').click((event) => {
            let route = $(event.currentTarget).attr('data-link');
            if (route) {
                getAndLoadPage(route);
            }
        })

        $('.navLoggedIn').hide();
        $('.navLoggedOut').hide();

        $.ajax({
            type: 'POST',
            url: '/api/auth',
            noprint: true,
            nonotif:true
        })
            .then((ret) => {
                toastS('You were automatically re-authenticated');
                $('.navLoggedIn').show();
                $('.navLoggedOut').hide();
            })
            .catch((ret) => {
                $('.navLoggedOut').show();
                $('.navLoggedIn').hide();
            })
    })
})(jQuery);
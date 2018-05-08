const PERM_SPOTIFY = 'spotify';

const getAndLoadPage = (viewName) => {
    $('#mainContentDiv').load('/views/success/' + viewName)
};

const getAndLoadError = (errorNumber) => {
    $('#mainContentDiv').load('/views/errors/' + errorNumber)
};


const getFormValuesFromClick = (event) => {
    let formName = $(event.currentTarget).closest('form').attr('name');
    return getFormValues(formName);
};

const getFormValues = (name) => {
    let map = {};
    $('form[name=' + name + ']')
        .find('input[type=text],input[type=email],input[type=password],select')
        .each(function() {
            map[$(this).attr('name')] = $(this).val();
        });
    return map;
};

const loadSpotifyWidget = () => {
    $.ajax({
        url: '/views/success/spotify_widget',
        type: 'GET',
        noprint: true,
        nonotif: true
    })
        .then((html) => {
          $('#navAccordion').after(html);
        })
};

const loadNavBarLinks = (permissions) => {
    let html = "";
    permissions.forEach(permission => {
        switch (permission) {
            case PERM_SPOTIFY :
                loadSpotifyWidget();
                break;
            default :
                html +=  '<li class="nav-item" id="navbarApplication'+ permission.name +'" data-toggle="tooltip" data-placement="right" title="'+permission.name+'" style="display:none;"><a class="nav-link" data-link="'+(permission.name).toLowerCase()+'" href="#"><i class="'+permission.icon+'"></i><span class="nav-link-text"> '+(permission.name).replace(/_/g, ' ')+'</span></a></li>';
        }
    });
    $('#navAccordion').html(html);
    $('#navAccordion a').click((event) => {
        let route = $(event.currentTarget).attr('data-link');
        if (route) {
            getAndLoadPage(route);
        }
    });
    $('#navAccordion li').show("slow");
};

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

const toast = (type, toastMessage, toastTitle) => {
    if(!toastTitle){
        toastTitle = 'Notification'
    }
    toastr[type](toastMessage, toastTitle);
};

const toastS = (toastmessage, toastTitle) => {
    toast('success', toastmessage, toastTitle);
};

const toastW = (toastmessage, toastTitle) => {
    toast('warning', toastmessage, toastTitle);
};

const toastE = (toastmessage, toastTitle) => {
    toast('error', toastmessage, toastTitle);
};

const toastI = (toastmessage, toastTitle) => {
    toast('info', toastmessage, toastTitle);
};
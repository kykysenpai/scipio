const getAndLoadPage = async (viewName) => {
    if ($('#view_success_' + viewName).length === 0) {
        let view = await $.get('/views/success/' + viewName);
        $('#mainContentDiv').append(view);
    }
    $('.view').hide();
    $('#view_success_' + viewName).show();
};

const loadVersion = async () => {
    let version = await $.get('/api/version');
    $('#navBarHomeButton').text('Scipio - ' + version);
};

const getAndLoadError = async (errorNumber) => {
    if ($('#view_error_' + errorNumber).length === 0) {
        let view = await $.get('/views/errors/' + errorNumber);
        $('#mainContentDiv').append(view);
    }
    $('.view').hide();
    $('#view_error_' + errorNumber).show();
};

const getFormValuesFromClick = (event) => {
    let formName = $(event.currentTarget).closest('form').attr('name');
    return getFormValues(formName);
};

const getFormValues = (name) => {
    let map = {};
    $('form[name=' + name + ']')
        .find('input[type=text],input[type=email],input[type=password],select')
        .each(function () {
            map[$(this).attr('name')] = $(this).val();
        });
    return map;
};

const loadNavBarLinks = (permissions) => {
    let html = "";
    permissions.forEach(permission => {
        html += '<li class="nav-item" id="navbarApplication' + permission.name + '" data-toggle="tooltip" data-placement="right" title="' + permission.name + '" style="display:none;"><a class="nav-link" data-link="' + (permission.name).toLowerCase() + '" href="#"><i class="' + permission.icon + '"></i><span class="nav-link-text"> ' + (permission.name).replace(/_/g, ' ') + '</span></a></li>';
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
    if (!toastTitle) {
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
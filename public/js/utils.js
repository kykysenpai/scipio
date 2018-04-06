const getAndLoadPage = (viewName) => {
    $('#mainContentDiv').load('/views/success/' + viewName)
};

const getAndLoadError = (errorNumber) => {
    $('#mainContentDiv').load('/views/errors/' + errorNumber)
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
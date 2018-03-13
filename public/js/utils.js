const getAndLoadPage = (viewName) => {
    $.ajax({
        url: '/views/' + viewName
    })
        .then((res) => {
            loadPage(res);
        })
        .catch((res) => {
            loadPage(res.responseText);
        });
};

const loadPage = (page) => {
    $('#mainContentDiv').html(page);
};

const loadDataTable = () => {
    $('#dataTable').DataTable();
};

const getFormValues = (name) => {
    var map = {};
    $('form[name=' + name + ']').find(
        'input[type=text],input[type=email],input[type=password],select')
        .each(function() {
            map[$(this).attr('name')] = $(this).val();
        });
    return map;
}


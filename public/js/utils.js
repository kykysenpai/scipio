const getAndLoadPage = (viewName) => {
    $.ajax({
        url: '/views/' + viewName
    })
        .then((res) => {
            loadPage(res);
        })
        .catch((res) => {
            console.log(res);
            loadPage(res.responseText);
        });
};

const loadPage = (page) => {
    $('#mainContentDiv').html(page);
};

const loadDataTable = () => {
    $('#dataTable').DataTable();
};


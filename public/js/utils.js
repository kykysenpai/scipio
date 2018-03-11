const getAndLoadPage = (viewName) => {
    $.ajax({
        url: '/views/' + viewName
    })
        .then((res) => {
            loadPage(res);
        })
        .catch((res) => {
            console.log(res)
        });
};

const loadPage = (page) => {
    $('body').html(page);
    loadSbAdmin();
    loadSbAdminCharts();
};

const loadDataTable = () => {
    $('#dataTable').DataTable();
};


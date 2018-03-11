$(() => loadSbAdmin());

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
    $('#mainContentDiv').html(page);
    //loadSbAdmin();
};

const loadDataTable = () => {
    $('#dataTable').DataTable();
};


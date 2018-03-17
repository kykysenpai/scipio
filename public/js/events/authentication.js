$(() => {

    $('#loginModalButton').click((event) => {
        let formName = $(event.currentTarget).closest('form').attr('name');
        let data = getFormValues(formName);
        if (!data) return false;
        $.ajax({
            url: '/api/auth',
            data: data,
            type: 'POST'
        })
            .then((ret) => {
                toastS('You\'re successfully authenticated');
                $('.navLoggedIn').show();
                $('.navLoggedOut').hide();
                $('#loginModal').modal('hide');
            })
            .catch((err) => {
                toastE(err.responseText);
            });
    });

    $('#logoutModalButton').click((event) => {
        $.ajax({
            url: '/api/auth',
            type: 'DELETE'
        })
            .then((res) => {
                toastS('You successfully logged out');
                $('.navLoggedOut').show();
                $('.navLoggedIn').hide();
            })
            .catch((err) => {
                toastE(err.responseText);
            });
    });

});
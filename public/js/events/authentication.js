$(() => {

    $('#loginModalButton').click((event) => {
        let formName = $(event.currentTarget).closest('form').attr('name');
        let data = getFormValues(formName);
        if (!data) return false;
        $.ajax({
            url: '/api/auth',
            data: data,
            type: 'POST',
            noprint: true
        })
            .then(() => {
                toastS('You\'re successfully authenticated');
                $('.navLoggedIn').show();
                $('.navLoggedOut').hide();
                $('#loginModal').modal('hide');
            })
    });

    $('#logoutModalButton').click((event) => {
        $.ajax({
            url: '/api/auth',
            type: 'DELETE',
            noprint:true
        })
            .then(() => {
                toastS('You successfully logged out');
                $('.navLoggedOut').show();
                $('.navLoggedIn').hide();
            })
    });

});
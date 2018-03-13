$(() => {

    $('#loginModalButton').click((event) => {
       let formName = $(event.currentTarget).closest('form').attr('name');
       let data = getFormValues(formName);
       if(!data) return false;
       $.ajax({
           url:'/api/auth',
           data:data,
           type:'POST'
       })
           .then((ret) => {
               console.log(ret);
               $('.navLoggedIn').show();
               $('.navLoggedOut').hide();
           })
           .catch((ret) => {
               console.log(ret);
           });
    });

    $('#logoutModalButton').click((event) => {
       $.ajax({
           url:'/api/auth',
           type:'DELETE'
       })
           .then(() => {
               $('.navLoggedOut').show();
               $('.navLoggedIn').hide();
           })
           .catch(() => {

           });
    });

});
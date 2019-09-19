$(document).ready(function(){
    $('form').submit(function(e){
        e.preventDefault();
        let email = $("#emailLog").val();
        let password = parseInt($("#passLog").val());
        $.ajax({
            url: 'http://localhost:3000/admin',
            method: 'GET',
            success: function(data){
                $(data).each(function(i,element){
                    let status = true;
                    if(data[i]["email"] === email && data[i]["password"] === password){
                        window.location.href = 'payments.html';
                        status = false;
                    }
                    if(i === data.length-1 && status === true){
                        alert('Unauthorised Access');
                    }
                })
                
            },
            error: function(error) {
                alert(error);
            }
        })
    });


    $('#btnSign').click(function(){
        let name = $('#nameSign').val();
        let email = $('#emailSign').val();
        let password = $('#passSign').val();
        let admin = {name: name, email: email, password: password};
        $.ajax({
            url: 'http://localhost:3000/admin',
            method: 'POST',
            data: admin,
            success: function(data){
                alert("Signed up successsfully");
            },
            error: function(error){
                alert(error);
            }
        })
    })
});

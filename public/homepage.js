$(document).ready(function(){
    $('form').submit(function(e){
        e.preventDefault();
        let email = $("#emailLog").val();
        let password = $("#passLog").val();
        $.ajax({
            url: 'http://localhost:3000/admin',
            method: 'GET',
            success: function(data){
                console.log(password, data[0]['password'])
                $(data).each(function(i,element){
                    console.log(i,data.length-1);
                    let status = 2;
                    if(data[i]["email"] === email && data[i]["password"] === password){
                        window.location.href = 'payments.html';
                        status = 3;
                    }
                    //(i === data.length-1 && status === 2) ? alert('Unauthorised Access') : alert('Welcome');
                    // if(i === data.length-1 && status === false){
                    //     alert('Unauthorised Access');
                    // }
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

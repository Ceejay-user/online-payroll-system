
$(document).ready(function(){
    let dynamicURL = '';
    let methodName = '';
    displayAll();
    $("#post").click(function(e){
        let input = {firstname: $("#a").val(), lastname: $("#b").val(), role: $("#c").val(), 'salary-status': 'Not Paid'};
        let employeeId = $("#hidden").val();
        
        if(employeeId){
            //update it
            dynamicURL = 'http://localhost:3000/employees/'+employeeId;
            methodName = 'PUT';
        }else{
            //create as new
            dynamicURL = 'http://localhost:3000/employees';
            methodName = 'POST';
        }
        if($("#a").val() !== '' && $("#c").val() !== '' && $("#c").val() !== ''){
            $.ajax({
                type: methodName,
                url: dynamicURL,
                data: input,
                success: function(value){
                    displayAll();
                    methodName === 'POST' ? alert('New employee created successfuly') : alert('Updated successfully');
                    
                //    $("#targ").append('<tr><td>'+
                //    value["firstname"]+'</td><td>'+
                //    value["lastname"]+'</td><td>'+
                //    value["role"]+'</td><td>'+
                //    value["salary-status"]+'</td><td>'+
                //    '<button class="btn btn-info">Edit</button>'+
                //    '<button class="btn btn-info">Pay</button>'+
                //    '<button class="btn btn-info">Delete</button></td></tr>')
                
                }
            });
            e.preventDefault();
        }else{
            alert('Please fill the new employee details completely');
        }
    });
  
    $('#part').click(function(){
		let name = $('#name').val();
		let role = $('#role').val();
		let status = $('#status').val();
		let search = '';
        let searchby = '';
        document.querySelector("#name").value = '';
        document.querySelector("#role").value = '';
        document.querySelector("#status").value = '';
        if(name === '' && role === '' && status === ''){
            alert('Please fill a search field');
        }else{
            if((name && role) || (name && status) ||
            (role && status) || (name && role && status)){
                alert("Please select only one input to search by");
            }else{
                if(name){
                    search="lastname";
                    searchby=name;
                }else if(role){
                    search="role";
                    searchby=role;
                }else{
                    search="salary-status";
                    searchby=status;
                }
                $.ajax({
                    type: 'GET',
                    url:   'http://localhost:3000/employees?'+search+"="+searchby,

                    success: function(data){
                        $('#targ').html(function(){
                            let JobsAvailable='';
                            
                            $.each(data, function(i,ignore){
                                JobsAvailable += '<tr><td>'
                                            +data[i]["firstname"]+'</td><td>'
                                            +data[i]["lastname"]+'</td><td>'
                                            +data[i]["role"]+'</td><td>'
                                            +data[i]["salary-status"]+'</td><td>'
                                            +'<button class="btn btn-info">Edit</button>'
                                            +'<button class="btn btn-info">Pay</button>'
                                            +'<button class="btn btn-info">Delete</button></td>'
                                        '</tr>';
        
                            })
                            
                        return JobsAvailable;
                        })
                        console.log('good');
                    }
                });
            }
        }
    });
	
});


function displayAll() {
    $.ajax({
        method: 'GET',
        url:   'http://localhost:3000/employees',
        success: function(data){
            const body = $('#tblMain tbody');
            body.empty();
            $.each(data, function(i,element){
                body.append('<tr><td>'+data[i]["firstname"]+'</td><td>'
                            +data[i]["lastname"]+'</td><td>'
                            +data[i]["role"]+'</td><td>'
                            +data[i]["salary-status"]+'</td><td>'
                            +'<button onclick="update(' +data[i]["id"]+ ')" class="btn btn-info">Edit</button>'
                            +'|<button onclick="payEmployee(' +data[i]["id"]+ ')" class="btn btn-info">Pay</button>'
                            +'|<button onclick="deleteEmployee(' +data[i]["id"]+ ')" class="btn btn-info">Delete</button></td></tr>'
                );                             
            });
        }
    })
}

function deleteEmployee(id) {
    $.ajax({
        url: 'http://localhost:3000/employees/'+id,
        method: 'DELETE',
        success: function() {
            alert('Deleted successfuly');
            displayAll();
        },
        error: function(error) {
            alert(error);
        }
    });
}

function update(id) {
    $.ajax({
        url: 'http://localhost:3000/employees/'+id,
        method: 'GET',
        success: function(data){
            $('#hidden').val(data["id"]);
            $('#a').val(data["firstname"]);
            $('#b').val(data["lastname"]);
            $('#c').val(data["role"]);
            displayAll();
        },
        error: function (error){
            alert(error);
        }
    });
}

function payEmployee(id) {
    $.ajax({
        url: 'http://localhost:3000/employees/'+id,
        method: 'PUT',
        success: function(data) {
            data[i]["salary-status"] = 'Paid';
            displayAll();
            alert('Paid');
        },
        error: function(error) {
            alert(error);
        }
    });
}

function reset() {
    $('#hidden').val() = '';
    $('#a').val() = '';
    $('#b').val() = '';
    $('#c').val() = '';
}
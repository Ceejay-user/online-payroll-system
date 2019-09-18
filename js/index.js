
$(document).ready(function (){
    $("#postme").click(function(){
		let input = JSON.stringify({Company:'Etisalat', 'job title':'G Manager',Location:'Ibadan'});
        $.ajax({
            type:"POST",
            dataType:"json",
            url:"http://localhost:3000/Jobs",
            data:input,
            success: function(data){
                alert("Worked");
			}
        });
    });
});

$(document).ready(function(){
    $('#viewall').click(function(){
        $.ajax({
            method: 'GET',
            url:   'http://localhost:3000/employees'
        }).done(function(data){
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
                $('#targ').html(JobsAvailable);
        })
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
		
    });
    
    
   
    
	
});

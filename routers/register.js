var connection = require('../Config/conn'); 
// require the bcrypt module
var bcrypt = require('bcrypt');


exports.register =async function(request, response) {
	
		
	
  

	
	
	var email = request.body.email;
	var cellNumber = request.body.cellNumber;
	var password = request.body.password;
	
	var today = new Date();
	var fullName = request.body.fullName;
								
	var spaceLine = fullName.indexOf(' ');
							
	var name = fullName.substring(0, spaceLine);
	var len = fullName.lenght;
	var surname = fullName.slice(spaceLine,len);
	console.log(name);
	console.log(surname);
	console.log(email);
	console.log(password);
	console.log(cellNumber);
	
	
	
    if (email && password && name && surname && cellNumber) {
    // check if user exists
	
	/*const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			
			if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
		  {
			response.send('correct email format');
		  }else{
			response.send("You have entered an invalid email address!");
			
		  }*/
  
			
			connection.query('SELECT * FROM customer WHERE email = ?', [email], function(error, results, fields) {
            if (results.length > 0)
			{
                response.send('User Already has an account');
            }else{
				//if the user is found
				
				bcrypt.hash(request.body.password, 10, (err,hash) => {
					
					if(err)
					{
						res.status(500).json({
							error : err
						});
					}else
					{
									var today = new Date();
								var user={
									"name":name,
									"surname":surname,
									"email":email,
									"cellNumber":cellNumber,
									"password":hash,
							
								}
								
								
								
								connection.query('INSERT INTO customer SET ?',[user], function (error, results, fields) {
								  if (error) {
									response.json({
										status:false,
										message:'there are some error with query'
									});
									response.send('there are some error with query');
									
								  }else{
									console.log('is it coming here in else')
									response.json({
										status:true,
										data:results,
										message:'user registered sucessfully'
									})
									response.send('user registered sucessfully');
									
								  }
								});
							
						
					}//end of if statement for hahing the password
				});
				
					
				
				
				
				
			}		//end of the if when the user is found		
	
		
 
		});//end of searching for a user
		
		
	} else{
	response.send('Please enter values');	
	}
	
	
	
}

//this here is the registration for vendor
exports.registerVendor =async function(request, response) {
	
		
	var shopName = request.body.shopName;
	
	var address = request.body.address;
	var status  ="PENDING";
	
	var email = request.body.email;
	var cellNumber = request.body.cellNumber;
	var password = request.body.password;
	
	var today = new Date();
	var fullName = request.body.fullName;
								
	var spaceLine = fullName.indexOf(' ');
							
	var name = fullName.substring(0, spaceLine);
	var len = fullName.lenght;
	var surname = fullName.slice(spaceLine,len);




	console.log(name);
	console.log(surname);
	console.log(email);
	console.log(password);
	console.log(cellNumber);
	
	console.log(shopName);
	console.log(address);
	console.log(status);
	
    if (email && password && name && surname && cellNumber && shopName && address && status) {
    // check if user exists
	
	/*const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			
			if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
		  {
			response.send('correct email format');
		  }else{
			response.send("You have entered an invalid email address!");
			
		  }*/
  
			
			connection.query('SELECT * FROM vendor WHERE email = ?', [email], function(error, results, fields) {
            if (results.length > 0)
			{
                response.send('User Already has an account');
            }else{
				//if the user is not found
				
				bcrypt.hash(request.body.password, 10, (err,hash) => {
					
					if(err)
					{
						res.status(500).json({
							error : err
						});
					}else
					{

						console.log(shopName);
	console.log(address);
	console.log(status);
									var today = new Date();
								var user={
									"shopName":shopName,
									"name":name,
									"surname":surname,
									"email":email,
									"cellNumber":cellNumber,
									"address":address,
									"password":hash,
									"status":status
							
								}
								
								
								
								connection.query('INSERT INTO vendor SET ?',[user], function (error, results, fields) {
								  if (error) {
									response.json({
										status:false,
										message:'there are some error with query'
									});
									response.send('there are some error with query');
									
								  }else{
									
									response.json({
										status:true,
										data:results,
										message:'Vendor application  sucessfully'
									})
									response.send('Vendor application sucessfully');
									
								  }
								});
							
						
					}//end of if statement for hahing the password
				});
				
					
				
				
				
				
			}		//end of the if when the user is found		
	
		
 
		});//end of searching for a user
		
		
	} else{
	response.send('Please enter values');	
	}
	
	
	
}
// UserList data array for filling in info box
var userListdata = [];

// DOM Ready =====================================
$(document).ready(function() {

	// Populate the table on initial page load
	// Username link click
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
	$('#btnAddUser').on('click', addUser);
	$('#btnEditUser').on('click', editUser);
	// Delete User link click
	 $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
});

// Functions =====================================

// Fill the table with data *************NOT REQUIRED************
// function populateTable() {

// 	//Empty content string
// 	var tableContent = '';

// 	// jQuery AJAX call for JSON
// 	$.getJSON( '/users/userlist', function (data) {
// 	userListData = data;	
// 		// For each item in our JSON, add a table row and cells to the content string
// 		$.each(data, function() {
// 			tableContent += '<tr>';
// 			tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
// 			tableContent += '<td>' + this.email + '</td>';
// 			tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
// 			tableContent += '</tr>';
// 		});

// 		// Inject the whole content string into our existing HTML table
// 		$('#userList table tbody').html(tableContent);
// 	});
// };

// Show user info    *********NOT REQUIRED************
// function showUserInfo(event) {
// 	// Prevent link from firing
// 	event.preventDefault();

// 	// Retrieve username from link rel attribute
// 	var thisUserName = $(this).attr('rel');

// 	// Get Index of object based on id value
// 	var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

// 	// Get our User Object
// 	var thisUserObject = userListData[arrayPosition];

// 	// Populate Info Box
// 	$('#userInfoName').text(thisUserObject.fullname);
// 	$('#userInfoAge').text(thisUserObject.age);
// 	$('#userInfoGender').text(thisUserObject.gender);
// 	$('#userInfoLocation').text(thisUserObject.location);

// 	// Also populate the update boxes
// 	$('#inputEditUserName').val(thisUserObject.username);
// 	$('#inputEditUserEmail').val(thisUserObject.email);
// 	$('#inputEditUserFullname').val(thisUserObject.fullname);
// 	$('#inputEditUserAge').val(thisUserObject.age);
// 	$('#inputEditUserLocation').val(thisUserObject.location);
// 	$('#inputEditUserGender').val(thisUserObject.gender);
// };


// Add User   *****Don't think this is required either*********
function addUser(event) {
	event.preventDefault();

	// Super basic validation - increase errorCount variable if any fields are blank
	var errorCount = 0;
	$('#addUser input').each(function(index, val) {
		if($(this).val() === '') {errorCount++; }
	});

	// Check and make sure errorCount's still at zero
	if (errorCount === 0) {

		//If it is, compile all user info into one object
		var newUser = {
			'username': $('#addUser fieldset input#inputUserName').val(),
			'email': $('#addUser fieldset input#inputUserEmail').val(),
			'fullname': $('#addUser fieldset input#inputUserFullname').val(),
			'age': $('#addUser fieldset input#inputUserAge').val(),
			'location': $('#addUser fieldset input#inputUserLocation').val(),
			'gender': $('#addUser fieldset input#inputUserGender').val()
		}

		// Use AJAX to post the object to our adduser service
		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/users/adduser',
			dataType: 'JSON'
		}).done(function(response) {

			// Check for successful (blank response)
			if (response.msg === '') {
				
				// Clear the form inputs
				$('#addUser fieldset input').val('');

				//Update the table
				populateTable();
			}
			else {

				//If something goes wrong, alert the error message that our service returned
				alert('Error:' + response.msg);
			}
			
		});
	}
	else {
		// If errorount is more than one, error out
		alert('Please fill in all fields');
		return false;
	}
};

// Delete User *****Don't think this is required either*********
function deleteUser(event) {

	event.preventDefault();
	console.log($(this).attr('rel'));
	// Pop up confirmation dialog
	var confirmation = confirm('Are you sure you want to delete this user?');

	// Check and make sure the user confirmed
	
	if (confirmation === true) {

		// If they did, do our delete
		$.ajax({
			type: 'DELETE',
			url: '/users/deleteuser/' + $(this).attr('rel')
		}).done(function(response) {

			// Check for a successful (blank) response
			if (response.msg === '') {
			}
			else {
				alert('Error: ' + response.msg);				
			}

			// Update the table
			populateTable();
		});
	}

	else {

		//If they said no to the confirm, do nothing
		return false;
	}
};
//=========================*****Don't think this is required either*********
function editUser(event) {
	event.preventDefault();
	var userID = $(".linkdeleteuser").attr('rel');
	console.log(userID);

	// userID =
	// 	{'_id': 'ObjectID("' + userID + '")'};		
	var userDetails = 	
		{
			'username': $('#editUser fieldset input#inputEditUserName').val(),
			'email': $('#editUser fieldset input#inputEditUserEmail').val(),
			'fullname': $('#editUser fieldset input#inputEditUserFullname').val(),
			'age': $('#editUser fieldset input#inputEditUserAge').val(),
			'location': $('#editUser fieldset input#inputEditUserLocation').val(),
			'gender': $('#editUser fieldset input#inputEditUserGender').val()
		};
	console.log(userID);

	console.log(userDetails);
	var combinedData = {};
	combinedData[0] = userID;
	combinedData[1] = userDetails;
	//console.log(combinedData);

	$.ajax({
		type: 'PUT',
		data: combinedData, //CACTUSED
		url: '/users/edituser',
		dataType: 'JSON'
	}).done(function(response) {
		// Check to see if it's successful
		if (response.msg === '') {

			$('#editUser fieldset input').val('');

			// Update the table
			populateTable();
		}
		else {
			alert('Error ajaxing: ' + response.msg);
		}
	});

};
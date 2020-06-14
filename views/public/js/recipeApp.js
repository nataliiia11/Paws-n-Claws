/* eslint-disable no-undef */

$(document).ready(() => {  
	$('#modal-button').click(() => {    
		$('.modal-body').html('');    
		$.get('/users?format=json', (data) => { 
			data.forEach((user) => { 
				$('.modal-body').append( `
				<div>
					<span class="users-username"> "Hello, WORLD"!!! " </span>
					<div class="users-email"> ${user.email} </div>
				</div>` );
			});    
		});  
	}); 
});

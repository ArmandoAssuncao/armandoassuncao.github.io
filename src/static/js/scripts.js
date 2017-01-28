$(document).ready(function(){
	$('#btn_portfolio').on('click', bottomSheet);
	$('#btn_contact').on('click', bottomSheet);
	$('#btn_skills').on('click', bottomSheet);
	$('#btn_more_skills').on('click', showMoreSkills);
	$('#btn_more_projects').on('click', showMoreProjects);
	$('#form-submit').on('click', contactValidate);
	setBirthDate();
});

function bottomSheet(){
	var element = this;
	var container = '.container-bottomsheet';
	var timeAnimate = 550;

	if($('footer').hasClass('showing') && $(element).hasClass('hideContent')){
		hide();
	}
	else if($('footer').hasClass('showing')){
		switchContent();
	}
	else {
		show();
	}

	function show(){
		$('footer').addClass('showing');

		$('footer').fadeTo(0, 0.95).animate({bottom: 305}, timeAnimate, 'linear');

		$('#portfolio').animate({height: 305}, timeAnimate, 'linear');
		$('#contact').animate({height: 305}, timeAnimate, 'linear');
		$('#skills').animate({height: 305}, timeAnimate, 'linear');

		switchContent();
		darkenPage(true);

		$('#darken_page').one('click', function(){
			hide();
		});
	}

	function hide(){
		$('footer').removeClass('showing');
		$(element).removeClass('hideContent -clicked');

		$('footer').fadeTo(0, 0.95).animate({bottom: 0}, timeAnimate, 'linear');

		$('#portfolio').animate({height: 0}, timeAnimate, 'linear');
		$('#contact').animate({height: 0}, timeAnimate, 'linear');
		$('#skills').animate({height: 0}, timeAnimate, 'linear');

		darkenPage(false);
	}

	function switchContent(){
		var portfolio = '#btn_portfolio';
		var contact = '#btn_contact';
		var skills = '#btn_skills';
		var btnID = '#' + element.id;

		$(portfolio).removeClass('hideContent -clicked');
		$(contact).removeClass('hideContent -clicked');
		$(skills).removeClass('hideContent -clicked');

		$(element).addClass('hideContent');

		$('#portfolio').css('display', '');
		$('#contact').css('display', '');
		$('#skills').css('display', '');

		if(btnID == portfolio){
			$('#portfolio').css('display', 'inline');
			$(portfolio).addClass('-clicked');
		}
		else if(btnID == contact){
			$('#contact').css('display', 'inline');
			$(contact).addClass('-clicked');
		}
		else if(btnID == skills){
			$('#skills').css('display', 'inline');
			$(skills).addClass('-clicked');
		}
	}
}

function showMoreProjects(){
	//animate height to value auto
	$('#portfolio > .container').animate({height: $('#portfolio > .container').get(0).scrollHeight}, 700, 'linear', function(){
		$('#container_showmore_portfolio').fadeTo(400, 0, function(){
			$('#container_showmore_portfolio').animate({height: 0, margin: 0}, 400, 'linear', function(){
				this.remove();
			})
		});
	});
}

function showMoreSkills(){
	//animate height to value auto
	$('#skills > .container').animate({height: $('#skills > .container').get(0).scrollHeight}, 700, 'linear', function(){
		$('#container_showmore_skills').fadeTo(400, 0, function(){
			$('#container_showmore_skills').animate({height: 0, margin: 0}, 400, 'linear', function(){
				this.remove();
			})
		});
	});
}


function contactValidate(){
	if($('#form-name').val() === '' || $('#form-email').val() === '' || $('#form-message').val() === '') {
		//
	}
	else{
		$('#form-submit').off();
		contactSubmit();
	}
}

function contactSubmit(){
	$.ajax({
		url: '//formspree.io/armando.assuncao.93@gmail.com',
		method: "POST",
		dataType: 'json',
		data: {
			message: $('#form-message').val(),
			_replyto: $('#form-email').val(),
			name: $('#form-name').val()
		},
		success: function(data) {
			contactSubmitOk(true);
		},
		error: function(data) {
			contactSubmitOk(false);
		}
	});
}

function contactSubmitOk(success){
	$('#contact_form').fadeOut(500);
	if(success){
		$('#submit_success').css('display', 'flex');
	}
	else{
		$('#submit_error').css('display', 'flex');
	}
}

// Helpers ////////

function darkenPage(show){
	if(show){
		$('body').append($('<div>').attr('id','darken_page').fadeTo(500, 0.6));
	}
	else{
		$('#darken_page').fadeTo(500, 0, function(){this.remove()});
	}
}

function setBirthDate(){
	var birthYear = 1993;
	var currentYear = new Date().getFullYear();
	var age = currentYear - birthYear - 1;

	document.querySelector('.birth-date').textContent = age;
}
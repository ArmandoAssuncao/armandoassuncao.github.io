$(document).ready(function(){
	$('#btn_contact').on('click', bottomSheet);
	$('#btn_skills').on('click', bottomSheet);
	$('#btn_moreskills').on('click', showMoreSkills);
	$('#form-submit').on('click', contactValidate);
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

		$('#contact').animate({height: 0}, timeAnimate, 'linear');
		$('#skills').animate({height: 0}, timeAnimate, 'linear');

		darkenPage(false);
	}

	function switchContent(){
		var contact = '#btn_contact';
		var skills = '#btn_skills';
		var btnID = '#' + element.id;

		$(contact).removeClass('hideContent -clicked');
		$(skills).removeClass('hideContent -clicked');

		$(element).addClass('hideContent');

		$('#contact').css('display', '');
		$('#skills').css('display', '');

		if(btnID == contact){
			$('#contact').css('display', 'inline');
			$(contact).addClass('-clicked');
		}
		else if(btnID == skills){
			$('#skills').css('display', 'inline');
			$(skills).addClass('-clicked');
		}
	}
}


function showMoreSkills(){
	//animate height to value auto
	$('#skills > .container').animate({height: $('#skills > .container').get(0).scrollHeight}, 700, 'linear', function(){
		$('#container-showmore').fadeTo(400, 0, function(){
			$('#container-showmore').animate({height: 0, margin: 0}, 400, 'linear', function(){
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
		$('body').append($('<div>').css({
			position: 'fixed'
			,width: '100%'
			,height: '100%'
			,'background-color': '#000'
			,opacity: 0.6
			,'z-index': 998
			,top: 0
			,left: 0
		}).attr('id','darken_page').fadeTo(500, 0.6));
	}
	else{
		$('#darken_page').fadeTo(500, 0, function(){this.remove()});
	}
}
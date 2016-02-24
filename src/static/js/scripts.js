$(document).ready(function(){
	$('#btn_contact').one('click', showHideContactForm);
});


// Functions ////////

function showHideContactForm(){
	var element = this;
	function show(){
		$('footer').css('position', 'relative');
		$('footer').animate({bottom: $('#contact_form').css('height')}, 700, 'linear');
		$('#contact_form').css('position', 'absolute');

		$(element).one('click', hide);
	}

	function hide(){
		$('footer').animate({bottom: '0'}, 700, 'linear', function(){
			$('#contact_form').css('position', 'fixed')
		});

		$(element).one('click', show);
	}

   show();
}
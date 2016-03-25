$(document).ready(function(){
	$('#btn_contact').on('click', bottomSheet);
	$('#btn_skills').on('click', bottomSheet);
	$('#btn_moreskills').on('click', showMoreSkills);
	formSubmit();
});

function bottomSheet(){
	var element = this;
	var container = '.container-bottomsheet';

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

		$('footer').fadeTo(0, 0.95).animate({bottom: 305}, 700, 'linear');

		$('#contact').animate({height: 305}, 700, 'linear');
		$('#skills').animate({height: 305}, 700, 'linear');

		switchContent();
		darkenPage(true);

		$('#darken_page').one('click', function(){
			hide();
		});
	}

	function hide(){
		$('footer').removeClass('showing');
		$(element).removeClass('hideContent');

		$('footer').fadeTo(0, 0.95).animate({bottom: 0}, 700, 'linear');

		$('#contact').animate({height: 0}, 700, 'linear');
		$('#skills').animate({height: 0}, 700, 'linear');

		darkenPage(false);
	}

	function switchContent(){
		var contact = '#btn_contact';
		var skills = '#btn_skills';
		var btnID = '#' + element.id;

		$(contact).removeClass('hideContent');
		$(skills).removeClass('hideContent');

		$(element).addClass('hideContent');

		$('#contact').css('display', '');
		$('#skills').css('display', '');

		if(btnID == contact)
			$('#contact').css('display', 'inline');
		else if(btnID == skills)
			$('#skills').css('display', 'inline');
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

function formSubmit(){
	$('#form-submit').click(function(e){
		e.preventDefault();
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
			},
			error: function(data) {
			}
		});
	});
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
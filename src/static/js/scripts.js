$(document).ready(function(){
	$('#btn_contact').on('click', bottomSheet);
	$('#btn_skills').on('click', bottomSheet);
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

		$('#contact_form').animate({height: 305}, 700, 'linear');
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

		$('#contact_form').animate({height: 0}, 700, 'linear');
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

		$('#contact_form').css('display', '');
		$('#skills').css('display', '');

		if(btnID == contact)
			$('#contact_form').css('display', 'inline');
		else if(btnID == skills)
			$('#skills').css('display', 'inline');
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
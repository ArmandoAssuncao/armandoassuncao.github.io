$(document).ready(function(){
	$('#btn_contact').on('click', showHideFooter);
	$('#btn_skills').on('click', showHideFooter);
});


// Functions ////////
function showHideFooter(){
	var element = this;
	var container = '.container-footer';

	if(! $(element).hasClass('hideContent')){
		show();
	}
	else{
		hide();
	}

	function show(){
		$('#btn_contact').removeClass('hideContent');
		$('#btn_skills').removeClass('hideContent');
		$(element).addClass('hideContent');

		if(! $('footer').hasClass('showing')){
			$('footer').fadeTo(0, 0.95).animate({bottom: $(container).css('height')}, 700, 'linear');
			darkenPage(true);

			$('body').on('click', function( event ) {
				if(! $('footer').has(event.target).length) {
					hide();
				}
			});
		}
		$('footer').addClass('showing');

		contentFooter(element.id);
	}

	function hide(){
		$('#btn_contact').removeClass('hideContent');
		$('#btn_skills').removeClass('hideContent');

		$('footer').removeClass('showing');
		$('body').unbind('click');

		$('footer').animate({bottom: '0'}, 700, 'linear', function(){
		}).fadeTo('fast', 1);
		darkenPage(false);
	}
}

function contentFooter(btnID){
	var contact = 'btn_contact';
	var skills = 'btn_skills';

	$('#contact_form').css('display', '');
	$('#skills').css('display', '');

	if(btnID == contact)
		$('#contact_form').css('display', 'inline');
	else if(btnID == skills)
		$('#skills').css('display', 'inline');


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
			,'z-index': 999
			,top: 0
			,left: 0
		}).attr('id','darken_page').fadeTo(500, 0.6));
	}
	else{
		$('#darken_page').fadeTo(500, 0, function(){this.remove()});
	}
}
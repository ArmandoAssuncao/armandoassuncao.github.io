appModule.factory('projectsFactory', function(){
	return {
		projects:
		[

			{
				name: 'Biblioteka App',
				authors: ['Armando Assunção'],
				collaborators: ['Arthur Assunção'],
				technologies: 'Java/Android, PHP/SlimFramework',
				type: 'Projeto Pessoal',
				description: '<p>Aplicativo criado com o objetivo de melhorar a utilização da biblioteca do IF Sudeste MG - Campus Barbacena.</p>\
					<p>Tem as funcionalidades:\
						<ul>\
							<li>Buscar Livros</li>\
							<li>Reservar Livros</li>\
							<li>Renovar Livros</li>\
							<li>Exibir Extrato</li>\
							<li>Notificação</li>\
							<li>Renovação Autómatica</li>\
						</ul>\
					</p>\
					<p>Utilizado Java para o desenvolvimento do aplicativo e PHP/SlimFramework com arquitetura API rest no servidor.</p>',
				datastart: '2016',
				dataend: '2016',
				imgthumbnail: 'static/img/portfolio/biblioteka/thumbnail.jpeg',
				urls: [
					{ name: 'Ver na Google Play', url: 'https://play.google.com/store/apps/details?id=io.biblioteka.app' }
				],
				imgs: [
					'static/img/portfolio/biblioteka/screenshot-002.jpeg',
					'static/img/portfolio/biblioteka/screenshot-005.jpeg',
					'static/img/portfolio/biblioteka/thumbnail.jpeg'
				]
			},

			{
				name: 'Wpp web Customizer',
				authors: ['Armando Assunção', 'Arthur Assunção'],
				collaborators: [],
				technologies: 'HTML/CSS3, Javascript/JQuery',
				type: 'Projeto Pessoal',
				description: 'Desenvolvida por mim e por <a target="_blank" href="https://arthurassuncao.com">Arthur Assunção</a>, \
					essa extensão funciona no navegador Google Chrome e tem a funcionalidade de personalizar a página do \
					<a target="_blank" href="https://web.whatsapp.com/">WhatsApp™ Web</a>.',
				datastart: '2016',
				dataend: '2016',
				imgthumbnail: 'static/img/portfolio/wpp_web_customizer/thumbnail.png',
				urls: [
					{ name: 'Ver na Chrome Webstore', url: 'https://chrome.google.com/webstore/detail/wpp-web-customizer/lhaamjcmnafobcjjcjfpglfonpdkoedb' },
					{ name: 'Ver no Github', url: 'https://github.com/ArthurAssuncao/WhatsappWebCustomizer' }
				],
				imgs: [
					'static/img/portfolio/wpp_web_customizer/screenshot-001.jpeg',
					'static/img/portfolio/wpp_web_customizer/screenshot-002.jpeg',
					'static/img/portfolio/wpp_web_customizer/screenshot-003.jpeg',
					'static/img/portfolio/wpp_web_customizer/screenshot-005.jpeg'
				]
			}

		]
	}
});
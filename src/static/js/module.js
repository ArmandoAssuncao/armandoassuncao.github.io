var appModule = angular.module('ArmandoAssuncao', ['ngMaterial', 'ngAnimate', 'ngAria']);

appModule.config(function($mdThemingProvider) {
	$mdThemingProvider.definePalette('darkTheme', {
		'50': 'B1B1B1',
		'100': '919191',
		'200': '818181',
		'300': '616161',
		'400': '414141',
		'500': '212121',
		'600': '1A1A1A',
		'700': '151515',
		'800': '0A0A0A',
		'900': '050505',
		'A100': '917171',
		'A200': '816161',
		'A400': '412121',
		'A700': '15F1F1',
		'contrastDefaultColor': 'light',
		
		'contrastDarkColors': ['50', '100',
		 '200', '300', '400', 'A100'],
		'contrastLightColors': undefined
	});
	var themeProvider = $mdThemingProvider;
	themeProvider.theme('default')
	.primaryPalette('orange').dark();
	
/*	.primaryPalette('darkTheme', {
		'default': '500',
		'hue-1': '200',
		'hue-2': '700',
		'hue-3': '900'
	})
	.dark()*/

	/*themeProvider.foregroundPalette = {
		name: 'light',
		'1': 'rgba(255,255,255,1.0)',
		'2': 'rgba(255,255,255,0.7)',
		'3': 'rgba(255,255,255,1)',
		'4': 'rgba(255,255,255,1)'
	};*/
});
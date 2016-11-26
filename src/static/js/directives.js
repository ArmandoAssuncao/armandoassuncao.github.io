appModule.directive('skill', function(){
	var directive = {};

	directive.restrict = 'AE';

	directive.controller = 'SkillController'

	directive.scope = {
		name: '@name',
		value: '@value'
	}

	directive.template =
			'<span class="skill-name">{{::name}}</span>'+
			'<span class="skill-level">{{::generate_level(value)}}</span>'+
			'<div class="skill-bar"><div class="skill-value" flex="{{value}}"></div></div>';

	return directive;
});

appModule.directive('projectPreview', function(){
	var directive = {};

	directive.restrict = 'E';

	directive.controller = 'ProjectPreviewController';
	directive.controllerAs = "ppc";

/*	var project = {
		name: '@',
		authors: '@',
		collaborators: '@',
		technologies: '@',
		type: '@',
		description: '@',
		datastart: '@',
		dataend: '@',
		imgthumbnail: '@',
		urls: '@',
		imgs: '@'
	}*/

	var project = {
		projectItems: '='
	}

	directive.scope = project;
	directive.bindToController = project;

	directive.templateUrl = '/templates/project_preview.tmpl.html';

	return directive;
});
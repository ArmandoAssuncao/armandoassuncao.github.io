appModule.directive('skill', function(){
	var directive = {};

	directive.restrict = 'AE';

	directive.controller = 'skillController'

	directive.scope = {
		name: '@name',
		value: '@value'
	}

	directive.template =
			'<span class="skill-name">{{::name}}</span>'+
			'<span class="skill-level">{{::generate_level(value)}}</span>'+
			'<div class="skill-bar"><div class="skill-value" flex="{{value}}"></div></div>';

	return directive;
})

.controller('skillController', function($scope){
	$scope.levels = [
		{ name: 'básico', value_min: 0, value_max: 39 },
		{ name: 'intermediário', value_min: 40, value_max: 69 },
		{ name: 'avançado', value_min: 70, value_max: 89 },
		{ name: 'expert', value_min: 90, value_max: 100 }
	];

	$scope.generate_level = function(value) {
		if(value >= $scope.levels[3].value_min){
			return $scope.levels[3].name;
		}
		else if(value >= $scope.levels[2].value_min){
			return $scope.levels[2].name;
		}
		else if(value >= $scope.levels[1].value_min){
			return $scope.levels[1].name;
		}
		else if(value >= $scope.levels[0].value_min){
			return $scope.levels[0].name;
		}
		return 'indefinido';
	}
})
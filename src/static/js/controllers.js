appModule.controller('SkillsController', function($scope){
	$scope.sortType = 'name';

	$scope.skills = {};
	$scope.skills.data = [
        {name: 'HTML5/CSS3', value: 70},
		{name: 'C/C++', value: 35},
		{name: 'Java', value: 45},
		{name: 'JavaScript', value: 55},
		{name: 'Python', value: 35},
		{name: 'Scala', value: 20},
		{name: 'AngularJS', value: 50},
		{name: 'NodeJS', value: 50},
		{name: 'Grunt', value: 60},
		{name: 'Git', value: 40},
		{name: 'MongoDB', value: 45},
		{name: 'SQL', value: 40},
		{name: 'Android', value: 60},
		{name: 'PHP', value: 40},
		{name: 'C#', value: 40},
	];
});

appModule.controller('SkillController', function($scope){
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
});

appModule.controller('PortfolioController', function($scope, $mdDialog, $mdMedia, projectsFactory){
	$scope.sortType = 'name';

	$scope.projects = projectsFactory.projects;
});

appModule.controller('ProjectPreviewController', function($scope, $mdDialog, $mdMedia){
    const project = this.projectItems;

	$scope.showProject = function(ev) {
		$scope.customFullscreen = $mdMedia('xs');
		$mdDialog.show({
			controller: PortfolioDialogController,
			templateUrl: 'templates/project_dialog.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: $scope.customFullscreen,
			locals: {
				project: project
			}
		});
	};

	function PortfolioDialogController($scope, $mdDialog, project){
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};

		$scope.project = project;
	}
});
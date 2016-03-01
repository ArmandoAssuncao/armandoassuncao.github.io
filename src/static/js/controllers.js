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
	];
})

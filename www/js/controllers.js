angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
	$scope.usuario={};
	$scope.usuario.nombre;

	$scope.Guardar=function(usuario){
		var dato=JSON.stringify(usuario);
		$state.go("tab.trivia",{nombre:dato});
	}
})

.controller('TriviaCtrl', function($scope, $stateParams) {

	var nombre=JSON.parse($stateParams.nombre);
  	$scope.usuario={};
  	$scope.usuario.nombre=nombre.nombre;

})


.controller('AutorCtrl', function($scope) {

});

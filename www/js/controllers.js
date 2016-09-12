angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
	$scope.usuario={};
	$scope.usuario.nombre;

	$scope.Guardar=function(usuario){
		var dato=JSON.stringify(usuario);
		$state.go("tab.trivia",{nombre:dato});
	}
})

.controller('TriviaCtrl', function($scope, $timeout, $stateParams, $state) {

	var nombre=JSON.parse($stateParams.nombre);
  	$scope.usuario={};
  	$scope.usuario.puntaje=0;
  	$scope.usuario.nombre=nombre.nombre;

  	var preguntas=new Firebase('https://trivia-ce4e1.firebaseio.com/preguntas');
  	$scope.preguntas=[];

  	preguntas.on('child_added', function (snapshot){
  		$timeout(function(){
  			var pregunta=snapshot.val();
  			$scope.preguntas.push(pregunta);
  			//console.log($scope.preguntas);
  		});
  	});

  	$scope.Verificar=function(opcion,pregunta){
  		if(pregunta.id==1)
  		{
	  		if(opcion==pregunta.respuesta)
	  		{
	  			alert("Correcto!!");
	  			$scope.usuario.pregunta1="bien";
	  			$scope.usuario.puntaje+=pregunta.puntos;
	  		}
	  		else
	  		{
	  			alert("incorrecto");
	  			$scope.usuario.pregunta1="mal";
	  		}
  		}
  		if(pregunta.id==2)
  		{
	  		if(opcion==pregunta.respuesta)
	  		{
	  			alert("Correcto!!");
	  			$scope.usuario.pregunta2="bien";
	  			$scope.usuario.puntaje+=pregunta.puntos;
	  		}
	  		else
	  		{
	  			alert("incorrecto");
	  			$scope.usuario.pregunta2="mal";
	  		}
  		}
  	  	if(pregunta.id==3)
  		{
	  		if(opcion==pregunta.respuesta)
	  		{
	  			alert("Correcto!!");
	  			$scope.usuario.pregunta3="bien";
	  			$scope.usuario.puntaje+=pregunta.puntos;
	  		}
	  		else
	  		{
	  			alert("incorrecto");
	  			$scope.usuario.pregunta3="mal";
	  		}
  		}
  	}

  	var usuarios=new Firebase('https://trivia-ce4e1.firebaseio.com/usuarios');
  	$scope.Salir=function(){
  		usuarios.push({usuario:$scope.usuario.nombre, 
  						pregunta1:$scope.usuario.pregunta1,
  						pregunta2:$scope.usuario.pregunta2,
  						pregunta3:$scope.usuario.pregunta3,
  						puntaje:$scope.usuario.puntaje });
  		$state.go("tab.login");
  	}

})


.controller('AutorCtrl', function($scope) {

});

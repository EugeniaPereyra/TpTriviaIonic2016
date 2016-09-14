angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
	$scope.usuario={};
	$scope.usuario.nombre;

	$scope.Guardar=function(usuario){
		var dato=JSON.stringify(usuario);
		$state.go("tab.trivia",{nombre:dato});
		$scope.usuario.nombre=null;
	}
})

.controller('TriviaCtrl', function($scope, $timeout, $stateParams, $state, $cordovaVibration, $cordovaNativeAudio) {

	var nombre=JSON.parse($stateParams.nombre);
  	$scope.usuario={};
  	$scope.usuario.puntaje=0;
  	$scope.usuario.nombre=nombre.nombre;
  	$scope.usuario.nivel="INICIADOR";

  	$scope.clase1={};
  	$scope.clase2={};
  	$scope.clase3={};


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
	  			$scope.clase1.btnCorrecto=true;
	  			$scope.usuario.pregunta1="bien";
	  			$scope.usuario.puntaje+=pregunta.puntos;
	  			$scope.usuario.nivel="PADAWAN";

				$cordovaVibration.vibrate(100);
    			$cordovaNativeAudio.play('si');
	  		}
	  		else
	  		{
	  			alert("incorrecto");
	  			$scope.clase1.btnIncorrecto=true;
	  			$scope.usuario.pregunta1="mal";

				$cordovaVibration.vibrate([100,100,100]);
    			$cordovaNativeAudio.play('no');
	  		}
  		}
  		if(pregunta.id==2)
  		{
	  		if(opcion==pregunta.respuesta)
	  		{
	  			alert("Correcto!!");
	  			$scope.usuario.pregunta2="bien";
	  			$scope.clase2.btnCorrecto=true;
	  			$scope.usuario.puntaje+=pregunta.puntos;
	  			if($scope.usuario.puntaje<=500&&$scope.usuario.puntaje>0)
	  				$scope.usuario.nivel="PADAWAN";
	  			if($scope.usuario.puntaje>500)
	  				$scope.usuario.nivel="CABALLERO JEDI";

	  			$cordovaVibration.vibrate(100);
    			$cordovaNativeAudio.play('si');
	  		}
	  		else
	  		{
	  			alert("incorrecto");
	  			$scope.usuario.pregunta2="mal";
	  			$scope.clase2.btnIncorrecto=true;

				$cordovaVibration.vibrate([100,100,100]);
    			$cordovaNativeAudio.play('no');
	  		}
  		}
  	  	if(pregunta.id==3)
  		{
	  		if(opcion==pregunta.respuesta)
	  		{
	  			alert("Correcto!!");
	  			$scope.usuario.pregunta3="bien";
	  			$scope.clase3.btnCorrecto=true;
	  			$scope.usuario.puntaje+=pregunta.puntos;
	  			if($scope.usuario.puntaje<=500&&$scope.usuario.puntaje>0)
	  				$scope.usuario.nivel="PADAWAN";
	  			if($scope.usuario.puntaje>500 && $scope.usuario.puntaje<800)
	  				$scope.usuario.nivel="CABALLERO JEDI";
	  			if($scope.usuario.puntaje>=800)
	  				$scope.usuario.nivel="MAESTRO JEDI";

				$cordovaVibration.vibrate(100);
    			$cordovaNativeAudio.play('si');
	  		}
	  		else
	  		{
	  			alert("incorrecto");
	  			$scope.usuario.pregunta3="mal";
	  			$scope.clase3.btnIncorrecto=true;
	  			
				$cordovaVibration.vibrate([100,100,100]);
    			$cordovaNativeAudio.play('no');
			}
  		}
  	}

  	var usuarios=new Firebase('https://trivia-ce4e1.firebaseio.com/usuarios');
  	$scope.Salir=function(){
  		usuarios.push({usuario:$scope.usuario.nombre, 
  						pregunta1:$scope.usuario.pregunta1,
  						pregunta2:$scope.usuario.pregunta2,
  						pregunta3:$scope.usuario.pregunta3,
  						puntaje:$scope.usuario.puntaje,
  						nivel: $scope.usuario.nivel });
  		$scope.usuario=null;
  		$state.go("tab.login");
  	}

})


.controller('AutorCtrl', function($scope) {
	$scope.autor={};
	$scope.autor.nombre="Maria Eugenia Pereyra";
	$scope.autor.foto="img/autor.jpg";
	$scope.autor.email="meugeniape@gmail.com";
	$scope.autor.github="https://github.com/EugeniaPereyra";
});

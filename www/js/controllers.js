angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
	$scope.usuarioLog=null;
	$scope.usuarioLog={};

	// $scope.$watch("usuarioLog.nombreLog", function(newVal) {
 //        console.log(newVal);
 //    });

	$scope.Guardar=function(){
		var dato=JSON.stringify($scope.usuarioLog);
		$state.go("tab.trivia",{nombre:dato});
	}
})


.controller('TriviaCtrl', function($scope, $timeout, $stateParams, $state, $cordovaVibration, $cordovaNativeAudio, $ionicPopup, $http) {
  	$scope.usuario={};
	var nombre=JSON.parse($stateParams.nombre);
  	$scope.usuario.puntaje=0;
  	$scope.usuario.nombre=nombre.nombreLog;
  	$scope.usuario.nivel="INICIADOR";

  	// $scope.$watch("usuario", function(newVal) {
   //      console.log(newVal);
   //  });

  	$scope.clase1={};
  	$scope.clase2={};
  	$scope.clase3={};
	$scope.preguntas=[];
  	
  	$http.get('preguntas/preguntas.json')
      .then(function(respuesta) {
      	//console.log(respuesta);
      	$scope.preguntas=respuesta.data;
      },function (error) {
     		console.log(error);
 	 });
  	
	//var preguntas=new Firebase('https://trivia-ce4e1.firebaseio.com/preguntas');
  	// preguntas.on('child_added', function (snapshot){
  	// 	$timeout(function(){
  	// 		var pregunta=snapshot.val();
  	// 		$scope.preguntas.push(pregunta);
  	// 		//console.log($scope.preguntas);
  	// 	});
  	// });

  	$scope.Verificar=function(opcion,pregunta){
  		if(pregunta.id==1)
  		{
  			$scope.usuario.pregunta1=pregunta.pregunta;
	  		$scope.usuario.respuesta1=pregunta.respuesta;
	  		$scope.usuario.respUser1=opcion;
	  		$scope.usuario.valor1=pregunta.puntos;
	  		if(opcion==pregunta.respuesta)
	  		{
	  			$ionicPopup.alert({
     					title: 'BIEN!!',
     					cssClass:'bien',
     					okType: 'button-balanced'
   				});
	  			$scope.clase1.btnCorrecto=true;
	  			$scope.usuario.puntaje+=pregunta.puntos;
	  			$scope.usuario.nivel="PADAWAN";
	  			$scope.contestada1=true;
	  			try
	  			{
					$cordovaVibration.vibrate(200);
    				$cordovaNativeAudio.play('si');
    			}
    			catch(e)
    			{
    				console.log("La vibracion y el sonido, solo funcionan en celulares");
    			}
	  		}
	  		else
	  		{
	  			$ionicPopup.alert({
     					title: 'MAL!!',
     					cssClass:'mal',
     					okType: 'button-assertive'
   				});
	  			$scope.clase1.btnIncorrecto=true;
	  			$scope.contestada1=true;
	  			try
	  			{
					$cordovaVibration.vibrate([200,200,200]);
	    			$cordovaNativeAudio.play('no');
    			}
    			catch(e)
    			{
    				console.log("La vibracion y el sonido, solo funcionan en celulares");
    			}
	  		}
  		}
  		if(pregunta.id==2)
  		{
  		  	$scope.usuario.pregunta2=pregunta.pregunta;
	  		$scope.usuario.respuesta2=pregunta.respuesta;
	  		$scope.usuario.respUser2=opcion;
	  		$scope.usuario.valor2=pregunta.puntos;
	  		if(opcion==pregunta.respuesta)
	  		{
	  			$ionicPopup.alert({
     					title: 'BIEN!!',
     					cssClass:'bien',
     					okType: 'button-balanced'
   				});
	  			$scope.clase2.btnCorrecto=true;
	  			$scope.usuario.puntaje+=pregunta.puntos;
	  			$scope.contestada2=true;
	  			if($scope.usuario.puntaje<=500&&$scope.usuario.puntaje>0)
	  				$scope.usuario.nivel="PADAWAN";
	  			if($scope.usuario.puntaje>500)
	  				$scope.usuario.nivel="CABALLERO JEDI";
	  			try
	  			{
					$cordovaVibration.vibrate(200);
    				$cordovaNativeAudio.play('si');
    			}
    			catch(e)
    			{
    				console.log("La vibracion y el sonido, solo funcionan en celulares");
    			}
	  		}
	  		else
	  		{
	  			$ionicPopup.alert({
     					title: 'MAL!!',
     					cssClass:'mal',
     					okType: 'button-assertive'
   				});
	  			$scope.clase2.btnIncorrecto=true;
	  			$scope.contestada2=true;
	  			try
	  			{
					$cordovaVibration.vibrate([200,200,200]);
	    			$cordovaNativeAudio.play('no');
    			}
    			catch(e)
    			{
    				console.log("La vibracion y el sonido, solo funcionan en celulares");
    			}
	  		}
  		}
  	  	if(pregunta.id==3)
  		{
  		  	$scope.usuario.pregunta3=pregunta.pregunta;
	  		$scope.usuario.respuesta3=pregunta.respuesta;
	  		$scope.usuario.respUser3=opcion;
	  		$scope.usuario.valor3=pregunta.puntos;
	  		if(opcion==pregunta.respuesta)
	  		{
	  			$ionicPopup.alert({
     					title: 'BIEN!!',
     					cssClass:'bien',
     					okType: 'button-balanced'
   				});
	  			$scope.clase3.btnCorrecto=true;
	  			$scope.usuario.puntaje+=pregunta.puntos;
	  			$scope.contestada3=true;
	  			if($scope.usuario.puntaje<=500&&$scope.usuario.puntaje>0)
	  				$scope.usuario.nivel="PADAWAN";
	  			if($scope.usuario.puntaje>500 && $scope.usuario.puntaje<800)
	  				$scope.usuario.nivel="CABALLERO JEDI";
	  			if($scope.usuario.puntaje>=800)
	  				$scope.usuario.nivel="MAESTRO JEDI";

	  			try
	  			{
					$cordovaVibration.vibrate(200);
    				$cordovaNativeAudio.play('si');
    			}
    			catch(e)
    			{
    				console.log("La vibracion y el sonido, solo funcionan en celulares");
    			}
	  		}
	  		else
	  		{
	  			$ionicPopup.alert({
     					title: 'MAL!!',
     					cssClass:'mal',
     					okType: 'button-assertive'
   				});
	  			$scope.clase3.btnIncorrecto=true;
	  			$scope.contestada3=true;
	  			try
	  			{
					$cordovaVibration.vibrate([200,200,200]);
	    			$cordovaNativeAudio.play('no');
    			}
    			catch(e)
    			{
    				console.log("La vibracion y el sonido, solo funcionan en celulares");
    			}
			}
  		}
  	}

  	var usuarios=new Firebase('https://trivia-ce4e1.firebaseio.com/usuarios');
  	$scope.Salir=function(){
  		usuarios.push({usuario: $scope.usuario.nombre, 
  						pregunta1: $scope.usuario.pregunta1,
  						respuesta1: $scope.usuario.respuesta1,
  						valorPregunta1: $scope.usuario.valor1,
  						respuestaUsuario1: $scope.usuario.respUser1,
  						pregunta2: $scope.usuario.pregunta2,
  						respuesta2: $scope.usuario.respuesta2,
  						valorPregunta2: $scope.usuario.valor2,
  						respuestaUsuario2: $scope.usuario.respUser2,
  						pregunta3: $scope.usuario.pregunta3,
  						respuesta3: $scope.usuario.respuesta3,
  						valorPregunta3: $scope.usuario.valor3,
  						respuestaUsuario3: $scope.usuario.respUser3,
  						puntaje: $scope.usuario.puntaje,
  						nivel: $scope.usuario.nivel });
  		$ionicPopup.alert({
     					title: 'Tu puntaje es '+$scope.usuario.puntaje+', <br>sos un '+$scope.usuario.nivel+'!!<br> Que la fuerza te acompañe!!',
     					cssClass:'salida',
     					okType: 'button-energized',
   				});
   		$scope.usuario=null;
   		$scope.usuario={};
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

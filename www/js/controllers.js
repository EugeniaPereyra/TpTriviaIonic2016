angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
	$scope.usuarioLog={};

	$scope.Guardar=function(){
		var dato=JSON.stringify($scope.usuarioLog);
		$state.go("tab.trivia",{nombre:dato});
    $scope.usuarioLog.nombreLog="";
	}
})


.controller('TriviaCtrl', function($scope, $timeout, $stateParams, $state, $cordovaVibration, $cordovaNativeAudio, $ionicPopup, $http, $cordovaFile) {
  document.addEventListener("deviceready", 
    function onDeviceReady() {
        $cordovaFile.createFile(cordova.file.externalRootDirectory, "trivia.txt",true) // cordova.file.dataDirectory //cordova.file.externalRootDirectory
          .then(function (success) {
            // success
            console.log("archivo creado");
          }, function (error) {
            // error
            console.log(error);
          });
    }, false);

    $scope.usuario={};
	 var nombre=JSON.parse($stateParams.nombre);
  	$scope.usuario.puntaje=0;
  	$scope.usuario.nombre=nombre.nombreLog;
  	$scope.usuario.nivel="INICIADOR";

  	$scope.clase1={};
  	$scope.clase2={};
  	$scope.clase3={};
	 $scope.preguntas=[];
   $scope.jugadores=[];
   var usuarios=new Firebase('https://trivia-ce4e1.firebaseio.com/USUARIOS');
  	
    // CARGA PREGUNTAS DESDE UN ARCHIVO JSON (PARA PODER JUGAR SIN CONEXION)
  	// $http.get('preguntas/preguntas.json')
   //    .then(function(respuesta) {
   //    	//console.log(respuesta);
   //    	$scope.preguntas=respuesta.data;
   //    },function (error) {
   //   		console.log(error);
 	 // });

    var preguntas=new Firebase('https://trivia-ce4e1.firebaseio.com/PREGUNTAS');
    preguntas.on('child_added', function (snapshot){
     $timeout(function(){
       var pregunta=snapshot.val();
       $scope.preguntas.push(pregunta);
       //console.log($scope.preguntas);
     });
    });

    try{
      $cordovaFile.checkFile(cordova.file.externalRootDirectory, "trivia.txt") // cordova.file.dataDirectory //cordova.file.externalRootDirectory
            .then(function (success) {
              // succes
              $cordovaFile.readAsText(cordova.file.externalRootDirectory, "trivia.txt")
                      .then(function (success) {
                        var dato=JSON.parse(success);
                        $scope.jugadores=dato;
                      }, function (error) {
                        // error
                        console.log(error);
                      });
            }, function (error) {
              // error
              console.log(error);
            });
      }
      catch(e)
      {
        console.log("El plugin File funciona en dispositivos unicamente");
      }

  	$scope.Verificar=function(opcion,pregunta){
  		if(pregunta.id==1)
  		{
  			$scope.usuario.pregunta1=pregunta.pregunta;
	  		$scope.usuario.respuesta1=pregunta.respuesta;
	  		$scope.usuario.respuestaUsuario1=opcion;
	  		$scope.usuario.valorPregunta1=pregunta.puntos;
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
          ReproducirPositivo();
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
          ReproducirNegativo();
	  		}
  		}
  		if(pregunta.id==2)
  		{
  		  	$scope.usuario.pregunta2=pregunta.pregunta;
	  		$scope.usuario.respuesta2=pregunta.respuesta;
	  		$scope.usuario.respuestaUsuario2=opcion;
	  		$scope.usuario.valorPregunta2=pregunta.puntos;
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

          ReproducirPositivo();
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
          ReproducirNegativo();
	  		}
  		}
  	  if(pregunta.id==3)
  		{
  		  	$scope.usuario.pregunta3=pregunta.pregunta;
	  		$scope.usuario.respuesta3=pregunta.respuesta;
	  		$scope.usuario.respuestaUsuario3=opcion;
	  		$scope.usuario.valorPregunta3=pregunta.puntos;
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

          ReproducirPositivo();
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
          ReproducirNegativo();
			   }
  		}
  	}

    function ReproducirPositivo(){
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

    function ReproducirNegativo(){
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


    $scope.Salir=function(){
  		usuarios.push({nombre: $scope.usuario.nombre, 
  						pregunta1: $scope.usuario.pregunta1,
  						respuesta1: $scope.usuario.respuesta1,
  						valorPregunta1: $scope.usuario.valorPregunta1,
  						respuestaUsuario1: $scope.usuario.respuestaUsuario1,
  						pregunta2: $scope.usuario.pregunta2,
  						respuesta2: $scope.usuario.respuesta2,
  						valorPregunta2: $scope.usuario.valorPregunta2,
  						respuestaUsuario2: $scope.usuario.respuestaUsuario2,
  						pregunta3: $scope.usuario.pregunta3,
  						respuesta3: $scope.usuario.respuesta3,
  						valorPregunta3: $scope.usuario.valorPregunta3,
  						respuestaUsuario3: $scope.usuario.respuestaUsuario3,
  						puntaje: $scope.usuario.puntaje,
  						nivel: $scope.usuario.nivel });

      $scope.jugadores.push($scope.usuario);
      var dato=JSON.stringify($scope.jugadores);

      try{
        $cordovaFile.writeFile(cordova.file.externalRootDirectory, "trivia.txt", dato, true)
                .then(function (success) {
                  console.log("archivo guardado");
                }, function (error) {
                  // error
                  console.log(error);
                });
      }
      catch(e)
      {
        console.log("El plugin File funciona en dispositivos unicamente");
      }
  		
      $ionicPopup.alert({
     					title: 'Tu puntaje es '+$scope.usuario.puntaje+', <br>sos un '+$scope.usuario.nivel+'!!<br><br> Que la fuerza te acompañe!!',
     					cssClass:'salida',
     					okType: 'button-energized',
   				});

  		$state.go("tab.login");
   	}
})

.controller('GrabadoCtrl', function($scope, $cordovaFile) {
  $scope.archivo={};
  document.addEventListener("deviceready", 
    function onDeviceReady() {
      $cordovaFile.readAsText(cordova.file.externalRootDirectory, "trivia.txt")
              .then(function (success) {
                var dato=JSON.parse(success);
                $scope.archivo=dato;
              }, function (error) {
                // error
                console.log(error);
              });
    }, false);
})

.controller('AutorCtrl', function($scope) {
	$scope.autor={};
	$scope.autor.nombre="Maria Eugenia Pereyra";
	$scope.autor.foto="img/autor.jpg";
	$scope.autor.email="meugeniape@gmail.com";
	$scope.autor.github="https://github.com/EugeniaPereyra";
});

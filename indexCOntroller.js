angular.module("ManegementProcess", ['ngRoute']).controller("ManegementProcessCTRL", function ($scope, $http, $window) {

    $scope.canCreateUser = true;
    $scope.canCreateAssignment = false;
    $scope.loginAcess = loginAcess;
    $scope.UserPerfil = "finalizador";

    function loginAcess(login, senha) {
        $http.get("http://localhost:5001/login/" + login + "," + senha).then(function (response) {
            $scope.UserLoginPerfil = response.data;
            if (response.data != "Acesso não autorizado") {
                verifyPerfil(response.data)
            } else {
                $window.alert(response.data)
            }
        });
    }

    function verifyPerfil(perfil) {
        if (perfil == "administrador") {
            window.location.href = "/administrador/administrador";
        } else if (perfil == "triador") {
            window.location.href = "/triador/triador";
        } else if (perfil == "finalizador") {
            window.location.href = "/finalizador/finalizador";
        }
    }

});
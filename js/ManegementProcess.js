angular.module("ManegementProcess", []).controller("ManegementProcessCTRL", function ($scope, $http, $window) {

    $scope.canCreateUser = true;
    $scope.canCreateAssignment = false;

    $scope.saveUser = saveUser;

    function saveUser(nome, login, password, perfil) {

        const data = {
            "LOGIN":  login,
            "NOME":   nome,
            "PERFIL":  perfil,
            "PASSWORD": password,
            "id":  1
        }
        
        daoUser(data)
    }

    function daoUser(data) {
        $http.post("http://localhost:8080/user/salvar",  data).then(function (response) {
            if(response.status == 200){
                $window.alert("Registro Salvo ComSucesso")
            }else{
                $window.alert("Erro: "+ response.status)
            }
        });


        // $http.post('https://localhost:8080/user/salvar', data)
        // .then(function (response) {
        //       $scope.msg = response;
        //   })
    }

});
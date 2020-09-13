angular.module("Administrador", ['ngRoute']).controller("AdministradorController", function ($scope, $http, $window) {
    $scope.canCreateUser = false;
    $scope.canCreateAssignment = false;
    $scope.saveUser = saveUser;
    $scope.user = user;
    $scope.cancelUser = cancelUser;
    $scope.removerUser = removerUser;
    $scope.editarUser = editarUser;
    $scope.sair = sair;
    $scope.perfils = ["administrador", "triador", "finalizador"]
    init()
    function init() {
        getAllUser()
    }

    function saveUser(nome, login, password, password2, perfil, id) {
        if (id != null) {
            const user1 = {
                "LOGIN": login,
                "nome": nome,
                "PERFIL": perfil,
                "PASSWORD": password,
                "PASSWORD2": password2,
                "id": id
            }
            daoUser(user1)
        } else {
            const user2 = {
                "LOGIN": login,
                "nome": nome,
                "PERFIL": perfil,
                "PASSWORD": password,
                "PASSWORD2": password2,
            }
            daoUser(user2)
        }
    }

    function validatyUser(data) {
        if (data.LOGIN == null) {
            $window.alert("O campo LOGIN deve ser preenchido")
            return;
        } else if (data.PERFIL == null) {
            $window.alert("Por favor escolha um PERFIL")
            return;
        } else if (data.PASSWORD == null) {
            $window.alert("O campo PASSWORD deve ser preenchido")
            return;
        } else if (data.PASSWORD2 == null) {
            $window.alert("Os campos PASSWORD2 são obrigatorios")
            return;
        } else {
            if (data.PASSWORD != data.PASSWORD2) {
                $window.alert("Senhas diferentes informadas")
                return;
            }
        }
        return true;
    }

    function daoUser(data) {
        if (validatyUser(data)) {
            $http.post("http://localhost:5001/user/salvar", data)
                .then(() => {
                    $window.alert("Usuário salvo com sucesso")
                    $window.location.reload();
                }, (response) => {
                    $window.alert("Este login já esta em uso! por favor escolha outro!")
                });
        }
    }

    function user() {
        $scope.nome = ""
        $scope.canCreateUser = true;
        $scope.canCreateAssignment = false;
    }

    function editarUser(user) {
        $scope.canCreateUser = true
        $scope.id = user.id
        $scope.login = user.LOGIN
        $scope.nome = user.nome
        $scope.perfil = user.PERFIL

    }

    function cancelUser() {
        $scope.canCreateUser = false;
    }


    function getAllUser() {
        $http.get("http://localhost:5001/user/tudo").then(function (response) {
            $scope.users = response.data.content
        });
    }

    function removerUser(id) {

        $http.delete("http://localhost:5001/user/deletar/" + id).then(function (response) {
            if (response.status == 200) {
                init()
                // location.reload();
            } else {
                return
            }
        });
    }

    function sair() {
        window.location.href = "/";
    }


});
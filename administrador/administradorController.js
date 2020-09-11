angular.module("Administrador", ['ngRoute']).controller("AdministradorController", function ($scope, $http, $window) {
    $scope.canCreateUser = false;
    $scope.canCreateAssignment = false;
    $scope.saveUser = saveUser;
    $scope.toGoAssignment = toGoAssignment;
    $scope.cancelAssignment = cancelAssignment;
    $scope.user = user;
    $scope.saveTarefa = saveTarefa;
    $scope.removerTarefa = removerTarefa;
    $scope.editarTarefa = editarTarefa;
    $scope.cancelUser = cancelUser;
    $scope.removerUser = removerUser;
    $scope.editarUser = editarUser;
    $scope.loginAcess = loginAcess;
    $scope.sair = sair;
    $scope.perfils = ["administrador", "triador", "finalizador"]
    init()
    function init() {
        daoTarefaGetAll()
        daoUserfaGetAll()
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

    function toGoAssignment() {
        $scope.nome = ""
        $scope.canCreateUser = false;
        $scope.canCreateAssignment = true;
    }

    function cancelAssignment() {
        $scope.canCreateAssignment = false;
    }

    function user() {
        $scope.nome = ""
        $scope.canCreateUser = true;
        $scope.canCreateAssignment = false;
    }

    function saveTarefa(assigned, description, opinion, id) {
        var nome = description;

        if (id == null) {
            const tarefa1 = {
                assigned,
                nome: nome,
                opinion,
            }
            daoTarefa(tarefa1)
        } else {
            const tarefa2 = {
                assigned,
                nome: nome,
                opinion,
                id
            }
            daoTarefa(tarefa2)
        }

    }

    function validateTarefa(data) {
        data.assigned == null ? data.assigned = "DESATRIBUIDO" : data.assigned;
        if (data.nome == null) {
            $window.alert("Preencha o campo descrição")
            return false;
        }
        return true;
    }

    function daoTarefa(data) {
        if (validateTarefa(data)) {
            $http.post("http://localhost:5001/tarefa/salvar", data).then(function (response) {
                $window.alert("Tarefa Salva ComSucesso")
                $window.location.reload();

            });
        }
    }

    function daoTarefaGetAll() {
        $http.get("http://localhost:5001/tarefa/tudo").then(function (response) {
            if (response.status == 200) {
                $scope.tarefas = response.data

            } else {
                return
            }
        });
    }

    function removerTarefa(id) {

        $http.delete("http://localhost:5001/tarefa/deletar/" + id).then(function (response) {
            if (response.status == 200) {
                init()
                // location.reload();
            } else {
                return
            }
        });
    }

    function editarTarefa(tarefa) {
        $scope.id = tarefa.id
        $scope.description = tarefa.nome
        $scope.assigned = tarefa.assigned
        $scope.opinion = tarefa.opinion
        $scope.canCreateUser = false;
        $scope.canCreateAssignment = true;

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


    function daoUserfaGetAll() {
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


    function loginAcess(login, senha) {
        $http.get("http://localhost:5001/login/" + login + "," + senha).then(function (response) {
            $scope.UserLoginPerfil = response.data;
            if (response.data != "Acesso não autorizado") {
                verifyPerfil()
            } else {
                $window.alert(response.data)
            }

        });
    }

    function verifyPerfil() {
        $scope.usuarioSim = true;
        toGoHome()
    }

    function toGoHome() {
        window.location.href = "/home";
    }

    function sair() {
        window.location.href = "/";
    }


});
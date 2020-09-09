angular.module("ManegementProcess", []).controller("ManegementProcessCTRL", function ($scope, $http, $window) {

    $scope.canCreateUser = true;
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

    init()
    function init() {
        daoTarefaGetAll()
        daoUserfaGetAll()
    }



    function saveUser(nome, login, password, perfil) {
        const data = {
            "LOGIN": login,
            "NOME": nome,
            "PERFIL": perfil,
            "PASSWORD": password,
            "id": 1
        }
        daoUser(data)
    }

    function daoUser(data) {
        $http.post("http://localhost:8080/user/salvar", data).then(function (response) {
            if (response.status == 200) {
                $window.alert("Usuário salvo com sucesso")
                $window.location.reload();
            } else {
                $window.alert("Erro: " + response.status)
            }
        });
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



    function saveTarefa(assigned, description, opinion) {

        var nome = description;

        const data = {
            assigned,
            nome: nome,
            opinion
        }

        daoTarefa(data)

    }

    function daoTarefa(data) {
        $http.post("http://localhost:8080/tarefa/salvar", data).then(function (response) {
            if (response.status == 200) {
                init()
                $window.alert("Tarefa Salva ComSucesso")
            } else {
                $window.alert("Erro: " + response.status)
            }
        });
    }

    function daoTarefaGetAll() {
        $http.get("http://localhost:8080/tarefa/tudo").then(function (response) {
            if (response.status == 200) {
                $scope.tarefas = response.data

            } else {
                return
            }
        });
    }

    function removerTarefa(id) {

        $http.delete("http://localhost:8080/tarefa/deletar/" + id).then(function (response) {
            if (response.status == 200) {
                init()
                // location.reload();
            } else {
                return
            }
        });
    }

    function editarTarefa(tarefa) {

        $scope.description = tarefa.nome
        $scope.assigned = tarefa.assigned
        $scope.opinion = tarefa.opinion
        $scope.canCreateUser = false;
        $scope.canCreateAssignment = true;

    }

    function editarUser(user){
        
    }

    function cancelUser() {
        $scope.canCreateUser = false;
    }


    function daoUserfaGetAll() {
        $http.get("http://localhost:8080/user/tudo").then(function (response) {
            if (response.status == 200) {
                $scope.users = response.data.content
                console.log($scope.users)

            } else {
                return
            }
        });
    }

    function removerUser(id) {

        $http.delete("http://localhost:8080/user/deletar/" + id).then(function (response) {
            if (response.status == 200) {
                init()
                // location.reload();
            } else {
                return
            }
        });
    }

});
angular.module("Triador", ['ngRoute']).controller("TriadorController", function ($scope, $http, $window) {

    $scope.canCreateUser = true;
    $scope.canCreateAssignment = false;
    $scope.toGoAssignment = toGoAssignment;
    $scope.cancelAssignment = cancelAssignment;
    $scope.saveTarefa = saveTarefa;
    $scope.editarTarefa = editarTarefa;
    $scope.perfils = ["administrador", "triador", "finalizador"]
    $scope.sair = sair;
    init()
    function init() {
        daoUserfaGetAll()
        daoTarefaGetAll()
    }

    function toGoAssignment() {
        $scope.nome = ""
        $scope.canCreateUser = false;
        $scope.canCreateAssignment = true;
    }

    function cancelAssignment() {
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

    function editarTarefa(tarefa) {
        $scope.id = tarefa.id
        $scope.description = tarefa.nome
        $scope.assigned = tarefa.assigned
        $scope.opinion = tarefa.opinion
        $scope.canCreateUser = false;
        $scope.canCreateAssignment = true;

    }

    function daoUserfaGetAll() {
        $http.get("http://localhost:5001/user/tudo").then(function (response) {
                $scope.users = response.data.content
        });
    }

    function sair(){
        window.location.href = "/";
    }

});
angular.module('workcalendar', []);
angular.module('workcalendar').controller('workcalendarControllers', function ($scope, $http) {

    $scope.start;
    $scope.end;
    $scope.login;

    $scope.clickPrint = function () {

        location.href = '/printworkcalendar/' + $scope.login + '&&' + $scope.start + '&&' + $scope.end;
    };

    startPageStaff();
    function startPageStaff() {
        $http.get('/startpagestaff').success(function (data) {
            $scope.login = data.id;
        });
    }

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});


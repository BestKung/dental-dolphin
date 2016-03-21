angular.module('notifications', []);
angular.module('notifications').controller('notificationsController', function ($scope, $http) {

    $scope.appointNontification = {};
    $scope.currentPageAppointmentNontification = 0;
    $scope.totalNontificationAppointment = 0;
    $scope.totalNontificationAppointmentNotContact = 0;
    $scope.outProducts = {};
    var pageAppointNontification = 0;
    var totalPageAppointNontification = 0;


    getAppointNontification();
    function getAppointNontification() {
        $http.get('/appointnontification', {params: {page: pageAppointNontification, size: 10}}).success(function (data) {
            $scope.appointNontification = data;
        });
    }

    getAppointment();
    function getAppointment() {
        $http.get('/appointmentnontificationcountnotcontact').success(function (data) {
            $scope.totalNontificationAppointmentNotContact = data;
        });
    }
    
    getNontificationCountAll();
    function getNontificationCountAll(){
        $http.get('/appointmentnontificationcountall').success(function (data){
            $scope.totalNontificationAppointment = data;
            findTotalPageAppointment();
        });
    }
    
    

    $scope.clickContact = function (app) {
        var appointment = {};
        appointment = {appointDay: new Date(app.appointDay)};
        appointment = app;
        appointment.status = app.status = '0';
        appointment.endTime = new Date(moment(new Date(app.appointDay + " " + app.endTime)).format('YYYY-MM-d HH:mm:ss'));
        appointment.startTime = new Date(moment(new Date(app.appointDay + " " + app.startTime)).format('YYYY-MM-d HH:mm:ss'));
        $http.post('/saveappointment', appointment).success(function (data) {
            getAppointNontification();
            getAppointment();
        });
    };

    $scope.clickNotContact = function (app) {
        var appointment = {};
        appointment = {appointDay: new Date(app.appointDay)};
        appointment = app;
        appointment.status = app.status = '1';
        appointment.endTime = new Date(moment(new Date(app.appointDay + " " + app.endTime)).format('YYYY-MM-d HH:mm:ss'));
        appointment.startTime = new Date(moment(new Date(app.appointDay + " " + app.startTime)).format('YYYY-MM-d HH:mm:ss'));
        $http.post('/saveappointment', appointment).success(function (data) {
            getAppointNontification();
            getAppointment();
        });
    };

    function findTotalPageAppointment() {
        var totalpages = parseInt($scope.totalNontificationAppointment / 10);
        if (($scope.totalNontificationAppointment % 10) != 0) {
            totalpages++;
        }
        totalPageAppointNontification = totalpages;
        if (totalpages <= 1) {
            $('#first-page-appointnntification').addClass('disabled');
            $('#pre-page-appointnntification').addClass('disabled');
            $('#next-page-appointnntification').addClass('disabled');
            $('#final-page-appointnntification').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page-appointnntification').addClass('disabled');
            $('#pre-page-appointnntification').addClass('disabled');
        }
 };

    $scope.firstPageAppointmentNontification = function () {
        if (!$('#first-page-appointnntification').hasClass('disabled')) {
            pageAppointNontification = 0;
            $scope.currentPageAppointmentNontification = pageAppointNontification;
            getAppointNontification();
            if (pageAppointNontification == 0) {
                $('#first-page-appointnntification').addClass('disabled');
                $('#pre-page-appointnntification').addClass('disabled');
            }
            $('#next-page-appointnntification').removeClass('disabled');
            $('#final-page-appointnntification').removeClass('disabled');
        }
    };

    $scope.prePageAppointmentNontification = function () {
        if (!$('#first-page-appointnntification').hasClass('disabled')) {
            pageAppointNontification--;
            $scope.currentPageAppointmentNontification = pageAppointNontification;
            getAppointNontification();
            if (pageAppointNontification == 0) {
                $('#first-page-appointnntification').addClass('disabled');
                $('#pre-page-appointnntification').addClass('disabled');
            }
            $('#next-page-appointnntification').removeClass('disabled');
            $('#final-page-appointnntification').removeClass('disabled');
        }
    };

    $scope.nextPageAppointmentNontification = function () {
        if (!$('#final-page-appointnntification').hasClass('disabled')) {
            pageAppointNontification++;
            $scope.currentPageAppointmentNontification = pageAppointNontification;
            getAppointNontification();
            if (pageAppointNontification == totalPageAppointNontification - 1) {
                $('#next-page-appointnntification').addClass('disabled');
                $('#final-page-appointnntification').addClass('disabled');
            }
            $('#pre-page-appointnntification').removeClass('disabled');
            $('#first-page-appointnntification').removeClass('disabled');
        }
    };

    $scope.finalPageAppointmentNontification = function () {
        if (!$('#final-page-appointnntification').hasClass('disabled')) {
            pageAppointNontification = totalPageAppointNontification - 1;
            $scope.currentPageAppointmentNontification = pageAppointNontification;
            getAppointNontification();
            if (pageAppointNontification == totalPageAppointNontification - 1) {
                $('#final-page-appointnntification').addClass('disabled');
                $('#next-page-appointnntification').addClass('disabled');
            }
            $('#pre-page-appointnntification').removeClass('disabled');
            $('#first-page-appointnntification').removeClass('disabled');
        }
    };

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
    getOutProduct();    
    function getOutProduct(){
            $http.get('/getoutproduct').success(function (data){
                $scope.outProducts = data;
            });
        }
        
        $scope.clickAcknowledge = function (out) {
        var outProduct = {};
        outProduct = {lot:new Date(out.lot.dateIn)}
        outProduct = out;
//        outProduct.statusNontificationValue = out.statusNontificationValue = '0';
        appointment.endTime = new Date(moment(new Date(app.appointDay + " " + app.endTime)).format('YYYY-MM-d HH:mm:ss'));
        appointment.startTime = new Date(moment(new Date(app.appointDay + " " + app.startTime)).format('YYYY-MM-d HH:mm:ss'));
        $http.post('/saveappointment', appointment).success(function (data) {
            getAppointNontification();
            getAppointment();
        });
    };

    $scope.clickNotAcknowledge = function (app) {
        var appointment = {};
        appointment = {appointDay: new Date(app.appointDay)};
        appointment = app;
        appointment.status = app.status = '1';
        appointment.endTime = new Date(moment(new Date(app.appointDay + " " + app.endTime)).format('YYYY-MM-d HH:mm:ss'));
        appointment.startTime = new Date(moment(new Date(app.appointDay + " " + app.startTime)).format('YYYY-MM-d HH:mm:ss'));
        $http.post('/saveappointment', appointment).success(function (data) {
            getAppointNontification();
            getAppointment();
        });
    };

});



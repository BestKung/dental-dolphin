angular.module('reportappointment', []);
angular.module('reportappointment').controller('reportcAppointmentController', function ($scope, $http) {

    $scope.appointments = {};
    $scope.appointmentDetail = {};
    $scope.searchDataAppointment = {};
    $scope.currentPage = 0;
    $scope.preScroll = 0;
    $scope.sizeAppointment = 10;
    var totalPage = 0;
    var totalAppointment = 0;
    var totalPageAppointment = 0;
    var pageAppointment = 0;


    getAppointment();
    function getAppointment() {
        $http.get('/getappointment', {params: {page: pageAppointment, size: $scope.sizeAppointment}}).success(function (data) {
            $scope.appointments = data;
        });
    }
    $scope.getAppointment = function () {
        pageAppointment = 0;
        getAppointment();
        $scope.currentPage = pageAppointment;
        countAppointment();
        findTotalPageAppointment();
    };
    $scope.searchAppointment = function () {
        searchAppointment();
        countSearchAppointment();
    };
    function searchAppointment() {
        $http.post('/searchappointment', $scope.searchDataAppointment, {params: {page: pageAppointment, size: $scope.sizeAppointment}}).success(function (data) {
            if (data.content.length == 0 || $scope.searchDataAppointment.keyword == "") {
                $('#modal-notfont').openModal();
                getAppointment();
            } else {
                $scope.appointments = data;
            }
        });
    }
    countAppointment();
    function countAppointment() {
        $http.get('/countappointment').success(function (data) {
            totalAppointment = data;
            findTotalPageAppointment();
        });
    }

    function countSearchAppointment() {
        $http.post('/countsearchappointment', $scope.searchDataAppointment).success(function (data) {
            totalAppointment = data;
            findTotalPageAppointment();
        });
    }

    function findTotalPageAppointment() {
        totalPageAppointment = parseInt(totalAppointment / $scope.sizeAppointment);
        if ((totalAppointment % $scope.sizeAppointment) != 0) {
            totalPageAppointment++;
        }
        if (totalPageAppointment == 1 || totalPageAppointment == 0) {
            $('#first-page-appointment').addClass('disabled');
            $('#pre-page-appointment').addClass('disabled');
            $('#next-page-appointment').addClass('disabled');
            $('#final-page-appointment').addClass('disabled');
        }
        if (totalPageAppointment > 1) {
            $('#first-page-appointment').addClass('disabled');
            $('#pre-page-appointment').addClass('disabled');
            $('#next-page-appointment').removeClass('disabled');
            $('#final-page-appointment').removeClass('disabled');
        }

    }

    $scope.selectGetOrSearchAppointment = function () {
        pageAppointment = 0;
        $scope.currentPage = pageAppointment;
        if (!!$scope.searchDataAppointment.keyword) {
            searchAppointment();
            countSearchAppointment();
        } else {
            getAppointment();
            countAppointment();
        }
    };
    function selectGetOrSearchAppointment() {
        if (!!$scope.searchDataAppointment.keyword) {
            searchAppointment();
        } else {
            getAppointment();
        }
    }

    $scope.firstPageAppointment = function () {
        if (!$('#first-page-appointment').hasClass('disabled')) {
            pageAppointment = 0;
            $scope.currentPage = pageAppointment;
            selectGetOrSearchAppointment();
            if (pageAppointment == 0) {
                $('#first-page-appointment').addClass('disabled');
                $('#pre-page-appointment').addClass('disabled');
            }
            $('#next-page-appointment').removeClass('disabled');
            $('#final-page-appointment').removeClass('disabled');
        }
    };
    $scope.prePageAppointment = function () {
        if (!$('#first-page-appointment').hasClass('disabled')) {
            pageAppointment--;
            $scope.currentPage = pageAppointment;
            selectGetOrSearchAppointment();
            if (pageAppointment == 0) {
                $('#first-page-appointment').addClass('disabled');
                $('#pre-page-appointment').addClass('disabled');
            }
            $('#next-page-appointment').removeClass('disabled');
            $('#final-page-appointment').removeClass('disabled');
        }
    };
    $scope.nextPageAppointment = function () {
        if (!$('#final-page-appointment').hasClass('disabled')) {
            pageAppointment++;
            $scope.currentPage = pageAppointment;
            selectGetOrSearchAppointment();
            if (pageAppointment == totalPageAppointment - 1) {
                $('#next-page-appointment').addClass('disabled');
                $('#final-page-appointment').addClass('disabled');
            }
            $('#pre-page-appointment').removeClass('disabled');
            $('#first-page-appointment').removeClass('disabled');
        }
    };
    $scope.finalPageAppointment = function () {
        if (!$('#final-page-appointment').hasClass('disabled')) {
            pageAppointment = totalPageAppointment - 1;
            $scope.currentPage = pageAppointment;
            selectGetOrSearchAppointment();
            if (pageAppointment == totalPageAppointment - 1) {
                $('#final-page-appointment').addClass('disabled');
                $('#next-page-appointment').addClass('disabled');
            }
            $('#pre-page-appointment').removeClass('disabled');
            $('#first-page-appointment').removeClass('disabled');
        }
    };

    $scope.moreDetail = function (app) {
        $scope.preScroll = $(window).scrollTop();
        $('body,html').animate({scrollTop: 400}, "400");
        $scope.appointmentDetail = app;
        if (!!app.startTime) {
            $scope.appointmentDetail.startTime = moment(new Date(app.appointDay + " " + app.startTime)).format('hh:mm a');
        }
        if (!!app.endTime) {
            $scope.appointmentDetail.endTime = moment(new Date(app.appointDay + " " + app.endTime)).format('hh:mm a');
        }
        var topic = document.getElementsByClassName('topic-detail');
        for (var i = 0; i < topic.length; i++) {
            if (topic[i].innerHTML == "") {
                topic[i].innerHTML = '-';
            }
        }
    };
    $scope.cancel = function () {
        toPreScroll();
        $('span#close-card').trigger('click');
    };
    function toPreScroll() {
        $('body,html').animate({scrollTop: $scope.preScroll}, "0");
    }

    $scope.toPreScroll = function () {
        toPreScroll();
    };

    $scope.printAppointment = function (id) {
        location.href = '/informationappointment/' + id;
    };

    $scope.printAppointments = function () {
        location.href = '/appointments';
    };
});



angular.module('notifications', []);
angular.module('notifications').controller('notificationsController', function ($scope, $http) {

    $scope.appointNontification = {};
    $scope.currentPageAppointmentNontification = 0;
    $scope.totalNontificationAppointment = 0;
    $scope.totalNontificationAppointmentNotContact = 0;
    $scope.outProducts = {};
    $scope.totalNontificationAcKnowLedge = 0;
    $scope.currentPageValueNontification = 0;
    $scope.expire = {};
    $scope.totalNontificationOutExpire = 0;
    $scope.currentPageExpireNontification = 0;
    var pageAppointNontification = 0;
    var totalPageAppointNontification = 0;
    var pageValueNontification = 0;
    var totalPageValueNontification = 0;
    var pageExpireNontification = 0;
    var totalPageExpireNontification = 0;


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
    function getNontificationCountAll() {
        $http.get('/appointmentnontificationcountall').success(function (data) {
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
    }
    ;

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
    function getOutProduct() {
        $http.get('/getoutproduct', {params: {page: pageValueNontification, size: 10}}).success(function (data) {
            $scope.outProducts = data;
        });
    }
    getoutProductNotAcKnowledge();

    function getoutProductNotAcKnowledge() {
        $http.get("/getoutproductnonacknowledge").success(function (data) {
            $scope.totalNontificationAcKnowLedge = data;
            console.log(data);
        });
    }
    ;


    $scope.clickAcknowledge = function (out) {
        var outProduct = {};
        outProduct = out;
        outProduct.statusNontificationValue = '0';
        $http.post('/savepriceandexpireproduct', outProduct).success(function (data) {
            getOutProduct();
            getoutProductNotAcKnowledge();
        });
    };

    $scope.clickNotAcknowledge = function (app) {
        var outProduct = {};
        outProduct = app;
        outProduct.statusNontificationValue = '1';
        $http.post('/savepriceandexpireproduct', outProduct).success(function (data) {
            getOutProduct();
            getoutProductNotAcKnowledge();
        });
    };

    $scope.stopNontification = function (stop) {
        var outProduct = {};
        outProduct = stop;
        outProduct.stopNontificationValue = 'stop';
        $http.post('/savepriceandexpireproduct', outProduct).success(function (data) {
            getOutProduct();
            getoutProductNotAcKnowledge();
        });
    };

    findTotalPageValue();
    function findTotalPageValue() {
        var totalpages = parseInt($scope.totalNontificationAcKnowLedge / 10);
        if (($scope.totalNontificationAcKnowLedge % 10) != 0) {
            totalpages++;
        }
        console.log(totalpages + '-------------oooooooooooooooooooo');
        totalPageValueNontification = totalpages;
        if (totalpages <= 1) {
            $('#first-page-value').addClass('disabled');
            $('#pre-page-value').addClass('disabled');
            $('#next-page-value').addClass('disabled');
            $('#final-page-value').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page-value').addClass('disabled');
            $('#pre-page-value').addClass('disabled');
        }
    }
    ;

    $scope.firstPageValue = function () {
        if (!$('#first-page-value').hasClass('disabled')) {
            pageValueNontification = 0;
            $scope.currentPageValueNontification = pageValueNontification;
            getOutProduct()
            if (pageValueNontification == 0) {
                $('#first-page-value').addClass('disabled');
                $('#pre-page-value').addClass('disabled');
            }
            $('#next-page-value').removeClass('disabled');
            $('#final-page-value').removeClass('disabled');
        }
    };

    $scope.prePageValue = function () {
        if (!$('#first-page-value').hasClass('disabled')) {
            pageValueNontification--;
            $scope.currentPageValueNontification = pageValueNontification;
            getOutProduct();
            if (pageValueNontification == 0) {
                $('#first-page-value').addClass('disabled');
                $('#pre-page-value').addClass('disabled');
            }
            $('#next-page-value').removeClass('disabled');
            $('#final-page-value').removeClass('disabled');
        }
    };

    $scope.nextPageValue = function () {
        if (!$('#final-page-value').hasClass('disabled')) {
            pageValueNontification++;
            $scope.currentPageValueNontification = pageValueNontification;
            getOutProduct();
            if (pageValueNontification == totalPageValueNontification - 1) {
                $('#next-page-value').addClass('disabled');
                $('#final-page-value').addClass('disabled');
            }
            $('#pre-page-value').removeClass('disabled');
            $('#first-page-value').removeClass('disabled');
        }
    };

    $scope.finalPageValue = function () {
        if (!$('#final-page-value').hasClass('disabled')) {
            pageValueNontification = totalPageValueNontification - 1;
            $scope.currentPageValueNontification = pageValueNontification;
            getOutProduct();
            if (pageValueNontification == totalPageValueNontification - 1) {
                $('#final-page-value').addClass('disabled');
                $('#next-page-value').addClass('disabled');
            }
            $('#pre-page-value').removeClass('disabled');
            $('#first-page-value').removeClass('disabled');
        }
    };

    //----------------------------------------------------------------------------------------------------------------------
    //Expire
    getNontificationExpire();
    function getNontificationExpire() {
        $http.get('/getnontificationexpiredate').success(function (data) {
            console.log(data.content[0] + '-----------------00');
            $scope.expire = data;
        });
    }

    getNontificationExpireCount();
    function getNontificationExpireCount() {
        $http.get('/countnontificationexpiredate').success(function (data) {
            $scope.totalNontificationOutExpire = data;
        });
    }

    $scope.clickOutExpire = function (out) {
        var outProduct = {};
        outProduct = out;
        outProduct.statusNontificationExpire = '0';
        $http.post('/savepriceandexpireproduct', outProduct).success(function (data) {
            getNontificationExpire();
            getNontificationExpireCount();
        });
    };

    $scope.clickNotOutExpire = function (app) {
        var outProduct = {};
        outProduct = app;
        outProduct.statusNontificationExpire = '1';
        $http.post('/savepriceandexpireproduct', outProduct).success(function (data) {
            getNontificationExpire();
            getNontificationExpireCount();
        });
    };

    $scope.stopNontificationExpire = function (stop) {
        var outProduct = {};
        outProduct = stop;
        outProduct.stopNontificationExpire = 'stop';
        $http.post('/savepriceandexpireproduct', outProduct).success(function (data) {
            getNontificationExpire();
            getNontificationExpireCount();
        });
    };



    findTotalPageExpire();
    function findTotalPageExpire() {
        var totalpages = parseInt($scope.totalNontificationOutExpire / 10);
        if (($scope.totalNontificationOutExpire % 10) != 0) {
            totalpages++;
        }
        totalPageExpireNontification = totalpages;
        if (totalpages <= 1) {
            $('#first-page-expire').addClass('disabled');
            $('#pre-page-expire').addClass('disabled');
            $('#next-page-expire').addClass('disabled');
            $('#final-page-expire').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page-expire').addClass('disabled');
            $('#pre-page-expire').addClass('disabled');
        }
    }
    ;

    $scope.firstPageExpire = function () {
        if (!$('#first-page-expire').hasClass('disabled')) {
            pageExpireNontification = 0;
            $scope.currentPageExpireNontification = pageExpireNontification;
             getNontificationExpire();
            if (pageExpireNontification == 0) {
                $('#first-page-expire').addClass('disabled');
                $('#pre-page-expire').addClass('disabled');
            }
            $('#next-page-expire').removeClass('disabled');
            $('#final-page-expire').removeClass('disabled');
        }
    };

    $scope.prePageExpire = function () {
        if (!$('#first-page-expire').hasClass('disabled')) {
            pageExpireNontification--;
            $scope.currentPageExpireNontification = pageExpireNontification;
            getNontificationExpire()
            if (pageExpireNontification == 0) {
                $('#first-page-expire').addClass('disabled');
                $('#pre-page-expire').addClass('disabled');
            }
            $('#next-page-expire').removeClass('disabled');
            $('#final-page-expire').removeClass('disabled');
        }
    };

    $scope.nextPageExpire = function () {
        if (!$('#final-page-expire').hasClass('disabled')) {
            pageExpireNontification++;
            $scope.currentPageExpireNontification = pageExpireNontification;
            getNontificationExpire();
            if (pageExpireNontification == totalPageExpireNontification - 1) {
                $('#next-page-expire').addClass('disabled');
                $('#final-page-expire').addClass('disabled');
            }
            $('#pre-page-expire').removeClass('disabled');
            $('#first-page-expire').removeClass('disabled');
        }
    };

    $scope.finalPageExpire = function () {
        if (!$('#final-page-expire').hasClass('disabled')) {
            pageExpireNontification = totalPageExpireNontification - 1;
            $scope.currentPageExpireNontification = pageExpireNontification;
            getNontificationExpire();
            if (pageExpireNontification == totalPageExpireNontification - 1) {
                $('#final-page-expire').addClass('disabled');
                $('#next-page-expire').addClass('disabled');
            }
            $('#pre-page-expire').removeClass('disabled');
            $('#first-page-expire').removeClass('disabled');
        }
    };




});



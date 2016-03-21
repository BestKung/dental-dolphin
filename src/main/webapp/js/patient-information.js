angular.module('patient-information', []);
angular.module('patient-information').controller('patientInformationController', function (patientService, $scope, $http) {
    $scope.patients = {};
    $scope.patientDetail = {};
    $scope.search = {};
    $scope.patientDetail.patientPictureXray = {};
    $scope.patientDetail.patientPictureBefore = {};
    $scope.patientDetail.patientPictureCurrent = {};
    $scope.patientDetail.patientPictureAfter = {};
    $scope.totalPatient = 0;
    $scope.size = 10;
    $scope.currentPage = 0;
    var totalPage;
    var page = 0;

    checkMobile();
    function checkMobile() {
        var $mobile = $(window).outerWidth() < 995;
        if ($mobile) {
            $('th').removeAttr('style');
            $('.topic-detail').css('fontSize', 13);
        }
    }

    getPatient();
    function getPatient() {
        $http.get('/getpatient', {params: {size: $scope.size, page: page}}).success(function (data) {
            $scope.patients = data;
        });
    }

    $scope.clickDelete = function (patient) {
        $scope.patientDetail = patient;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deletePatient = function () {
        $http.post('/deletepatient', $scope.patientDetail).success(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('ลบข้อมูลเรียบร้อย', 3000, 'rounded');
            getPatient();
            $scope.cancel();
        }).error(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
        });
    };

    $scope.updatePatient = function (patient) {
        patientService.patienUpdate = patient;
        location.href = "#/patient";
    };

    $scope.searchPatient = function () {
        searchPatient();
    };

    function searchPatient() {
        $http.post('/searchpatient', $scope.search).success(function (data) {
            console.log(data+"-------------->");
            if (data.content.length == 0 || $scope.search.keyword == "") {
                $('#modal-notfont').openModal();
                console.log(data);
                getPatient();
            } else {
                $scope.patients = data;
                countSearchPatient();
            }
        });
    }

    countPatient();
    function countPatient() {
        $http.get('/countpatient').success(function (data) {
            $scope.totalPatient = data;
            findTotalPage();
        });
    }

    function selectGetOrSearch() {
        if (!!$scope.search.keyword) {
            searchPatient();
        } else {
            getPatient();
        }
    }


    $scope.selectGetOrSearch = function () {
        page = 0;
        $scope.currentPage = page;
        selectGetOrSearch();
        findTotalPage();
        console.log('total : ' + totalPage);
        if (totalPage != 1) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    function countSearchPatient() {
        $http.post('/countsearchpatient', $scope.search).success(function (data) {
            $scope.totalPatient = data;
            findTotalPage();
        });
    }

    function findTotalPage() {
        var totalpages = parseInt($scope.totalPatient / $scope.size);
        if (($scope.totalPatient % $scope.size) != 0) {
            totalpages++;
        }
        totalPage = totalpages;
        console.log(totalPage);
        if (totalpages == 1) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
        }
    }

    $scope.firstPage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            page = 0;
            $scope.currentPage = page;
            selectGetOrSearch();
            if (page == 0) {
                $('#first-page').addClass('disabled');
                $('#pre-page').addClass('disabled');
            }
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    $scope.prePage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            page--;
            $scope.currentPage = page;
            selectGetOrSearch();
            if (page == 0) {
                $('#first-page').addClass('disabled');
                $('#pre-page').addClass('disabled');
            }
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    $scope.nextPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            page++;
            $scope.currentPage = page;
            selectGetOrSearch();
            if (page == totalPage - 1) {
                $('#next-page').addClass('disabled');
                $('#final-page').addClass('disabled');
            }
            $('#pre-page').removeClass('disabled');
            $('#first-page').removeClass('disabled');
        }
    };

    $scope.finalPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            page = totalPage - 1;
            $scope.currentPage = page;
            selectGetOrSearch();
            if (page == totalPage - 1) {
                $('#final-page').addClass('disabled');
                $('#next-page').addClass('disabled');
            }
            $('#pre-page').removeClass('disabled');
            $('#first-page').removeClass('disabled');
        }
    };


    $scope.clickMoreDetail = function (more) {
        $scope.preScroll = $(window).scrollTop();
        $('body,html').animate({scrollTop: 400}, "400");
        $scope.patientDetail = more;
        $scope.patientDetail.age = new Date().getFullYear() - new Date(more.birthDate).getFullYear();
        var topic = document.getElementsByClassName('topic-detail');
        for (var i = 0; i < topic.length; i++) {
            if (topic[i].innerHTML == "") {
                topic[i].innerHTML = "-";
            }
        }
        if (!!$scope.patientDetail.patientPictureXray) {
            document.getElementById('img-patientxray').src = "data:image/jpg;base64," + $scope.patientDetail.patientPictureXray.contentXrayFilm;
        } else {
            NoImageXray();
        }
        if (!!$scope.patientDetail.patientPictureBefore) {
            document.getElementById('img-patientbefore').src = "data:image/jpg;base64," + $scope.patientDetail.patientPictureBefore.contentBefore;
        } else {
            NoImageBefore();
        }
        if (!!$scope.patientDetail.patientPictureCurrent) {
            document.getElementById('img-patientcurrent').src = "data:image/jpg;base64," + $scope.patientDetail.patientPictureCurrent.contentCurrent;
        } else {
            NoImageCurrent();
        }
        if (!!$scope.patientDetail.patientPictureAfter) {
            document.getElementById('img-patientafter').src = "data:image/jpg;base64," + $scope.patientDetail.patientPictureAfter.contentAfter;
        } else {
            NoImageAfter();
        }

    };


    function NoImageXray() {
        $http.get('/getnoimage').success(function (data) {
            document.getElementById('img-patientxray').src = "data:image/jpg;base64," + data.contentImage;
        });
    }
    ;

    function NoImageBefore() {
        $http.get('/getnoimage').success(function (data) {
            document.getElementById('img-patientbefore').src = "data:image/jpg;base64," + data.contentImage;
        });
    }
    ;

    function NoImageCurrent() {
        $http.get('/getnoimage').success(function (data) {
            document.getElementById('img-patientcurrent').src = "data:image/jpg;base64," + data.contentImage;
        });
    }
    ;

    function NoImageAfter() {
        $http.get('/getnoimage').success(function (data) {
            document.getElementById('img-patientafter').src = "data:image/jpg;base64," + data.contentImage;
        });
    }
    ;

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

});
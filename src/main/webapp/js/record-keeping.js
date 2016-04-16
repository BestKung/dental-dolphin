angular.module('record-keeping', []);
angular.module('record-keeping').controller('recordController', function ($scope, $http) {

    $scope.detailHeal = {};
    $scope.typeOfMedicals = {};
    $scope.searchDataTypeOfMedical = {};
    $scope.orderHeals = {};
    var pageTypeOfMedical = 0;
    var totalTypeOfMedical = 0;
    var totalPageTypeOfMedical = 0;
    var totalOrderHeal = 0;
    var user = "";
    var typeOfMedicalForSave = {};
    var historyOfMedicalAndTypeOfMedical = {};
    var dataUpdate = [];
    var totalDetailHeal = 0;
    $scope.login = {};
    $scope.room = {};
    $scope.patientHeal = {};
    $scope.detailHeals = {};
    var totalDetailHeal = 0;
    var totalPageDetailHeal = 0;
    var pageDetailHeal = 0;
    $scope.currentPage = 0;
    $scope.seeDetailHeal = {};

    function getTypeOfMedical() {
        $http.get('/loadlistselectheal', {params: {page: pageTypeOfMedical, size: 10}}).success(function (data) {
            $scope.typeOfMedicals = data;
        });
    }
    ;
    function getOrderHeals() {
        $http.post('/gettypeofmedical', user).success(function (data) {
            $scope.orderHeals = data;
            totalOrderHeal = data.totalElements;
        });
    }

    function countTypeOfMedical() {
        $http.get('/totallistselectheal').success(function (data) {
            totalTypeOfMedical = data;
            findTotalPageTypeOfMedical();
        });
    }
    ;
    $scope.searchTypeOfMedical = function () {
        pageTypeOfMedical = 0;
        $scope.currentPageTypeOfMedical = pageTypeOfMedical;
        searchTypeOfMedical();
        countSearchTypoOfMedical();
    };
    function searchTypeOfMedical() {
        $scope.searchDataTypeOfMedical.searchBy = "Name";
        $http.post('/loadlistselectheal/searchlistselectheal', $scope.searchDataTypeOfMedical, {params: {page: pageTypeOfMedical, size: 10}}).success(function (data) {
            $scope.typeOfMedicals = data;
        });
    }
    function countSearchTypoOfMedical() {
        $http.post('/countsearchlistselectheal', $scope.searchDataTypeOfMedical).success(function (data) {
            totalTypeOfMedical = data;
            findTotalPageTypeOfMedical();
        });
    }

    function findTotalPageTypeOfMedical() {
        var totalpages = parseInt(totalTypeOfMedical / 10);
        if ((totalTypeOfMedical % 10) != 0) {
            totalpages++;
        }
        totalPageTypeOfMedical = totalpages;
        if (totalpages == 1) {
            $('#first-page-typeofmedical').addClass('disabled');
            $('#pre-page-typeofmedical').addClass('disabled');
            $('#next-page-typeofmedical').addClass('disabled');
            $('#final-page-typeofmedical').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page-typeofmedical').addClass('disabled');
            $('#pre-page-typeofmedical').addClass('disabled');
            $('#next-page-typeofmedical').removeClass('disabled');
            $('#final-page-typeofmedical').removeClass('disabled');
        }
    }

    $scope.selectTypeOfMedical = function (type, value) {
//        console.log($scope.orderHeals);
        getOrderHeals();
        var valueIsNan = false;
        if (value === undefined) {
            value = 0;
        }
        if (parseInt(value) == NaN) {
            valueIsNan = true;
        }
        if (!valueIsNan) {
            typeOfMedicalForSave.id = undefined;
            typeOfMedicalForSave.userName = user.nameTh;
            typeOfMedicalForSave.value = value;
            typeOfMedicalForSave.listSelectHeal = type;
            if (!!$scope.orderHeals.content[0]) {
                for (var i = 0; i < totalOrderHeal; i++) {
                    if (type.id === $scope.orderHeals.content[i].listSelectHeal.id) {
                        typeOfMedicalForSave = $scope.orderHeals.content[i];
                        typeOfMedicalForSave.value = parseInt($scope.orderHeals.content[i].value) + parseInt(value);
                        typeOfMedicalForSave.userName = user.nameTh;
                    }
                }
            }
            if (typeOfMedicalForSave.value >= 0) {
                $http.post('/savetypeofmedical', typeOfMedicalForSave).success(function (data) {
                    getOrderHeals();
                });
            }
        }
        $('#modal-addtypeofmedical').closeModal();
    };
    $scope.deleteTypeOfMedical = function (typ) {
        $http.post('/deletetypeofmedical', typ).success(function (data) {
            getOrderHeals();
        });
    };
    $scope.clickAddTypeOfMedical = function () {
        $('#modal-addtypeofmedical').openModal();
        getTypeOfMedical();
        countTypeOfMedical();
    };
    getUser();
    function getUser() {
        $http.get('/startpagestaff').success(function (data) {
            user = data;
            getOrderHeals();
        });
    }

    $scope.seveOrderHeal = function () {
        var typeMedical = [];
        $scope.detailHeal.doctor = $scope.room.doctor;
        historyOfMedicalAndTypeOfMedical.detailHeal = $scope.detailHeal;
        for (var i = 0; i < totalOrderHeal; i++) {
            typeMedical[i] = $scope.orderHeals.content[i];
        }
        historyOfMedicalAndTypeOfMedical.typeOfMedicals = typeMedical;
        $http.post('/saverecordkeeping', historyOfMedicalAndTypeOfMedical).success(function (data) {
            console.log(data);
            if (data == 200) {
                countDetailHeal();
                if (!!dataUpdate.orderHealDetailHeals) {
                    if (dataUpdate.orderHealDetailHeals.length !== 0) {
                        for (var i = 0; i < dataUpdate.orderHealDetailHeals.length; i++) {
                            $http.post('/deleteorderheal', dataUpdate.orderHealDetailHeals[i]);
                        }
                        ;
                    }
                }
                getUser();
                for (var i = 0; i < totalOrderHeal; i++) {
                    typeMedical[i] = $scope.orderHeals.content[i];
                    $http.post('/deletetypeofmedical', typeMedical[i]);
                }
                $scope.detailHeal = {};
                $scope.orderHeals = {};
                totalOrderHeal = 0;
                $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
                $http.post('/deletequeue', $scope.patientHeal).success(function (data) {
                    $scope.patientHeal = {};
                    $scope.detailHeals = {};
                });
            }
        }).error(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
            $scope.error = data;
        });
    };
    $scope.saveDetailheal = function () {
        $http.post('/savedetailheal', $scope.detailHeal).success(function (data) {
        });
    };
    function countDetailHeal() {
        $http.get('/countdetailheal').success(function (data) {
            totalDetailHeal = data;
        });
    }

    setInterval(function () {
        startPageStaff();
        findByHealStatus();
    }, 3000);
    function startPageStaff() {
        $http.get('/startpagestaff').success(function (data) {
            $scope.login = data;
            searchRoomByDoctor();
            if (!!$scope.detailHeals) {
                searchHistoryOfMedical();
            }

        });
    }

    $scope.openRoom = function () {
        $scope.room.roomStatus = 'เปิด';
        $http.post('/updateroom', $scope.room).success(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('เปิดห้องเเล้ว', 3000, 'rounded');
            startPageStaff();
        });
    };
    $scope.closeRoom = function () {
        $scope.room.roomStatus = 'ปิด';
        $scope.room.doctorStatus = 'ไม่ว่าง';
        $http.post('/updateroom', $scope.room).success(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('ปิดห้องเเล้ว', 3000, 'rounded');
            startPageStaff();
        });
    };
    function searchRoomByDoctor() {
        $http.post('/searchroombydoctor', $scope.login).success(function (data) {
            console.log(data);
            $scope.room = data;
        });
    }

    $scope.waiting = function () {
        $scope.room.doctorStatus = 'ว่าง';
        $http.post('/updateroom', $scope.room).success(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('ว่าง', 3000, 'rounded');
        });
    };
    $scope.busy = function () {
        $scope.room.doctorStatus = 'ไม่ว่าง';
        $http.post('/updateroom', $scope.room).success(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('ไม่ว่าง', 3000, 'rounded');
        });
    };
    function findByHealStatus() {
        $http.post('/findbyhealstatus', $scope.room.doctor).success(function (data) {
            $scope.patientHeal = data;
            if (!!data) {
                $scope.detailHeal.patient = data.patient;
            }
        });
    }


    function searchHistoryOfMedical() {
        $http.post('/findbyhealstatus', $scope.login).success(function (data) {
            $scope.patientHeal = data;
            if (!!data) {
                $http.post('finddetailhealbypatient', $scope.patientHeal.patient, {params: {page: pageDetailHeal, size: 10}}).success(function (datafind) {
                    $scope.detailHeals = datafind;
                    totalDetailHeal = datafind.totalElements;
                    console.log(totalDetailHeal);
                    findTotalPageDetailHeal();
                });
            }
        });
    }
    ;

    function findTotalPageDetailHeal() {
        var totalpages = parseInt(totalDetailHeal / 10);
        if ((totalDetailHeal % 10) != 0) {
            totalpages++;
        }
        totalPageDetailHeal = totalpages;
        if (totalpages == 1) {
            $('#first-page-detailheal').addClass('disabled');
            $('#pre-page-detailheal').addClass('disabled');
            $('#next-page-detailheal').addClass('disabled');
            $('#final-page-detailheal').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page-detailheal').addClass('disabled');
            $('#pre-page-detailheal').addClass('disabled');
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }
        if (pageDetailHeal > 0 && pageDetailHeal < totalPageDetailHeal - 1) {
            $('#first-page-detailheal').removeClass('disabled');
            $('#pre-page-detailheal').removeClass('disabled');
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }
        if (pageDetailHeal > 0 && pageDetailHeal == totalPageDetailHeal - 1) {
            $('#first-page-detailheal').removeClass('disabled');
            $('#pre-page-detailheal').removeClass('disabled');
            $('#next-page-detailheal').addClass('disabled');
            $('#final-page-detailheal').addClass('disabled');
        }
    }

    $scope.firstPageDetailHeal = function () {
        if (!$('#first-page-detailheal').hasClass('disabled')) {
            pageDetailHeal = 0;
            $scope.currentPage = pageDetailHeal;
            searchHistoryOfMedical();
            $('#first-page-detailheal').addClass('disabled');
            $('#pre-page-detailheal').addClass('disabled');
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }

    };
    $scope.prePageDetailHeal = function () {
        if (!$('#first-page-detailheal').hasClass('disabled')) {
            pageDetailHeal--;
            $scope.currentPage = pageDetailHeal;
            searchHistoryOfMedical();
            if (pageDetailHeal == 0) {
                $('#first-page-detailheal').addClass('disabled');
                $('#pre-page-detailheal').addClass('disabled');
            }
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }

    };
    $scope.nextPageDetailHeal = function () {
        if (!$('#final-page-detailheal').hasClass('disabled')) {
            pageDetailHeal++;
            $scope.currentPage = pageDetailHeal;
            searchHistoryOfMedical();
            if (pageDetailHeal == totalPageDetailHeal - 1) {
                $('#next-page-detailheal').addClass('disabled');
                $('#final-page-detailheal').addClass('disabled');
            }
            $('#first-page-detailheal').removeClass('disabled');
            $('#pre-page-detailheal').removeClass('disabled');
        }

    };
    $scope.finalPageDetailHeal = function () {
        if (!$('#final-page-detailheal').hasClass('disabled')) {
            pageDetailHeal = totalPageDetailHeal - 1;
            $scope.currentPage = pageDetailHeal;
            searchHistoryOfMedical();
            $('#next-page-detailheal').addClass('disabled');
            $('#final-page-detailheal').addClass('disabled');
            $('#first-page-detailheal').removeClass('disabled');
            $('#pre-page-detailheal').removeClass('disabled');
        }

    };

    $scope.clickSeeDatailHeal = function (detailHeal) {
        $scope.seeDetailHeal = detailHeal;
    };

    $scope.cancel = function () {
        $('span#close-card').trigger('click');
    };

});

    
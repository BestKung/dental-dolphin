angular.module('detailHeal', []);
angular.module('detailHeal').controller('detailHealController', function ($scope, $http) {

    $scope.detailHeal = {};
    $scope.searchDataPatient = {};
    $scope.searchDataDoctor = {};
    $scope.searchDataTypeOfMedical = {};
    $scope.searchDataHistoryOfMedical = {};
    $scope.patient = {};
    $scope.patients = {};
    $scope.doctor = {};
    $scope.doctors = {};
    $scope.typeOfMedical = {};
    $scope.typeOfMedicals = {};
    $scope.currentPage = 0;
    $scope.currentPagePatient = 0;
    $scope.currentPageDoctor = 0;
    $scope.currentPageTypeOfMedical = 0;
    $scope.orderHeals = {};
    $scope.detailHeals = {};
    $scope.seeDetailHeal = {};
    $scope.size = 10;
    $scope.preScroll = 0;
    $scope.error = {detailheal: "", patient: ""};
    var user = "";
    var historyOfMedicalAndTypeOfMedical = {};
    var typeOfMedicalForSave = {};
    var totalPagePatient = 0;
    var totalPatient = 0;
    var pagePatient = 0;
    var totalDoctor = 0;
    var totalPageDoctor = 0;
    var pageDoctor = 0;
    var totalTypeOfMedical = 0;
    var totalPageTypeOfMedical = 0;
    var pageTypeOfMedical = 0;
    var totalOrderHeal = 0;
    var totalDetailHeal = 0;
    var totalPageDetailHeal = 0;
    var pageDetailHeal = 0;
    var dataUpdate = [];
    $scope.saveDetailheal = function () {
        $http.post('/savedetailheal', $scope.detailHeal).success(function (data) {
        });
    };
    function deleteOrderHeal(or) {
        for (var i = 0; i < or.orderHealDetailHeals.length; i++) {
            $http.post('/deleteorderheal', or.orderHealDetailHeals[i]);
        }
        ;
        getUser();
    }

    checkDate();
    function checkDate() {
        if ($scope.detailHeal.dateHeal == undefined) {
            $scope.detailHeal.dateHeal = new Date();
            $('#label-dateheal').addClass('active');
        }
    }

    function countTypeOfMedical() {
        getUser();
        $http.post('/counttypeofmedical', user).success(function (data) {
        });
    }

    $scope.deleteOrderHeal = function (or) {
        for (var i = 0; i < or.orderHealDetailHeals.length; i++) {
            $http.post('/deleteorderheal', or.orderHealDetailHeals[i]);
        }
        ;
        getUser();
    };
    $scope.seveOrderHeal = function () {
//       if($scope.detailHeal.dateHeal == "" || detailHeal.dateHeal == undefined){
//           alert('date');
//       }
//        else if (){
//            
//        }
//        else{
        var typeMedical = [];
        historyOfMedicalAndTypeOfMedical.detailHeal = $scope.detailHeal;
        for (var i = 0; i < totalOrderHeal; i++) {
            typeMedical[i] = $scope.orderHeals.content[i];
        }
        historyOfMedicalAndTypeOfMedical.typeOfMedicals = typeMedical;
        $http.post('/saveorderheal', historyOfMedicalAndTypeOfMedical).success(function (data) {
            console.log(data);
            if (data == 1 || data == 3) {
                $scope.error.dateHeal = 'กรุณากรอกวันที่';
            }
            if (data > 1 || data == 3) {
                $scope.error.patient = 'กรุณาเลือกคนไข้';
            }
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
                $scope.patient = '';
                $scope.doctor = '';
                $scope.orderHeals = {};
                totalOrderHeal = 0;
                $('.update').removeClass('active');
                $('#preffix-id-detailheal , #prefix-dateheal-detailheal , #prefix-detailheal-patient , #prefix-detailheal-doctor , #prefix-detailheal-detailheal').css('color', 'black');
                getDetailHeal();
                $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
            }
        }).error(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
            $scope.error = data;
        });
//        }
    };
    $scope.clearData = function () {
        clearData();
    };
    function clearData() {
        var typeMedical = [];
        $scope.detailHeal = {};
        $scope.patient = '';
        $scope.doctor = '';
        for (var i = 0; i < totalOrderHeal; i++) {
            typeMedical[i] = $scope.orderHeals.content[i];
            $http.post('/deletetypeofmedical', typeMedical[i]);
        }
        $scope.orderHeals = {};
        totalOrderHeal = 0;
        $('.update').removeClass('active');
        $('.clear-prefix').css('color', 'black');
    }

    $scope.clickSeeDatailHeal = function (dh) {
        $scope.preScroll = $(window).scrollTop();
        $('body,html').animate({scrollTop: 1000}, "400");
        $scope.seeDetailHeal = dh;
        $scope.seeDetailHeal.dateHeal = moment(dh.dateHeal).format('YYYY-MM-D');
        var topic = document.getElementsByClassName('topic-detail');
        for (var i = 0; i < topic.length; i++) {
            if (topic[i].innerHTML == "") {
                topic[i].innerHTML = '-';
            }
        }
    };
    getUser();
    function getUser() {
        $http.get('/startpagestaff').success(function (data) {
            user = data;
            getOrderHeals();
        });
    }

    checkTotalOrderHeal();
    function checkTotalOrderHeal() {
        $http.get('/startpagestaff').success(function (data) {
            $http.post('/gettypeofmedical', data).success(function (dataType) {
                var typeMedical = [];
                if (dataType.totalElements > 0) {
                    for (var i = 0; i < dataType.totalElements; i++) {
                        typeMedical[i] = dataType.content[i];
                        $http.post('/deletetypeofmedical', typeMedical[i]);
                    }
                }
            });
        });
    }

    function getOrderHeals() {
        $http.post('/gettypeofmedical', user).success(function (data) {
            $scope.orderHeals = data;
            totalOrderHeal = data.totalElements;
        });
    }

    function getTypeOfMedical() {
        $http.get('/loadlistselectheal', {params: {page: pageTypeOfMedical, size: 10}}).success(function (data) {
            $scope.typeOfMedicals = data;
        });
    }
    ;
    function getPatient() {
        $http.get('/getpatient', {params: {page: pagePatient, size: 10}}).success(function (data) {
            $scope.patients = data;
        });
        ;
    }

    function getDoctor() {
        $http.get('/getdoctor', {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
        });
    }

    getDetailHeal();
    function getDetailHeal() {
        $http.get('/loaddetailheal', {params: {page: pageDetailHeal, size: $scope.size}}).success(function (data) {
            $scope.detailHeals = data;
        });
    }

    function selectGetOrSearchPatient() {
        if (!!$scope.searchDataPatient.keyword) {
            searchPatient();
        } else {
            getPatient();
        }
    }

    function selectGetOrSearchDoctor() {
        if (!!$scope.searchDataDoctor.keyword) {
            searchDoctor();
        } else {
            getDoctor();
        }
    }

    function selectGetOrSearchTypeOfMedical() {
        if (!!$scope.searchDataTypeOfMedical.keyword) {
            searchTypeOfMedical();
        } else {
            getTypeOfMedical();
        }
    }

    $scope.selectGetOrSearchDetailHeal = function () {
        pageDetailHeal = 0;
        $scope.currentPage = pageDetailHeal;
        selectGetOrSearchDetailHeal();
        findTotalPageDetailHeal();
    };
    function selectGetOrSearchDetailHeal() {
        if (!!$scope.searchDataHistoryOfMedical.keyword) {
            $scope.searchHistoryOfMedical();
        } else {
            getDetailHeal();
        }
    }

    $scope.selectPatient = function (pat) {
        $scope.patient = pat;
        $scope.detailHeal.patient = pat;
        $('#modal-patient').closeModal();
        $('#prefix-detailheal-patient').css('color', '#00bcd4');
        $('#label-detailheal-patient').addClass('active');
        $scope.error.patient = '';
    };
    $scope.selectDoctor = function (doc) {
        $scope.doctor = doc;
        $scope.detailHeal.doctor = doc;
        $('#modal-doctor').closeModal();
        $('#prefix-detailheal-doctor').css('color', '#00bcd4');
        $('#label-detailheal-doctor').addClass('active');
    };
    $scope.selectTypeOfMedical = function (type, value) {
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
    $scope.deleteDetailHeal = function (del) {
        if (del.dateHeal == 'Invalid date') {
            del.dateHeal = new Date();
        }
        $http.post('/removeorderheal', del).success(function (data) {
            $http.post('/deletedetailheal', del).success(function (data) {
                getDetailHeal();
                $('span#close-card').trigger('click');
                $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                Materialize.toast('ลบข้อมูลเรียบร้อย', 3000, 'rounded');
            }).error(function (data) {
                $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
            });
        });
    };
    $scope.clickUpdateDetailHeal = function (detailheal) {
        $('.update').addClass('active');
        $('#preffix-id-detailheal , #prefix-dateheal-detailheal , #prefix-detailheal-patient , #prefix-detailheal-doctor , #prefix-detailheal-detailheal').css('color', '#00bcd4');
        $('body,html').animate({scrollTop: 0}, "600");
        $('span#close-card').trigger('click');
        var typeMedical = [];
        if (totalOrderHeal > 0) {
            for (var i = 0; i < totalOrderHeal; i++) {
                typeMedical[i] = $scope.orderHeals.content[i];
                $http.post('/deletetypeofmedical', typeMedical[i]);
            }
        }
        $('.update').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
        $('span#close-card').trigger('click');
        $scope.seeDetailHeal = detailheal;
        $scope.detailHeal = $scope.seeDetailHeal;
        $scope.detailHeal.dateHeal = new Date(moment(new Date($scope.seeDetailHeal.dateHeal)).format('YYYY-MM-D'));
        $scope.patient = $scope.seeDetailHeal.patient;
        $scope.doctor = $scope.seeDetailHeal.doctor;
        dataUpdate = $scope.seeDetailHeal;
        for (var i = 0; i < $scope.seeDetailHeal.orderHealDetailHeals.length; i++) {
            var saveListSelectHeal = {};
            saveListSelectHeal.id = undefined;
            saveListSelectHeal.listSelectHeal = $scope.seeDetailHeal.orderHealDetailHeals[i].listSelectHeal;
            saveListSelectHeal.value = $scope.seeDetailHeal.orderHealDetailHeals[i].value;
            saveListSelectHeal.userName = user.nameTh;
            $http.post('/savetypeofmedical', saveListSelectHeal).success(function (data) {
                getUser();
            });
        }
        ;
    };
    $scope.searchHistoryOfMedical = function () {
        $http.post('/loaddetailheal/searchdetailheal', $scope.searchDataHistoryOfMedical, {params: {page: pageDetailHeal, size: $scope.size}}).success(function (data) {
            if (data.content.length == 0 || $scope.searchDataHistoryOfMedical.keyword == "") {
                $('#modal-notfont').openModal();
                getDetailHeal();
            } else {
                $scope.detailHeals = data;
                countSearchDetailHeal();
            }

        });
    };
    $scope.searchPatient = function () {
        $http.post('/searchpatient', $scope.searchDataPatient).success(function (data) {
            if (data.content.length == 0 || $scope.searchDataPatient.keyword == "") {
                getPatient();
            } else {
                pagePatient = 0;
                $scope.currentPagePatient = pagePatient;
                if (totalPagePatient > pagePatient) {
                    $('#next-page-patient').removeClass('disabled');
                    $('#final-page-patient').removeClass('disabled');
                }
                $scope.patients = data;
                countSearchPatient();
            }
        });
    };
    function searchPatient() {
        $http.post('/searchpatient', $scope.searchDataPatient, {params: {page: pagePatient, size: 10}}).success(function (data) {
            $scope.patients = data;
        });
    }

    $scope.searchDoctor = function () {
        $http.post('/searchdoctor', $scope.searchDataDoctor).success(function (data) {
            if (data.content.length == 0 || $scope.searchDataDoctor.keyword == "") {
                getDoctor();
            } else {
                pageDoctor = 0;
                $scope.currentPageDoctor = pageDoctor;
                if (totalPageDoctor > pageDoctor) {
                    $('#next-page-doctor').removeClass('disabled');
                    $('#final-page-doctor').removeClass('disabled');
                }
                $scope.doctors = data;
                countSearchDctor();
            }
        });
    };
    function searchDoctor() {
        $http.post('/searchdoctor', $scope.searchDataDoctor, {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
        });
    }

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

    function countSearchDctor() {
        $http.post('/countsearchdoctor', $scope.searchDataDoctor).success(function (data) {
            totalDoctor = data;
            findTotalPageDoctor();
        });
    }

    function countSearchPatient() {
        $http.post('/countsearchpatient', $scope.searchDataPatient).success(function (data) {
            totalPatient = data;
            findTotalPagePatient();
        });
    }

    function countPatient() {
        $http.get('/countpatient').success(function (data) {
            totalPatient = data;
            findTotalPagePatient();
        });
    }

    function countDoctor() {
        $http.get('/countdoctor').success(function (data) {
            totalDoctor = data;
            findTotalPageDoctor();
        });
    }

    function countTypeOfMedical() {
        $http.get('/totallistselectheal').success(function (data) {
            totalTypeOfMedical = data;
            findTotalPageTypeOfMedical();
        });
    }

    function countSearchTypoOfMedical() {
        $http.post('/countsearchlistselectheal', $scope.searchDataTypeOfMedical).success(function (data) {
            totalTypeOfMedical = data;
            findTotalPageTypeOfMedical();
        });
    }

    countDetailHeal();
    function countDetailHeal() {
        $http.get('/countdetailheal').success(function (data) {
            totalDetailHeal = data;
            findTotalPageDetailHeal();
        });
    }

    function countSearchDetailHeal() {
        $http.post('/countsearchdetailheal', $scope.searchDataHistoryOfMedical).success(function (data) {
            totalDetailHeal = data;
            findTotalPageDetailHeal();
        });
    }

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
    function findTotalPagePatient() {
        var totalpages = parseInt(totalPatient / 10);
        if ((totalPatient % 10) != 0) {
            totalpages++;
        }
        totalPagePatient = totalpages;
        if (totalpages == 1) {
            $('#first-page-patient').addClass('disabled');
            $('#pre-page-patient').addClass('disabled');
            $('#next-page-patient').addClass('disabled');
            $('#final-page-patient').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page-patient').addClass('disabled');
            $('#pre-page-patient').addClass('disabled');
            $('#next-page-patient').removeClass('disabled');
            $('#final-page-patient').removeClass('disabled');
        }
    }


    $scope.firstPagePatient = function () {
        if (!$('#first-page-patient').hasClass('disabled')) {
            pagePatient = 0;
            $scope.currentPagePatient = pagePatient;
            selectGetOrSearchPatient();
            if (pagePatient == 0) {
                $('#first-page-patient').addClass('disabled');
                $('#pre-page-patient').addClass('disabled');
            }
            $('#next-page-patient').removeClass('disabled');
            $('#final-page-patient').removeClass('disabled');
        }
    };
    $scope.prePagePatient = function () {
        if (!$('#first-page-patient').hasClass('disabled')) {
            pagePatient--;
            $scope.currentPagePatient = pagePatient;
            selectGetOrSearchPatient();
            if (pagePatient == 0) {
                $('#first-page-patient').addClass('disabled');
                $('#pre-page-patient').addClass('disabled');
            }
            $('#next-page-patient').removeClass('disabled');
            $('#final-page-patient').removeClass('disabled');
        }
    };
    $scope.nextPagePatient = function () {
        if (!$('#final-page-patient').hasClass('disabled')) {
            pagePatient++;
            $scope.currentPagePatient = pagePatient;
            selectGetOrSearchPatient();
            if (pagePatient == totalPagePatient - 1) {
                $('#next-page-patient').addClass('disabled');
                $('#final-page-patient').addClass('disabled');
            }
            $('#pre-page-patient').removeClass('disabled');
            $('#first-page-patient').removeClass('disabled');
        }
    };
    $scope.finalPagePatient = function () {
        if (!$('#final-page-patient').hasClass('disabled')) {
            pagePatient = totalPagePatient - 1;
            $scope.currentPagePatient = pagePatient;
            selectGetOrSearchPatient();
            if (pagePatient == totalPagePatient - 1) {
                $('#final-page-patient').addClass('disabled');
                $('#next-page-patient').addClass('disabled');
            }
            $('#pre-page-patient').removeClass('disabled');
            $('#first-page-patient').removeClass('disabled');
        }
    };
    function findTotalPageDoctor() {
        totalPageDoctor = parseInt(totalDoctor / 10);
        if ((totalDoctor % 10) != 0) {
            totalPageDoctor++;
        }
        console.log(totalPageDoctor + 'total  Doctor');
        if (totalPageDoctor == 1) {
            $('#first-page-doctor').addClass('disabled');
            $('#pre-page-doctor').addClass('disabled');
            $('#next-page-doctor').addClass('disabled');
            $('#final-page-doctor').addClass('disabled');
        }
        if (totalPageDoctor > 1) {
            $('#first-page-doctor').addClass('disabled');
            $('#pre-page-doctor').addClass('disabled');
        }

    }

    $scope.firstPageDoctor = function () {
        if (!$('#first-page-doctor').hasClass('disabled')) {
            pageDoctor = 0;
            $scope.currentPageDoctor = pageDoctor;
            selectGetOrSearchDoctor();
            $('#first-page-doctor').addClass('disabled');
            $('#pre-page-doctor').addClass('disabled');
            $('#next-page-doctor').removeClass('disabled');
            $('#final-page-doctor').removeClass('disabled');
        }
    };
    $scope.prePageDoctor = function () {
        if (!$('#first-page-doctor').hasClass('disabled')) {
            pageDoctor--;
            $scope.currentPageDoctor = pageDoctor;
            selectGetOrSearchDoctor();
            if (pageDoctor == 0) {
                $('#first-page-doctor').addClass('disabled');
                $('#pre-page-doctor').addClass('disabled');
            }
            $('#next-page-doctor').removeClass('disabled');
            $('#final-page-doctor').removeClass('disabled');
        }
    };
    $scope.nextPageDoctor = function () {
        if (!$('#final-page-doctor').hasClass('disabled')) {
            pageDoctor++;
            $scope.currentPageDoctor = pageDoctor;
            selectGetOrSearchDoctor();
            if (pageDoctor == totalPageDoctor - 1) {
                $('#next-page-doctor').addClass('disabled');
                $('#final-page-doctor').addClass('disabled');
            }
            $('#first-page-doctor').removeClass('disabled');
            $('#pre-page-doctor').removeClass('disabled');
        }
    };
    $scope.finalPageDoctor = function () {
        if (!$('#final-page-doctor').hasClass('disabled')) {
            pageDoctor = totalPageDoctor - 1;
            $scope.currentPageDoctor = pageDoctor;
            selectGetOrSearchDoctor();
            $('#next-page-doctor').addClass('disabled');
            $('#final-page-doctor').addClass('disabled');
            $('#first-page-doctor').removeClass('disabled');
            $('#pre-page-doctor').removeClass('disabled');
        }

    };
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

    $scope.firstPageTypeOfMedical = function () {
        if (!$('#first-page-typeofmedical').hasClass('disabled')) {
            pageTypeOfMedical = 0;
            $scope.currentPageTypeOfMedical = pageTypeOfMedical;
            selectGetOrSearchTypeOfMedical();
            $('#first-page-typeofmedical').addClass('disabled');
            $('#pre-page-typeofmedical').addClass('disabled');
            $('#next-page-typeofmedical').removeClass('disabled');
            $('#final-page-typeofmedical').removeClass('disabled');
        }

    };
    $scope.prePageTypeOfMedical = function () {
        if (!$('#first-page-typeofmedical').hasClass('disabled')) {
            pageTypeOfMedical--;
            $scope.currentPageTypeOfMedical = pageTypeOfMedical;
            selectGetOrSearchTypeOfMedical();
            if (pageDoctor == 0) {
                $('#first-page-typeofmedical').addClass('disabled');
                $('#pre-page-typeofmedical').addClass('disabled');
            }
            $('#next-page-typeofmedical').removeClass('disabled');
            $('#final-page-typeofmedical').removeClass('disabled');
        }

    };
    $scope.nextPageTypeOfMedical = function () {
        if (!$('#final-page-typeofmedical').hasClass('disabled')) {
            pageTypeOfMedical++;
            $scope.currentPageTypeOfMedical = pageTypeOfMedical;
            selectGetOrSearchTypeOfMedical();
            if (pageTypeOfMedical == totalPageTypeOfMedical - 1) {
                $('#next-page-typeofmedical').addClass('disabled');
                $('#final-page-typeofmedical').addClass('disabled');
            }
            $('#first-page-typeofmedical').removeClass('disabled');
            $('#pre-page-typeofmedical').removeClass('disabled');
        }

    };
    $scope.finalPageTypeOfMedical = function () {
        if (!$('#final-page-typeofmedical').hasClass('disabled')) {
            pageTypeOfMedical = totalPageTypeOfMedical - 1;
            $scope.currentPageTypeOfMedical = pageTypeOfMedical;
            selectGetOrSearchTypeOfMedical();
            $('#next-page-typeofmedical').addClass('disabled');
            $('#final-page-typeofmedical').addClass('disabled');
            $('#first-page-typeofmedical').removeClass('disabled');
            $('#pre-page-typeofmedical').removeClass('disabled');
        }

    };
    function findTotalPageDetailHeal() {
        var totalpages = parseInt(totalDetailHeal / $scope.size);
        if ((totalDetailHeal % $scope.size) != 0) {
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
            selectGetOrSearchDetailHeal();
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
            selectGetOrSearchDetailHeal();
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
            selectGetOrSearchDetailHeal();
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
            selectGetOrSearchDetailHeal();
            $('#next-page-detailheal').addClass('disabled');
            $('#final-page-detailheal').addClass('disabled');
            $('#first-page-detailheal').removeClass('disabled');
            $('#pre-page-detailheal').removeClass('disabled');
        }

    };
    $scope.clickPatient = function () {
        $('#modal-patient').openModal();
        getPatient();
        countPatient();
    };
    $scope.clickDoctor = function () {
        $('#modal-doctor').openModal();
        getDoctor();
        countDoctor();
    };
    $scope.clickAddTypeOfMedical = function () {
        $('#modal-addtypeofmedical').openModal();
        getTypeOfMedical();
        countTypeOfMedical();
    };
    $scope.clickDeleteDetailHeal = function (detailheal) {
        $scope.seeDetailHeal = detailheal;
        $('#modal-delete-detailheal').openModal();
    };
    $scope.changePrefix = function (my) {
        $(my).css('color', '#00bcd4');
    };
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});
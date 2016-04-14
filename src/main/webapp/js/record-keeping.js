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
        console.log("ssssssssssssssssssssssssssssss")
        var typeMedical = [];
        historyOfMedicalAndTypeOfMedical.detailHeal = $scope.detailHeal;
        for (var i = 0; i < totalOrderHeal; i++) {
            typeMedical[i] = $scope.orderHeals.content[i];
            console.log("ssssssssssssssssssssssssssssss")
        }
        historyOfMedicalAndTypeOfMedical.typeOfMedicals = typeMedical;
        $http.post('/saverecordkeeping', historyOfMedicalAndTypeOfMedical).success(function (data) {
            console.log("ssssssssssssssssssssssssssssss")
            console.log(data);
            if (data == 200) {
                countDetailHeal();
                if (!!dataUpdate.orderHealDetailHeals) {
                    if (dataUpdate.orderHealDetailHeals.length !== 0) {
                        for (var i = 0; i < dataUpdate.orderHealDetailHeals.length; i++) {
                            $http.post('/deleteorderheal', dataUpdate.orderHealDetailHeals[i]);
                            console.log("ssssssssssssssssssssssssssssss")
                        }
                        ;
                    }
                }
                getUser();
                for (var i = 0; i < totalOrderHeal; i++) {
                    typeMedical[i] = $scope.orderHeals.content[i];
                    $http.post('/deletetypeofmedical', typeMedical[i]);
                    console.log("ssssssssssssssssssssssssssssss")
                }
                $scope.detailHeal = {};
                $scope.orderHeals = {};
                totalOrderHeal = 0;
                $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
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

});

    
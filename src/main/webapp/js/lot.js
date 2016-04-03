angular.module('lot', []);
angular.module('lot').controller('lotController', function ($scope, $http) {

    $scope.lot = {};
    $scope.lot.nameStaffReam = "";
    $scope.lot.dateIn = new Date();
    $scope.lots = {};
    $scope.employees = {};
    $scope.lotDelete = {};
    $scope.nameStream = "";
// pagingEmployee
    $scope.rowEmployee = 10;
    $scope.pageEmployee = 0;
    $scope.currentPageEmployee = 0;
    var totalPageEmployee = 0;
    var totalListEmployee = 0;
    $scope.searchDataEmployee = {};
    $scope.searchDataEmployee.keyword = "";
    $scope.error = {};
//===========================================================================================

//paginLot
    $scope.rowLot = 10;
    $scope.pageLot = 0;
    $scope.currentPageLot = 0;
    var totalPageLot = 0;
    var totalListLot = 0;
    $scope.searchDataLot = {};
    $scope.searchDataLot.keyword = "";

//===========================================================================================


    startPageStaff();
    function startPageStaff() {
        $http.get('/startpagestaff').success(function (data) {
            $scope.nameStream = data.nameTh;
            $('#label-nameStaffReam').addClass('active');
            console.log(data);
        });
    }

    loadLot();
    function loadLot() {
        $http.get('/loadlot', {params: {page: $scope.pageLot, size: $scope.rowLot}}).success(function (data) {
            $scope.lots = data;
        }).error(function (data) {
        });
    }

    function loadEmployees() {
        $http.get('/loademployee', {params: {page: $scope.pageEmployee, size: $scope.rowEmployee}}).success(function (data) {
            $scope.employees = data;
        });
    }

    $scope.saveLot = function () {
        $scope.lot.nameStaffReam = $scope.nameStream;
        $http.post('/savelot', $scope.lot).success(function (data) {
            loadLot();
            $scope.lot = {};
            getTotalListLot();
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
        }).error(function (data) {
            $scope.error = data;
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
        });
    };

    $scope.clearData = function () {
        $scope.lot = {};
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };

    $scope.actionDelete = function (lo) {
        $scope.lotDelete = lo;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deleteLot = function () {
        $http.post('/deletelot', $scope.lotDelete).success(function (data) {
            loadLot();
            $scope.lot = {};
        }).error(function (data) {
        });
    };

    $scope.updateLot = function (lo) {
        $scope.lot = lo;
        console.log(lo.nameStaffReam);
        $scope.lot.dateIn = new Date(lo.dateIn);
        $scope.lot.dateOut = new Date(lo.dateOut);
        console.log(lo);
        $scope.nameStream = lo.nameStaffReam;
        $('#label-nameStaffReam').addClass('active');
        $('#prefix-appointment-employee').css('color', '#00bcd4');
        $('#namedepartment1').addClass('active');
        $('#namedepartment2').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });

    $scope.clickEmployee = function () {
        $scope.searchDataEmployee = {};
        $scope.searchDataEmployee.searchBy = 'ชื่อ';
        loadEmployees();
        $('#modal-employee').openModal();
        getTotalListEmployee();
        $scope.firstPageEmployee();

    };

    $scope.selectEmployee = function (emp) {
        $scope.nameStream = emp.nameTh;
        console.log($scope.lot.nameStaffReam);
        $('#modal-employee').closeModal();
        $('#label-nameStaffReam').addClass('active');
        $('#prefix-appointment-employee').css('color', '#00bcd4');
    };


// pageginEmployee
    function getTotalListEmployee() {
        $http.get('/tatallemployee').success(function (data) {
            totalListEmployee = data;
            totalPagesEmployee();
        });
    }

    function totalPagesEmployee() {
        console.log(totalListEmployee + ' total');
        var totalPagesEmployee = parseInt(totalListEmployee / $scope.rowEmployee);
        console.log(totalListEmployee + "tatalbefor");
        if ((totalListEmployee % $scope.rowEmployee) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPagesEmployee++;
        }
        totalPageEmployee = totalPagesEmployee;

        console.log(totalPageEmployee + "tatalafter");
        if ($scope.currentPageEmployee === 0) {
            $('#first-page-employee').addClass('disabled');
            $('#pre-page-employee').addClass('disabled');
            $('#next-page-employee').removeClass('disabled');
            $('#final-page-employee').removeClass('disabled');
            console.log('1..........');
        }
        if ($scope.currentPageEmployee === totalPageEmployee - 1) {
            $('#next-page-employee').addClass('disabled');
            $('#final-page-employee').addClass('disabled');
            $('#first-page-employee').removeClass('disabled');
            $('#pre-page-employee').removeClass('disabled');
            console.log('2');
        }
        if ($scope.currentPageEmployee === 0 && $scope.currentPageEmployee === totalPageEmployee - 1) {
            $('#next-page-employee').addClass('disabled');
            $('#final-page-employee').addClass('disabled');
            $('#first-page-employee').addClass('disabled');
            $('#pre-page-employee').addClass('disabled');
        }
        if ($scope.currentPageEmployee < totalPageEmployee - 1 && $scope.currentPageEmployee > 0) {
            $('#first-page-employee').removeClass('disabled');
            $('#pre-page-employee').removeClass('disabled');
            $('#next-page-employee').removeClass('disabled');
            $('#final-page-employee').removeClass('disabled');
            console.log('3');
        }
    }

    $scope.firstPageEmployee = function () {
        if (!$('#first-page-employee').hasClass('disabled')) {
            $scope.pageEmployee = 0;
            $scope.currentPageEmployee = $scope.pageEmployee;
            selectGetOrSearchEmployee();
            $('#first-page-employee').addClass('disabled');
            $('#pre-page-employee').addClass('disabled');
            $('#next-page-employee').removeClass('disabled');
            $('#final-page-employee').removeClass('disabled');
        }
    };
    $scope.finalPageEmployee = function () {
        if (!$('#final-page-employee').hasClass('disabled')) {
            $scope.pageEmployee = totalPageEmployee - 1;
            selectGetOrSearchEmployee();
            $scope.currentPageEmployee = $scope.pageEmployee;
            $('#first-page-employee').removeClass('disabled');
            $('#pre-page-employee').removeClass('disabled');
            $('#next-page-employee').addClass('disabled');
            $('#final-page-employee').addClass('disabled');
        }
    };

    $scope.prePageEmployee = function () {
        if (!$('#first-page-employee').hasClass('disabled')) {
            $scope.pageEmployee--;
            selectGetOrSearchEmployee();
            $scope.currentPageEmployee = $scope.pageEmployee;
            if ($scope.pageEmployee === 0) {
                $('#first-page-employee').addClass('disabled');
                $('#pre-page-employee').addClass('disabled');
            }
            $('#next-page-employee').removeClass('disabled');
            $('#final-page-employee').removeClass('disabled');
        }
    };

    $scope.nextPageEmployee = function () {
        if (!$('#final-page-employee').hasClass('disabled')) {
            $scope.pageEmployee++;
            selectGetOrSearchEmployee();
            $scope.currentPageEmployee = $scope.pageEmployee;
            if ($scope.pageEmployee === totalPageEmployee - 1) {
                $('#next-page-employee').addClass('disabled');
                $('#final-page-employee').addClass('disabled');
            }
            $('#first-page-employee').removeClass('disabled');
            $('#pre-page-employee').removeClass('disabled');
        }

    };

    function selectGetOrSearchEmployee() {
        if (!!$scope.searchDataEmployee.keyword) {
            searcDataContentEmployee();
            console.log('searchhhhh');
        } else {
            loadEmployees();
        }
    }

    $scope.searcDataContentEmployee = function () {
        $scope.pageEmployee = 0;
        $scope.currentPageEmployee = $scope.pageEmployee;
        searcDataContentEmployee();
    };

    function searcDataContentEmployee() {
        $http.post('/loademployee/searchemployee', $scope.searchDataEmployee, {params: {page: $scope.pageEmployee, size: $scope.rowEmployee}}).success(function (data) {
            if (data.content.length == 0 || $scope.searchDataEmployee.keyword == "") {
                loadEmployees();
            } else {
                $scope.employees = data;
                countSearchEmployee();
            }
        });
    }

    function countSearchEmployee() {
        $http.post('/countsearchemployee', $scope.searchDataEmployee).success(function (data) {
            totalListEmployee = data;
            if (!data) {
                totalListEmployee = 0;
                console.log("nulle");
            }
            console.log(totalListEmployee);
            totalPagesEmployee();
        });
    }


//===========================================================================================
// pagingLot
    getTotalListLot();
    function getTotalListLot() {
        $http.get('/totallot').success(function (data) {
            totalListLot = data;
            totalPagesLot();
        });
    }

    function totalPagesLot() {

        console.log(totalListLot + "totalListLot");
        var totalPagesLot = parseInt(totalListLot / $scope.rowLot);

        console.log(totalPagesLot + "totalPagesLot");

        if ((totalListLot % $scope.rowLot) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPagesLot++;
        }

        totalPageLot = totalPagesLot;
        console.log(totalPageLot + "totalPageLot");

        if ($scope.currentPageLot === 0) {
            $('#first-page-Lot').addClass('disabled');
            $('#pre-page-Lot').addClass('disabled');
            $('#next-page-Lot').removeClass('disabled');
            $('#final-page-Lot').removeClass('disabled');
            console.log('1..........');
        }
        if ($scope.currentPageLot === totalPageLot - 1) {
            $('#next-page-Lot').addClass('disabled');
            $('#final-page-Lot').addClass('disabled');
            $('#first-page-Lot').removeClass('disabled');
            $('#pre-page-Lot').removeClass('disabled');
            console.log('2');
        }
        if ($scope.currentPageLot === 0 && $scope.currentPageLot === totalPageLot - 1) {
            $('#next-page-Lot').addClass('disabled');
            $('#final-page-Lot').addClass('disabled');
            $('#first-page-Lot').addClass('disabled');
            $('#pre-page-Lot').addClass('disabled');
            console.log('3');
        }
        if ($scope.currentPageLot < totalPageEmployee - 1 && $scope.currentPageLot > 0) {
            $('#first-page-Lot').removeClass('disabled');
            $('#pre-page-Lot').removeClass('disabled');
            $('#next-page-Lot').removeClass('disabled');
            $('#final-page-Lot').removeClass('disabled');
            console.log('4');
        }
    }

    $scope.firstPageLot = function () {
        if (!$('#first-page-Lot').hasClass('disabled')) {
            $scope.pageLot = 0;
            $scope.currentPageLot = $scope.pageLot;
            selectGetOrSearchLot();
            $('#first-page-Lot').addClass('disabled');
            $('#pre-page-Lot').addClass('disabled');
            $('#next-page-Lot').removeClass('disabled');
            $('#final-page-Lot').removeClass('disabled');
        }
    };
    $scope.finalPageLot = function () {
        if (!$('#final-page-Lot').hasClass('disabled')) {
            $scope.pageLot = totalPageLot - 1;
            selectGetOrSearchLot();
            $scope.currentPageLot = $scope.pageLot;
            $('#first-page-Lot').removeClass('disabled');
            $('#pre-page-Lot').removeClass('disabled');
            $('#next-page-Lot').addClass('disabled');
            $('#final-page-Lot').addClass('disabled');
        }
    };

    $scope.prePageLot = function () {
        if (!$('#first-page-Lot').hasClass('disabled')) {
            $scope.pageLot--;
            selectGetOrSearchLot();
            $scope.currentPageLot = $scope.pageLot;
            if ($scope.pageLot === 0) {
                $('#first-page-Lot').addClass('disabled');
                $('#pre-page-Lot').addClass('disabled');
            }
            $('#next-page-Lot').removeClass('disabled');
            $('#final-page-Lot').removeClass('disabled');
        }
    };

    $scope.nextPageLot = function () {
        if (!$('#final-page-Lot').hasClass('disabled')) {
            $scope.pageLot++;
            selectGetOrSearchLot();
            $scope.currentPageLot = $scope.pageLot;
            if ($scope.pageLot === totalPageLot - 1) {
                $('#next-page-Lot').addClass('disabled');
                $('#final-page-Lot').addClass('disabled');
            }
            $('#first-page-Lot').removeClass('disabled');
            $('#pre-page-Lot').removeClass('disabled');
        }

    };

    $scope.selectGetOrSearchLot = function () {
        if (!!$scope.searchDataLot.keyword) {
            $scope.searcDataContentLot();
            totalPagesLot();
        } else {
            $scope.pageLot = 0;
            $scope.currentPageLot = 0;
            loadLot();
            getTotalListLot();
        }
    };

    function selectGetOrSearchLot() {
        if (!!$scope.searchDataLot.keyword) {
            searcDataContentLot();
        } else {
            loadLot();
        }
    }

    $scope.searcDataContentLot = function () {
        $scope.pageLot = 0;
        $scope.currentPageLot = 0;
        searcDataContentLot();
    };

    function searcDataContentLot() {
        console.log($scope.searchDataLot);
        $http.post('/loadlot/searchlot', $scope.searchDataLot, {params: {page: $scope.pageLot, size: $scope.rowLot}}).success(function (data) {

            if (data.content.length === 0 || $scope.searchDataLot.keyword === "") {
                $('#modal-notfont').openModal();
                loadLot();
            } else {
                $scope.lots = data;
                countSearchLot();
            }
        });
    }

    function countSearchLot() {
        $http.post('/countsearchlot', $scope.searchDataLot).success(function (data) {
            totalListLot = data;
            if (!data) {
                totalListLot = 0;
            }
            totalPagesLot();
        });
    }

//===========================================================================================
});






angular.module('department', []);
angular.module('department').controller('departmentController', function ($scope, $http) {
    $('.modal-trigger').leanModal();

    $scope.rowDepartment = 10;
    $scope.pageDepartment = 0;
    $scope.currentPageDepartment = 0;
    var totalPageDepartment = 0;
    var totalListDepartment = 0;
    $scope.searchDataDepartment = {};
    $scope.searchDataDepartment.keyword = "";
    $scope.departments = {};
    $scope.department = {};
    $scope.depqrtmentUpdate = {};
    $scope.error = {};
    $scope.errorName = '';

    checkMobile();
    function  checkMobile() {
        var $mobile = $(window).outerWidth() < 995;
        if ($mobile) {
            $('.table-department').removeAttr('style');
        }
    }

    $scope.saveDepartment = function () {
        $http.post('/savedepartment', $scope.department)
                .success(function (data) {
                    if (data == 1) {
                        $scope.errorName = "ชื่อแผนกนี้มีอยู่ในระบบแล้ว";
                        $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                        Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
                        $('body,html').animate({scrollTop: 0}, "600");
                    }
                    if (data == 200) {
                        getDepartment();
                        $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                        Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
                        getTotalListDepartment();
                        $scope.department = {};
                    }

                }).error(function (data) {
            $('body,html').animate({scrollTop: 0}, "600");
            $scope.error = data;
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
        });
    };

    $scope.clearData = function () {
        $scope.department = {};
        $('#namedepartment').removeClass('active');
    };
    getDepartment();
    function getDepartment() {
        $http.get('/getdepartment', {params: {page: $scope.pageDepartment, size: $scope.rowDepartment}})
                .success(function (data) {
                    $scope.departments = data;
                }).error(function (data) {

        });
    }

    $scope.actionDelete = function (dep) {
        $scope.department = dep;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.actionUpdate = function (dep) {
        $('body,html').animate({scrollTop: 0}, "600");
        $scope.department.id = dep.id;
        $scope.department.name = dep.name;
        $('#namedepartment').addClass('active');
    };

    $scope.deleteDepartment = function () {
        $http.post('/deletedepartment', $scope.department)
                .success(function (data) {
                    getDepartment();
                    $scope.department = {};
                    $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                    Materialize.toast('ลบข้อมูลเรียบร้อย', 3000, 'rounded');
                }).error(function (data) {
            console.log(+'------------------------error')
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
            ////////////////////////////////////// foreign key
            if (data.message.split(';')[2].substring(14, 16) == 'FK') {
                $('#modal-fk').openModal();
            }
        });
    };

    getTotalListDepartment();
    function getTotalListDepartment() {
        $http.get('/totaldepartment').success(function (data) {
            totalListDepartment = data;
            totalPagesDepartment();
        });
    }

    function totalPagesDepartment() {

        console.log(totalListDepartment + "totalListDepartment");
        console.log($scope.rowDepartment + "rowDepartment");
        var totalPagesDepartment = parseInt(totalListDepartment / $scope.rowDepartment);

        console.log(totalPagesDepartment + "totalPagesDepartment");

        if ((totalListDepartment % $scope.rowDepartment) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPagesDepartment++;
        }

        totalPageDepartment = totalPagesDepartment;
        console.log(totalPageDepartment + "totalPagedepartment");

        if ($scope.currentPageDepartment === 0) {
            $('#first-page-department').addClass('disabled');
            $('#pre-page-department').addClass('disabled');
            $('#next-page-department').removeClass('disabled');
            $('#final-page-department').removeClass('disabled');
            console.log('1..........');
        }
        if ($scope.currentPageDepartment === totalPageDepartment - 1) {
            $('#next-page-department').addClass('disabled');
            $('#final-page-department').addClass('disabled');
            $('#first-page-department').removeClass('disabled');
            $('#pre-page-department').removeClass('disabled');
            console.log('2');
        }
        if ($scope.currentPageDepartment === 0 && $scope.currentPageDepartment === totalPageDepartment - 1) {
            $('#next-page-department').addClass('disabled');
            $('#final-page-department').addClass('disabled');
            $('#first-page-department').addClass('disabled');
            $('#pre-page-department').addClass('disabled');
            console.log('3');
        }
        if ($scope.currentPageDepartment < totalPageDepartment - 1 && $scope.currentPageDepartment > 0) {
            $('#first-page-department').removeClass('disabled');
            $('#pre-page-department').removeClass('disabled');
            $('#next-page-department').removeClass('disabled');
            $('#final-page-department').removeClass('disabled');
            console.log('4');
        }
    }

    $scope.firstPageDepartment = function () {
        if (!$('#first-page-department').hasClass('disabled')) {
            $scope.pageDepartment = 0;
            $scope.currentPageDepartment = $scope.pageLot;
            selectGetOrSearchDepartment();
            $('#first-page-department').addClass('disabled');
            $('#pre-page-department').addClass('disabled');
            $('#next-page-department').removeClass('disabled');
            $('#final-page-department').removeClass('disabled');
        }
    };
    $scope.finalPageDepartment = function () {
        if (!$('#final-page-department').hasClass('disabled')) {
            $scope.pageDepartment = totalPageDepartment - 1;
            selectGetOrSearchDepartment();
            $scope.currentPageDepartment = $scope.pageDepartment;
            $('#first-page-department').removeClass('disabled');
            $('#pre-page-department').removeClass('disabled');
            $('#next-page-department').addClass('disabled');
            $('#final-page-department').addClass('disabled');
        }
    };

    $scope.prePageDepartment = function () {
        if (!$('#first-page-department').hasClass('disabled')) {
            $scope.pageDepartment--;
            selectGetOrSearchDepartment();
            $scope.currentPageDepartment = $scope.pageDepartment;
            if ($scope.pageDepartment === 0) {
                $('#first-page-department').addClass('disabled');
                $('#pre-page-department').addClass('disabled');
            }
            $('#next-page-department').removeClass('disabled');
            $('#final-page-department').removeClass('disabled');
        }
    };

    $scope.nextPageDepartment = function () {
        if (!$('#final-page-department').hasClass('disabled')) {
            $scope.pageDepartment++;
            selectGetOrSearchDepartment();
            $scope.currentPageDepartment = $scope.pageDepartment;
            if ($scope.pageDepartment === totalPageDepartment - 1) {
                $('#next-page-department').addClass('disabled');
                $('#final-page-department').addClass('disabled');
            }
            $('#first-page-department').removeClass('disabled');
            $('#pre-page-department').removeClass('disabled');
        }

    };

    $scope.selectGetOrSearchDepartment = function () {
        if (!!$scope.searchDataDepartment.keyword) {
            $scope.searcDataContentDepartment();
            totalPagesDepartment();
        } else {
            $scope.pageDepartment = 0;
            $scope.currentPageDepartment = 0;
            getDepartment();
            getTotalListDepartment();
        }
    };

    function selectGetOrSearchDepartment() {
        if (!!$scope.searchDataDepartment.keyword) {
            searcDataContentDepartment();
        } else {
            getDepartment();
        }
    }

    $scope.searcDataContentDepartment = function () {
        $scope.pageDepartment = 0;
        $scope.currentPageDepartment = 0;
        searcDataContentDepartment();
    };

    function searcDataContentDepartment() {
        console.log($scope.searchDataDepartment);
        $http.post('/getdepartment/searchdepartment', $scope.searchDataDepartment, {params: {page: $scope.pageDepartment, size: $scope.rowDepartment}}).success(function (data) {
            if (data.content.length == 0 || $scope.searchDataDepartment.keyword == "") {
                $('#modal-notfont').openModal();
                getDepartment();
            } else {
                $scope.departments = data;
                countSearchDepartment();
            }
        });
    }

    function countSearchDepartment() {
        $http.post('countsearchdepartment', $scope.searchDataDepartment).success(function (data) {
            totalListDepartment = data;
            if (!data) {
                totalListDepartment = 0;
            }
            totalPagesDepartment();
        });
    }

});
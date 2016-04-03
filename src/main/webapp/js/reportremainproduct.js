angular.module('reportremainproduct', []);
angular.module('reportremainproduct').controller('reportremainproductController', function ($scope, $http) {

    $scope.lots = {};
//paginLot
    $scope.rowLot = 10;
    $scope.pageLot = 0;
    $scope.currentPageLot = 0;
    var totalPageLot = 0;
    var totalListLot = 0;
    $scope.searchDataLot = {};
    $scope.searchDataLot.keyword = "";

//===========================================================================================
    loadLot();
    function loadLot() {
        $http.get('/loadlot', {params: {page: $scope.pageLot, size: $scope.rowLot}}).success(function (data) {
            $scope.lots = data;
        }).error(function (data) {
        });
    }
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

    $scope.printRemainProduct = function (id) {
        location.href = '/remainproduct/' + id;
    };

});
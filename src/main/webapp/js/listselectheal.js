angular.module('listSelectHeal', []);
angular.module('listSelectHeal').controller('listSelectHealController', function ($scope, $http) {

    $scope.listSelectHeal = {};
    $scope.listSelectHeals = {};
    $scope.row = 10;
    $scope.page = 0;
    $scope.currentPage = 1;
    var totalPage = 0;
    var totalList = 0;
    $scope.searchData = {};
    $scope.searchData.keyword = "";
    $scope.error = {};
    $scope.errorName = '';

    loadListSelectHeal();
    function loadListSelectHeal() {
        $http.get('/loadlistselectheal', {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            $scope.listSelectHeals = data;
        }).error(function (data) {
        });
    }
    $scope.saveListSelectHeal = function () {
        $http.post('/savelistselectheal', $scope.listSelectHeal).success(function (data) {
            if (data == 1) {
                $scope.errorName = "ชื่อรายการรักษานี้มีอยู่ในระบบแล้ว";
                $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
                $('body,html').animate({scrollTop: 0}, "600");
            }
            if (data == 200) {
                loadListSelectHeal();
                $scope.listSelectHeal = {};
                $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
                getTotalList();
            }
        }).error(function (data) {
            $scope.error = data;
            console.log(data);
            $('body,html').animate({scrollTop: 0}, "600");
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
        });
    };

    $scope.clearData = function () {
        $scope.listSelectHeal = {};
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };

    $scope.actionDelete = function (lsh) {
        $scope.listSelectHeal = lsh;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deleteListSelectHeal = function () {
        $http.post('/deletelistselectheal', $scope.listSelectHeal).success(function (data) {
            loadListSelectHeal();
            $scope.listSelectHeal = {};
            getTotalList();
            $scope.firstPage();
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('ลบข้อมูลเรียบร้อย', 3000, 'rounded');
        }).error(function (data) {

        });
    };

    $scope.updateListSelectHeal = function (lsh) {
        $scope.listSelectHeal.id = lsh.id;
        $scope.listSelectHeal.name = lsh.name;
        $scope.listSelectHeal.price = lsh.price;
        $('#namedepartment').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

    // pagegin
    $scope.selectGetOrSearch = function () {
        if (!!$scope.searchData.keyword) {
            $scope.searcDataContent();
            totalPages();
        } else {
            $scope.page = 0;
            $scope.currentPage = $scope.page + 1;
            loadListSelectHeal();
            totalPages();
        }

    };

    $scope.searcDataContent = function () {
        $scope.page = 0;
        $scope.currentPage = $scope.page + 1;
        searcDataContent();
    };

    function searcDataContent() {
        $http.post('/loadlistselectheal/searchlistselectheal', $scope.searchData, {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            if (data.content.length === 0 || $scope.searchData.keyword === "") {
                $('#modal-notfont').openModal();
                loadListSelectHeal();
            } else {
                $scope.listSelectHeals = data;
                countSearchListselectHeal();
            }
        });
    }

    function countSearchListselectHeal() {
        $http.post('/countsearchlistselectheal', $scope.searchData).success(function (data) {
            totalList = data;
            totalPages();
        });
    }

    function selectGetOrSearch() {
        if (!!$scope.searchData.keyword) {
            searcDataContent();
        } else {
            loadListSelectHeal();
        }
    }

    getTotalList();
    function getTotalList() {
        $http.get('/totallistselectheal').success(function (data) {
            totalList = data;
            totalPages();
        });
    }

    function totalPages() {
        var totalPages = parseInt(totalList / $scope.row);
        if ((totalList % $scope.row) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPages++;
        }

        totalPage = totalPages;
        console.log(totalPage);
        if ($scope.currentPage === 1) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
            console.log('1');
        }
        if ($scope.currentPage === totalPage) {
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
            console.log('2');
        }
        if ($scope.currentPage === 1 && $scope.currentPage === totalPage) {
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
        }
        if ($scope.currentPage < totalPage && $scope.currentPage > 1) {
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
            console.log('3');
        }
    }

    $scope.firstPage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            $scope.page = 0;
            $scope.currentPage = 1;
            selectGetOrSearch();
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };
    $scope.finalPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            $scope.page = totalPage - 1;
            selectGetOrSearch();
            $scope.currentPage = totalPage;
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
        }
    };

    $scope.prePage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            $scope.page--;
            selectGetOrSearch();
            $scope.currentPage = $scope.page + 1;
            if ($scope.page === 0) {
                $('#first-page').addClass('disabled');
                $('#pre-page').addClass('disabled');
            }
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    $scope.nextPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            $scope.page++;
            selectGetOrSearch();
            $scope.currentPage = $scope.page + 1;
            if ($scope.page === totalPage - 1) {
                $('#next-page').addClass('disabled');
                $('#final-page').addClass('disabled');
            }
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
        }

    };



});


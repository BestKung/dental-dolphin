angular.module('typeProduct', []);
angular.module('typeProduct').controller('typeProductController', function ($scope, $http) {

    $scope.typeProduct = {};
    $scope.typeProducts = {};

    $scope.row = 10;
    $scope.page = 0;
    $scope.currentPage = 1;
    var totalPage = 0;
    var totalList = 0;
    $scope.searchData = {};
    $scope.searchData.keyword = "";
    $scope.error = {};
    $scope.errorName = '';


    loadTpyeProduct();
    function loadTpyeProduct() {
        $http.get('/loadtypeproduct', {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            $scope.typeProducts = data;
        }).error(function (data) {
        });
    }

    $scope.saveTpyeProduct = function () {
        $http.post('/savetypeproduct', $scope.typeProduct).success(function (data) {
            if (data == 1) {
                $scope.errorName = "ชื่อประเภทสินค้านี้มีอยู่ในระบบแล้ว";
                $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
                $('body,html').animate({scrollTop: 0}, "600");
            }
            if (data == 200) {
                loadTpyeProduct();
                $scope.typeProduct = {};
                getTotalList();
                $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
            }
        }).error(function (data) {
            $scope.error = data;
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
        });
    };

    $scope.clearData = function () {
        $scope.typeProduct = {};
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };

    $scope.actionDelete = function (tp) {
        $scope.typeProduct = tp;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deleteTpyeProduct = function () {
        $http.post('/deletetypeproduct', $scope.typeProduct).success(function (data) {
            loadTpyeProduct();
            $scope.typeProduct = {};
            getTotalList();
            $scope.firstPage();
        }).error(function (data) {

        });
    };

    $scope.updateTpyeProduct = function (tp) {
        $scope.typeProduct.id = tp.id;
        $scope.typeProduct.name = tp.name;
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
            loadTpyeProduct();
            totalPages();
        }

    };
    $scope.searcDataContent = function () {
        $scope.page = 0;
        $scope.currentPage = $scope.page + 1;
        searcDataContent();
    };

    function searcDataContent() {
        $http.post('/loadtypeproduct/searchtypeproduct', $scope.searchData, {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            if (data.content.length === 0 || $scope.searchData.keyword === "") {
                $('#modal-notfont').openModal();
                loadTpyeProduct();
            } else {
                $scope.typeProducts = data;
                countSearch();
            }
        });
    }

    function countSearch() {
        $http.post('/countsearchtypeproduct', $scope.searchData).success(function (data) {
            totalList = data;
            totalPages();
        });
    }

    function selectGetOrSearch() {
        if (!!$scope.searchData.keyword) {
            searcDataContent();
        } else {
            loadTpyeProduct();
        }
    }

    getTotalList();
    function getTotalList() {
        $http.get('/totaltypeproduct').success(function (data) {
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
        if ($scope.currentPage === 1 && totalPage > $scope.currentPage) {
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


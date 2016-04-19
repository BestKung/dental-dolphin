angular.module('product', []);
angular.module('product').controller('productController', function ($scope, $http) {


    $scope.product = {};
    $scope.products = {};

    $scope.typeProducts = {};
    $scope.unitProducts = {};

    //paginLot
    $scope.rowProduct = 10;
    $scope.pageProduct = 0;
    $scope.currentPageProduct = 0;
    var totalPageProduct = 0;
    var totalListProduct = 0;
    $scope.searchDataProduct = {};
    $scope.searchDataProduct.keyword = "";
    $scope.error = {};
    $scope.errorName = '';

//===========================================================================================


    var pageRole = true;
    startPageStaff();
    function startPageStaff() {
        $http.get('/startpagestaff').success(function (data) {
            $scope.login = data;
            manageProduct(data);
        });
    }
    function manageProduct(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'จัดการข้อมูลเวชภัณฑ์' || data.roles[i].role == 'ผู้ดูเเลระบบ') {
                pageRole = false;
            }
        }
        if (pageRole) {
            location.href = '/';
        }
    }

    loadProduct();
    function loadProduct() {
        $http.get('/loadlproduct', {params: {page: $scope.pageProduct, size: $scope.rowProduct}}).success(function (data) {
            $scope.products = data;
        }).error(function (data) {
        });
    }

    loadTpyeProduct();
    function loadTpyeProduct() {
        $http.get('/totaltypeproduct').success(function (data) {
            $http.get('/loadtypeproduct', {params: {size: data}}).success(function (data) {
                $scope.typeProducts = data;
                $scope.product.typeProduct = data.content[0];
            }).error(function (data) {
            });
        });
    }

    loadUnitProduct();

    function loadUnitProduct() {
        $http.get('/totalunitproduct').success(function (data) {
            $http.get('/loadunitproduct', {params: {size: data}}).success(function (data) {
                $scope.unitProducts = data;
                $scope.product.unit = data.content[0];
            }).error(function (data) {
            });
        });
    }

    $scope.saveProduct = function () {
        $http.post('/saveproduct', $scope.product).success(function (data) {
            if (data == 1) {
                $scope.errorName = "ชื่อสินค้านี้มีอยู่ในระบบแล้ว";
                $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
                $('body,html').animate({scrollTop: 0}, "600");
            }
            if (data == 200) {
                loadProduct();
                loadTpyeProduct();
                loadUnitProduct();
                $scope.product = {};
                getTotalListProduct();
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
        $scope.product = {};
        loadTpyeProduct();
        loadUnitProduct();
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };

    $scope.actionDelete = function (pd) {
        $scope.product = pd;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deleteProduct = function () {
        $http.post('/deleteproduct', $scope.product).success(function (data) {
            loadProduct();
            loadTpyeProduct();
            loadUnitProduct();
            $scope.product = {};
        }).error(function (data) {

        });
    };

    $scope.updateProduct = function (pd) {
        $scope.product.id = pd.id;
        $scope.product.name = pd.name;
        $scope.product.barCode_Main = pd.barCode_Main;
        $scope.product.barCode_Sub = pd.barCode_Sub;
        $scope.product.typeProduct = pd.typeProduct;
        $scope.product.unit = pd.unit;
        $('#namedepartment').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

    // pagingProduct
    getTotalListProduct();
    function getTotalListProduct() {
        $http.get('/totalproduct').success(function (data) {
            totalListProduct = data;
            totalPagesProduct();
        });
    }

    function totalPagesProduct() {

        console.log(totalListProduct + "totalListProduct");
        var totalPagesProduct = parseInt(totalListProduct / $scope.rowProduct);

        console.log(totalPagesProduct + "totalPagesProduct");

        if ((totalListProduct % $scope.rowProduct) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPagesProduct++;
        }

        totalPageProduct = totalPagesProduct;
        console.log(totalPageProduct + "totalPageProduct");

        if ($scope.currentPageProduct === 0) {
            $('#first-page-product').addClass('disabled');
            $('#pre-page-product').addClass('disabled');
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
            console.log('1..........');
        }
        if ($scope.currentPageProduct === totalPageProduct - 1) {
            $('#next-page-product').addClass('disabled');
            $('#final-page-product').addClass('disabled');
            $('#first-page-product').removeClass('disabled');
            $('#pre-page-product').removeClass('disabled');
            console.log('2');
        }
        if ($scope.currentPageProduct === 0 && $scope.currentPageProduct === totalPageProduct - 1) {
            $('#next-page-product').addClass('disabled');
            $('#final-page-product').addClass('disabled');
            $('#first-page-product').addClass('disabled');
            $('#pre-page-product').addClass('disabled');
            console.log('3');
        }
        if ($scope.currentPageProduct < totalPageProduct - 1 && $scope.currentPageProduct > 0) {
            $('#first-page-product').removeClass('disabled');
            $('#pre-page-product').removeClass('disabled');
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
            console.log('4');
        }
        if (totalPageProduct == 0) {
            $('#next-page-product').addClass('disabled');
            $('#final-page-product').addClass('disabled');
            $('#first-page-product').addClass('disabled');
            $('#pre-page-product').addClass('disabled');
            console.log('3');
        }
    }

    $scope.firstPageProduct = function () {
        if (!$('#first-page-product').hasClass('disabled')) {
            $scope.pageProduct = 0;
            $scope.currentPageProduct = $scope.pageProduct;
            selectGetOrSearchProduct();
            $('#first-page-product').addClass('disabled');
            $('#pre-page-product').addClass('disabled');
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
        }
    };
    $scope.finalPageProduct = function () {
        if (!$('#final-page-product').hasClass('disabled')) {
            $scope.pageProduct = totalPageProduct - 1;
            selectGetOrSearchProduct();
            $scope.currentPageProduct = $scope.pageProduct;
            $('#first-page-product').removeClass('disabled');
            $('#pre-page-product').removeClass('disabled');
            $('#next-page-product').addClass('disabled');
            $('#final-page-product').addClass('disabled');
        }
    };

    $scope.prePageProduct = function () {
        if (!$('#first-page-product').hasClass('disabled')) {
            $scope.pageProduct--;
            selectGetOrSearchProduct();
            $scope.currentPageProduct = $scope.pageProduct;
            if ($scope.pageProduct === 0) {
                $('#first-page-product').addClass('disabled');
                $('#pre-page-product').addClass('disabled');
            }
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
        }
    };

    $scope.nextPageProduct = function () {
        if (!$('#final-page-product').hasClass('disabled')) {
            $scope.pageProduct++;
            selectGetOrSearchProduct();
            $scope.currentPageProduct = $scope.pageProduct;
            if ($scope.pageProduct === totalPageProduct - 1) {
                $('#next-page-product').addClass('disabled');
                $('#final-page-product').addClass('disabled');
            }
            $('#first-page-product').removeClass('disabled');
            $('#pre-page-product').removeClass('disabled');
        }

    };

    $scope.selectGetOrSearchProduct = function () {
        if (!!$scope.searchDataProduct.keyword) {
            $scope.searcDataContentProduct();
            totalPagesProduct();
        } else {
            $scope.pageProduct = 0;
            $scope.currentPageProduct = 0;
            loadProduct();
            getTotalListProduct();
        }
    };

    function selectGetOrSearchProduct() {
        if (!!$scope.searchDataProduct.keyword) {
            searcDataContentProduct();
        } else {
            loadProduct();
        }
    }

    $scope.searcDataContentProduct = function () {
        $scope.pageProduct = 0;
        $scope.currentPageProduct = 0;
        searcDataContentProduct();
    };

    function searcDataContentProduct() {
        console.log($scope.searchDataProduct);
        $http.post('/loadlproduct/searchproduct', $scope.searchDataProduct, {params: {page: $scope.pageProduct, size: $scope.rowProduct}}).success(function (data) {
            if (data.content.length === 0 || $scope.searchDataProduct.keyword === "") {
                $('#modal-notfont').openModal();
                loadProduct();
            } else {
                $scope.products = data;
                countSearchLot();
            }
        });
    }

    function countSearchLot() {
        $http.post('/countsearchproduct', $scope.searchDataProduct).success(function (data) {
            totalListProduct = data;
            if (!data) {
                totalListProduct = 0;
            }
            totalPagesProduct();
        });
    }

//===========================================================================================

});



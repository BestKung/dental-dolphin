angular.module('reportproduct', []);
angular.module('reportproduct').controller('reportProductController', function ($scope, $http) {
    // pagingPriceAndExpireProduct var
    $scope.rowPriceAndExpireProduct = 10;
    $scope.pagePriceAndExpireProduct = 0;
    $scope.currentPagePriceAndExpireProduct = 0;
    var totalPagePriceAndExpireProduct = 0;
    var totalListPriceAndExpireProduct = 0;
    $scope.searchDataPriceAndExpireProduct = {};
    $scope.searchDataPriceAndExpireProduct.keyword = "";
    $scope.priceAndExpireProducts = {};
//===========================================================================================

//===========================================================================================
// pagingPriceAndExpireProduct
    loadPriceAndExpireProduct();
    function  loadPriceAndExpireProduct() {
        $http.get('/loadpriceandexpireproduct', {params: {page: $scope.pagePriceAndExpireProduct, size: $scope.rowPriceAndExpireProduct}}).success(function (data) {
            $scope.priceAndExpireProducts = data;
        }).error(function (data) {
        });
    }

    getTotalListPriceAndExpireProduct();
    function getTotalListPriceAndExpireProduct() {
        $http.get('/totalpriceandexpireproduct').success(function (data) {
            totalListPriceAndExpireProduct = data;
            totalPagesPriceAndExpireProduct();
        });
    }

    function totalPagesPriceAndExpireProduct() {

        console.log(totalListPriceAndExpireProduct + "totalListPriceAndExpireProduct");
        console.log($scope.rowPriceAndExpireProduct + "rowPriceAndExpireProduct");
        var totalPagesPriceAndExpireProduct = parseInt(totalListPriceAndExpireProduct / $scope.rowPriceAndExpireProduct);

        console.log(totalPagesPriceAndExpireProduct + "totalPagesLot");

        if ((totalListPriceAndExpireProduct % $scope.rowPriceAndExpireProduct) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPagesPriceAndExpireProduct++;
        }

        totalPagePriceAndExpireProduct = totalPagesPriceAndExpireProduct;
        console.log(totalPagePriceAndExpireProduct + "totalPageLot");

        if ($scope.currentPagePriceAndExpireProduct === 0) {
            $('#first-page-priceandexpireproducts').addClass('disabled');
            $('#pre-page-priceandexpireproducts').addClass('disabled');
            $('#next-page-priceandexpireproducts').removeClass('disabled');
            $('#final-page-priceandexpireproducts').removeClass('disabled');
            console.log('1..........');
        }
        if ($scope.currentPagePriceAndExpireProduct === totalPagePriceAndExpireProduct - 1) {
            $('#next-page-priceandexpireproducts').addClass('disabled');
            $('#final-page-priceandexpireproducts').addClass('disabled');
            $('#first-page-priceandexpireproducts').removeClass('disabled');
            $('#pre-page-priceandexpireproducts').removeClass('disabled');
            console.log('2');
        }
        if ($scope.currentPagePriceAndExpireProduct === 0 && $scope.currentPagePriceAndExpireProduct === totalPagePriceAndExpireProduct - 1) {
            $('#next-page-priceandexpireproducts').addClass('disabled');
            $('#final-page-priceandexpireproducts').addClass('disabled');
            $('#first-page-priceandexpireproducts').addClass('disabled');
            $('#pre-page-priceandexpireproducts').addClass('disabled');
            console.log('3');
        }
        if ($scope.currentPagePriceAndExpireProduct < totalPagePriceAndExpireProduct - 1 && $scope.currentPagePriceAndExpireProduct > 0) {
            $('#first-page-priceandexpireproducts').removeClass('disabled');
            $('#pre-page-priceandexpireproducts').removeClass('disabled');
            $('#next-page-priceandexpireproducts').removeClass('disabled');
            $('#final-page-priceandexpireproducts').removeClass('disabled');
            console.log('4');
        }
    }

    $scope.firstPagePriceAndExpireProduct = function () {
        if (!$('#first-page-priceandexpireproducts').hasClass('disabled')) {
            $scope.pagePriceAndExpireProduct = 0;
            $scope.currentPagePriceAndExpireProduct = $scope.pageLot;
            selectGetOrSearchPriceAndExpireProduct();
            $('#first-page-priceandexpireproducts').addClass('disabled');
            $('#pre-page-priceandexpireproducts').addClass('disabled');
            $('#next-page-priceandexpireproducts').removeClass('disabled');
            $('#final-page-priceandexpireproducts').removeClass('disabled');
        }
    };
    $scope.finalPagePriceAndExpireProduct = function () {
        if (!$('#final-page-priceandexpireproducts').hasClass('disabled')) {
            $scope.pagePriceAndExpireProduct = totalPagePriceAndExpireProduct - 1;
            selectGetOrSearchPriceAndExpireProduct();
            $scope.currentPagePriceAndExpireProduct = $scope.pagePriceAndExpireProduct;
            $('#first-page-priceandexpireproducts').removeClass('disabled');
            $('#pre-page-priceandexpireproducts').removeClass('disabled');
            $('#next-page-priceandexpireproducts').addClass('disabled');
            $('#final-page-priceandexpireproducts').addClass('disabled');
        }
    };

    $scope.prePagePriceAndExpireProduct = function () {
        if (!$('#first-page-priceandexpireproducts').hasClass('disabled')) {
            $scope.pagePriceAndExpireProduct--;
            selectGetOrSearchPriceAndExpireProduct();
            $scope.currentPagePriceAndExpireProduct = $scope.pagePriceAndExpireProduct;
            if ($scope.pagePriceAndExpireProduct === 0) {
                $('#first-page-priceandexpireproducts').addClass('disabled');
                $('#pre-page-priceandexpireproducts').addClass('disabled');
            }
            $('#next-page-priceandexpireproducts').removeClass('disabled');
            $('#final-page-priceandexpireproducts').removeClass('disabled');
        }
    };

    $scope.nextPagePriceAndExpireProduct = function () {
        if (!$('#final-page-priceandexpireproducts').hasClass('disabled')) {
            $scope.pagePriceAndExpireProduct++;
            selectGetOrSearchPriceAndExpireProduct();
            $scope.currentPagePriceAndExpireProduct = $scope.pagePriceAndExpireProduct;
            if ($scope.pagePriceAndExpireProduct === totalPagePriceAndExpireProduct - 1) {
                $('#next-page-priceandexpireproducts').addClass('disabled');
                $('#final-page-priceandexpireproducts').addClass('disabled');
            }
            $('#first-page-priceandexpireproducts').removeClass('disabled');
            $('#pre-page-priceandexpireproducts').removeClass('disabled');
        }

    };

    $scope.selectGetOrSearchPriceAndExpireProduct = function () {
        if (!!$scope.searchDataPriceAndExpireProduct.keyword) {
            $scope.searcDataContentPriceAndExpireProduct();
            totalPagesPriceAndExpireProduct();
        } else {
            $scope.pagePriceAndExpireProduct = 0;
            $scope.currentPagePriceAndExpireProduct = 0;
            loadPriceAndExpireProduct();
            getTotalListPriceAndExpireProduct();
        }
    };

    function selectGetOrSearchPriceAndExpireProduct() {
        if (!!$scope.searchDataPriceAndExpireProduct.keyword) {
            searcDataContentPriceAndExpireProduct();
        } else {
            loadPriceAndExpireProduct();
        }
    }

    $scope.searcDataContentPriceAndExpireProduct = function () {
        $scope.pagePriceAndExpireProduct = 0;
        $scope.currentPagePriceAndExpireProduct = 0;
        searcDataContentPriceAndExpireProduct();
    };

    function searcDataContentPriceAndExpireProduct() {
        console.log($scope.searchDataPriceAndExpireProduct);
        $http.post('/loadpriceandexpireproduct/searchpriceandexpireproduct', $scope.searchDataPriceAndExpireProduct, {params: {page: $scope.pagePriceAndExpireProduct, size: $scope.rowPriceAndExpireProduct}}).success(function (data) {

            if (data.content.length === 0 || $scope.searchDataPriceAndExpireProduct.keyword === "") {
                $('#modal-notfont').openModal();
                loadPriceAndExpireProduct();
            } else {
                $scope.priceAndExpireProducts = data;
                countSearchPriceAndExpireProduct();
            }
        });
    }

    function countSearchPriceAndExpireProduct() {
        $http.post('/countsearchpriceandexpireproduct', $scope.searchDataPriceAndExpireProduct).success(function (data) {
            totalListPriceAndExpireProduct = data;
            if (!data) {
                totalListPriceAndExpireProduct = 0;
            }
            totalPagesPriceAndExpireProduct();
        });
    }
    $scope.cancel = function () {
        totalPagesPriceAndExpireProduct();
        $('span#close-card').trigger('click');
    };

//===========================================================================================
    $scope.preScroll;
    $scope.priceAndExpireProductsDetail = {};
    $scope.moreDetail = function (paep) {
        $scope.preScroll = $(window).scrollTop();
        $scope.priceAndExpireProductsDetail = paep;
    };

    $scope.printProduct = function (id) {
        location.href = '/informationproduct/' + id;
    };

    $scope.printProducts = function () {
        location.href = '/printproducts';
    };


});


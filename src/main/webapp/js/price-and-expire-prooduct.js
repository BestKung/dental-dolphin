angular.module('priceAndExpireProduct', []);
angular.module('priceAndExpireProduct').controller('priceAndExpireProductController', function ($scope, $http) {

//paginLot var
    $scope.rowLot = 10;
    $scope.pageLot = 0;
    $scope.currentPageLot = 0;
    var totalPageLot = 0;
    var totalListLot = 0;
    $scope.searchDataLot = {};
    $scope.searchDataLot.keyword = "";
    $scope.lot = "";
    $scope.lots = {};
//===========================================================================================

// pagingProduct var
    $scope.rowProduct = 10;
    $scope.pageProduct = 0;
    $scope.currentPageProduct = 0;
    var totalPageProduct = 0;
    var totalListProduct = 0;
    $scope.searchDataProduct = {};
    $scope.searchDataProduct.keyword = "";
    $scope.product = "";
    $scope.products = {};
//===========================================================================================

// pagingPriceAndExpireProduct var
    $scope.rowPriceAndExpireProduct = 10;
    $scope.pagePriceAndExpireProduct = 0;
    $scope.currentPagePriceAndExpireProduct = 0;
    var totalPagePriceAndExpireProduct = 0;
    var totalListPriceAndExpireProduct = 0;
    $scope.searchDataPriceAndExpireProduct = {};
    $scope.searchDataPriceAndExpireProduct.keyword = "";
    $scope.priceAndExpireProducts = {};
    $scope.priceAndExpireProduct = {};
    $scope.priceAndExpireProduct.expire = new Date();
    $scope.priceAndExpireProduct.notificationsExpire = 30;
    $scope.priceAndExpireProductdelete = {};
    $scope.error = {};
//===========================================================================================


//paginLot
    function loadLot() {
        $http.get('/loadlotnondateout', {params: {page: $scope.pageLot, size: $scope.rowLot}}).success(function (data) {
            $scope.lots = data;
            console.log(data.content + '-------------------------------');
        }).error(function (data) {
        });
    }
    $scope.clickLot = function () {
        $scope.searchDataLot = {};
        $scope.searchDataLot.searchBy = 'Name';
        loadLot();
        $('#modal-lot').openModal();
        getTotalListLot();
        $scope.firstPageLot();
    };

    $scope.selectLot = function (lo) {
        $scope.priceAndExpireProduct.lot = lo;
        $scope.lot = lo.dateIn;
        $('#modal-lot').closeModal();
        $('#label-lot').addClass('active');
        $('#prefix-appointment-lot').css('color', '#00bcd4');
    };

    function getTotalListLot() {
        $http.get('/totallotnondateout').success(function (data) {
            totalListLot = data;
            totalPagesLot();
        });
    }

    function totalPagesLot() {
        console.log(totalListLot + ' total');
        var totalPagesLot = parseInt(totalListLot / $scope.rowLot);
        console.log(totalListLot + "tatalbefor");
        if ((totalListLot % $scope.rowLot) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPagesLot++;
        }
        totalPageLot = totalPagesLot;

        console.log(totalPageLot + "tatalafter");
        if ($scope.currentPageLot === 0) {
            $('#first-page-lot').addClass('disabled');
            $('#pre-page-lot').addClass('disabled');
            $('#next-page-lot').removeClass('disabled');
            $('#final-page-lot').removeClass('disabled');
            console.log('1..........');
        }
        if ($scope.currentPageLot === totalPageLot - 1) {
            $('#next-page-lot').addClass('disabled');
            $('#final-page-lot').addClass('disabled');
            $('#first-page-lot').removeClass('disabled');
            $('#pre-page-lot').removeClass('disabled');
            console.log('2');
        }
        if ($scope.currentPageLot === 0 && $scope.currentPageLot === totalPageLot - 1) {
            $('#next-page-lot').addClass('disabled');
            $('#final-page-lot').addClass('disabled');
            $('#first-page-lot').addClass('disabled');
            $('#pre-page-lot').addClass('disabled');
        }
        if ($scope.currentPageLot < totalPageLot - 1 && $scope.currentPageLot > 0) {
            $('#first-page-lot').removeClass('disabled');
            $('#pre-page-lot').removeClass('disabled');
            $('#next-page-lot').removeClass('disabled');
            $('#final-page-lot').removeClass('disabled');
            console.log('3');
        }
    }

    $scope.firstPageLot = function () {
        if (!$('#first-page-lot').hasClass('disabled')) {
            $scope.pageLot = 0;
            $scope.currentPageLot = $scope.pageLot;
            selectGetOrSearchLot();
            $('#first-page-lot').addClass('disabled');
            $('#pre-page-lot').addClass('disabled');
            $('#next-page-lot').removeClass('disabled');
            $('#final-page-lot').removeClass('disabled');
        }
    };
    $scope.finalPageLot = function () {
        if (!$('#final-page-lot').hasClass('disabled')) {
            $scope.pageLot = totalPageLot - 1;
            selectGetOrSearchLot();
            $scope.currentPageLot = $scope.pageLot;
            $('#first-page-lot').removeClass('disabled');
            $('#pre-page-lot').removeClass('disabled');
            $('#next-page-lot').addClass('disabled');
            $('#final-page-lot').addClass('disabled');
        }
    };

    $scope.prePageLot = function () {
        if (!$('#first-page-lot').hasClass('disabled')) {
            $scope.pageLot--;
            selectGetOrSearchLot();
            $scope.currentPageLot = $scope.pageLot;
            if ($scope.pageLot === 0) {
                $('#first-page-lot').addClass('disabled');
                $('#pre-page-lot').addClass('disabled');
            }
            $('#next-page-lot').removeClass('disabled');
            $('#final-page-lot').removeClass('disabled');
        }
    };

    $scope.nextPageLot = function () {
        if (!$('#final-page-lot').hasClass('disabled')) {
            $scope.pageLot++;
            selectGetOrSearchLot();
            $scope.currentPageLot = $scope.pageLot;
            if ($scope.pageLot === totalPageLot - 1) {
                $('#next-page-lot').addClass('disabled');
                $('#final-page-lot').addClass('disabled');
            }
            $('#first-page-lot').removeClass('disabled');
            $('#pre-page-lot').removeClass('disabled');
        }

    };

    function selectGetOrSearchLot() {
        if (!!$scope.searchDataLot.keyword) {
            searcDataContentLot();
            console.log('searchhhhh');
        } else {
            loadLot();
        }
    }

    $scope.searcDataContentLot = function () {
        $scope.pageLot = 0;
        $scope.currentPageLot = $scope.pageLot;
        searcDataContentLot();
    };

    function searcDataContentLot() {
        $http.post('/loadlot/searchlotnondateout', $scope.searchDataLot, {params: {page: $scope.pageLot, size: $scope.rowLot}}).success(function (data) {
            $scope.lots = data;
            countSearchLot();
        });
    }

    function countSearchLot() {
        $http.post('/countsearchlotnondateout', $scope.searchDataLot).success(function (data) {
            totalListLot = data;
            if (!data) {
                totalListLot = 0;
                console.log("nulle");
            }
            console.log(totalListLot);
            totalPagesLot();
        });
    }


//===========================================================================================
// pagingProduct
    function loadProduct() {
        $http.get('/loadlproduct', {params: {page: $scope.pageProduct, size: $scope.rowProduct}}).success(function (data) {
            $scope.products = data;
        }).error(function (data) {
        });
    }
    $scope.clickProduct = function () {
        $scope.searchDataProduct = {};
        $scope.searchDataProduct.searchBy = 'Name';
        loadProduct();
        $('#modal-product').openModal();
        getTotalListProduct();
        $scope.firstPageProduct();
    };

    $scope.selectProduct = function (pd) {
        $scope.priceAndExpireProduct.product = pd;
        $scope.product = pd.name;
        $('#modal-product').closeModal();
        $('#label-product').addClass('active');
        $('#prefix-appointment-product').css('color', '#00bcd4');
    };

    function getTotalListProduct() {
        $http.get('/totalproduct').success(function (data) {
            totalListProduct = data;
            totalPagesProduct();
        });
    }

    function totalPagesProduct() {
        console.log(totalListProduct + ' total');
        var totalPagesProduct = parseInt(totalListProduct / $scope.rowProduct);
        console.log(totalListProduct + "tatalbefor");
        if ((totalListProduct % $scope.rowProduct) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPagesProduct++;
        }
        totalPageProduct = totalPagesProduct;

        console.log(totalPageProduct + "tatalafter");
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
        }
        if ($scope.currentPageProduct < totalPageProduct - 1 && $scope.currentPageProduct > 0) {
            $('#first-page-product').removeClass('disabled');
            $('#pre-page-product').removeClass('disabled');
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
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
    $scope.finalPageEmployee = function () {
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

    function selectGetOrSearchProduct() {
        if (!!$scope.searchDataProduct.keyword) {
            searcDataContentProduct();
            console.log('searchhhhh');
        } else {
            loadProduct();
        }
    }

    $scope.searcDataContentProduct = function () {
        $scope.pageProduct = 0;
        $scope.currentPageProduct = $scope.pageProduct;
        searcDataContentProduct();
    };

    function searcDataContentProduct() {
        $http.post('/loadlproduct/searchproduct', $scope.searchDataProduct, {params: {page: $scope.pageProduct, size: $scope.rowProduct}}).success(function (data) {
            $scope.products = data;
            countSearchproducts();
        });
    }

    function countSearchproducts() {
        $http.post('/countsearchproduct', $scope.searchDataProduct).success(function (data) {
            totalListProduct = data;
            if (!data) {
                totalListProduct = 0;
                console.log("nulle");
            }
            console.log(totalListProduct);
            totalPagesProduct();
        });
    }


//===========================================================================================
// pagingPriceAndExpireProduct
    loadPriceAndExpireProduct();
    function  loadPriceAndExpireProduct() {
        $http.get('/loadpriceandexpireproduct', {params: {page: $scope.pagePriceAndExpireProduct, size: $scope.rowPriceAndExpireProduct}}).success(function (data) {
            $scope.priceAndExpireProducts = data;
        }).error(function (data) {
        });
    }
    $scope.savePriceAndExpireProduct = function () {
        if (!$scope.priceAndExpireProduct.statusNontificationValue) {
            $scope.priceAndExpireProduct.statusNontificationValue = '1';
        }
        if (!$scope.priceAndExpireProduct.statusNontificationExpire) {
            $scope.priceAndExpireProduct.statusNontificationExpire = '1';
        }
        $http.post('/savepriceandexpireproduct', $scope.priceAndExpireProduct).success(function (data) {
            loadPriceAndExpireProduct();
            getTotalListPriceAndExpireProduct();
            $scope.priceAndExpireProduct = {};
            $scope.product = "";
            $scope.lot = "";
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
        }).error(function (data) {
            $scope.error = data;
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
        });
    };

    $scope.clearData = function () {
        $scope.priceAndExpireProduct = {};
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };


    $scope.actionDelete = function (paep) {
        $scope.priceAndExpireProductdelete = paep;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deletePriceAndExpireProduct = function () {
        $http.post('/deletepriceandexpireproduct', $scope.priceAndExpireProductdelete).success(function (data) {
            loadPriceAndExpireProduct();
            $scope.priceAndExpireProduct = {};
        }).error(function (data) {

        });
    };

    $scope.updatePriceAndExpireProduct = function (paep) {
        $scope.priceAndExpireProduct.id = paep.id;
        $scope.priceAndExpireProduct.lot = paep.lot;
        $scope.priceAndExpireProduct.product = paep.product;
        $scope.priceAndExpireProduct.value = paep.value;
        $scope.priceAndExpireProduct.expire = new Date(paep.expire);
        $scope.priceAndExpireProduct.priceBuy = paep.priceBuy;
        $scope.priceAndExpireProduct.priceSell = paep.priceSell;
        $('#namedepartment').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

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

//===========================================================================================

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});



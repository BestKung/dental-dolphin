angular.module('bill', []);
angular.module('bill').controller('billController', function ($scope, $http) {

    $scope.bill = {};
    $scope.detailHeals = {};
    $scope.searchDataDetailHeal = {};
    $scope.currentPageDetailHeal = 0;
    $scope.dataSelectDetailHeal = {};
    $scope.products = {};
    $scope.searchDataProduct = {};
    $scope.currentPageProduct = 0;
    $scope.tmpProducts = {};
    $scope.valueProduct;
    $scope.totalPrice = 0;
    $scope.sequence = 0;
    $scope.bills = {};
    $scope.billMoreDetail = {};
    $scope.preScroll = 0;
    $scope.searchDataBill = {};
    $scope.currentPageBill = 0;
    $scope.row = 10;
    $scope.error = {};
    $scope.errorProduct = '';
    $scope.errorDateBill = '';

    var totalDetailHeal = 0;
    var totalPageDetailHeal = 0;
    var PageDetailHeal = 0;
    var totalProduct = 0;
    var totalPageProduct = 0;
    var pageProduct = 0;
    var user = '';
    var countTmpProduct = 0;
    var totalPriceDetailHeal = 0;
    var totalPriceProduct = 0;
    var totalBill = 0;
    var totalPageBill = 0;
    var pageBill = 0;
    var detailHealAndTmpProduct = {};
    var deleteProduct = {};


    $scope.saveBill = function () {
        saveBillSub();
    };

    function saveBillSub() {
        detailHealAndTmpProduct.detailHeal = $scope.bill.detailHeal;
        detailHealAndTmpProduct.day = $scope.bill.dateBill;
        detailHealAndTmpProduct.sumPrice = $scope.totalPrice;
        var products = [];
        for (var i = 0; i < countTmpProduct; i++) {
            products[i] = $scope.tmpProducts.content[i];
        }
        detailHealAndTmpProduct.tmpProducts = products;
        $http.post('/savebill', detailHealAndTmpProduct).success(function (data) {
            if (data == 1) {
                $scope.errorDateBill = 'กรุณากรอกวันที่ออกบิล';
                $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
            }
            if (data == 101) {
                $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                Materialize.toast('สินค้าไม่พอ', 3000, 'rounded');
            }
            if (data == 200) {
                console.log(data);
//                var tmpProducts = [];
//                for (var i = 0; i < countTmpProduct; i++) {
////                    $http.post('/deletetmpproduct', $scope.tmpProducts.content[i]);
//                    tmpProducts[i] = $scope.tmpProducts.content[i];
////                    console.log($scope.tmpProducts.content[i]);
////                    getUser();
//                }
//                $http.post('/deletetmpproductlist', tmpProducts);
                getBill();
                countBill();
                $scope.totalPrice = 0;
                $scope.bill = {};
                $scope.dataSelectDetailHeal = {};
                $('.update').removeClass('active');
                $('#bill-prefix-dateBill , #bill-prefix-id').css('color', 'black');
                $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
                detailHealAndTmpProduct = {};
                clearData();
            }
        }).error(function (data) {
            $scope.error = data;
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
        });

    }

    checkDate();
    function checkDate() {
        if (!!$scope.bill.dateBill || $scope.bill.dateBill == undefined) {
            $scope.bill.dateBill = new Date();
            $('#nameddatebill').addClass('active');
        }
    }

    getBill();
    function getBill() {
        $http.get('/getbill', {params: {page: pageBill, size: $scope.row}}).success(function (data) {
            $scope.bills = data;
        });
    }

    countBill();
    function countBill() {
        $http.get('/countbill').success(function (data) {
            totalBill = data;
            findTotalPageBill();
        });
    }

    $scope.searchBill = function () {
        searchBill();
        countSearchBill();
        pageBill = 0;
        $scope.currentPageBill = pageBill;
    };

    function searchBill() {
        $http.post('/searchBill', $scope.searchDataBill, {params: {page: pageBill, size: $scope.row}}).success(function (data) {
            $scope.bills = data;
        });
    }

    function countSearchBill() {
        $http.post('/countsearchbill', $scope.searchDataBill).success(function (data) {
            totalBill = data;
            findTotalPageBill();
        });
    }

    $scope.selectmMoreDetailBill = function (bill) {
        $('body,html').animate({scrollTop: 850}, "600");
        $scope.preScroll = $(window).scrollTop();
        $scope.billMoreDetail = bill;
        deleteProduct = bill;
    };

    $scope.cancel = function () {
        toPreScroll();
        $('span#close-card').trigger('click');
    };

    $scope.deleteBill = function () {
        $http.post('/deleteorderproduct', $scope.billMoreDetail).success(function (data) {
            $http.post('/deletebill', $scope.billMoreDetail).success(function (data) {
                getBill();
                $('span#close-card').trigger('click');
                toPreScroll();
                clearData();
            });
            Materialize.toast('ลบข้อมูลเรียบร้อย', 3000, 'rounded');
        });
    };

    $scope.clearData = function () {
        clearData();
    };

    function clearData() {
        getUser();
        for (var i = 0; i < countTmpProduct; i++) {
            $http.post('/deletetmpproduct', $scope.tmpProducts.content[i]);
            getUser();
        }
        $scope.bill = {};
        $scope.dataSelectDetailHeal = {};
        totalPriceDetailHeal = 0;
        totalPriceProduct = 0;
        $scope.totalPrice = 0;
        $('.update').removeClass('active');
        $('.clear-prefix').css('color', 'black');
        detailHealAndTmpProduct = {};
    }


    $scope.clickUpdateBill = function (bill) {
        var saveTmpProduct = {};
        $('.update').addClass('active');
        $('#bill-prefix-dateBill , #bill-prefix-id').css('color', '#00bcd4');
        $('span#close-card').trigger('click');
        $('body,html').animate({scrollTop: 0}, "600");

        $scope.billMoreDetail = bill;
        deleteProduct = bill;
        detailHealAndTmpProduct.dateUpdate = new Date(moment(new Date()).format('YYYY-MM-D'));

        detailHealAndTmpProduct.id = $scope.billMoreDetail.id;
        $scope.bill.id = $scope.billMoreDetail.id;
        detailHealAndTmpProduct.dateBill = new Date($scope.billMoreDetail.dateBill);
        $scope.bill.dateBill = new Date($scope.billMoreDetail.dateBill);
        detailHealAndTmpProduct.detailHeal = $scope.billMoreDetail.detailHeal;
        $scope.dataSelectDetailHeal = $scope.billMoreDetail.detailHeal;
        $scope.bill.detailHeal = $scope.billMoreDetail.detailHeal;
        detailHealAndTmpProduct.totalPrice = $scope.billMoreDetail.sumPrice;
        $scope.totalPrice = $scope.billMoreDetail.sumPrice;
        console.log($scope.totalPrice);
        saveTmpProduct = $scope.billMoreDetail;
        if ($scope.tmpProducts.content.length > 0) {
            for (var i = 0; i < countTmpProduct; i++) {
                $http.post('/deletetmpproduct', $scope.tmpProducts.content[i]);
                getUser();
            }
        }
//        var amountSelectProduct = 0;
//        for(var i = 0; i < saveTmpProduct.orderProduct.length; i++){
//            amountSelectProduct = amountSelectProduct + saveTmpProduct.orderProduct[i].value;
//        }
        for (var i = 0; i < saveTmpProduct.orderProduct.length; i++) {
            saveTmpProduct.orderProduct[i].id = undefined;
            saveTmpProduct.orderProduct[i].user = user.nameTh;
            $http.post('/savetmpproduct', saveTmpProduct.orderProduct[i]);

            if (saveTmpProduct.orderProduct[i].value > 1) {
                for (var j = 0; j < saveTmpProduct.orderProduct[i].value; j++) {
                    totalPriceProduct = totalPriceProduct + saveTmpProduct.orderProduct[i].priceAndExpireProduct.priceSell;
                }
            } else {
                totalPriceProduct = totalPriceProduct + saveTmpProduct.orderProduct[i].priceAndExpireProduct.priceSell;
            }
            getUser();
        }
        totalPriceDetailHeal = $scope.totalPrice - totalPriceProduct;
        console.log(totalPriceDetailHeal + '-------------------------price');
    };

    $scope.clickDeeteBill = function () {
        $('#modal-delete-bill').openModal();
    };

    function toPreScroll() {
        $('body,html').animate({scrollTop: $scope.preScroll}, "0");
    }

    $scope.toPreScroll = function () {
        toPreScroll();
    };

    $scope.selectGetOrSearchBill = function () {
        pageBill = 0;
        $scope.currentPageBill = pageBill;
        selectGetOrSearchBill();
        findTotalPageBill();
    };

    function selectGetOrSearchBill() {
        if (!!$scope.searchDataBill.keyword) {
            searchBill();
        } else {
            getBill();
        }
    }

    function findTotalPageBill() {
        var totalpages = parseInt(totalBill / $scope.row);
        if ((totalBill % $scope.row) != 0) {
            totalpages++;
        }
        totalPageBill = totalpages;
        if (totalPageBill == 1 || totalPageBill == 0) {
            $('#first-page-bill').addClass('disabled');
            $('#pre-page-bill').addClass('disabled');
            $('#next-page-bill').addClass('disabled');
            $('#final-page-bill').addClass('disabled');
        }
        if (totalPageBill > 1) {
            $('#first-page-bill').addClass('disabled');
            $('#pre-page-bill').addClass('disabled');
            $('#next-page-bill').removeClass('disabled');
            $('#final-page-bill').removeClass('disabled');
        }
        if (pageBill > 0 && pageBill < totalPageBill - 1) {
            $('#first-page-bill').removeClass('disabled');
            $('#pre-page-bill').removeClass('disabled');
            $('#next-page-bill').removeClass('disabled');
            $('#final-page-bill').removeClass('disabled');
        }
        if (pageBill > 0 && pageBill == totalPageBill - 1) {
            $('#first-page-bill').removeClass('disabled');
            $('#pre-page-bill').removeClass('disabled');
            $('#next-page-bill').addClass('disabled');
            $('#final-page-bill').addClass('disabled');
        }
    }

    $scope.firstPageBill = function () {
        if (!$('#first-page-bill').hasClass('disabled')) {
            pageBill = 0;
            $scope.currentPageBill = pageBill;
            selectGetOrSearchBill();
            if (pageBill == 0) {
                $('#first-page-bill').addClass('disabled');
                $('#pre-page-bill').addClass('disabled');
            }
            $('#next-page-bill').removeClass('disabled');
            $('#final-page-bill').removeClass('disabled');
        }
    };

    $scope.prePageBill = function () {
        if (!$('#first-page-bill').hasClass('disabled')) {
            pageBill--;
            $scope.currentPageBill = pageBill;
            selectGetOrSearchBill();
            if (pageBill == 0) {
                $('#first-page-bill').addClass('disabled');
                $('#pre-page-bill').addClass('disabled');
            }
            $('#next-page-bill').removeClass('disabled');
            $('#final-page-bill').removeClass('disabled');
        }
    };

    $scope.nextPageBill = function () {
        if (!$('#final-page-bill').hasClass('disabled')) {
            pageBill++;
            $scope.currentPageBill = pageBill;
            selectGetOrSearchBill();
            if (pageBill == totalPageBill - 1) {
                $('#next-page-bill').addClass('disabled');
                $('#final-page-bill').addClass('disabled');
            }
            $('#pre-page-bill').removeClass('disabled');
            $('#first-page-bill').removeClass('disabled');
        }
    };

    $scope.finalPageBill = function () {
        if (!$('#final-page-bill').hasClass('disabled')) {
            pageBill = totalPageBill - 1;
            $scope.currentPageBill = pageBill;
            selectGetOrSearchBill();
            if (pageBill == totalPageBill - 1) {
                $('#final-page-bill').addClass('disabled');
                $('#next-page-bill').addClass('disabled');
            }
            $('#pre-page-bill').removeClass('disabled');
            $('#first-page-bill').removeClass('disabled');
        }
    };



//////////////////////////////////// Start Product //////////////////////////////////////////////////////
    function getProduct() {
        $http.get('/loadpriceandexpireproduct', {params: {page: pageProduct, size: 10}}).success(function (data) {
            $scope.products = data;
        });
    }

    function countProduct() {
        $http.get('/totalpriceandexpireproduct').success(function (data) {
            totalProduct = data;
            findTotalPageProduct();
        });
    }

    $scope.deleteTmpProduct = function (del) {
        $scope.totalPrice = $scope.totalPrice - (del.priceAndExpireProduct.priceSell * del.value);
        $http.post('/deletetmpproduct', del).success(function (data) {
            console.log('delete success');
            getUser();
        });
    };

    getUser();
    function getUser() {
        $http.get('/startpagestaff').success(function (data) {
            user = data;
            getTmpProduct(user);
        });
    }

    function getTmpProduct(user) {
        $http.post('/gettmpproduct', user.nameTh).success(function (data) {
            countTmpProduct = data.totalElements;
            $scope.tmpProducts = data;

        });
    }

    loadPage();
    function loadPage() {
        $http.get('/startpagestaff').success(function (userName) {
            $http.post('/gettmpproduct', userName.nameTh).success(function (data) {
                if (data.totalElements > 0) {
                    for (var i = 0; i < data.totalElements; i++) {
                        $http.post('/deletetmpproduct', data.content[i]);
                        getUser(getUser);
                    }
                }
            });
        });
    }

    $scope.selectProductToBill = function (selectProduct, value) {
        var valueIsNan = false;
        if (value === undefined) {
            value = 0;
        }
        console.log(parseInt(value) + " " + !!valueIsNan);
        if (isNaN(parseInt(value)) || parseInt(value) <= 0) {
            valueIsNan = true;
            console.log(valueIsNan + "-------------->")
            $scope.errorProduct = 'ไม่สามรถเพิ่มสินค้าได้';
        }
        console.log(valueIsNan);
        if (!valueIsNan) {
            var tmpProduct = {};
            tmpProduct.priceAndExpireProduct = selectProduct;
            tmpProduct.value = value;
            tmpProduct.user = user.nameTh;
            tmpProduct.id = undefined;
            if (countTmpProduct > 0) {
                for (var i = 0; i < countTmpProduct; i++) {
                    if (selectProduct.id === $scope.tmpProducts.content[i].priceAndExpireProduct.id) {
                        tmpProduct = $scope.tmpProducts.content[i];
                        tmpProduct.value = parseInt($scope.tmpProducts.content[i].value) + parseInt(value);
                        tmpProduct.user = user.nameTh;
                    }
                }
            }
            $scope.totalPrice = $scope.totalPrice + value * selectProduct.priceSell;
            $http.post('/savetmpproduct', tmpProduct).success(function () {
                getUser();
                $('#modal-addproduct').closeModal();
                clearErrorProduct();
            });
        }
    };

    $scope.clearErrorProduct = function () {
        clearErrorProduct();
    };

    function clearErrorProduct() {
        $scope.errorProduct = '';
    }

    $scope.searchProduct = function () {
        pageProduct = 0;
        $scope.currentPageProduct = pageProduct;
        searchProduct();
        countSearchProduct();
    };

    function searchProduct() {
        $scope.searchDataProduct.searchBy = 'NameProduct';
        $http.post('/loadpriceandexpireproduct/searchpriceandexpireproduct', $scope.searchDataProduct, {params: {page: pageProduct, size: 10}}).success(function (data) {
            $scope.products = data;
        });
    }

    function countSearchProduct() {
        $scope.searchDataProduct.searchBy = 'NameProduct';
        $http.post('/countsearchpriceandexpireproduct', $scope.searchDataProduct).success(function (data) {
            totalProduct = data;
            findTotalPageProduct();
        });
    }

    function selectGetOrSearchProduct() {
        if (!!$scope.searchDataProduct.keyword) {
            searchProduct();
        } else {
            getProduct();
        }
    }

    function findTotalPageProduct() {
        var totalpages = parseInt(totalProduct / 10);
        if ((totalProduct % 10) != 0) {
            totalpages++;
        }
        totalPageProduct = totalpages;
        if (totalPageProduct == 1) {
            $('#first-page-product').addClass('disabled');
            $('#pre-page-product').addClass('disabled');
            $('#next-page-product').addClass('disabled');
            $('#final-page-product').addClass('disabled');
        }
        if (totalPageProduct > 1) {
            $('#first-page-product').addClass('disabled');
            $('#pre-page-product').addClass('disabled');
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
        }
    }

    $scope.firstPageProduct = function () {
        if (!$('#first-page-product').hasClass('disabled')) {
            pageProduct = 0;
            $scope.currentPageProduct = pageProduct;
            selectGetOrSearchProduct()
            if (pageProduct == 0) {
                $('#first-page-product').addClass('disabled');
                $('#pre-page-product').addClass('disabled');
            }
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
        }
    };

    $scope.prePageProduct = function () {
        if (!$('#first-page-product').hasClass('disabled')) {
            pageProduct--;
            $scope.currentPageProduct = pageProduct;
            selectGetOrSearchProduct()
            if (pageProduct == 0) {
                $('#first-page-product').addClass('disabled');
                $('#pre-page-product').addClass('disabled');
            }
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
        }
    };

    $scope.nextPageProduct = function () {
        if (!$('#final-page-product').hasClass('disabled')) {
            pageProduct++;
            $scope.currentPageProduct = pageProduct;
            selectGetOrSearchProduct()
            if (pageProduct == totalPageProduct - 1) {
                $('#next-page-product').addClass('disabled');
                $('#final-page-product').addClass('disabled');
            }
            $('#pre-page-product').removeClass('disabled');
            $('#first-page-product').removeClass('disabled');
        }
    };

    $scope.finalPageProduct = function () {
        if (!$('#final-page-product').hasClass('disabled')) {
            pageProduct = totalPageProduct - 1;
            $scope.currentPageProduct = pageProduct;
            selectGetOrSearchProduct()
            if (pageProduct == totalPageProduct - 1) {
                $('#final-page-product').addClass('disabled');
                $('#next-page-product').addClass('disabled');
            }
            $('#pre-page-product').removeClass('disabled');
            $('#first-page-product').removeClass('disabled');
        }
    };
//////////////////////////////////// End Product //////////////////////////////////////////////////////

//////////////////////////////////// Start DetailHeal //////////////////////////////////////////////////////
    function getDetailHeal() {
        $http.get('/loaddetailhealforbill', {params: {page: PageDetailHeal, size: 10}}).success(function (data) {
            $scope.detailHeals = data;
        });
    }

    $scope.selectDetailHeal = function (det) {
        console.log(totalPriceDetailHeal + '--------------2');
        console.log('taoal p ' + $scope.totalPrice);
        $scope.totalPrice = $scope.totalPrice - totalPriceDetailHeal;
//        if ($scope.totalPrice != 0) {
//            $scope.totalPrice = $scope.totalPrice - totalPriceDetailHeal;
//        }
        console.log($scope.totalPrice + '------------------------wow');
        totalPriceDetailHeal = 0;
        $scope.dataSelectDetailHeal = det;
        $scope.bill.detailHeal = det;
        for (var i = 0; i < det.orderHealDetailHeals.length; i++) {
            totalPriceDetailHeal = totalPriceDetailHeal + ((det.orderHealDetailHeals[i].listSelectHeal.price) * (det.orderHealDetailHeals[i].value));
            $scope.totalPrice = $scope.totalPrice + ((det.orderHealDetailHeals[i].listSelectHeal.price) * (det.orderHealDetailHeals[i].value));
        }
        $('#modal-detailheal').closeModal();
    };

    $scope.clearDetailHeal = function () {
        $scope.dataSelectDetailHeal = {};
        $scope.bill.detailHeal = undefined;
        $scope.totalPrice = $scope.totalPrice - totalPriceDetailHeal;
        totalPriceDetailHeal = 0;
    };

    function countDetailHeal() {
        $http.get('/countdetailhealforbill').success(function (data) {
            totalDetailHeal = data;
            findTotalPageDetailHeal();
        });
    }

    $scope.searchDetailHeal = function () {
        PageDetailHeal = 0;
        $scope.currentPageDetailHeal = PageDetailHeal;
        searchDetailHeal();
        countSearchDetailHeal();
    };

    function searchDetailHeal() {
        $http.post('/loaddetailheal/searchdetailhealforbill', $scope.searchDataDetailHeal, {params: {page: PageDetailHeal, size: 10}}).success(function (data) {
            $scope.detailHeals = data;
        });
    }

    function countSearchDetailHeal() {
        $http.post('/countsearchdetailhealforbill', $scope.searchDataDetailHeal).success(function (data) {
            totalDetailHeal = data;
            findTotalPageDetailHeal();
        });
    }

    function selectGetOrSearchDetailHeal() {
        if (!!$scope.searchDataDetailHeal.keyword) {
            searchDetailHeal();
        } else {
            getDetailHeal();
        }
    }

    function findTotalPageDetailHeal() {
        var totalpages = parseInt(totalDetailHeal / 10);
        if ((totalDetailHeal % 10) != 0) {
            totalpages++;
        }
        totalPageDetailHeal = totalpages;
        if (totalPageDetailHeal == 1) {
            $('#first-page-detailheal').addClass('disabled');
            $('#pre-page-detailheal').addClass('disabled');
            $('#next-page-detailheal').addClass('disabled');
            $('#final-page-detailheal').addClass('disabled');
        }
        if (totalPageDetailHeal > 1) {
            $('#first-page-detailheal').addClass('disabled');
            $('#pre-page-detailheal').addClass('disabled');
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }
    }

    $scope.firstPageDetailHeal = function () {
        if (!$('#first-page-detailheal').hasClass('disabled')) {
            PageDetailHeal = 0;
            $scope.currentPageDetailHeal = PageDetailHeal;
            selectGetOrSearchDetailHeal();
            if (PageDetailHeal == 0) {
                $('#first-page-detailheal').addClass('disabled');
                $('#pre-page-detailheal').addClass('disabled');
            }
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }
    };

    $scope.prePageDetailHeal = function () {
        if (!$('#first-page-detailheal').hasClass('disabled')) {
            PageDetailHeal--;
            $scope.currentPageDetailHeal = PageDetailHeal;
            selectGetOrSearchDetailHeal();
            if (PageDetailHeal == 0) {
                $('#first-page-detailheal').addClass('disabled');
                $('#pre-page-detailheal').addClass('disabled');
            }
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }
    };

    $scope.nextPageDetailHeal = function () {
        if (!$('#final-page-detailheal').hasClass('disabled')) {
            PageDetailHeal++;
            $scope.currentPageDetailHeal = PageDetailHeal;
            selectGetOrSearchDetailHeal();
            if (PageDetailHeal == totalPageDetailHeal - 1) {
                $('#next-page-detailheal').addClass('disabled');
                $('#final-page-detailheal').addClass('disabled');
            }
            $('#pre-page-detailheal').removeClass('disabled');
            $('#first-page-detailheal').removeClass('disabled');
        }
    };

    $scope.finalPageDetailHeal = function () {
        if (!$('#final-page-detailheal').hasClass('disabled')) {
            PageDetailHeal = totalPageDetailHeal - 1;
            $scope.currentPageDetailHeal = PageDetailHeal;
            selectGetOrSearchDetailHeal();
            if (PageDetailHeal == totalPageDetailHeal - 1) {
                $('#final-page-detailheal').addClass('disabled');
                $('#next-page-detailheal').addClass('disabled');
            }
            $('#pre-page-detailheal').removeClass('disabled');
            $('#first-page-detailheal').removeClass('disabled');
        }
    };
    //////////////////////////////////////// End DetailHeal //////////////////////////////////////////////////

    $scope.clickOrderHeal = function () {
        $('#modal-detailheal').openModal();
        getDetailHeal();
        countDetailHeal();
    };

    $scope.clickAddProduct = function () {
        $('#modal-addproduct').openModal();
        getProduct();
        countProduct();
    };

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});
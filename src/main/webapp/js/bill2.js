angular.module('bill', []);
angular.module('bill').controller('billController', function ($scope, $http) {

    $scope.priceAndExpireProducts = {};
    $scope.detailHeals = {};
    $scope.bills = {};
    $scope.bill = {};
    loadPriceAndExpireProduct();
    function  loadPriceAndExpireProduct() {
        $http.get('/loadpriceandexpireproduct').success(function (data) {
            $scope.priceAndExpireProducts = data;
        }).error(function (data) {
        });
    }

    loadDetailHeal();
    function loadDetailHeal() {
        $http.get('/loaddetailheal').success(function (data) {
            $scope.detailHeals = data;
        }).error(function (data) {
        });
    }


    $scope.idDatailHeal = {};
    $scope.orderDetailHeals = [];
    $scope.addrowSelectOrderHeal = function (nameDetailHeal) {
        $scope.idDatailHeal.detailHeal = nameDetailHeal;
        for (var i = 0; i < nameDetailHeal.orderHealDetailHeals.length; i++) {
            $scope.orderDetailHeals.push({
                'name': nameDetailHeal.orderHealDetailHeals[i].listSelectHeal.name,
                'value': nameDetailHeal.orderHealDetailHeals[i].value,
                'price': nameDetailHeal.orderHealDetailHeals[i].listSelectHeal.price
            });
        }
    };
    $scope.removeRowSelectOrderHeal = function (id) {
        console.log(id);
        $scope.orderDetailHeals = [];
    };
    $scope.orderProducts = [];
    $scope.addRowSelectProduct = function (nameProduct) {
        if (!$scope.nameProduct) {
            Materialize.toast('คุณไม่ระบุข้อมูล', 3000, 'rounded');
        } else {
            if ($scope.orderProducts.length === 0) {
                $scope.orderProducts.push({'priceAndExpireProduct': $scope.nameProduct,
                    'value': $scope.valueProduct});
                $scope.nameProduct = '';
                $scope.valueProduct = '';
            } else {
                var flag = false;
                var temp = 0;
                for (var i = 0; i < $scope.orderProducts.length; i++) {
                    if ($scope.orderProducts[i].priceAndExpireProduct.product.name === nameProduct.product.name) {
                        temp = Number($scope.orderProducts[i].value) + Number($scope.valueProduct);
                        $scope.orderProducts[i] = {'priceAndExpireProduct': $scope.nameProduct,
                            'value': temp};
                        $scope.nameProduct = '';
                        $scope.valueProduct = '';
                        flag = true;
                        break;
                    }
                }
                if (flag === false) {
                    $scope.orderProducts.push({'priceAndExpireProduct': $scope.nameProduct,
                        'value': $scope.valueProduct});
                    $scope.nameProduct = '';
                    $scope.valueProduct = '';
                }
            }
        }

    };
    
    $scope.deleteOrderBillProduct = [];
    $scope.updateOrderBillProduct = {};
    var count = 0;
    $scope.removeRowSelectProduct = function (name, id) {
        var index = -1;
        for (var i = 0; i < $scope.orderProducts.length; i++) {
            if ($scope.orderProducts[i].priceAndExpireProduct.product.name === name) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            Materialize.toast('บางอย่างผิดพลาด', 3000, 'rounded');
        }
        $scope.orderProducts.splice(index, 1);
        $scope.deleteOrderBillProduct[count] = id;
        count++;
    };
    
    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.orderDetailHeals.length; i++) {
            total += $scope.orderDetailHeals[i].price * $scope.orderDetailHeals[i].value;
        }
        for (var i = 0; i < $scope.orderProducts.length; i++) {
            total += $scope.orderProducts[i].priceAndExpireProduct.priceSell * $scope.orderProducts[i].value;
        }
        $scope.bill.sumPrice = total;
        return total;
    };
    loadBill();
    function loadBill() {
        $http.get('/loadbill').success(function (data) {
            $scope.bills = data;
        }).error(function (data, status, header, config) {

        });
    }

    $scope.saveBill = function () {
        count = 0;
         $scope.updateOrderBillProduct.orderBill = $scope.orderProducts;
         $scope.updateOrderBillProduct.id = $scope.deleteOrderBillProduct;
         console.log($scope.updateOrderBillProduct.id);
         console.log($scope.updateOrderBillProduct.orderBill);
        $http.post('/savebill', $scope.bill).success(function (data) {
            $http.post('/saveorderbill', $scope.updateOrderBillProduct).success(function (data) {
                $http.post('/saveiddetailheal', $scope.idDatailHeal).success(function (data) {
                    Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
                    $scope.orderProducts = [];
                    $scope.orderDetailHeals = [];
                    $scope.bill = {};
                    loadBill();
                }).error(function (data, status, header, config) {

                });
            }).error(function (data, status, header, config) {

            });
        }).error(function (data, status, header, config) {
            Materialize.toast('คุณกรอกข้อมูลไม่เรียบร้อย', 3000, 'rounded');
        });
    };
    $scope.clearData = function () {
        $scope.orderProducts = [];
        $scope.orderDetailHeals = [];
        $scope.bill = {};
        $('#namedepartment').removeClass('active');
    };
    $scope.seeBill = {};
    $scope.seeBilldetailheal = {};
    $scope.seeDetailBill = function (bs) {
        $scope.preScroll = $(window).scrollTop();
        $scope.seeBill = bs;
        for (i = 0; i < bs.orderBills.length; i++) {
            if (!!bs.orderBills[i].detailHeal) {
                $scope.seeBilldetailheal = bs.orderBills[i];
            }
        }
    };
    $scope.deleteBill = function () {
        $http.post('/deletebill', $scope.seeBill).success(function (data) {
            Materialize.toast('ลบข้อมูลเรียบร้อย', 3000, 'rounded');
            loadBill();
            $('span#close-card').trigger('click');
        }).error(function (data) {

        });
    };

    $scope.updateBill = function (seeBill) {
        $('body,html').animate({scrollTop: 0}, "600");
        $scope.bill.id = seeBill.id;
        $scope.bill.dateBill = new Date(seeBill.dateBill);
        var order = [];

        for (i = 0; i < seeBill.orderBills.length; i++) {
            if (!!seeBill.orderBills[i].detailHeal) {
                order = seeBill.orderBills[i].detailHeal.orderHealDetailHeals;
            }
            for (j = 0; j < order.length; j++) {
                $scope.orderDetailHeals[j] = ({
                    'name': order[j].listSelectHeal.name,
                    'value': order[j].value,
                    'price': order[j].listSelectHeal.price
                });
            }

        }

        for (i = 0; i < seeBill.orderBills.length; i++) {
            if (!!seeBill.orderBills[i].priceAndExpireProduct) {
                $scope.orderProducts[i] = seeBill.orderBills[i];
            }
        }

        $('#nameddatebill').addClass('active');
    };


    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
    $(document).ready(function () {
        $('.modal-trigger').leanModal();
    });
    $scope.preScroll = 0;
    function toPreScroll() {
        $('body,html').animate({scrollTop: $scope.preScroll}, "0");
    }

    $scope.toPreScroll = function () {
        toPreScroll();
    };
    $scope.cancel = function () {
        toPreScroll();
        $('span#close-card').trigger('click');
    };
});



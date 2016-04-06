angular.module('order', []);
angular.module('order').controller('orderController', function ($scope, $http) {
    $scope.medicalSupplie = {};
    $scope.tmpOrders = {};
    $scope.order = {};
    $scope.orders = {};
    var tmpOrdersCount = 0;
    $scope.order.total = 0;
    $scope.pageOrder = 0;
    $scope.sizeOrder = 10;
    $scope.currentPage = 0;
    $scope.totalOrder = 0;
    $scope.error = '';
    var totalPage;
    var page = 0;
    $scope.search;

    $scope.saveTmpOrder = function () {

        $http.get('/startpagestaff').success(function (login) {
            $scope.medicalSupplie.doctorId = login.id;
            $http.post('/savetmporder', $scope.medicalSupplie).success(function (data) {
                getTmpOrder();
                if ($scope.medicalSupplie.price != undefined && $scope.medicalSupplie.value != undefined) {
                    $scope.order.total += ($scope.medicalSupplie.price * $scope.medicalSupplie.value);
                }
                clear();
            });
        });
    };

    function getTmpOrder() {
        $http.get('/startpagestaff').success(function (login) {
            $http.post('/gettmporder', login.id, {params: {size: 100, page: 0}}).success(function (data) {
                $scope.tmpOrders = data;
            });
        });
    }

    getTmpOrderOnLoad();
    function getTmpOrderOnLoad() {
        $http.get('/startpagestaff').success(function (login) {
            $http.post('/gettmporder', login.id, {params: {size: 100, page: 0}}).success(function (data) {
                $scope.tmpOrders = data;
                for (var i = 0; i < data.content.length; i++) {
                    if (data.content[i].price != undefined && data.content[i].value != undefined) {
                        $scope.order.total += (parseFloat(data.content[i].price) * parseFloat(data.content[i].value));
                    }
                }
            });
        });
    }

    function clear() {
        $scope.medicalSupplie = {};
    }
    ;
    $scope.clear = function () {
        $scope.medicalSupplie = {};
        for (var i = 0; i < $scope.tmpOrders.content.length; i++) {
            $http.post('/deletetmporder', $scope.tmpOrders.content[i]).success(function (data) {
                getTmpOrder();
            });
        }
        $scope.order.total = 0;
    };
    $scope.deleteTmpProduct = function (dataProduct) {
        $http.post('/deletetmporder', dataProduct).success(function (data) {
            if (dataProduct.price != undefined && dataProduct.price != undefined) {
                $scope.order.total -= (parseFloat(dataProduct.price) * parseFloat(dataProduct.price));
            }
            getTmpOrder();
        });
    };
    $scope.saveOrder = function () {
        var orderMedicalSupplie = {};
        orderMedicalSupplie.orderMedicalSupplie = $scope.order;
        orderMedicalSupplie.medicalSupplies = $scope.tmpOrders.content;
        $http.post('/saveordermedical', orderMedicalSupplie).success(function (data) {
            console.log($scope.tmpOrders.content.length + '===========');
            for (var i = 0; i < $scope.tmpOrders.content.length; i++) {
                $http.post('/deletetmporder', $scope.tmpOrders.content[i]).success(function (data) {
                    getTmpOrder();
                });
            }
            getOrder();
            $scope.order.total = 0;
        });
    };
    getOrder();
    function getOrder() {
        $http.get('/getorder', {params: {size: $scope.sizeOrder, page: page}}).success(function (data) {
            $scope.orders = data;
            countOrder();
        });
    }

    $scope.deleteOrder = function (order) {
        $http.post('/deleteorder', order).success(function (data) {
            getOrder();
        });
    };
    $scope.searchOrder = function () {
        searchOrder();
    };
    function searchOrder() {
        $http.post('/searchorder', $scope.search, {params: {size: $scope.sizeOrder, page: page}}).success(function (data) {
            console.log(data);
            $scope.orders = data;
        });
    }
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
    countOrder();
    function countOrder() {
        $http.get('/countordermedicalsupplies').success(function (data) {
            $scope.totalOrder = data;
            findTotalPage();
        });
    }

    function countSearch() {
        $http.post('/countsearchorder', $scope.search).success(function (data) {
            $scope.totalOrder = data;
            findTotalPage();
        });
    }

    function selectGetOrSearch() {
        if (!!$scope.search.keyword) {
            searchOrder();
        } else {
            getOrder();
        }
    }

    $scope.selectGetOrSearch = function () {
        selectGetOrSearch();
    };
    function findTotalPage() {
        var totalpages = parseInt($scope.totalOrder / $scope.sizeOrder);
        if (($scope.totalOrder % $scope.sizeOrder) != 0) {
            totalpages++;
        }
        totalPage = totalpages;
        console.log($scope.totalOrder % $scope.sizeOrder);
        if (totalpages == 1 || totalpages < 1) {
            $('#order-first-page').addClass('disabled');
            $('#order-pre-page').addClass('disabled');
            $('#order-next-page').addClass('disabled');
            $('#order-final-page').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#order-first-page').addClass('disabled');
            $('#order-pre-page').addClass('disabled');
        }
    }



    $scope.firstPage = function () {
        if (!$('#order-first-page').hasClass('disabled')) {
            page = 0;
            $scope.currentPage = page;
            selectGetOrSearch();
            if (page == 0) {
                $('#order-first-page').addClass('disabled');
                $('#order-pre-page').addClass('disabled');
            }
            $('#order-next-page').removeClass('disabled');
            $('#order-final-page').removeClass('disabled');
        }
    };
    $scope.prePage = function () {
        if (!$('order-#first-page').hasClass('disabled')) {
            page--;
            $scope.currentPage = page;
            selectGetOrSearch();
            if (page == 0) {
                $('#order-first-page').addClass('disabled');
                $('#order-pre-page').addClass('disabled');
            }
            $('#order-next-page').removeClass('disabled');
            $('#order-final-page').removeClass('disabled');
        }
    };
    $scope.nextPage = function () {
        if (!$('#order-final-page').hasClass('disabled')) {
            page++;
            $scope.currentPage = page;
            selectGetOrSearch();
            if (page == totalPage - 1) {
                $('#order-next-page').addClass('disabled');
                $('#order-final-page').addClass('disabled');
            }
            $('#order-pre-page').removeClass('disabled');
            $('#order-first-page').removeClass('disabled');
        }
    };
    $scope.finalPage = function () {
        if (!$('#order-final-page').hasClass('disabled')) {
            page = totalPage - 1;
            $scope.currentPage = page;
            selectGetOrSearch();
            if (page == totalPage - 1) {
                $('#order-final-page').addClass('disabled');
                $('#order-next-page').addClass('disabled');
            }
            $('#order-pre-page').removeClass('disabled');
            $('#order-first-page').removeClass('disabled');
        }
    };

    $scope.printOrder = function (data) {
        location.href = "/printorder/" + data;
    };
});
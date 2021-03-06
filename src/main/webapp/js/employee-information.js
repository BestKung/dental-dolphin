angular.module('employee-information', []);
angular.module('employee-information').controller('employeeInformationController', function (employeeService, $scope, $http) {
    $scope.employees = {};
    $scope.row = 10;
    $scope.currentPage = 1;
    $scope.searchData = {};
    $scope.preScroll = 0;
    $scope.employeeDetail = {};
    $scope.selectEmployee = {};
    $scope.page = 0;
    var page = 0;
    var totalPage = 0;
    var preCard = 0;
    var employeeImage = {};
    var totalEmployees = getTotalEmployee();

    checkMobile();
    function checkMobile() {
        var $mobile = $(window).outerWidth() < 995;
        if ($mobile) {
            $('th').removeAttr('style');
            $('.topic-detail').css('fontSize', 13);
        }
    }

    var pageRole = true;
    startPageStaff();
    function startPageStaff() {
        $http.get('/startpagestaff').success(function (data) {
            $scope.login = data;
            manageEmployee(data);
        });
    }

    function manageEmployee(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'ผู้ดูเเลระบบ') {
                pageRole = false;
            }
        }
        if (pageRole) {
            location.href = '/';
        }

    }

    getEmployees();
    function getEmployees() {
        $http.get('/staffs', {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            $scope.employees = data;
            getTotalEmployee();
        });
    }



    getTotalEmployee();
    function getTotalEmployee() {
        $http.get('/totalstaff').success(function (data) {
            totalEmployees = data;
            totalPages();

        });
    }

    function searchStaffCount() {
        $http.post('/searchstaff/count', $scope.searchData).success(function (data) {
            totalEmployees = data;
            totalPages();
            console.log('count search' + data);
        });
    }
    ;


    function totalPages() {
        console.log('Total employee' + totalEmployees);
        var totalPages = parseInt(totalEmployees / $scope.row);
        if ((totalEmployees % $scope.row) != 0) {
            totalPages++;
        }
        totalPage = totalPages;
        console.log("totalpage = " + totalPage);
        if (totalPage == 1) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
        }
        if ($scope.currentPage == 1 && totalPage > 0) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
        if ($scope.currentPage == totalPage) {
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
        }

    }

    $scope.getEmployees = function () {
        $scope.page = 0;
        $scope.currentPage = 1;
        getEmployees();
        totalPages();
    };

    $scope.searcEmployee = function () {
        console.log('search');
        $http.post('/searchstaff', $scope.searchData, {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            console.log(data);
//            if(data.length == 1){
//                
//            }
            if (data.content.length == 0 || $scope.searchData.keyword == "") {
                $('#modal-notfont').openModal();
                getEmployees();
            } else {
                $scope.employees = data;
                searchStaffCount();
            }
        }).error(function (data) {

        });
    };

    function searcEmployee() {
        $http.post('/searchstaff', $scope.searchData, {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            $scope.employees = data;
        });
    }

    $scope.detailEmployee = function (emp) {
        $scope.preScroll = $(window).scrollTop();
        $('body,html').animate({scrollTop: 400}, "00");
        $scope.employeeDetail = emp;
        console.log(emp.staffPicture);
        $scope.employeeDetail.age = new Date().getFullYear() - new Date($scope.employeeDetail.birthDate).getFullYear();
        var topic = document.getElementsByClassName('topic-detail');
        for (var i = 0; i < topic.length; i++) {
            if (topic[i].innerHTML == "") {
                topic[i].innerHTML = '-';
            }
        }
        console.log(emp.staffPicture);
        if (!!emp.staffPicture) {
            console.log('has image');
            document.getElementById('img-employee').src = "data:image/jpg;base64," + emp.staffPicture.contentImage;
        } else {
            $http.get('/getnoimage').success(function (data) {
                console.log(data);
                console.log('error');
                document.getElementById('img-employee').src = "data:image/jpg;base64," + data.contentImage;
            });
        }
    };


    $scope.clickDelete = function (emp) {
        $('#modal-delete').openModal({dismissible: false});
        console.log('click Delete : ' + emp);
        $scope.selectEmployee = emp;
    };

    $scope.updateEmployee = function (emp) {
        employeeService.employeeUpdate = emp;
        console.log(emp);
        location.href = '#/employee';
    };

    $scope.deleteEmployee = function () {
        $http.post('/deletestaff', $scope.selectEmployee).success(function (data) {
            Materialize.toast('ลบข้อมูลเรียบร้อย', 3000, 'rounded');
            $scope.selectEmployee = {};
            selectGetOrSearch();
//            toPreScroll();
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            $('span#close-card').trigger('click');

        }).error(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
            if (data.message.split(';')[2].substring(14, 16) == 'FK') {
                $('#modal-fk').openModal();
            }
        });
        $('i#close-card').trigger('click');
    };

    $scope.cancel = function () {
        toPreScroll();
        $('span#close-card').trigger('click');
    };

    function toPreScroll() {
        $('body,html').animate({scrollTop: $scope.preScroll}, "0");
    }

    $scope.toPreScroll = function () {
        toPreScroll();
    };


    $scope.selectGetOrSearch = function () {
        selectGetOrSearch();
    };

    $scope.selectSize = function () {
        $scope.page = 0;
        $scope.currentPage = 1;
        if (!!$scope.searchData.keyword) {
            searcEmployee();
            searchStaffCount();
        } else {
            getEmployees();
            getTotalEmployee();
        }
    };

    function selectGetOrSearch() {
        if (!!$scope.searchData.keyword) {
            searcEmployee();
        } else {
            getEmployees();
        }
    }

    $scope.firstPage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            $scope.page = 0;
            selectGetOrSearch();
            $scope.currentPage = 1;
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    $scope.prePage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            $scope.page--;
            selectGetOrSearch();
            $scope.currentPage = $scope.page + 1;
            if ($scope.page == 0) {
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
            console.log($scope.page + " || " + totalPage);
            if ($scope.page == totalPage - 1) {
                $('#next-page').addClass('disabled');
                $('#final-page').addClass('disabled');
            }
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
        }

    };

    $scope.finalPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            console.log('final' + totalPage);
            $scope.page = totalPage - 1;
            selectGetOrSearch();
            $scope.currentPage = totalPage;
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
        }
    };


    $scope.printEmployee = function (id) {
        location.href = '/personalinformationstaff/' + id;
    };

    $scope.printEmployees = function () {
        location.href = '/printemployees';
    };

});
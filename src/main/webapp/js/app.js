var app = angular.module('app', ['checklist-model', 'ngRoute', 'employee', 'department'
            , 'employee-information', 'doctor', 'doctor-information', 'patient'
            , 'bill', 'detailHeal', 'listSelectHeal', 'priceAndExpireProduct', 'product', 'typeProduct', 'unitProduct', 'lot',
    'patient-information', 'appointment', 'notifications', 'calendarPatient', 'calendarDoctor'
            , 'reportproduct', 'reportappointment', 'reportcustomer', 'reportemployee', 'reportdoctor', 'workcalendar', 'reportremainproduct',
    'order', 'room', 'queue', 'record-keeping']);
var app = angular.module('app');
app.controller('homeController', function ($scope, $http) {
    $scope.login = {};
    $scope.image;
    $scope.clinic = {};
    checkMobile();
    $scope.numberOfNontification = 0;
    $scope.totalNontification = 0;
    $scope.manageEmployee = false;
    $scope.manageDoctor = false;
    $scope.managePatient = false;
    $scope.manageHeal = false;
    $scope.manageProduct = false;
    $scope.manageBill = false;
    $scope.viewWorkCalendar = true;
    $scope.isAdmin = false;
    $scope.employeeOrAdmin = false;
    var nontification = false;
    $scope.nontiClick = false;
    $scope.showNontification = false;
    $scope.password = '';
    function  checkMobile() {
        var $mobile = $(window).outerWidth() < 995;
        if ($mobile) {
            $('#nav-topic').css('display', 'none');
            $('body').css('overflow-y', 'hidden');
            $('#view').removeAttr('style').addClass('.margin-top');
        }
    }

    startPageStaff();
    function startPageStaff() {
        $http.get('/startpagestaff').success(function (data) {
            $scope.login = data;
            manageEmployee(data);
            manageDoctor(data);
            managePatient(data);
            manageHeal(data);
            manageProduct(data);
            manageBill(data);
            viewWorkCalendar(data);
            isAdmin(data);
            employeeOrAdmin(data);
            console.log(!data.ChangePasswordStatus);

            if (!data.changePasswordStatus) {
                $('#modal-changepassword').openModal({dismissible: false});
                $('.update').addClass('active');
                $('.clear-prefix').css('color', '#00bcd4')
                if (($scope.login.type == 'Staff') || ($scope.login.type == 'staff')) {
                    saveFirstLoginStaff();
                } else if (($scope.login.type == 'Doctor') || ($scope.login.type == 'doctor')) {
                    saveFirstLoginDoc();
                } else {
                    saveFirstLoginStaff();
                }
            }
        });
    }

    $scope.changcolor = function () {
        $('.color1').toggleClass('color2');
        $('.text-sky').toggleClass('text-sky-grann');
    };
    $scope.clickLogout = function () {
        if (!!$scope.login.id) {
            location.href = "/logout";
        }
    };
    //======================================================= Nontification ==================================================================
    getAppointment();
    function getAppointment() {
        $http.get('/appointmentnontificationcount').success(function (data) {
            $scope.totalNontification = $scope.totalNontification + data;
            if (data > 0) {
                nontification = true;
            }
        });
    }

    getOutProduct();
    function getOutProduct() {
        $http.get('/getoutproductnonacknowledge').success(function (data) {
            $scope.totalNontification = $scope.totalNontification + data;
            if (data > 0) {
                nontification = true;
            }
        });
    }

    getExpiredate();
    function getExpiredate() {
        $http.get('/countnontificationexpiredate').success(function (data) {
            $scope.totalNontification = $scope.totalNontification + data;
            if (data > 0) {
                nontification = true;
            }
        });
    }

    setInterval(function () {
        $scope.numberOfNontification = $scope.totalNontification;
        getAppointment();
        getOutProduct();
        getExpiredate();
        $scope.totalNontification = 0;
        $scope.showNontification = $scope.numberOfNontification > 0;
    }, 2000);
    $(document).ready(function () {
        $('.slider').slider({full_width: true});
    });
    $scope.clickClinicInformation = function () {
        getClinic();
        $('#modal-clinic-information').openModal({dismissible: false});
    };
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#logo').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#input-clinic-picture').change(function () {
        readURL(this);
    });
    $scope.saveFile = function () {
        var fd = new FormData();
        fd.append('file', $scope.image);
        $http.post('/saveclinicimage', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (data) {
        });
    };
    $scope.saveClinic = function () {
        $http.post('/saveClinicInformation', $scope.clinic).success(function (data) {
            getClinic();
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('บันทึกสำเร็จ', 3000, 'rounded');
        });
    };
    function getClinic() {
        $http.get('/getclinic').success(function (data) {
            $scope.clinic = data;
            if (!!data.logo) {
                document.getElementById('logo').src = "data:image/jpg;base64," + data.logo;
            } else {
                document.getElementById('logo').src = '../image/nologo.png';
            }
            if (!!data) {
                $('.update').addClass('active');
                $('.clinic').css('color', '#00bcd4');
            }
        });
    }

    $('#time-opentime input').ptTimeSelect({
        zIndex: 3000,
        onClose: function (i) {
            $scope.clinic.openTime = $(i).val() + "";
            $('#label-starttime').addClass('active');
            $('#prefix-starttime').addClass('active');
        }
    });
    $('#time-closetime input').ptTimeSelect({
        zIndex: 3000,
        onClose: function (i) {
            $scope.clinic.closeTime = $(i).val() + "";
            $('#label-starttime').addClass('active');
            $('#prefix-starttime').addClass('active');
        }
    });
    function manageEmployee(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'ผู้ดูเเลระบบ') {
                $scope.manageEmployee = true;
            }
        }

    }
    function manageDoctor(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'ผู้ดูเเลระบบ') {
                $scope.manageDoctor = true;
            }
        }
    }
    function managePatient(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'จัดการข้อมูลคนไข้' || data.roles[i].role == 'ผู้ดูเเลระบบ') {
                $scope.managePatient = true;
            }
        }
    }
    function manageHeal(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'จัดการข้อมูลการรักษา' || data.roles[i].role == 'ผู้ดูเเลระบบ') {
                $scope.manageHeal = true;
            }
        }
    }
    function manageProduct(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'จัดการข้อมูลเวชภัณฑ์' || data.roles[i].role == 'ผู้ดูเเลระบบ') {
                $scope.manageProduct = true;
            }
        }
    }
    function manageBill(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'จัดการข้อมูลบิล' || data.roles[i].role == 'ผู้ดูเเลระบบ') {
                $scope.manageBill = true;
            }
        }
    }
    function viewWorkCalendar(data) {
        if (data.roles.length > 0) {
            $scope.viewWorkCalendar = false;
        }
    }
    function isAdmin(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'ผู้ดูเเลระบบ') {
                $scope.isAdmin = true;
            }
        }
    }
    function employeeOrAdmin(data) {
        if (data.roles.length > 0) {
            $scope.employeeOrAdmin = true;
        }
    }

    $scope.comparePassword = function () {
        if ((!!$scope.password) && (!!$scope.login.password)) {
            if ($scope.password == $scope.login.password) {
                $('#confirm').css('color', '#64dd17');
                $('#confirm').html('done');
            }
            if ($scope.password != $scope.login.password) {
                $('#confirm').css('color', 'red');
                $('#confirm').html('clear');
            }
        } else {
            $('#confirm').html('');
        }
    };
    function saveFirstLoginStaff() {
        $scope.login.forgotPassword = '1';
        $scope.login.changePasswordStatus = '1';
        $http.post('/savestaff', $scope.login)
                .success(function (data) {
                    console.log('save success');
                });
    }

    function saveFirstLoginDoc() {
        $scope.login.forgotPassword = '1';
        $scope.login.changePasswordStatus = '1';
        $http.post('/savedoctor', $scope.login)
                .success(function (data) {
                    console.log('save success');
                });
    }


    $scope.selectSave = function () {
        if (($scope.login.type == 'Staff') || ($scope.login.type == 'staff')) {
            saveFirstLoginStaff();
        } else {
            saveFirstLoginDoc();
        }
        $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
        Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
    };
    $scope.removeBlackGround = function () {
        $("#materialize-lean-overlay-1").removeClass('lean-overlay');
    };
    function confirmPassword() {
        if (($scope.password == $scope.login.password) || (!$scope.password) || (!$scope.login.password)) {
            return true;
        }
        if ($scope.password != $scope.login.password) {
            return false;
        }
    }

    $scope.changeDataModal = function () {
        $('#modal-changepassword').openModal({dismissible: false});
        $('.update').addClass('active');
        $('.clear-prefix').css('color', '#00bcd4');
    };
}


);
app.factory('employeeService', function () {
    return {
        employeeUpdate: {}, doctorUpdate: {}
    };
});
app.factory('patientService', function () {
    return {
        patienUpdate: {}
    };
});
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: 'pages/home.html'
    }).when('/employee', {
        controller: 'employeeController',
        templateUrl: 'pages/employee.html'
    }).when('/department', {
        controller: 'departmentController',
        templateUrl: 'pages/department.html'
    }).when('/employee/information', {
        controller: 'employeeInformationController',
        templateUrl: 'pages/employee-information.html'
    }).when('/doctor', {
        controller: 'doctorController',
        templateUrl: 'pages/doctor.html'
    }).when('/doctor/information', {
        controller: 'doctorInformationController',
        templateUrl: 'pages/doctor-information.html'
    }).when('/patient', {
        controller: 'patientController',
        templateUrl: 'pages/patient.html'
    }).when('/listselectheal', {
        controller: 'listSelectHealController',
        templateUrl: 'pages/listselectheal.html'
    }).when('/detailheal', {
        controller: 'detailHealController',
        templateUrl: 'pages/detailheal.html'
    }).when('/unitproduct', {
        controller: 'unitProductController',
        templateUrl: 'pages/unitproduct.html'
    }).when('/typeproduct', {
        controller: 'typeProductController',
        templateUrl: 'pages/typeproduct.html'
    }).when('/lot', {
        controller: 'lotController',
        templateUrl: 'pages/lot.html'
    }).when('/product', {
        controller: 'productController',
        templateUrl: 'pages/product.html'
    }).when('/price-and-expire-prooduct', {
        controller: 'priceAndExpireProductController',
        templateUrl: 'pages/price-and-expire-prooduct.html'
    }).when('/bill', {
        controller: 'billController',
        templateUrl: 'pages/bill.html'
    }).when('/patient/information', {
        controller: 'patientInformationController',
        templateUrl: 'pages/patient-information.html'
    }).when('/appointment', {
        controller: 'appointmentController',
        templateUrl: 'pages/appointment.html'
    }).when('/notification', {
        controller: 'notificationsController',
        templateUrl: 'pages/notification.html'
    }).when('/calendarpatient', {
        controller: 'calendarPatientController',
        templateUrl: 'pages/calendarpatient.html'
    }).when('/calendardoctor', {
        controller: 'calendarDoctorController',
        templateUrl: 'pages/calendardoctor.html'
    }).when('/reportemployee', {
        controller: 'reportEmployeeController',
        templateUrl: 'pages/reportemployee.html'
    }).when('/reportdoctor', {
        controller: 'reportDoctorController',
        templateUrl: 'pages/reportdoctor.html'
    }).when('/reportappointment', {
        controller: 'reportcAppointmentController',
        templateUrl: 'pages/reportappointment.html'
    }).when('/reportproduct', {
        controller: 'reportProductController',
        templateUrl: 'pages/reportproduct.html'
    }).when('/reportcustomer', {
        controller: 'reportCustomerController',
        templateUrl: 'pages/reportcustomer.html'
    }).when('/workcalendar', {
        controller: 'workcalendarControllers',
        templateUrl: 'pages/workcalendar.html'
    }).when('/reportremainproduct', {
        controller: 'reportremainproductController',
        templateUrl: 'pages/reportremainproduct.html'
    }).when('/order', {
        controller: 'orderController',
        templateUrl: 'pages/order.html'
    }).when('/room', {
        controller: 'roomController',
        templateUrl: 'pages/room.html'
    }).when('/queue', {
        controller: 'queueController',
        templateUrl: 'pages/queue.html'
    }).when('/record-keeping', {
        controller: 'recordController',
        templateUrl: 'pages/record-keeping.html'
    })
            .otherwise({
                redirectTo: '/'
            });
});
app.directive('fileModel', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});
app.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});
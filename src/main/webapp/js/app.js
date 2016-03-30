var app = angular.module('app', ['checklist-model', 'ngRoute', 'employee', 'department'
            , 'employee-information', 'doctor', 'doctor-information', 'patient'
            , 'bill', 'detailHeal', 'listSelectHeal', 'priceAndExpireProduct', 'product', 'typeProduct', 'unitProduct', 'lot',
    'patient-information', 'appointment', 'notifications', 'calendarPatient', 'calendarDoctor']);
var app = angular.module('app');

app.controller('homeController', function ($scope, $http) {
    $scope.login = {};
    $scope.image;
    $scope.clinic = {};
    checkMobile();
    $scope.totalNontification = 0;

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
            hasLogin();
        });
    }

    $scope.changcolor = function () {
        $('.color1').toggleClass('color2');
        $('.text-sky').toggleClass('text-sky-grann');
    };


    function hasLogin() {
        if (!!$scope.login.id) {
            $('#login').removeClass('btn-blue').addClass('btn-red').html('Logout');
        }
    }

    $scope.clickLogout = function () {
        if (!!$scope.login.id) {
            location.href = "/logout";
        }
    };

    //======================================================= Nontification ==================================================================
    getAppointment();
    function getAppointment() {
        $http.get('/appointmentnontificationcount').success(function (data) {
            console.log(data + ' total nontification');
            $scope.totalNontification = $scope.totalNontification + data;
        });
    }

    getOutProduct();
    function getOutProduct() {
        $http.get('/getoutproductnonacknowledge').success(function (data) {
            console.log(data + ' total nontification');
            $scope.totalNontification = $scope.totalNontification + data;
        });
    }

    getExpiredate();
    function getExpiredate() {
        $http.get('/countnontificationexpiredate').success(function (data) {
            $scope.totalNontification = $scope.totalNontification + data;
        });
    }


    $scope.showNontification = function () {
        if ($scope.totalNontification > 0) {
            return true;
        } else {
            return false;
        }
    };

    $(document).ready(function () {
        $('.slider').slider({full_width: true});
    });

    $scope.clickClinicInformation = function () {
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

        });
    };

    getClinic();
    function getClinic() {
        $http.get('/getclinic').success(function (data) {
            $scope.clinic = data;
            document.getElementById('logo').src = "data:image/jpg;base64," + data.logo;
        });
    }



});

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
    }).when('/reportcustomer', {
        controller: 'reportcCustomerController',
        templateUrl: 'pages/reportcustomer.html'
    }).when('/reportproduct', {
        controller: 'reportProductController',
        templateUrl: 'pages/reportproduct.html'
    }).otherwise({
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
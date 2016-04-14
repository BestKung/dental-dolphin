var app = angular.module('employee', []);
var app = angular.module('employee')
        .controller('employeeController', function (employeeService, $scope, $http, $compile) {
            $scope.authoritys = {};
            $scope.departments = {};
            $scope.department = "";
            $scope.employee = employeeService.employeeUpdate;
            $scope.employee.birthDate = new Date(employeeService.employeeUpdate.birthDate);
            $scope.employee.startWork = new Date(employeeService.employeeUpdate.startWork);
            $scope.employee.endWork = new Date(employeeService.employeeUpdate.endWork);
            $scope.image;
            $scope.error = {};
            $scope.password = "";
            $scope.errorEmail = "";
            checkMobile();
            function  checkMobile() {
                var $mobile = $(window).outerWidth() < 995;
                if ($mobile) {
                    $('#nav-topic').css('display', 'none');
                    $('body').css('overflow-y', 'hidden');
                    $('#select-sex').css('width', 'calc(100% - 3rem)');
                    $('#select-marrytatus').css('width', 'calc(100% - 3rem)');
                    $('#select-blood').css('width', 'calc(100% - 3rem)');
                    $('#select-department').css('width', 'calc(100% - 3rem)');
                    $('#select-workstatus').css('width', 'calc(100% - 3rem)')
                }
            }

            console.log(employeeService.employeeUpdate);
            hasEmployeeService();
            function hasEmployeeService() {
                if (!!employeeService.employeeUpdate.id) {
                    $('.update').addClass('active');
                    $('.clear-prefix').css('color', '#00bcd4')
                } else {
                    $('.update').removeClass('active');
                }
            }

            checkDate();
            function checkDate() {
                if (!!$scope.employee.birthDate) {
                    $scope.employee.birthDate = new Date();
                    $('#label-birthdate').addClass('active');
                }
                if (!!$scope.employee.startWork) {
                    $scope.employee.startWork = new Date();
                    $('#label-startwork').addClass('active');
                }
                if (!!$scope.employee.endWork) {
                    $scope.employee.endWork = new Date();
                    $('#label-endwork').addClass('active');
                }
            }

            function clearData() {
                employeeService.employeeUpdate = {};
                $scope.employee.password = '';
                $scope.employee = {};
                $scope.password = "";
                NoImage();
                $('.update').removeClass('active');
                $('.clear-prefix').css('color', 'black');
            }

            $scope.clearData = function () {
                clearData();
            };

            $scope.comparePassword = function () {
                if ((!!$scope.password) && (!!$scope.employee.password)) {
                    if ($scope.password == $scope.employee.password) {
                        $('#confirm').css('color', '#64dd17');
                        $('#confirm').html('done');
                    }
                    if ($scope.password != $scope.employee.password) {
                        $('#confirm').css('color', 'red');
                        $('#confirm').html('clear');
                    }
                } else {
                    $('#confirm').html('');
                }
            };


            function confirmPassword() {
                if (($scope.password == $scope.employee.password) || (!$scope.password) || (!$scope.employee.password)) {
                    return true;
                }
                if ($scope.password != $scope.employee.password) {
                    return false;
                }
            }

            showDepartment();
            function showDepartment() {
                if (!!employeeService.employeeUpdate.department) {
                    getDepartment(employeeService.employeeUpdate.department.id);
                } else {
                    getDepartment(1);
                }
            }

            function getDepartment(id) {
                $http.get('/getdepartment').success(function (data) {
                    $scope.departments = data;
                    $scope.employee.department = data.content[id - 1];
                });
            }

            getAuthority();
            function getAuthority() {
                $http.get('/getauthority')
                        .success(function (data) {
                            $scope.authoritys = data;
                        }).error(function (data) {

                });
            }

            $scope.saveEmployee = function () {
                if (($scope.password) != undefined) {
                    if (confirmPassword()) {
                        $http.post('/savestaff', $scope.employee)
                                .success(function (data) {
                                    if (data == 200) {
                                        clearData();
                                        $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                                        Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
                                    }
                                    if (data == 1) {
                                        $scope.errorEmail = "อีเมลซ้ำ";
                                        $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                                        Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
                                        $scope.error = data;
                                        $('body,html').animate({scrollTop: 0}, "600");
                                    }
                                }).error(function (data) {
                            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
                            $scope.error = data;
                            $('body,html').animate({scrollTop: 0}, "600");
                        });
                        console.log('save success');
                    } else {
                        console.log('password error');
                        $('body,html').animate({scrollTop: 0}, "600");
                    }
                } else {
                    $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                    Materialize.toast('กรอกรหัสผ่านไม่ตรงตามเงื่อนไขที่กำหนด', 3000, 'rounded');
                    $('body,html').animate({scrollTop: 0}, "600");
                }
            };



            $scope.saveFile = function () {
                var fd = new FormData();
                fd.append('file', $scope.image);
                $http.post('/savestaffimage', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(function (data) {
                    $scope.employee.staffPicture = data;
                });
            };

            if (!!$scope.employee.staffPicture) {
                if (!!$scope.employee.staffPicture.contentImage) {
                    console.log('true');
                    document.getElementById('employee-picture').src = "data:image/jpg;base64," + $scope.employee.staffPicture.contentImage;
                } else {
                    console.log('false');
                    NoImage();
                }

            } else {
                console.log('no image');
                NoImage();
            }

            function NoImage() {
                $http.get('/getnoimage').success(function (data) {
                    document.getElementById('employee-picture').src = "data:image/jpg;base64," + data.contentImage;
                });
            }
            ;


//            $scope.setBackgroundPrefixId = function () {
//                var email = $scope.employee.email;
//                if (email.length != 0) {
//                    $('#id').css('color', '#00bcd4');
//                } else if (email.length == 0) {
//                    $('#id').css('color', 'black');
//                }
//            };

            $scope.setBackgroundPrefixSexBloodMarryStatus = function () {
                var currentAddress = $scope.employee.currentAddress;
                if (currentAddress != 0) {
                    $('#sex').css('color', '#00bcd4');
                    $('#blood').css('color', '#00bcd4');
                    $('#marrystatus').css('color', '#00bcd4');
                } else if (currentAddress == 0) {
                    $('#sex').css('color', 'black');
                    $('#blood').css('color', 'black');
                    $('#marrystatus').css('color', 'black');
                }
            };

            $scope.setBackgroundPrefixDepartmentWorkstatus = function () {
                var mobile = $scope.employee.mobile;
                if (mobile != 0) {
                    $('#department').css('color', '#00bcd4');
                    $('#workstatus').css('color', '#00bcd4');
                } else if (mobile == 0) {
                    $('#department').css('color', 'black');
                    $('#workstatus').css('color', 'black');
                }
            };


            $('.datepicker').pickadate({
                selectMonths: true,
                selectYears: 200,
                format: 'yyyy-mm-dd',
                container: 'body'
            });


            $('select').material_select();

            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('#employee-picture').attr('src', e.target.result);
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            }
            $('#input-employee-picture').change(function () {
                readURL(this);
            });

            $(document).ready(function () {
                $('input#password, input#confirmpassword').characterCounter();
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



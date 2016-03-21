angular.module('patient', []);
angular.module('patient').controller('patientController', function (patientService, $scope, $http) {

    $scope.patient = patientService.patienUpdate;
    $scope.patient.birthDate = new Date(patientService.patienUpdate.birthDate);
    $scope.patient.patientPicture = {};
    $scope.medicalHistory = {};
    $scope.patientPictureBefore;
    $scope.patientPictureCurrent;
    $scope.patientPictureAfter;
    $scope.patientPictureXrayFilm;
    $scope.error = {};
    var imageIsNo;

    getMedicalHistory();
    function getMedicalHistory() {
        $http.get('/getmedicalhistory').success(function (data) {
            $scope.medicalHistory = data;
        });
    }

    $scope.savePatient = function () {
        console.log($scope.patient.patientPicture);
        $http.post('/savepatient', $scope.patient).success(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
            console.log('success');
            clearData();
        }).error(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
            $('body,html').animate({scrollTop: 0}, "600");
            $scope.error = data;
        });
    };



    hasPatientService();
    function hasPatientService() {
        if (!!patientService.patienUpdate.id) {
            $('.update').addClass('active');
            $('.clear-prefix').css('color', '#00bcd4')
        } else {
            $('.update').removeClass('active');
        }
    }

    checkDate();
    function checkDate() {
        if (!!$scope.patient.birthDate) {
            $scope.patient.birthDate = new Date();
            $('#label-birthdate').addClass('active');
        }
    }

    $scope.setBackgroundPrefixId = function () {
        var hn = $scope.patient.hn;
        if (hn.length != 0) {
            $('#id').css('color', '#00bcd4');
        } else if (hn.length == 0) {
            $('#id').css('color', 'black');
        }
    };

    $scope.setBackgroundPrefixSex = function () {
        var sex = $scope.patient.sex;
        if (sex.length != 0) {
            $('#sex').css('color', '#00bcd4');
            $('#blood').css('color', '#00bcd4');
        } else if (sex.length == 0) {
            $('#sex').css('color', 'black');
            $('#blood').css('color', 'black');
        }
    };


    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });


    $scope.savePictureXray = function () {
        var fd = new FormData();
        fd.append('xray', $scope.patientPictureXrayFilm);
        $http.post('/savepatientpicturexray', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
                .success(function (data) {
                    $scope.patient.patientPictureXray = data;
                });
    };

    $scope.savePictureBefore = function () {
        var fd = new FormData();
        fd.append('before', $scope.patientPictureBefore);
        $http.post('/savepatientpicturebefore', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
                .success(function (data) {
                    $scope.patient.patientPictureBefore = data;
                });
    };

    $scope.savePictureCurrent = function () {
        var fd = new FormData();
        fd.append('current', $scope.patientPictureCurrent);
        $http.post('/savepatientpicturecurrent', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
                .success(function (data) {
                    $scope.patient.patientPictureCurrent = data;
                });
    };

    $scope.savePictureAfter = function () {
        var fd = new FormData();
        fd.append('after', $scope.patientPictureAfter);
        $http.post('/savepatientpictureafter', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
                .success(function (data) {
                    $scope.patient.patientPictureAfter = data;
                });
    };

    function clearData() {
        patientService.patienUpdate = {};
        $scope.patient = {};
        $('.update').removeClass('active');
        $('.clear-prefix').css('color', 'black');
        noImageAfter();
        noImageBefore();
        noImageCurrent();
        noImageXray();
    }

    $scope.clearData = function () {
        clearData();
    };

    $scope.changePrefix = function (my) {
        $(my).css('color', '#00bcd4');
    };

    hasImage();
    function hasImage() {

        if (!!$scope.patient.patientPictureXray) {
            if (!!$scope.patient.patientPictureXray.contentXrayFilm) {
                console.log('true');
                document.getElementById('patient-xrayfilm').src = "data:image/jpg;base64," + $scope.patient.patientPictureXray.contentXrayFilm;
            } else {
                console.log('false');
                noImageXray();
            }

        } else {
            console.log('no image');
            noImageXray();
        }

        if (!!$scope.patient.patientPictureBefore) {
            if (!!$scope.patient.patientPictureBefore.contentBefore) {
                console.log('true');
                document.getElementById('patient-before').src = "data:image/jpg;base64," + $scope.patient.patientPictureBefore.contentBefore;
            } else {
                console.log('false');
                noImageBefore();
            }

        } else {
            console.log('no image');
            noImageBefore();
        }

        if (!!$scope.patient.patientPictureCurrent) {
            if (!!$scope.patient.patientPictureCurrent.contentCurrent) {
                console.log('true');
                document.getElementById('patient-current').src = "data:image/jpg;base64," + $scope.patient.patientPictureCurrent.contentCurrent;
            } else {
                console.log('false');
                noImageCurrent();
            }

        } else {
            console.log('no image');
            noImageCurrent();
        }

        if (!!$scope.patient.patientPictureAfter) {
            if (!!$scope.patient.patientPictureAfter.contentAfter) {
                console.log('true');
                document.getElementById('patient-after').src = "data:image/jpg;base64," + $scope.patient.patientPictureAfter.contentAfter;
            } else {
                console.log('false');
                noImageAfter()
            }

        } else {
            console.log('no image');
            noImageAfter();
        }

    }

    function noImageXray() {
        $http.get('/getnoimage').success(function (data) {
            document.getElementById('patient-xrayfilm').src = "data:image/jpg;base64," + data.contentImage;
        });
    }


    function noImageBefore() {
        $http.get('/getnoimage').success(function (data) {
            document.getElementById('patient-before').src = "data:image/jpg;base64," + data.contentImage;
        });
    }


    function noImageCurrent() {
        $http.get('/getnoimage').success(function (data) {
            document.getElementById('patient-current').src = "data:image/jpg;base64," + data.contentImage;
        });
    }


    function noImageAfter() {
        $http.get('/getnoimage').success(function (data) {
            document.getElementById('patient-after').src = "data:image/jpg;base64," + data.contentImage;
        });
    }

    function readURLBefore(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#patient-before').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#input-patient-before').change(function () {
        readURLBefore(this);
    });

    function readURLCurrent(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#patient-current').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#input-patient-current').change(function () {
        readURLCurrent(this);
    });

    function readURLAfter(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#patient-after').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#input-patient-after').change(function () {
        readURLAfter(this);
    });

    function readURLXrayFilm(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#patient-xrayfilm').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#input-patient-xrayfilm').change(function () {
        readURLXrayFilm(this);
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
angular.module('queue', []);
angular.module('queue').controller('queueController', function ($scope, $http) {
    $scope.hn = '';
    $scope.queue = {};
    $scope.doctor = '';
    $scope.doctors = {};
    $scope.patient = {};
    $scope.currentPageDoctor = 0;
    var totalDoctor = 0;
    var totalPageDoctor = 0;
    var pageDoctor = 0;
    $scope.searchData = {};
    $scope.appointment = {};
    $scope.fontData = false;
    $scope.rooms = {};
    $scope.queueOfDoctor = {};
    var roomClick = {};
    $scope.sendQueue = '';
    var roomBydoctor = {};

    var pageRole = true;
    startPageStaff();
    function startPageStaff() {
        $http.get('/startpagestaff').success(function (data) {
            $scope.login = data;
            manageHeal(data);
        });
    }

    function manageHeal(data) {
        for (var i = 0; i < data.roles.length; i++) {
            if (data.roles[i].role == 'จัดการข้อมูลการรักษา' || data.roles[i].role == 'ผู้ดูเเลระบบ') {
                pageRole = false;
            }
        }
        if (pageRole) {
            location.href = '/';
        }
    }

    $scope.findUser = function () {
        var patient = {};
        patient.id = $scope.hn;
        $http.post('/searchpatientbyhn', patient).success(function (data) {
            $scope.patient = data;
            $('#label-queue-patient').addClass('active');
            $scope.queue.doctor = data.doctor;
            if (!!$scope.doctor) {
                $scope.doctor = data.doctor.nameTh;
            }
            $('#label-appointment-doctor').addClass('active');
            $('#prefix-appointment-doctor').css('color', '#00bcd4');
        });
    };

    $scope.saveQueue = function () {
        $scope.queue.patient = $scope.patient;
        $http.post('/savequeue', $scope.queue).success(function (data) {
            console.log('save Sucess');
            $scope.queue = {};
            $scope.patient = {};
            $scope.doctor = '';
            $scope.hn = '';
        });
    };

    $scope.clearData = function () {
        $scope.queue = {};
        $scope.patient = {};
        $scope.doctor = '';
        $scope.hn = '';
    };

    function getDoctor() {
        $http.get('getdoctor', {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
        });
    }

    $scope.selectDoctor = function (doctor) {
        $scope.queue.doctor = doctor;
        $scope.doctor = doctor.nameTh;
        $('#modal-doctor').closeModal();
        $('#label-appointment-doctor').addClass('active');
        $('#prefix-appointment-doctor').css('color', '#00bcd4');
    };

    $scope.searchDoctor = function () {
        $http.post('/searchdoctor', $scope.searchDataDoctor, {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
            countSearchDctor();
        });
    };
    function searchDoctor() {
        $http.post('/searchdoctor', $scope.searchDataDoctor, {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
        });
    }

    function countPatient() {
        $http.get('/countpatient').success(function (data) {
            $scope.totalPatient = data;
            findTotalPage();
        });
    }

    function countDoctor() {
        $http.get('/countdoctor').success(function (data) {
            totalDoctor = data;
            findTotalPageDoctor();
        });
    }

    function findTotalPageDoctor() {
        totalPageDoctor = parseInt(totalDoctor / 10);
        if ((totalDoctor % 10) != 0) {
            totalPageDoctor++;
        }
        console.log(totalPageDoctor + 'total  Doctor');
        if (totalPageDoctor == 1) {
            $('#first-page-doctor').addClass('disabled');
            $('#pre-page-doctor').addClass('disabled');
            $('#next-page-doctor').addClass('disabled');
            $('#final-page-doctor').addClass('disabled');
        }
        if (totalPageDoctor > 1) {
            $('#first-page-doctor').addClass('disabled');
            $('#pre-page-doctor').addClass('disabled');
        }

    }

    function selectGetOrSearchDoctor() {
        if (!!$scope.searchDataDoctor.keyword) {
            searchDoctor();
        } else {
            getDoctor();
        }
    }

    function countSearchDctor() {
        $http.post('/countsearchdoctor', $scope.searchDataDoctor).success(function (data) {
            totalDoctor = data;
            findTotalPageDoctor();
        });
    }
    $scope.firstPageDoctor = function () {
        pageDoctor = 0;
        $scope.currentPageDoctor = pageDoctor;
        selectGetOrSearchDoctor();
        $('#first-page-doctor').addClass('disabled');
        $('#pre-page-doctor').addClass('disabled');
        $('#next-page-doctor').removeClass('disabled');
        $('#final-page-doctor').removeClass('disabled');
    };
    $scope.prePageDoctor = function () {
        pageDoctor--;
        $scope.currentPageDoctor = pageDoctor;
        selectGetOrSearchDoctor();
        if (pageDoctor == 0) {
            $('#first-page-doctor').addClass('disabled');
            $('#pre-page-doctor').addClass('disabled');
        }
        $('#next-page-doctor').removeClass('disabled');
        $('#final-page-doctor').removeClass('disabled');
    };
    $scope.nextPageDoctor = function () {
        pageDoctor++;
        $scope.currentPageDoctor = pageDoctor;
        selectGetOrSearchDoctor();
        console.log(totalDoctor - 1);
        if (pageDoctor == totalPageDoctor - 1) {
            $('#next-page-doctor').addClass('disabled');
            $('#final-page-doctor').addClass('disabled');
        }
        $('#first-page-doctor').removeClass('disabled');
        $('#pre-page-doctor').removeClass('disabled');
    };
    $scope.finalPageDoctor = function () {
        pageDoctor = totalPageDoctor - 1;
        $scope.currentPageDoctor = pageDoctor;
        selectGetOrSearchDoctor();
        $('#next-page-doctor').addClass('disabled');
        $('#final-page-doctor').addClass('disabled');
        $('#first-page-doctor').removeClass('disabled');
        $('#pre-page-doctor').removeClass('disabled');
    };
    $scope.clickDoctor = function () {
        getDoctor();
        countDoctor();
        $('#modal-doctor').openModal();
    };

    $scope.searcDataAppointment = function () {
        $http.post('/findappointmentqueue', $scope.searchData).success(function (data) {
            $scope.appointment = data;
            console.log(!data);
            if (($scope.searchData.keyword == ' ') || !data) {
                $scope.fontData = true;
            } else {
                $scope.fontData = false;
            }
        }).error(function (data) {
            $scope.fontData = true;
        });
    };


    $scope.useAppointment = function () {
        var queue = {};
        queue.doctor = $scope.appointment.doctor;
        queue.detail = $scope.appointment.treatmentList;
        queue.hasAppointment = 'has appointment';
        queue.patient = $scope.appointment.patient;
        $http.post('/searchroombydoctor', queue.doctor).success(function (data) {
            console.log(data.doctorStatus);
            if (data.doctorStatus == 'ว่าง') {
                queue.healStatus = queue.doctor.id;
                queue.doctorStatus = 'ไม่ว่าง';
                $http.post('/savequeue', queue).success(function (savesuccess) {
                    data.doctorStatus = 'ไม่ว่าง';
                    $http.post('/updateroom', data).success(function (updatesuccess) {
                        $('#modal-appointment').closeModal();
                    });
                });
            } else {
                $scope.sendQueue = 'ทันตเเพทย์ไม่ว่าง';
            }
        });
    };

    $scope.AppointmentToQueue = function () {
        $scope.queue.doctor = $scope.appointment.doctor;
        $scope.queue.detail = $scope.appointment.treatmentList;
        $scope.queue.hasAppointment = 'has appointment';
        $scope.queue.patient = $scope.appointment.patient;
        $http.post('/savequeue', $scope.queue).success(function (data) {
            console.log('save Sucess');
            $scope.queue = {};
            $('#modal-appointment').closeModal();
        });
    };

    getRoom();
    setInterval(function () {
        getRoom();
    }, 3000);


    function getRoom() {
        $http.get('/getroom').success(function (data) {
            $scope.rooms = data;
        });
    }

    $scope.showRoom = function (room) {
        if (room.roomStatus == 'เปิด') {
            return true;
        } else {
            return false;
        }
    };

    function searchPatientQueue(queue) {
        $http.post('/searchpatientqueue', queue, {parans: {page: 0, size: 10}}).success(function (data) {
            $scope.queueOfDoctor = data;
            $scope.sendQueue = '';
        });
    }

    $scope.clickQueueDoctor = function (room) {
        roomClick = room;
        $('#modal-queue').openModal();
        searchPatientQueue(room);
    };

    $scope.clickDeleteQueue = function (quque) {
        $http.post('/deletequeue', quque).success(function (data) {
            searchPatientQueue(roomClick);
        });
    };

    $scope.heal = function (queue) {
        console.log(roomClick.doctorStatus);
        if (roomClick.doctorStatus == 'ว่าง') {
            queue.healStatus = queue.doctor.id;
            queue.doctorStatus = 'ไม่ว่าง';
            $http.post('/savequeue', queue).success(function (data) {
                console.log('send data');
                roomClick.doctorStatus = 'ไม่ว่าง';
                $http.post('/updateroom', roomClick).success(function (data) {
                });
                searchPatientQueue(queue);
            });
        } else {
            $scope.sendQueue = 'ทันตเเพทย์ไม่ว่าง';
        }
    };



    $scope.clickAppointment = function () {
        $scope.sendQueue = "";
        $('#modal-appointment').openModal({});
    };
});
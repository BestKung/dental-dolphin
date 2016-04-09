angular.module('room', []);
angular.module('room').controller('roomController', function ($scope, $http) {
    $scope.room = {};
    $scope.doctorId;
    $scope.doctorName = '';
    $scope.error = {};
    $scope.errorDup = '';
    $scope.rooms = {};

    $scope.saveRoom = function () {
        $scope.room.roomStatus = 'ปิด';
        $http.post('/roomsave', $scope.room).success(function (data) {
            if (data == 200) {
                console.log('save success');
                $scope.room = {};
                $scope.doctorId = '';
                $scope.doctorName = '';
                $('#name-doctor , #id , #room-id').removeClass('active');
                $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
            }
            if (data == 100) {
                $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
                Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
                $scope.errorDup = 'หมายเลขห้องซ้ำ';
            }
        }).error(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
            $scope.error = data;
        });
    };

    $scope.loadDoctor = function () {
        $http.post('/doctorload', $scope.doctorId).success(function (data) {
            $scope.room.doctor = data;
            $scope.doctorName = data.nameTh;
            $('#name-doctor').addClass('active');
            $('.clear-prefix').css('color', '#00bcd4');
            console.log(!data + "---------------------");
            if (!data) {
                $('#modal-doctor-notfont').openModal();
            }
        })
                .error(function (data) {
                    $scope.doctorName = '';
                    $('#name-doctor').removeClass('active');
                    $('#modal-doctor-notfont').openModal();
                });
    };

    $scope.clear = function () {
        $scope.room = {};
        $scope.doctorId = '';
        $scope.doctorName = '';
        $('#name-doctor , #id , #room-id').removeClass('active');
        $scope.error = {};
        $scope.errorDup = '';
    };

    getRoom();
    function getRoom() {
        $http.get('/getroom').success(function (data) {
            $scope.rooms = data;
        });
    }

});
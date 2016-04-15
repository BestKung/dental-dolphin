angular.module('room', []);
angular.module('room').controller('roomController', function ($scope, $http) {
    $scope.room = {};
    $scope.doctorId;
    $scope.doctorName = '';
    $scope.error = {};
    $scope.errorDup = '';
    $scope.rooms = {};
    $scope.delete = {};
    var update = false;
    $scope.status;
    $scope.keyword = '';
    $scope.totalRoom = 0;
    $scope.sizeRoom = 10;
    var page = 0;
    $scope.currentPage = 0;
    var totalPage = 0;
    $scope.saveRoom = function () {
        $scope.room.roomStatus = 'ปิด';
        if (update) {
            updateRoom();
            update = false;
        } else {
            $scope.room.doctorStatus = 'ไม่ว่าง';
            $http.post('/roomsave', $scope.room).success(function (data) {
                if (data == 200) {
                    console.log('save success');
                    $scope.room = {};
                    $scope.doctorId = '';
                    $scope.doctorName = '';
                    $('#name-doctor , #id , #room-id').removeClass('active');
                    $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
                    Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
                    getRoom();
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
        }
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
        update = false;
    };
    getRoom();
    function getRoom() {
        $http.get('/getroom', {params: {size: $scope.sizeRoom, page: page}}).success(function (data) {
            $scope.rooms = data;
        });
    }
    $scope.clickDelte = function (room) {
        $('#modal-delete').openModal({dismissible: false});
        $scope.delete = room;
    };
    $scope.deleteRoom = function () {
        $http.post('/deleteroom', $scope.delete).success(function (data) {
            getRoom();
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('ลบข้อมูลเรียบร้อย', 3000, 'rounded');
        });
    };
    $scope.clickUpdate = function (room) {
        $scope.room = room;
        $scope.doctorId = room.doctor.id;
        $scope.doctorName = room.doctor.nameTh;
        $('#name-doctor , #id , #room-id').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
        update = true;
    };
    function updateRoom() {
        $http.post('/updateroom', $scope.room).success(function (data) {
            $scope.room = {};
            $scope.doctorId = '';
            $scope.doctorName = '';
            $('#name-doctor , #id , #room-id').removeClass('active');
            $('#warp-toast').html('<style>.toast{background-color:#32CE70}</style>');
            Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
            getRoom();
        }).error(function (data) {
            $('#warp-toast').html('<style>.toast{background-color:#FF6D6D}</style>');
            Materialize.toast('เกิดข้อผิดพลาด', 3000, 'rounded');
            $scope.error = data;
        });
    }

    $scope.clickStatusOpen = function (room) {
        var statusOpen = {};
        statusOpen = room;
        statusOpen.roomStatus = 'เปิด';
        $http.post('/updateroom', statusOpen).success(function (data) {
            getRoom();
        });
    };
    $scope.clickStatusClose = function (room) {
        var statusClose = {};
        statusClose = room;
        statusClose.roomStatus = 'ปิด';
        $http.post('/updateroom', statusClose).success(function (data) {
            getRoom();
        });
    };

    $scope.changeSize = function () {
        page = 0;
        $scope.currentPage = page;
        getRoom();
        countRoom();
    }
    $scope.searchRoom = function () {
        var room = {};
        room.roomId = $scope.keyword;
        $http.post('/searchroom', room).success(function (data) {
            if (data.content.length == 0 || $scope.keyword == "") {
                $('#modal-notfont').openModal();
                getRoom();
            } else {
                $scope.rooms = data;
            }
        });
    };
    countRoom();
    function countRoom() {
        $http.get('/countroom').success(function (data) {
            $scope.totalRoom = data;
            findTotalPage();
        });
    }


    function findTotalPage() {
        var totalpages = parseInt($scope.totalRoom / $scope.sizeRoom);
        if (($scope.totalRoom % $scope.sizeRoom) != 0) {
            totalpages++;
        }
        totalPage = totalpages;
        console.log(totalPage);
        if (totalpages == 1 || totalpages == 0) {
            $('#first-page-room').addClass('disabled');
            $('#pre-page-room').addClass('disabled');
            $('#next-page-room').addClass('disabled');
            $('#final-page-room').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page-room').addClass('disabled');
            $('#pre-page-room').addClass('disabled');
            $('#next-page-room').removeClass('disabled');
            $('#final-page-room').removeClass('disabled');
        }
    }

    $scope.firstPage = function () {
        if (!$('#first-page-room').hasClass('disabled')) {
            page = 0;
            $scope.currentPage = page;
            getRoom();
            if (page == 0) {
                $('#first-page-room').addClass('disabled');
                $('#pre-page-room').addClass('disabled');
            }
            $('#next-page-room').removeClass('disabled');
            $('#final-page-room').removeClass('disabled');
        }
    };

    $scope.prePage = function () {
        if (!$('#first-page-room').hasClass('disabled')) {
            page--;
            $scope.currentPage = page;
            getRoom();
            if (page == 0) {
                $('#first-page-room').addClass('disabled');
                $('#pre-page-room').addClass('disabled');
            }
            $('#next-page-room').removeClass('disabled');
            $('#final-page-room').removeClass('disabled');
        }
    };

    $scope.nextPage = function () {
        if (!$('#final-page-room').hasClass('disabled')) {
            page++;
            $scope.currentPage = page;
            getRoom();
            if (page == totalPage - 1) {
                $('#next-page-room').addClass('disabled');
                $('#final-page-room').addClass('disabled');
            }
            $('#first-page-room').removeClass('disabled');
            $('#pre-page-room').removeClass('disabled');
        }
    };

    $scope.finalPage = function () {
        if (!$('#final-page-room').hasClass('disabled')) {
            page = totalPage - 1;
            $scope.currentPage = page;
            getRoom();
            if (page == totalPage - 1) {
                $('#final-page-room').addClass('disabled');
                $('#next-page-room').addClass('disabled');
            }
            $('#pre-page-room').removeClass('disabled');
            $('#first-page-room').removeClass('disabled');
        }
    };
});
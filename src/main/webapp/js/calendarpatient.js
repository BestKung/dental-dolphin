angular.module('calendarPatient', []);
angular.module('calendarPatient')
        .controller('calendarPatientController', function ($scope, $http) {


            $scope.title = '';
            $scope.start = '';
            $scope.end = '';

            $scope.searchData = {};
            $scope.appointments = {};

            $scope.showAppointmentsDay = '';

            setAppointment();
            function setAppointment() {
                var events = [];
                $http.get('/getappointment').success(function (data) {
                    for (var i = 0; i < data.content.length; i++) {
                        events.push({title: data.content[i].patient.name
                                    + "\n เบอร์โทร "+
                                    data.content[i].patient.mobile,
//                                    + " \n นัดกับหมอ \n" +
//                                    data.content[i].doctor.nameTh
//                                    + 
//                                    data.content[i].doctor.mobile,
                            start: data.content[i].appointDay + 'T' + data.content[i].startTime,
                            end: data.content[i].appointDay + 'T' + data.content[i].endTime
                        });
                    }
                    getAppointment(events);
                });
            }

            function getAppointment(events) {
                $('#fullcalendar').fullCalendar({
                    height: 650,
                    contentHeight: 600,
                    header: {
                        left: 'prevYear,prev,today,next,nextYear',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    //กำหนดสีเข้ม ทั้งแถบวันและเวลา
                    businessHours: {
                        start: '00:00',
                        end: '24:00',
                        dow: [1, 2, 3, 4, 5, 6]
                    },
                    events: events,
                    //ซ่อนวันคอลัม ที่ จะไม่เอา
                    hiddenDays: [0],
                    //จัดการ format ปุ่มที่ math หน้า
                    views: {
                        month: {
                            titleFormat: 'YYYY-MM,DD'
                        },
                        agendaWeek: {
                            titleFormat: 'YYYY-MM,DD'
                        },
                        agendaDay: {
                            titleFormat: 'YYYY-MM-DD'
                        }
                    },
                    eventClick: function (calEvent) {
                        $scope.title = calEvent.title;
                        $scope.start = moment(new Date(new Date(calEvent.start).getFullYear(), new Date(calEvent.start).getMonth(), new Date(calEvent.start).getDate()
                                , new Date(calEvent.start).getHours() - 7)).format('YYYY-MM-D เวลา HH:mm');
                        $scope.end = moment(new Date(new Date(calEvent.end).getFullYear(), new Date(calEvent.end).getMonth(), new Date(calEvent.end).getDate()
                                , new Date(calEvent.end).getHours() - 7)).format('YYYY-MM-D เวลา HH:mm');
                        setAppointment();
                        $('#modal-showDataEvent').openModal();
                    },
                    dayClick: function (date) {
                        $scope.showAppointmentsDay = date.format();
                        $scope.searchData.keyword = date.format();
                        $scope.searchData.searchBy = 'วันที่นัด';
                        $http.post('/searchappointment', $scope.searchData).success(function (data) {
                            $scope.appointments = data;
                        }).error(function (data) {
                        });
                        $('#modal-showDataDay').openModal();
                    }
                });
            }
        });

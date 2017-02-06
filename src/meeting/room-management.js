
eventApp.controller("RoomCtrl", function($scope, $http, $timeout, EventService) {
      var urlParams = {
            'startDate': "",
            'endDate': "",
      };
      $scope.dateParams={
        start:"2017-01-30 8:30",
        end:"2017-02-30 9:30"
      };
      // renderCanlendar();

/*------------_____-----===00*/
$("#roomSelectModal").modal("show");
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek'
      },
      monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  dayNamesShort: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  buttonText: {
    today: '今天',
    month: '按月',
    week: '按周',
    day: '天'
  },
      defaultDate: '2016-09-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
       events: function (start, end,timezone, callback) {
                urlParams.startDate = start.format("yyyy-MM-dd");
                urlParams.endDate = end.format("yyyy-MM-dd");
                // EventService.showLoading('数据获取中，请稍后... ...');
                // EventService.getEventsByPeople(urlParams, callback);
                var datas=[{
            title: 'All Day Event',
            start: '2016-09-01'
          },
          {
            title: 'Long Event',
            start: '2016-09-07',
            end: '2016-09-10'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-09-09T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-09-16T16:00:00'
          },
          {
            title: 'Conference',
            start: '2016-09-11',
            end: '2016-09-13'
          },
          {
            title: 'Meeting',
            start: '2016-09-12T10:30:00',
            end: '2016-09-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2016-09-12T12:00:00'
          },
          {
            title: 'Meeting',
            start: '2016-09-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2016-09-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2016-09-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2016-09-13T07:00:00'
          },
          {title: 'Click for Google',
            url: 'http://google.com/',
            start: '2016-09-28'
          }
        ];
      callback(datas);

              },
              dayClick:function(date, jsEvent, view){
                var meetings=$scope.meetings;
                for(var i=0;i<meetings.length;i++){

                }
              },
              loading:function(){
                $(".fc-agendaWeek-button").click();
              }
      
    });
  /*--------------------------*/
$("#roomSelectModal").modal("hide");
$("#roomSelectModal").modal("show");



     
    

     });

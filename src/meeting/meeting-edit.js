var supervisionRequest={},meetingRequest=null;

var setSupervisionHeader=function(url,paramObj,iid){
  if(paramObj);else paramObj={stamp:(new Date().getTime())};
  var headered_url= (iid?url.replace("%id%",iid):url)+"?"+(paramObj?$.param($.extend({},supervisionRequest.header,paramObj)):$.param(supervisionRequest.header));
  return headered_url;
};
var setMeetingHeader=function (url, paramObj, iid) {
    if(paramObj);else paramObj={stamp:(new Date().getTime())};
    var headered_url= (iid?url.replace("{id}",iid):url)+"?"+(paramObj?$.param($.extend({},meetingRequest.header,paramObj)):$.param(meetingRequest.header));
    return headered_url;
}
var firstLoad=true; 
function initRoomList(){}
eventApp.controller("RoomCtrl", function($scope, $http, $timeout, EventService) {
      var urlParams = {
            'startDate': "",
            'endDate': ""
      };
      $scope.dateParams={
        start:"2017-01-30 8:30",
        end:"2017-02-30 9:30"
      };
      // renderCanlendar();
      initRoomList=function(){
      EventService.getRoomList(function(response){
          $scope.roomList=response;
         });
    }
       
 
/*------------_____-----===00*/

$scope.submitRoom=function(){
  var events=EventService.events;
  var start=EventService.start;
  var end=EventService.end;
  EventService.roomAvailable=true;
  for(var i=0,len=events.length;i<len;i++){
    if((new Date(start)<new Date(events[i].end))&&(new Date(end)>new Date(events[i].start))){
      EventService.roomAvailable=false;
      break;
    }
  }
  if(!EventService.roomAvailable){
    alert("会议室不可用")
    return;
  }
  $("#locationInput").val(EventService.roomname);
  $("#roomSelectModal").modal("hide");
};
$scope.roomClick=function(item,index){
  $("#roomList").find("a").removeClass("btn-primary").eq(index).addClass("btn-primary");
  EventService.roomcode=item.diccode;
  EventService.roomname=item.dicname;
  var params={
    startdate:EventService.start,
    enddat:EventService.end
   }
  EventService.getRoomAgendaByCode(params,function(response){
    EventService.events=response;
    $("#calendar").fullCalendar("refetchEvents");
  });
  
};



});


eventApp.controller("meetingCtrl", function($scope, $http, $timeout, EventService) {
      var urlParams = {
            // 'userid': EventService.getCookie('userid') ? EventService.getCookie('userid') : "",
            'startdate': "",
            'enddate': ""
      };


      // EventService.showLoading('数据请求中，请稍后... ...');
      EventService.fetchInterfaces(InitHandler);
      // renderCanlendar();
      function InitHandler(){
        supervisionRequest=EventService.interfaces.supervisionRequest;
        meetingRequest=EventService.interfaces.meetingRequest;
        initRoomList();
        initOrgModalData();

        EventService.getOrglist(renderOrgs);
        // body...
        $scope.participants=[];
         $scope.addParams = {
                  "startDate": new Date().format("yyyy-MM-dd"),
                  topic:"",
                  "content": "",
                  "endDate": new Date().format("yyyy-MM-dd"),
                  "creator": EventService.getCookie('userid') ? EventService.getCookie('userid') : "",
                  "creatorName": EventService.getCookie('username') ? EventService.getCookie('username') : "",
                  "startTime":"9:00",
                  "endTime":"18:00",
                  roomName:"",
                  roomCode:""

            };
      };

      function renderOrgs(response) {
        // body...
        $scope.orgs=response;
           $("#startdate").daterangepicker({
           singleDatePicker: true,
            showDropdowns: true
        }, function (start, end, label) {
          $scope.addParams.startDate=end.format("yyyy-mm-dd");
        });
            $("#enddate").daterangepicker({
                         singleDatePicker: true,
            showDropdowns: true
        }, function (start, end, label) {
            $scope.addParams.endDate=end.format("yyyy-mm-dd");
        });
           
        // $scope.searchMyInfo();
      }
       


      $scope.displayParams = {
            isShowAllOrg :  false,
      };

      $scope.showAllOrgClick = function(){
            if($scope.displayParams.isShowAllOrg){
                  $(".ul-org li:gt(5)").each(function() {
                        $(this).css("visibility", "hidden");
                  });
            } else{
                  $(".ul-org li:gt(5)").each(function() {
                        $(this).css("visibility", "visible");
                  });
            }
            $scope.displayParams.isShowAllOrg = !$scope.displayParams.isShowAllOrg;
      };
      $scope.scheduletype = [true, true, true, true, true];



      $scope.addClick = function(){
            $scope.scheduletypes = EventService.getScheduletypes();
            $scope.scope = EventService.getScope();
            $scope.addParams = {
                  "startDate": new Date().format("yyyy-MM-dd"),
                  "description": "",
                  "endDate": new Date().format("yyyy-MM-dd"),
                  "creator": EventService.getCookie('userid') ? EventService.getCookie('userid') : "",
                  "creatorName": EventService.getCookie('username') ? EventService.getCookie('username') : "",
                  "people": {
                        "companyid": "",
                        "scheduletype": "",
                        "userid": "",
                        "username": "",
                        "peopletype": "",
                        "updatetime": "",
                        "collsaceid": ""
                  }
            };
            $("#startdate").daterangepicker({
                      singleDatePicker:!0,
                      showDropdowns:!0
                }
            );
            $("#enddate").daterangepicker({
                      singleDatePicker:!0,
                      showDropdowns:!0
                }
            );
            $timeout(function() {
                      $("#myTab").children().eq(2).addClass("active");
                      $("#myTab").children().eq(3).removeClass("active");
                }, 100);
           
      };

      $scope.addMeeting = function(){

           var addParams=$scope.addParams;
           addParams.roomName=$("#locationInput").val();
            if(typeof addParams.departmentCode=="undefined"&&typeof addParams.companyCode=="undefined"){
                  EventService.showAlert('请选择组织');
                  return;
            }
            if( addParams.roomName==""){
                  EventService.showAlert('请填写地点');
                  return;
            }else{
               addParams.roomCode=addParams.roomName==EventService.roomname?EventService.roomcode:addParams.roomName;
            }
             if( $scope.participants.length==0){
                  EventService.showAlert('请添加参会人员');
                  return;
            }
            
            if( addParams.topic==""){
                  EventService.showAlert('请填写会议名称');
                  return;
            }
            if( addParams.chairman==""){
                  EventService.showAlert('请选择主持人');
                  return;
            }
            EventService.showLoading('数据提交中，请稍后... ...');
           /* EventService.addEvent($scope.addParams, false);
            $scope.addParams.startDate=$("#startdate").val();
            $scope.addParams.endDate=$("#enddate").val();
            $scope.addParams.status=1;
            $('#duty_list').click();*/
            var options={
                "attendences": $scope.participants,
                "chairman": addParams.chairman,
                "content": addParams.content,
                "creatorid": addParams.creator,
                "creatorname": addParams.creatorName,
                "departmentCode": addParams.departmentCode,
                "departmentName": addParams.departmentName,
                "enddate": addParams.startDate,
                "endtime":addParams.endTime,
                "external": addParams.external,
                "roomCode": addParams.roomCode,
                "roomName": addParams.roomName,
                "startdate": addParams.startDate,
                "starttime":addParams.startTime,
                "topic": addParams.topic
              };
             var url = setMeetingHeader(meetingRequest.api.edit);
         
            $http.post(url, options)
             .success(function(response){
                   alert("添加成功");
                $.unblockUI();
            }).error(function(){
                $.unblockUI();
                alert("操作失败，请检查后重试...")
            });

      };

      function initOrgModalData() {
            $http.get(setSupervisionHeader(supervisionRequest.api.deptUrl))
                .success(function(response){
                      $scope.orgList = response;
                      $scope.newOrgList = [];
                      $scope.sceondLevelOrgList = [];
                      $scope.thirdLevelOrgList = [];
                      for(var i = 0, j = $scope.orgList.length; i < j; i++){
                            if($scope.orgList[i].level == 1){
                                  $scope.newOrgList.push($scope.orgList[i]);
                                  $scope.newOrgList[$scope.newOrgList.length - 1].child = [];
                            } else if($scope.orgList[i].level == 2){
                                  $scope.orgList[i].isSelect = false;
                                  $scope.sceondLevelOrgList.push($scope.orgList[i]);
                                  $scope.sceondLevelOrgList[$scope.sceondLevelOrgList.length - 1].child = [];;
                            } else if($scope.orgList[i].level == 3){
                                  $scope.thirdLevelOrgList.push($scope.orgList[i]);
                            }
                      }
                      for(var i = 0, j = $scope.thirdLevelOrgList.length; i < j; i++){
                            for(var m = 0, n = $scope.sceondLevelOrgList.length; m < n; m++){
                                  if($scope.sceondLevelOrgList[m].id == $scope.thirdLevelOrgList[i].pid){
                                        $scope.sceondLevelOrgList[m].child.push($scope.thirdLevelOrgList[i]);
                                  }
                            }
                      }
                      for(var i = 0, j = $scope.sceondLevelOrgList.length; i < j; i++){
                            for(var m = 0, n = $scope.newOrgList.length; m < n; m++){
                                  if($scope.newOrgList[m].id == $scope.sceondLevelOrgList[i].pid){
                                        $scope.newOrgList[m].child.push($scope.sceondLevelOrgList[i]);
                                  }
                            }
                      }

                      $timeout(
                          function() {
                                $(function() {
                                      $("#menus").accordion({
                                            closedSign: '[+]',
                                            openedSign: '[-]'
                                      });
                                });
                          },
                          2000
                      );
                });
      }
      $scope.addOrgClick = function(){
            $scope.searchParams = {
                  "content": '',
                  "result": ''
            }
            $('#orgSelectModal').modal('show');
            /*if($scope.orgmdalInited)return;
            $("#menus").accordion({
                  speed: 500,
                  closedSign: '[+]',
                  openedSign: '[-]'
            });
            $scope.orgmdalInited=true;*/

      };
      $scope.addPeopleClick=function(type){
        $scope.peopleSelectType=type;
         $scope.searchParams = {
                  "content": '',
                  "result": ''
            }
            $('#peopleSelectModal').modal('show');
      }

      $scope.locationClick=function(){

        EventService.roomcode=EventService.roomlist[0].diccode;
        EventService.roomname=EventService.roomlist[0].dicname;
        $("#roomList").find("a").removeClass("btn-primary").eq(0).addClass("btn-primary");
        if(firstLoad){
          $("#roomSelectModal").modal({
          backdrop: 'static', keyboard: false
        });
          $('#roomSelectModal').on('shown.bs.modal', function () {
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
                          firstDay: 1,
                          navLinks: true, // can click day/week names to navigate views
                          editable: true,
                          eventLimit: true, // allow "more" link when too many events
                          events:function (start, end,timezone, callback) {
                                  var params={
                                    startdate:start.format("YYYY-MM-DD"),
                                    enddat:end.format("YYYY-MM-DD")
                                  }
                                  // EventService.showLoading('数据获取中，请稍后... ...');
                                  EventService.getRoomAgendaByCode(params,callback);
                                },
                          loading:function(){
                             firstLoad=false;
                            $(".fc-agendaWeek-button").click();
                          }
                      
              });
              $('#roomSelectModal').on('shown.bs.modal',function(){});

          });
       
            
        }else{
          $("#roomSelectModal").modal("show");
          $("#calendar").fullCalendar("refetchEvents");
        }
        
      },

      $scope.searchPeople = function(){
            $http.get( setSupervisionHeader(supervisionRequest.api.searchuserUrl,{q:$scope.searchParams.content}))
            .success(function(response){
                  $scope.searchParams.result = response;
                  for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
                        var people = $scope.searchParams.result[i];
                        var count = 0;
                        var orgtree = people.orgtree;
                        if (orgtree) {
                              for (var orgi in orgtree) {
                                  for (var key in orgtree[orgi]){
                                        if(count == 1){
                                              people.company = orgtree[orgi][key];
                                        } else if(count == 2){
                                              people.office = orgtree[orgi][key];
                                        } else if(count == 3){
                                              people.department = orgtree[orgi][key];
                                        }
                                        count++;
                                  }
                              }
                        }
                  people.isChecked = false;
                }
          });
      };

      $scope.deptSelect = function(user){
             for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
                  $scope.searchParams.result[i].isChecked = false;
            }
            user.isChecked = true;
            $scope.addParams.departmentName = user.name;
            $scope.addParams.departmentCode = user.ou;
            $scope.addParams.companyCode=user.pid;
            $scope.addParams.people={
                        id:user.ou,name:user.name
                      };
            var orgs=$scope.orgs;
            for(var i =0,len=orgs.length;i<len;i++){
              if(orgs[i].id==user.pid){$scope.addParams.companyName=orgs[i].name;break;}
            }
            $("#departmentSelector").val($scope.addParams.companyName+user.name);
            $('#orgSelectModal').modal('hide');
      };
      $scope.userSelect = function(user) {
        if($scope.peopleSelectType=="single"){
          for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
              $scope.searchParams.result[i].isChecked = false;
          }
          $scope.addParams.chairman = user.displayName;
        }else{
            //
            if(!user.isChecked)
            $scope.participants.push({
              userid:user.uid,
              username:user.displayName
            });
          }
          
          user.isChecked = true;

      };
      $scope.removeUser=function(index){
        $scope.participants.splice(index,1);
      };
      $scope.peopleConfig = function(){
            $('#orgSelectModal').modal('hide');
             $('#peopleSelectModal').modal('hide');
      };

      $scope.editClick = function(){
            $scope.addParams = $scope.currentEvent;
            $("#detail").removeClass("active").removeClass("in");
            $("#add").addClass("active").addClass("in");
            $("#startdate").daterangepicker({
                      singleDatePicker:true,
                      showDropdowns:true
                }
            );
            $("#enddate").daterangepicker({
                      singleDatePicker:true,
                      showDropdowns:true
                }
            );
      };

      $scope.editSubmit = function(){
            EventService.editEvent($scope.editParams, true);
            $('#duty_list').click()
      };

      $scope.delete = function(){
            EventService.deleteEventById($scope.currentEvent.id);
      };

      $scope.peopleInfo = {
            "orgid": "-1",
            "branchOrgid": "-1",
      };
      $scope.searchMyInfo = function(){
            var uid = EventService.getCookie('userid') ? EventService.getCookie('userid') : "";
            $http.get(setSupervisionHeader(supervisionRequest.api.searchuserUrl,{q:uid}))
                .success(function(response){
                      if(response.length == 1){
                            var orgtree = response[0].orgtree;
                            var count = 0;
                            if (orgtree) {
                                  for (var orgi in orgtree) {
                                        for (var key in orgtree[orgi]){
                                              if(count == 1){
                                                    $scope.peopleInfo.orgid = key;
                                              } else if(count == 2){
                                                    $scope.peopleInfo.branchOrgid = key;
                                              }
                                              count++;
                                        }
                                  }
                            }
                            var isFind = false;
                            for(var i = 0, j = $scope.orgs.length; i < j; i++){
                                  if($scope.peopleInfo.orgid == $scope.orgs[i].id){
                                        $scope.orgClick($scope.orgs[i]);
                                        isFind = true;
                                        if(i > 5){
                                              $scope.displayParams.isShowAllOrg = true;
                                        }
                                  }
                            }
                            if(!isFind){
                                  $scope.orgClick($scope.orgs[0]);
                            }
                      }
                }
            );
      }
});


function showRemove(_this){
  $(_this).find("span").show();
}
function hideRemove(_this){
  $(_this).find("span").hide();
}


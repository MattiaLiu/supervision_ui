var supervisionRequest={},dutyRequest=null;

var setSupervisionHeader=function(url,paramObj,iid){
  if(paramObj);else paramObj={stamp:(new Date().getTime())};
  var headered_url= (iid?url.replace("%id%",iid):url)+"?"+(paramObj?$.param($.extend({},supervisionRequest.header,paramObj)):$.param(supervisionRequest.header));
  return headered_url;
};
var setDutyHeader=function (url, paramObj, iid) {
    if(paramObj);else paramObj={stamp:(new Date().getTime())};
    var headered_url= (iid?url.replace("%id%",iid):url)+"?"+(paramObj?$.param($.extend({},dutyRequest.header,paramObj)):$.param(dutyRequest.header));
    return headered_url;
}
eventApp.controller("DutyCtrl", function($scope, $http, $timeout, EventService) {
      var urlParams = {
            // 'userid': EventService.getCookie('userid') ? EventService.getCookie('userid') : "",
            'startDate': "",
            'endDate': "",
      };

      EventService.showLoading('数据请求中，请稍后... ...');
      EventService.fetchInterfaces(InitHandler);
      // renderCanlendar();
      function InitHandler(){
        supervisionRequest=EventService.interfaces.supervisionRequest;
        dutyRequest=EventService.interfaces.dutyRequest;
        EventService.getOrglist(renderOrgs);
        initOrgModalData();
        // renderCalendar(DutyService.getDutyList());
      }

      function renderOrgs(response) {
        // body...
        $scope.orgs = response;
        $timeout(function(){
              $(".ul-org li:gt(5)").each(function() {
                    $(this).css("visibility", "hidden");
              });
        }, 100);
          $("#filter_start").daterangepicker({
                     singleDatePicker: true,
            showDropdowns: true
        }, function (start, end, label) {
          urlParams.startDate=end.format("yyyy-mm-dd");
          var date=new Date(end);
          $("#calendar").fullCalendar("refetchEvents");
          $('#calendar').fullCalendar( 'gotoDate', date.getFullYear(), date.getMonth(), date.getDate());
        });
            $("#filter_end").daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        }, function (start, end, label) {
          urlParams.endDate=end.format("yyyy-mm-dd");
          $("#calendar").fullCalendar("refetchEvents");

        });
      $scope.searchMyInfo();
      }
        var firstLoad=true;

      var callback = function() {
          $('#calendar').fullCalendar({
              header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'agendaWeek'
              },
              firstDay: 1,
              eventClick: function (calEvent, jsEvent, view) {
                  $scope.$apply(
                      function () {
                          $scope.currentEvent = EventService.getEventDetail(calEvent.id);
                      }
                  );
                  $("#schedule").removeClass("active").removeClass("in");
                  $("#detail").addClass("active").addClass("in");
              },
              names: EventService.getNames(),
              peoples: EventService.getPeoples(),
              events: function (start, end, callback) {
                  urlParams.startDate = start.format("yyyy-MM-dd");
                  urlParams.endDate = end.format("yyyy-MM-dd");
                  EventService.showLoading('数据获取中，请稍后... ...');
                  EventService.getEventsByPeople(urlParams, callback);
                  $timeout(
                      function () {
                          document.getElementsByClassName('fc-button-agendaWeek')[0].click();
                      },
                      1
                  );
              },
              loading:function () {
                  if(!firstLoad)return;
                  var importbtn="id"+(new Date().getTime()),downloadbtn="id"+new Date().getTime();
                  $("#calendar").find("span.fc-button-agendaWeek").before('<input type="file" id='+importbtn+'  name="file" class="import-file" /><span class="fc-button import-template  fc-state-default fc-corner-left fc-corner-right fc-state-active">导入</span><a href="../../assets/template/duty_template.xlsx" target="_blank" id='+downloadbtn+' class="fc-button download-template  fc-state-default fc-corner-left fc-corner-right fc-state-active" unselectable="on">下载模板</a>');
                  $("#"+importbtn).change(function(ev){
                      $.ajaxFileUpload({
                          url:setDutyHeader(dutyRequest.api.import),
                          secureuri:false,
                          fileElementId:importbtn,//file标签的id
                          dataType: 'json',//返回数据的类型
                          // data:{},//一同上传的数据
                          success: function (data, status) {
                              //把图片替换
                              // var obj = jQuery.parseJSON(data);
                              // $("#upload").attr("src", "../image/"+obj.fileName);
                              alert("上传成功");

                          },
                          error: function (data, status, e) {

                          }
                      });
                  });
                  firstLoad=false;
              }
          });
      };

      $scope.orgClick = function (org) {
            for(var i = 0, j = $scope.orgs.length; i < j; i++){
                  if(org.id == $scope.orgs[i].id){
                        $scope.orgs[i].isSelected = true;
                  } else{
                        $scope.orgs[i].isSelected = false;
                  }
            }
            urlParams.companyCode = org.id;

            EventService.showLoading('数据获取中，请稍后... ...');
            $http.get(setSupervisionHeader(supervisionRequest.api.deptListUrl,{ou:org.id}) )
            .success(function(response){
                if(true){
                      $scope.childOrgs = response;
                      firstLoad=true;
                      var userIds = [];
                      for(var i = 0, j = response.length; i < j; i++){
                            var user =  response[i];
                            //user.id = user.ou;
                            user.username = user.name;
                            userIds.push({"userid": user.id});
                      }
                      $.unblockUI();
                      EventService.setPeoples(response);
                      $("#calendar").empty();
                      // urlParams.userid = userIds;
                      callback();
                }
            });
      };


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
            $timeout(
                function() {
                      $("#myTab").children().eq(2).addClass("active");
                      $("#myTab").children().eq(3).removeClass("active");
                }, 100
            );
      };

      $scope.addEvent = function(){
            if(typeof $scope.addParams.departmentCode=="undefined"&&typeof $scope.addParams.companyCode=="undefined"){
                  EventService.showAlert('请选择组织');
                  return;
            }
            EventService.showLoading('数据提交中，请稍后... ...');
            EventService.addEvent($scope.addParams, false);
            $scope.addParams.startDate=$("#startdate").val();
            $scope.addParams.endDate=$("#enddate").val();
            $scope.addParams.status=1;
            $('#duty_list').click();
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
                                            speed: 500,
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
                  "result": '',
            }
            $('#orgSelectModal').modal('show');

      };
      $scope.addPeopleClick=function(){
         $scope.searchParams = {
                  "content": '',
                  "result": '',
            }
            $('#peopleSelectModal').modal('show');
      }
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
            $('#orgSelectModal').modal('hide');
      };
      $scope.userClick = function(user) {
          for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
              $scope.searchParams.result[i].isChecked = false;
          }
          user.isChecked = true;
          var caretaker = $scope.addParams.caretaker;
              $scope.addParams.caretaker = user.uid;
              // $scope.addParams.people.peopletype = user.isleade;
              $scope.addParams.caretakerName = user.displayName;
              var orgtree = user.orgtree;
              if (orgtree.length > 1) {
                  for (var key in orgtree[1]) {
                      $scope.addParams.companyCode = key;
                      $scope.addParams.companyName = orgtree[1][key];
                  }
                  for (var key in orgtree[2]) {
                      $scope.addParams.departmentCode = key;
                      $scope.addParams.departmentName = orgtree[2][key];
                      $scope.addParams.people = {
                          id: key, name: orgtree[2][key]
                      };
                  }

              }

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


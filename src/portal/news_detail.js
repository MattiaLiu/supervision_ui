newsApp.controller("newsDetailAppCtrl", function($scope, $http, $sce, NewsService, $timeout) {

    $scope.params = {
        'isShowAttach' : false,
        'isShowHeadPic' : true,
    };
    $scope.parseInt =parseInt;
    var getNewsDetail = function(id){
        NewsService.sendGetRequest('/api/news/one?newid=' + id, function(response){
            $scope.newsDetail = response;
            $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);
        });
    };

    var id = NewsService.getUrlParamsString('id');

    if(id && id.length > 0){
        $.ajax({
            type: "get",
            dataType: "json",
            contentType:'application/json; charset=utf-8;',
            url: 'http://fqnpc.cnnp.com.cn:8010/api/news/one?size=200&apikey=a16cb0c916404be78cb0805fefc7d26a&newid=' + id,
            success: function (response) {
                $scope.$apply(
                    function(){
                        $scope.newsDetail = response;
                        $scope.newsDetail.audit_date = $scope.newsDetail.audit_date.substring(0, $scope.newsDetail.audit_date.indexOf('.'))
                       var aid=parseInt(id);
                       var locationDir=""+parseInt(aid/1000);
                      // alert($scope.newsDetail.content);
                        for(var i = 0, j = 10; i < j; i++){
                            if($scope.newsDetail.content && $scope.newsDetail.content.length > 0 && 

                                $scope.newsDetail.content.indexOf('/publish2/attachment/show?fileId=') > 0){
                                
                               // alert(parseInt($scope.newsDetail.id/1000);
                                $scope.newsDetail.content = $scope.newsDetail.content.replace('/publish2/attachment/show?fileId=', '/cnnp/publish2/attachment/'
                                    + $scope.newsDetail.content.substring($scope.newsDetail.content.indexOf('/publish2/attachment/show?fileId=')
                                        + '/publish2/attachment/show?fileId='.length, $scope.newsDetail.content.indexOf('/publish2/attachment/show?fileId=')
                                        + '/publish2/attachment/show?fileId='.length + locationDir.length) + '/');

                            }

                            if($scope.newsDetail.content && $scope.newsDetail.content.length > 0 && 
                                $scope.newsDetail.content.indexOf('/news-0.1/attachment/show?fileId=') > 0){
                               // $scope.newsDetail.content=$scope.newsDetail.content.replace('/news-0.1/attachment/show?fileId=', '/cnnp/publish2/attachment/');
                                $scope.newsDetail.content = $scope.newsDetail.content.replace('/news-0.1/attachment/show?fileId=', '/cnnp/publish2/attachment/'
                                    + $scope.newsDetail.content.substring($scope.newsDetail.content.indexOf('/news-0.1/attachment/show?fileId=')
                                        + '/news-0.1/attachment/show?fileId='.length, $scope.newsDetail.content.indexOf('/news-0.1/attachment/show?fileId=')
                                        + '/news-0.1/attachment/show?fileId='.length + locationDir.length) + '/');

                            }
                        }
                        for(var i = 0, j = 20; i < j; i++){
                            $scope.newsDetail.content = $scope.newsDetail.content.replace('fqportal', 'fqnpc');
                        }
                        $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);


                        if($scope.newsDetail.attachments && $scope.newsDetail.attachments.length > 0){
                            for(var i = 0, j = $scope.newsDetail.attachments.length; i < j; i++){
                                if($scope.newsDetail.attachments[i].file_from == '附件区'){
                                    $scope.params.isShowAttach = true;
                                }
                                if($scope.newsDetail.attachments[i].file_type == 'pdf'){
                                    $scope.params.isShowHeadPic = false;
                                }
                                $scope.newsDetail.attachments[i].path = $scope.newsDetail.attachments[i].path.replace('\\\\FQECMPORTAL01', 'http://fqnpc.cnnp.com.cn').replace('FQECMPORTAL01','http://fqnpc.com.cn').replace('\\FQECMPORTAL01', 'http://fqnpc.cnnp.com.cn');
                       
                            }
                        }
                    }
                );
            }, error: function (err) {
                console.log(err);
            }
        });
    } else{
        getNewsDetail(7493);
    }
});
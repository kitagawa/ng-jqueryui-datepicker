ngular.module("datepicker",[]).directive('datepicker', function () {
    function toDateString(str) {
        return str.replace(/^(\d\d\d\d)(1[0-2]|0[1-9]|[1-9])([1-2][0-9]|3[0-1]|0[1-9]|[0-9])$/,"$1/$2/$3");
    }
    
    //文字列をYYYY/MM/DDの形式に整形する
    function formatDateString(str){
        var date = new Date(str);
        if(date == "Invalid Date" || isNaN(date)){return ""}
        
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month < 10){
            month = "0" + month;
        }
        var day = date.getDate();
        if(day < 10){
            day = "0" + day;
        }
        return year + "/" + month + "/" + day;    
    }
    return {
        restrict: 'A',
        require: 'ngModel',
        scope:{
            maxDate: "=",
            minDate: "="
        },
        link: function (scope, element, attrs, ngModel) {
            element.datepicker({
                showOn: "button",
                dateFormat: "yy/mm/dd",
                onSelect: function (date) {
                    ngModel.$setViewValue(date);
                    scope.$apply();
                },
                beforeShow : function(){
                    if(scope.maxDate != null){
                       element.datepicker("option","maxDate",scope.maxDate).next('button').text('').button({
                icons: {
                    primary: 'ui-icon-calendar'
                },
                text: false
            });
                    }
                    if(scope.minDate != null){
                        element.datepicker("option","minDate",scope.minDate).next('button').text('').button({
                icons: {
                    primary: 'ui-icon-calendar'
                },
                text: false
            });
                    }
                }
            }).next('button').text('').button({
                icons: {
                    primary: 'ui-icon-calendar'
                },
                text: false
            });
                        //値が変更された時に整形する
            element.bind('blur', function() {
            	var value = element.val();
                var date = toDateString(value);
                date = formatDateString(date);
                element.val(date);
                ngModel.$setViewValue(date);
                scope.$apply();
            });

        }
    };
});


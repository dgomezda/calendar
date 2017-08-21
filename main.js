function calendarWidget(widget, strStartDate, strnumDays, countryCode)
{
  var numDays = +strnumDays;
  var startDate = toDate(strStartDate);
  var endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + numDays);

  $(widget).empty();
   $(widget).append('<div class="month weekheader"><ul><li>S</li><li>M</li><li>T</li><li>W</li><li>T</li><li>F</li><li>S</li></ul></div>')
  var tempDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  while (tempDate <= endDate) {
    var holidays = [];
    holidays = getHolidays(tempDate.getMonth()+1, tempDate.getFullYear());
    var invalidBefore = getInvalidBefore(startDate, tempDate);
    var invalidAfter = getInvalidAfter(endDate, tempDate);
    addMonth(widget ,tempDate.getMonth(), tempDate.getFullYear(), invalidBefore, invalidAfter, holidays);
    tempDate.setMonth(tempDate.getMonth()+1);
  }

  function addMonth(widget, month, year, invalidBefore, invalidAfter, holidays){
      var days = getNumDays(month,year), // days per month
        fDay = getFirstDay(month,year)+1, // 1st day position, considering sunday.
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

      var monthElement = $("<ul class='group'></ul>")
      $(monthElement).append('<p class="monthname center">' + months[month] +' '+ year + '</p>')

      // put the first day in the correct position
      for (var i=0;i<fDay-1+invalidBefore;i++) {
        $('<li class="invalidday">&nbsp;</li>').appendTo(monthElement);
      }
      // write day numbers in month
      for (var i = 1+ invalidBefore;i<=days - invalidAfter;i++) {
        if ((i + fDay -1 )%7 == 1  || (i + fDay -1) % 7 == 0){
            $('<li class="weekend">'+i+'</li>').appendTo(monthElement);
        }
        else {
            $('<li class="weekday">'+i+'</li>').appendTo(monthElement);
        }

      }
      $(widget).append($("<div class='month'></div>").append(monthElement));


  }
  function getFirstDay(month,year) {
    return new Date(year,month,1).getDay();
  }
  function getNumDays(month,year) {
    return new Date(year,month+1,0).getDate();
  }
  function toDate(dateStr) {
    var parts = dateStr.split("\/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  function getInvalidBefore(startDate, tempDate){
    var ndays= 0;
    if(startDate.getMonth() == tempDate.getMonth() && startDate.getFullYear() == tempDate.getFullYear())
    {
      ndays = startDate.getDay() -1;
    }
    return ndays;
  }
  function getInvalidAfter(endDate, tempDate){
    var ndays= 0;
    if(endDate.getMonth() == tempDate.getMonth() && endDate.getFullYear() == tempDate.getFullYear())
    {
      ndays = getNumDays(endDate.getMonth(), endDate.getFullYear()) - endDate.getDate() +1
    }
    return ndays;
  }
  function getHolidays(month,year) {
    var holidays = [];
    $.ajax({
       type: "GET",
       dataType: "json",
       url: "https://holidayapi.com/v1/holidays?key=c5cc9d69-95ea-4a9e-9476-25d0822b42db&country=PE&year="+ year +"&month=" + month,
       async: false,
       success: function(data){
         if ( data.status == 200)
         {
           holidays = data.holidays.map(function (item,index) {
                      return new Date(item.date.substr(0,4), item.date.substr(5,2)-1,  item.date.substr(8,2))
                      });
         }
       }
    });
    return holidays;
  }
}
$( "#calendar-form" ).submit(function( event ) {
  var strStartDate = $("#startDate").val(),
      strnumDays = $("#numDays").val(),
      countryCode = $("#countryCode").val();
  calendarWidget($('#calendar-container'), strStartDate, strnumDays, countryCode);
  event.preventDefault();
});

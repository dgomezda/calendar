addMonth(10, 2008);
addMonth(11, 2008);

function addMonth(month, year){
    var days = numDays(month,year), // days per month
      fDay = firstDay(month,year), // 1st day position
      months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var monthElement = $("<ul class='group'></ul>")
    $(monthElement).append('<li>S</li><li>M</li><li>T</li><li>W</li><li>T</li><li>F</li><li>S</li>')
    $(monthElement).append('<p class="monthname center">' + months[month] +' '+ year + '</p>')

    // put the first day in the correct position
    for (var i=0;i<fDay-1;i++) {
      $('<li>&nbsp;</li>').appendTo(monthElement);
    }
    // write day numbers in month
    for (var i = 1;i<=days;i++) {
      $('<li>'+i+'</li>').appendTo(monthElement);
    }
    $('#calendar-container').append($("<div class='month'></div>").append(monthElement));

    function firstDay(month,year) {
      return new Date(year,month,1).getDay();
    }
    function numDays(month,year) {
      return new Date(year,month,0).getDate();
    }
}

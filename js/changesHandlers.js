var tarifsEdf;
var periodeCourante

$( document ).ready(function() {
	  google.load('visualization', '1.0', {'packages':['controls']});
	  google.setOnLoadCallback(drawDefaultDashoard);
	  
	  google.load("visualization", "1", {packages:["corechart"]});

	  $("#tableInfos").styleTable();
	$( "#tabs" ).tabs();
	$( ".datepicker" ).datepicker({
		dateFormat: "dd-mm-yy"
	});

	$( "#r1").click(updateDashBoard);
	$( "#r2").click(function () {
		drawChart();
		drawChartDelta();
	});
	$("#r3").click(function () {
		updateTarifs();
		updatePeriod();
		
		$("#periodValue").text(periodeCourante);
		$("#aboValue").html(tarifsEdf["abonnement"]);
		$("#hpValue").html(tarifsEdf["hp"]);
		$("#hcValue").html(tarifsEdf["hc"]);
		drawChartDeltaPrix();
		drawChartDeltaPrixMois();
	});

	$(".dbUpd").click(updateDashBoard);
	

});

function updatePeriod() {
	periodeCourante = $.ajax({
        url: "getData.php",
		data: {period :""} ,
        dataType:"text",
        async: false
    }).responseText;
}

function updateTarifs() {
	tarifsEdf = JSON.parse($.ajax({
        url: "getData.php",
		data: {tarifs :"", date:"today"} ,
        dataType:"json",
        async: false
    }).responseText);
}

function updateDashBoard() {
	console.log("Mise a jour du dashBoard");
	drawDashboard(getDataForDashBoard());
}



(function ($) {
    $.fn.styleTable = function (options) {
        var defaults = {
            css: 'styleTable'
        };
        options = $.extend(defaults, options);

        return this.each(function () {

            input = $(this);
            input.addClass(options.css);


            input.find("th").addClass("ui-state-default");
            input.find("td").addClass("ui-widget-content");

            input.find("tr").each(function () {
                $(this).children("td:not(:first)").addClass("first");
                $(this).children("th:not(:first)").addClass("first");
            });
        });
    };
})(jQuery);

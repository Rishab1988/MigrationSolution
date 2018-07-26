var winW = $(window).width();
var winH = $(window).height();
//$("#roundtripHide .subLinks").show();
var maxChild = "4";//parseInt($("#indiGoOneWaySearch_MaxChild").val(), 10);
var maxadult = "9"; //parseInt($("#indiGoOneWaySearch_MaxAdult").val(), 10) + 1;
//Spinner click for adults, child, infants

$(document).ready(function () {
    
    //$('input').keypress(function (event) {
    //    if ($(this).attr('id') == 'agentLogin_Username' || $(this).attr('id') == 'memberLogin_Username_No' || $(this).attr('id') == 'agentLogin_Password' || $(this).attr('id') == 'memberLogin_Password_No') {
    //        if (event.which == 13) {
    //            event.preventDefault();
    //            if ($(this).attr('id') == 'memberLogin_Username' || $(this).attr('id') == 'memberLogin_Password') {
    //                if (validateformpost()) {
    //                    $(this).closest("form").submit();
    //                }
    //            }
    //            else {
    //                $(this).closest("form").submit();
    //            }
    //        }
    //    }
    //});

});
function validateformpost() {
    var value = $("#memberLogin_Username").val();
    var regex_cell = /[^[0-9]]*/gi;
    var new_value = value.replace(regex_cell, '');
    $("#memberLogin_Username").val(new_value);
    return true;
}



var days = 365;
if ($('#hdnMaxDays').val() != null && $('#hdnMaxDays').val() > 0) {
    days = $('#hdnMaxDays').val();
}

var month = parseInt((days / 30) % 12) + 'M';
var year = parseInt((days / 365)) + 'Y';
$("#MultiWaySector4").hide();
$("#MultiWaySector5").hide();
$("#minusMoreMuticityRow").hide();




$(function () {

    $("#logoimg").click(function () {
        sessionStorage.tab = 0;
        sessionStorage.ways = "";
        sessionStorage.User = 0;
        sessionStorage.NoOfMultiLeg = 3;
    });


    if (sessionStorage.ways == "Multi" && sessionStorage.NoOfMultiLeg) {
        var NoOfMultiLeg = parseInt(sessionStorage.NoOfMultiLeg, 10);// $("#hdMultiLegNumber").val();      
        if (NoOfMultiLeg == 3) {
            $("#MultiWaySector4").hide();
            $("#MultiWaySector5").hide();
            $("#addMoreMuticityRow").show();
            $("#minusMoreMuticityRow").hide();

        }
        else if (NoOfMultiLeg == 4) {
            $("#MultiWaySector4").show();
            $("#MultiWaySector5").hide();
            $("#addMoreMuticityRow").show();
            $("#minusMoreMuticityRow").show();

        }
        else if (NoOfMultiLeg == 5) {
            $("#MultiWaySector4").show();
            $("#MultiWaySector5").show();
            $("#addMoreMuticityRow").hide();
            $("#minusMoreMuticityRow").show();

        }
    }

    $("#addMoreMuticityRow").click(function () {
        if (!sessionStorage.NoOfMultiLeg) {
            sessionStorage.NoOfMultiLeg = 3;
        }
        var NoOfMultiLeg = parseInt(sessionStorage.NoOfMultiLeg, 10);// $("#hdMultiLegNumber").val();
        if (NoOfMultiLeg < 5) {
            if (NoOfMultiLeg == 3) {
                $("#MultiWaySector4").show();
                $("#addMoreMuticityRow").show();
                $("#minusMoreMuticityRow").show();
                $("#MultiWaySector5").hide();
                NoOfMultiLeg = NoOfMultiLeg + 1;
                sessionStorage.NoOfMultiLeg = NoOfMultiLeg;
                $("#hdMultiLegNumber").val(NoOfMultiLeg)

            }
            else if (NoOfMultiLeg == 4) {
                $("#MultiWaySector4").show();
                $("#MultiWaySector5").show();
                $("#addMoreMuticityRow").hide();
                $("#minusMoreMuticityRow").show();
                NoOfMultiLeg = NoOfMultiLeg + 1;
                sessionStorage.NoOfMultiLeg = NoOfMultiLeg;
                $("#hdMultiLegNumber").val(NoOfMultiLeg)

            }


            //$("#MultiWaySector4").show();
            //$("#MultiWaySector5").show();
            //$("#addMoreMuticityRow").hide();
            //$("#minusMoreMuticityRow").show();
        }
        else {
            $("#MultiWaySector4").show();
            $("#MultiWaySector5").show();
            $("#addMoreMuticityRow").hide();
            $("#minusMoreMuticityRow").show();

        }

        //if (winW > 1023) {
        //    $(".navWrapperHolder").height(440);
        //}
        //if (winW < 1023 && winW > 768) {
        //    $(".navWrapperHolder").height(480);
        //}
    });

    $("#minusMoreMuticityRow").click(function () {


        var NoOfMultiLeg = parseInt(sessionStorage.NoOfMultiLeg, 10);// $("#hdMultiLegNumber").val();

        if (NoOfMultiLeg > 3) {

            if (NoOfMultiLeg == 5) {

                $("#MultiWaySector4").show();
                $("#MultiWaySector5").hide();
                $("#addMoreMuticityRow").show();
                $("#minusMoreMuticityRow").show();
                NoOfMultiLeg = NoOfMultiLeg - 1;
                sessionStorage.NoOfMultiLeg = NoOfMultiLeg;
                $("#hdMultiLegNumber").val(NoOfMultiLeg)

                $("#txtDestinationStationMLFive").val("");
                $("#hdDestinationStationHiddenFive").val("");
            }
            else if (NoOfMultiLeg == 4) {
                $("#MultiWaySector4").hide();
                $("#MultiWaySector5").hide();
                $("#addMoreMuticityRow").show();
                $("#minusMoreMuticityRow").hide();
                NoOfMultiLeg = NoOfMultiLeg - 1;
                sessionStorage.NoOfMultiLeg = NoOfMultiLeg;
                $("#hdMultiLegNumber").val(NoOfMultiLeg)

                $("#txtDestinationStationMLFour").val("");
                $("#hdDestinationStationHiddenFour").val("");
            }


            //$("#MultiWaySector4").show();
            //$("#MultiWaySector5").show();
            //$("#addMoreMuticityRow").hide();
            //$("#minusMoreMuticityRow").show();
        }
        else {
            $("#MultiWaySector4").hide();
            $("#MultiWaySector5").hide();
            $("#addMoreMuticityRow").show();
            $("#minusMoreMuticityRow").hide();
        }


        //$("#MultiWaySector4").hide();
        //$("#MultiWaySector5").hide();
        //$("#addMoreMuticityRow").show();
        //$("#minusMoreMuticityRow").hide();
        //if (winW > 1023) {
        //    $(".navWrapperHolder").height(310);
        //}
        //if (winW < 1023 && winW > 768) {
        //    $(".navWrapperHolder").height(350);
        //}
    });



    $("#RoundTrip_").click(function () {

        var originVal = $("#txtOriginStationRound").val();
        if (originVal != undefined && originVal != null && originVal != "" && originVal != "Choose") {
            $('#indiGoRoundTripSearch_Origin').val($('#indiGoRoundTripSearch_Origin option').filter(function () { return $(this).html() == originVal; }).val()).trigger('change');
            var destVal = $("#txtDestinationStationRound").val();
            $('#indiGoRoundTripSearch_Destination').val($('#indiGoRoundTripSearch_Destination option').filter(function () { return $(this).html() == destVal; }).val()).trigger('change');
        }

        setCurrency = 1;
        $("#onewayHide").hide();
        $("#multiwayHide").hide();
        $("#roundtripHide").show();
        $("#roundtripHide .subLinks").show();
        sessionStorage.ways = "Round";
        $('#RoundTrip_').addClass("active");
        $('#Multicity_').removeClass("active");
        $('#Oneway_').removeClass("active");
        if (winW < 767) {
            var defaultReturningDt = $(".toDate").val();
            $(".fromDate").datepicker("option", "minDate", defaultReturningDt);

        }

        var defaultReturningDt = $(".toDate").val();
        $(".fromDate").datepicker("option", "minDate", defaultReturningDt);


    });
    $("#Oneway_").click(function () {

        var originVal = $("#txtOriginStation").val();
        if (originVal != undefined && originVal != null && originVal != "" && originVal != "Choose") {
            $('#indiGoOneWaySearch_Origin').val($('#indiGoOneWaySearch_Origin option').filter(function () { return $(this).html() == originVal; }).val()).trigger('change');
            var destVal = $("#txtDestinationStation").val();
            $('#indiGoOneWaySearch_Destination').val($('#indiGoOneWaySearch_Destination option').filter(function () { return $(this).html() == destVal; }).val()).trigger('change');
        }


        setCurrency = 1;
        $("#oneWaySearchModal").modal("show");
        //Forsolving issue in Oneway search pop up background in IE8 starts
        setTimeout(function () {
            $('#MemMAcc').hide();
            $('#AgentMAcc').hide();
            $('#corpMAcc').hide();
        });
        //Forsolving issue in Oneway search pop up background in IE8 ends
        $("#roundtripHide").hide();
        $("#multiwayHide").hide();
        $("#onewayHide").show();
        $("#roundtripHide .subLinks").hide();
        $("#onewayHide .subLinks").show();
        sessionStorage.ways = "One";
        $('#Oneway_').addClass("active");
        $('#RoundTrip_').removeClass("active");
        $('#Multicity_').removeClass("active");

    });
    $("#Multicity_").click(function () {
        $('#indiGoMultiLegSearch_OriginTwo').val($('#hdOriginStationHiddenTwo').val()).change();

        setCurrency = 0;
        $("#multiCitySearchModal").modal("show");//For Multicity popup. Done on 20150629
        $("#onewayHide").hide();
        $("#roundtripHide").hide();
        $("#multiwayHide").show();
        $("#multiwayHide .subLinks").show();
        sessionStorage.ways = "Multi";
        $('#Multicity_').addClass("active");
        $('#RoundTrip_').removeClass("active");
        $('#Oneway_').removeClass("active");




        ///For UMNR not be implemented on multicity tab.
        var multicityPaxCount = $("#indiGoMultiLegSearch_PassengerCounts_0__Count").val();
        if (multicityPaxCount < 1) {
            $("#indiGoMultiLegSearch_PassengerCounts_0__Count").val(1);
            $("#indiGoMultiLegSearch_PassengerCounts_1__Count").val(0);
            $("#indiGoMultiLegSearch_InfantCount").val(0);

        }
    });

    var customIdAttribute = $(this).attr("cstmIdAtr");
    if (customIdAttribute == 'BookFlight') { sessionStorage.tab = 1 }
    else if (customIdAttribute == 'FlightStatus') { sessionStorage.tab = 2 }
    else if (customIdAttribute == 'ManageBooking' || customIdAttribute == 'MyBookings') { sessionStorage.tab = 3 }
    else if (customIdAttribute == 'UpdateContactDetail' || customIdAttribute == 'UpdateContactDetail') { sessionStorage.tab = 7 }
    else if (customIdAttribute == 'CheckIn' || customIdAttribute == 'Agent Plus') { sessionStorage.tab = 4 }
    else if (customIdAttribute == 'Schedule' || customIdAttribute == 'MyAccount') { sessionStorage.tab = 5 }
    else if (customIdAttribute == 'Login' || customIdAttribute == 'Logout') { sessionStorage.tab = 6 }
    else if (customIdAttribute == 'Online Reporting') { }
    else if (customIdAttribute == 'retrieveGSTInvoiceDetails' || customIdAttribute == 'retrieveGSTInvoiceDetails') { sessionStorage.tab = 8 }
    
    if (sessionStorage.tab == 1) {
        $('#orgdest').show();
        $('#AgentMAcc').hide();
        $('#MemMAcc').hide();
        $('#corpMAcc').hide();
        $('.menuBtn1 a.navUl').addClass('active');
    }
    else if (sessionStorage.tab == 2) {
        $('.menuBtn3 a.navUl').addClass('active');
        $('.menuBtn1 a.navUl').removeClass('active');
        $('#infosearch').show();
        $('#orgdest').hide();
    }
    else if (sessionStorage.tab == 3) {
        if ($('#divManage').html() != null) {
            $('#divManage').show();
        }
        else {
            $('#orgdest').hide();
            $('#AgentMAcc').show();
            $('#MemMAcc').show();
            $('#corpMAcc').show();
        }
        $('.menuBtn2 a').addClass('active');
        $('.menuBtn1 a.navUl').removeClass('active');
    }

    else if (sessionStorage.tab == 7) {
        if ($('#divUpdate').html() != null) {
            $('#divUpdate').show();
            $('#orgdest').hide();
        }
        else {
            $('#orgdest').hide();
            $('#AgentMAcc').show();
            $('#MemMAcc').show();
            $('#corpMAcc').show();
        }
        $('.menuBtn7 a').addClass('active');
        $('.menuBtn1 a.navUl').removeClass('active');
    }
    else if (sessionStorage.tab == 4) {
        $('.menuBtn4 a.navUl').addClass('active');
        $('.menuBtn1 a.navUl').removeClass('active');
        $('.menuBtn2 a').removeClass('active');
        $('#divchk').show(); $('#orgdest').hide();
    }
    else if (sessionStorage.tab == 8) {
        //$('.menuBtn8 a.navUl').addClass('active');
        $('.menuBtn1 a.navUl').removeClass('active');
        $('.menuBtn2 a').removeClass('active');
        //$('#divgst').show(); 
        $('#orgdest').hide();
    }
    else if (sessionStorage.tab == 5) {
        $('.menuBtn5 a.navUl').addClass('active');
        $('.menuBtn1 a.navUl').removeClass('active');
        $('.menuBtn2 a').removeClass('active');
        $('#divschedule').show();
        $('#orgdest').hide();
    }
    else if (sessionStorage.tab == 9) {
        $('.menuBtn9 a.navUl').addClass('active');
        $('#divloginagent').show();
        $('#orgdest').hide();
    }
    $('#memlogout').click(function () {
        sessionStorage.tab = 0;
        sessionStorage.User = 0;
    });

    $('#AgentLogout').click(function () {
        sessionStorage.tab = 0;
        sessionStorage.User = 0;
    });

    $('#CorptLogout').click(function () {
        sessionStorage.tab = 0;
        sessionStorage.User = 0;
    });

    $('#BaseAgentLogout').click(function () {
        sessionStorage.tab = 0;
        sessionStorage.User = 0;
    });

    $('#BaseCorpLogout').click(function () {
        sessionStorage.tab = 0;
        sessionStorage.User = 0;
    });

    $('#btnMemEditProfile').click(function () {
        sessionStorage.tab = 5;
    });

    $('#btndefaultAgencyEditProfile').click(function () {
        sessionStorage.tab = 5;
    });

    $('#btnBaseCorpEditProfile').click(function () {
        sessionStorage.tab = 5;
    });

    $('#btnBaseAgentEditProfile').click(function () {
        sessionStorage.tab = 5;
    });

    $('#btnBaseCorpMasterEditProfile').click(function () {
        sessionStorage.tab = 5;
    });

    $('#agentCorpLogin').click(function () {
        sessionStorage.User = 1;
        $('#divMemberLogin').hide();
        $('#divagentlogin').show();
        $('#agentCorpLogin').addClass('current');
        $('#memberLogin').removeClass('current');
    });

    $('#memberLogin').click(function () {
        sessionStorage.User = 0;
        $('#divagentlogin').hide();
        $('#divMemberLogin').show();
        $('#agentCorpLogin').removeClass('current');
        $('#memberLogin').addClass('current');

    });

    if (sessionStorage.User == 0) {
        $('#divagentlogin').hide();
        $('#divMemberLogin').show();
        $('#agentCorpLogin').removeClass('current');
        $('#memberLogin').addClass('current');

    }
    else if (sessionStorage.User == 1) {

        $('#divMemberLogin').hide();
        $('#divagentlogin').show();
        $('#agentCorpLogin').addClass('current');
        $('#memberLogin').removeClass('current');
    }

    $('a[cstmidatr="Login"]').on('click', function () {
        sessionStorage.User = 6;
        $('#divagentlogin').hide();
        $('#divMemberLogin').show();
        $('#agentCorpLogin').removeClass('current');
        $('#memberLogin').addClass('current');
    });
    $('a[cstmidatr="loginagent"]').on('click', function () {
        sessionStorage.User = 9;
        $('#divMemberLogin').hide();
        $('#divagentlogin').show();
        $('#agentCorpLogin').addClass('current');
        $('#memberLogin').removeClass('current');
    });

    //Booking Engine

    //For Multi Leg Date Calander. To pick next date greater or equal to current one.

    $(".toDateML1").datepicker({
        numberOfMonths: 2, minDate: 0, maxDate: month + year, dateFormat: "dd M yy", onClose: function (date) {
            var date2 = $('.toDateML1').datepicker('getDate');

            //$('.toDateML2').datepicker('setDate', date2);
            $('.toDateML2').datepicker('option', 'minDate', date2);
            $('.toDateML3').datepicker('option', 'minDate', date2);
            $('.toDateML4').datepicker('option', 'minDate', date2);
            $('.toDateML5').datepicker('option', 'minDate', date2);
            $(this).parent().next().find(".input").focus();
            //$('.toDateML3').datepicker('setDate', date2);
            //$('.toDateML4').datepicker('setDate', date2);
            //$('.toDateML5').datepicker('setDate', date2);
        }
    });

    $(".toDateML2").datepicker({
        numberOfMonths: 2, minDate: 0, maxDate: month + year, dateFormat: "dd M yy", onClose: function (date) {
            var date2 = $('.toDateML2').datepicker('getDate');

            //$('.toDateML3').datepicker('setDate', date2);
            $('.toDateML3').datepicker('option', 'minDate', date2);
            $('.toDateML4').datepicker('option', 'minDate', date2);
            $('.toDateML5').datepicker('option', 'minDate', date2);
            $(this).parent().next().find(".input").focus();
            //$('.toDateML4').datepicker('setDate', date2);
            //$('.toDateML5').datepicker('setDate', date2);
        }
    });

    $(".toDateML3").datepicker({
        numberOfMonths: 2, minDate: 0, maxDate: month + year, dateFormat: "dd M yy", onClose: function (date) {
            var date2 = $('.toDateML3').datepicker('getDate');

            //$('.toDateML4').datepicker('setDate', date2);

            $('.toDateML4').datepicker('option', 'minDate', date2);
            $('.toDateML5').datepicker('option', 'minDate', date2);
            $(this).parent().next().find(".input").focus();
            //$('.toDateML5').datepicker('setDate', date2);
        }
    });

    $(".toDateML4").datepicker({
        numberOfMonths: 2, minDate: 0, maxDate: month + year, dateFormat: "dd M yy", onClose: function (date) {
            var date2 = $('.toDateML4').datepicker('getDate');

            //$('.toDateML5').datepicker('setDate', date2);
            $('.toDateML5').datepicker('option', 'minDate', date2);
            $(this).parent().next().find(".input").focus();
        }
    });

    $(".toDateML5").datepicker({
        numberOfMonths: 2, minDate: 0, maxDate: month + year, dateFormat: "dd M yy", onClose: function (date) {
            var date2 = $('.toDateML5').datepicker('getDate');

            // $('.toDateML6').datepicker('setDate', date2);
            $('.toDateML6').datepicker('option', 'minDate', date2);
            $(this).parent().next().find(".input").focus();
        }
    });
    //For Multi Leg Date Calander. To pick next date greater or equal to current one.



    if (winW > 960) {
        $("nav ul li a.navUl").click(function () {
            //for only Online Reporting..
            var currentClasses = $(this).attr("class").split(" ");
            var currentClass = "";
            if ($(currentClasses).length > 0) {
                currentClass = currentClasses[1];
            }
            if (currentClass == "OnlineReporting") {
                return;
            }
            //.......
            $('.menuBtn2 a').removeClass('active');
            $("nav ul li a.navUl").removeClass("active");
            $(this).addClass("active");
            $(".bookingEngineWrapper").hide();

            if ($(this).attr("cstmIdAtr") == 'Login') {
                sessionStorage.tab = 6;
            }
            if ($(this).attr("cstmIdAtr") == 'loginagent') {
                sessionStorage.tab = 9;
            }
            //$(this).parent().find(".bookingEngineWrapper").toggle();
            $(".webSiteMainMenu").find("[cstmIdAtr = '" + $(this).attr("cstmIdAtr") + "']").toggle();

        });



        $(".toDate").datepicker({
            numberOfMonths: 2, minDate: 0, maxDate: month + year, dateFormat: "dd M yy", onClose: function (date) {
                var date2 = $('.toDate').datepicker('getDate');
                //$('.fromDate').datepicker('setDate', date2);
                $('.fromDate').datepicker('option', 'minDate', date2);
                $('.fromDate').datepicker('option', 'maxDate', month + year);
                //$(this).parent().next().find(".input").focus();
            }
        });
        $(".fromDate").datepicker({ numberOfMonths: 2, dateFormat: "dd M yy" });
        //Move focus to next input
        $(".cityDropdown .list ul li a").click(function () {
            $(this).parent().parent().parent().parent().parent().find(".input").val($(this).text());
            $(this).parent().parent().parent().parent().parent().next().find(".input").focus();
        });



    }
    else if (winW <= 959 && winW >= 768) {


        //$('.modal div.fancybox-desktop').addClass("winM");
        $("nav ul li a.navUl").click(function () {
            if ($(this).attr("cstmIdAtr") == 'Login') {
                sessionStorage.tab = 6;
            }
            if ($(this).attr("cstmIdAtr") == 'loginagent') {
                sessionStorage.tab = 9;
            }
            if ($(this).parent().find(".bookingEngineWrapper").css("display") == "block") {
                $(".bookingEngineWrapper").hide();
            }
            else {
                $("nav ul li a.navUl").removeClass("active");
                $(this).addClass("active");
                $(".bookingEngineWrapper").hide();
                //$(this).parent().find(".bookingEngineWrapper").show();
                $(".webSiteMainMenu").find("[cstmIdAtr = '" + $(this).attr("cstmIdAtr") + "']").toggle();
            }
        });

        $(".toDate").datepicker({
            numberOfMonths: 1, minDate: 0, dateFormat: "dd M yy", onClose: function (date) {
                var date2 = $('.toDate').datepicker('getDate');
                //$('.fromDate').datepicker('setDate', date2);
                $('.fromDate').datepicker('option', 'minDate', date2);
            }
        });
        $(".fromDate").datepicker({ numberOfMonths: 1, dateFormat: "dd M yy" });



    }
    else if (winW < 767) {



        //sessionStorage.tab = 1;


        $("nav ul li a.navUl").click(function () {
            if ($(this).attr("cstmIdAtr") == 'Login') {
                sessionStorage.tab = 6;
            }
            if ($(this).attr("cstmIdAtr") == 'loginagent') {
                sessionStorage.tab = 9;
            }

            if ($(".webSiteMainMenu").find("[cstmIdAtr = '" + $(this).attr("cstmIdAtr") + "']").css("display") == "block") {
                $(".bookingEngineWrapper").hide();
            }
            else {
                $("nav ul li a.navUl").removeClass("active");
                $(this).addClass("active");
                $(".bookingEngineWrapper").hide();
                $(".webSiteMainMenu").find("[cstmIdAtr = '" + $(this).attr("cstmIdAtr") + "']").show();
            }
        });
        $(".toDate").datepicker({
            numberOfMonths: 1, minDate: 0, dateFormat: "dd M yy", onClose: function (date) {
                var date2 = $('.toDate').datepicker('getDate');
                //$('.fromDate').datepicker('setDate', date2);
                $('.fromDate').datepicker('option', 'minDate', date2);
            }
        });
        $(".fromDate").datepicker({ numberOfMonths: 1, dateFormat: "dd M yy" });



    }
    //Tabs in top navigation multicity and etc
    $(".bookingType ul li").click(function () {
        $(this).parent().parent().find("a").removeClass("active");
        $(this).find("a").addClass("active");
        $(".bookingEngine .bookingTypeData").hide();
        $(".bookingEngine .bookingTypeData:eq(" + $(this).index() + ")").show();
        $("#addMoreMuticityRow").hide();

    });
    $(".bookingType ul li:eq(2)").click(function () {
        $("#addMoreMuticityRow").show();

    });

    $(".scheduleType ul li").click(function () {
        $(this).parent().parent().find("a").removeClass("active");
        $(this).find("a").addClass("active");
        $(".bookingEngine .scheduleTypeData").hide();
        $(".bookingEngine .scheduleTypeData:eq(" + $(this).index() + ")").show();
    });

    $(".calender i").click(function () { $(this).parent().find(".input").datepicker("show"); });
    //Choosecity dropdown
    //$(".chooseCity .input").focus(function () {
    //    $(this).parent().find(".cityDropdown").fadeIn();
    //    setTimeout(function () { $(".fromDate").datepicker("hide"); }, 300);
    //});
    //$(".chooseCity .input").blur(function () {
    //    //$(this).parent().find(".cityDropdown").fadeOut();
    //});

    //Indi Meal spinner
    $(".inditableWrapper .indiMeals i.fa-angle-right").click(function () {
        //alert($(this).parent().parent().parent().parent().html());
        var spDfltVal = $(this).parent().find("em").html();
        if (spDfltVal == 9) {
            spDfltVal = 9
        }
        else {
            ++spDfltVal;
            $(this).parent().find("em").html(spDfltVal);
            //$("#foodItemList").append('<li>'+spDfltVal+" x "+$(this).parent().parent().parent().find("td:first").text()+' <i class="fa fa-close"></i></li>');
        }
    });
    $(".indiMeals i.fa-angle-left").click(function () {
        var spDfltVal = $(this).parent().find("em").html();
        if (spDfltVal == 0) {
            spDfltVal = 0
        }
        else {
            --spDfltVal;
            $(this).parent().find("em").html(spDfltVal);
        }
    });
    //remove food item
    $("#foodItemList").on('click', "li i", function () {
        $(this).parent().hide();
    });

    //Accordion Script
    $(".accrWrap .head").click(function () {
        $(this).next(".content").slideToggle().siblings(".content:visible").slideUp();
        $(this).toggleClass("active");
        $(this).siblings(".head").removeClass("active");
    });
    //Itenary Accordion Script
    $(".accrWrap1 .head").click(function () {
        $(this).next(".content").slideToggle();
        $(this).toggleClass("active");
    });
    //Itenary Page add more services navigation
    // Serial no 40 changes start
    $(".navWrapper nav ul li a").click(function () {
        $(this).closest('div').find('.error').removeClass('error');
        $(this).closest('div').find('.error-text').removeClass('error-text');
        $(this).closest('div').find('span.hint').remove();
    });
    // Serial no 40 changes end




    //Click to expand tipsy
    $(".clkToExpand").click(function () {
        if ($(this).attr("original-title") == "Click to close")
            $(this).attr("original-title", "Click to expand");
        else
            $(this).attr("original-title", "Click to close");
    });
    //Summary Accordion
    //$(".flightsSummaryWrap .summary .heading").click(function () {
    //        $(this).find("span").toggleClass("active");	
    //        $(this).next(".details").slideToggle();
    //        //$("body").toggleClass('bodyFixed');
    //});
    //Table cell click details in search page
    $(".flightsDetailsWrap .row .column").click(function () {
        if ($(this).hasClass("active") == false) {
            $(this).parent().parent().find(".column").removeClass("active");
            $(this).toggleClass("active");
            $(this).parent().parent().find(".upgradeWrap").slideUp();
            $(this).parent().next(".upgradeWrap").slideDown().find("em").css("left", $(this).position().left + ($(this).width() / 2) - 10);
        }
        else {
            $(this).toggleClass("active");
            $(this).parent().parent().find(".upgradeWrap").slideUp();
        }
    });
    //flight layover click expand
    $(".flightsDetailsWrap .row .label").click(function () {
        $(this).find(".stopFilghtWrap").slideToggle();
    });
    //Choose Seat Script
    $(".chooseSeatWrap .aeroplaneWrap .mainContainer .master .row ul li").click(function () {
        if ($(this).hasClass("occupiedSeats") == true) {

        }
        else {
            $(this).toggleClass("currentSelected");
            $('html,body').animate({ scrollTop: $(".ChooseflightSeatMain").offset().top + "px" }, 1000);
        }
    });

    //Tipsy
    $('.infoIcon').tipsy({ gravity: $.fn.tipsy.autoBounds(150, 's'), html: true });
    $('.tipsyGlbl').tipsy({ gravity: $.fn.tipsy.autoBounds(150, 'n'), html: true });
    $(document).on('touchstart', function () {
        $(".tipsy").css("display", "none");
    });
    //Tabs to accordion script
    $('#parentHorizontalTab').easyResponsiveTabs({
        tabidentify: '',
        type: 'default',
        width: 'auto',
        fit: true,
        tabidentify: 'hor_1',
        activate: function (event) {
            var $tab = $(this);
            var $info = $('#nested-tabInfo');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();

        }
    });
    $('#parentVerticalTab').easyResponsiveTabs({
        type: 'vertical',
        width: 'auto',
        fit: true,
        closed: 'accordion',
        tabidentify: 'hor_1',
        activate: function (event) {
            var $tab = $(this);
            var $info = $('#nested-tabInfo2');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
            var _this = $(this);
            if (winW < 960)
                setTimeout(function () { $('html,body').animate({ scrollTop: _this.offset().top + "px" }, 300); }, 600);
            else if (winW > 960)
                setTimeout(function () { $('html,body').animate({ scrollTop: $(".passengerOtherOption").offset().top + "px" }, 300); }, 600);
        }
    });

    //Dob for global
    $(".dob").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd M yy",
        yearRange: '1910:2015',
    });
    $(".dobWrap i").click(function () { $(this).parent().find(".dob").datepicker("show"); });

    //Global Function for select box
    $('select').selectBoxIt({ native: true });



    //Search page highlight date
    $(".viewByWeekWrap ul li").click(function () {
        $(this).parent().find("li").removeClass("active");
        $(this).addClass("active");
    });



});

//var error = $('.errorMsgs').height();
//error = error + 40;

//if (winW > 960) {
//    $('.homePageWrapper').css('marginTop', error);
//};

// IE 8 Select Box width //

/*Hide date span from the date select */
// Serial no 47 changes start
$(document).ready(function () {
    $(".dobMenu").find("span.sstyle").css("visibility", "hidden");
    $(".dobMenu").find("select.sstyle").css("opacity", "1");
    $(".travelDocIssuingCountry").find("span.sstyle").css("visibility", "hidden");
    $(".travelDocIssuingCountry").find("select.sstyle").css("opacity", "1");
    //var fancyBox = $('.modal div.fancybox-desktop');
    //for (var i = 0; i < fancyBox.length; i++) {
    //    var popupTopPercent = $(fancyBox[i]).css('top');
    //    popupTopPercent = popupTopPercent.replace("%", "");
    //    var popupTop = parseInt(winH) * parseInt(popupTopPercent) / 100;
    //    var popupMaxHeight = parseInt(winH - (2 * popupTop));
    //    $(fancyBox[i]).css('max-height', popupMaxHeight);
    //    //$(fancyBox[i]).css('overflow', 'auto');
    //    var popupMaxHeightInner = popupMaxHeight - 42;
    //    $(fancyBox[i]).find(".modal-body").css('max-height', popupMaxHeightInner);
    //    $(fancyBox[i]).find(".modal-body").css('overflow', 'auto');
    //}

    //Start: Updated by ritu to display popup when promocode "6EGITF" applied
    var p = $("#PromoCode").val(); if (p == '6EGITF') {
        var promo = $('#PromoCode').val();


        $("#PromoAppliedModalId").modal("show")


    }//End: Updated by ritu to display popup when promocode "6EGITF" applied
    else {

        var reviewPopUpCount = $("#popup_review_booking").length;


        if (reviewPopUpCount > 0) {

            if ($(".closeError").length == 0) {//For restricting Review Pop Up to show only once. 20150828.

                //$("#popup_review_booking").modal("show");
                setTimeout(function () {
                    $($("#popup_review_booking").find('span.fl')[0]).focus();
                }, 500);
            }//For restricting Review Pop Up to show only once. 20150828.
        }
    }

});
// Serial no 47 changes End
/*Hide date span from the date select */


/*  Change for todate validation done on 20160425 */
$(document).ready(function () {
    $('.fromDate').datepicker('option', 'minDate', $('.toDate').datepicker('getDate'));
});




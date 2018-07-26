// JavaScript Document

jQuery.fn.ReadMore = function( options ) {
	
	var defaults = {
		AnimationType: "Fade"			
	};
	
	var settings = $.extend( {}, defaults, options );
	
	
	return this.each(function() {
	// Plugin code would go here...
	var $this = $(this);
	var ww = $(window).innerWidth();
	
	
	$(window).resize(function(e) {
		ww = $(window).innerWidth();
	});


	/* Reset CSS */	
	
	var ReadMoreLink = "<br/><a href='javascript:void(0);'><span>Expand >> </span></a>";
		
		
	$(document).ready(function(e) {
        
		/**/
		
		
		if(ww>=641){
			
			
			var string =$(".show_rm", $this).html().trim();
			var length = 80;
			var trimmedString1 = string.substr(0,length).trim();
			
			var trimmedString2 = string.substr(length);
                        
			$(".show_rm", $this).html("<span class=''>"+trimmedString1+"</span>");
			
			$(".show_rm", $this).append("<span class='extraTxt'>"+trimmedString2+"</span>");
			
			if($("p", $this).hasClass("show_rm")){
				
                                //$( "#foo" ).toggle( showOrHide );
                                
				$(".show_rm", $this).append(ReadMoreLink);
				
				$(".show_rm a", $this).on('click',function(){
                                    
                                    
                                   
                                    $(".extraTxt", $(this).parent()).fadeToggle();
                                    
                                     var SH = this.SH^=1; // "Simple toggler"
                                     $(".show_rm a", $this).html(SH?'Close >>':'Expand >>');
        
				});
				
			}
		}
		
		
		/**/
    });	
		
		
		
	/* End of Timer Event */
	
	
	
	
	
	});
};


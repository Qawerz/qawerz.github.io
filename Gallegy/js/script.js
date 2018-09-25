jQuery.noConflict();
jQuery(document).ready(function($){

function lightboxPhoto() {
jQuery("a[rel^='prettyPhoto']").prettyPhoto({
animationSpeed:'fast',
slideshow:5000,
theme:'light_square', //���� ���������� ���������� ����: dark_rounded, dark_square, facebook, light_rounded, light_square
show_title:false,
overlay_gallery: false
});	}
	
if(jQuery().prettyPhoto) {
lightboxPhoto();
}
	
if (jQuery().quicksand) {
	var $data = $(".portfolio-area").clone();
	//NOTE: Only filter on the main portfolio page, not on the subcategory pages
	$('.portfolio-categ li').click(function(e) {
		$(".filter li").removeClass("active");	
		// Use the last category class as the category to filter by. This means that multiple categories are not supported (yet)
		var filterClass=$(this).attr('class').split(' ').slice(-1)[0];
		if (filterClass == 'all') { var $filteredData = $data.find('.portfolio-item2'); } else {
		var $filteredData = $data.find('.portfolio-item2[data-type=' + filterClass + ']'); }
		$(".portfolio-area").quicksand($filteredData, {
			duration: 600,
			adjustHeight: 'auto'
		}, function () { lightboxPhoto(); });
		$(this).addClass("active"); 			
		return false;
	});	}
});
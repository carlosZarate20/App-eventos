jQuery(document).ready(function () {
    	// next step
	$('.f1 .btn-next').on('click', function () {
		var parent_fieldset = $(this).parents('fieldset');
		var next_step = true;
		// navigation steps / progress steps
		var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		var progress_line = $(this).parents('.f1').find('.f1-progress-line');

		// fields validation
		parent_fieldset.find('input[type="text"], input[type="password"]').each(function () {
			if (parseInt($(this).attr("class").indexOf('autocomplete'))>0){
				//validación de los roles y programas
				//next_step = false;
				//return true;
			}else{
				var noRequired = ! $(this).hasClass('no-required');
				if ($(this).val() == "" && noRequired) {
					$(this).addClass('input-error');
					next_step = false;
				}
				else {
					$(this).removeClass('input-error');
				}
			}

        });
        if (next_step) {
			parent_fieldset.fadeOut(400, function () {
				// change icons
				current_active_step.removeClass('active').addClass('activated').next().addClass('active');
				// progress bar
				bar_progress(progress_line, 'right');
				// show next step
				$(this).next().fadeIn();
				// scroll window to beginning of the form
				scroll_to_class($('.f1'), 20);
			});
		}
    });
});
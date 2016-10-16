var callcount = 0;
var callcomplete = 0;

$("#progress-modal").modal({
	backdrop : 'static',
	show : false
});

function onLoading() {
	var modal = $("#progress-modal");
	var bar = modal.find('.progress-bar');

	modal.modal('show');
	bar.addClass('animate');

	setTimeout(function() {
		bar.removeClass('animate');
		modal.modal('hide');
	}, 15000);
}

function initProgress(cnt){
	callcomplete = 0;
	callcount=cnt;
	onLoading();
}

function completeReceiveCB() {
	callcomplete += 1;
	var percent = (callcomplete / callcount) * 100;
	$(".progress-bar").css("width", percent + "%");
	$("#loading").text("Loading " + percent + "%");
	console.log("execute complete progressbar!! > " + callcomplete + "/" + callcount + ">>>>" + percent);

	if (percent >= 100) {
		$("#progress-modal").find('.progress-bar').removeClass('animate');
		$("#progress-modal").modal('hide');
		$(".progress-bar").css("width", "0%");
	}

	if (callcount == 0 && callcomplete == 0) {
		setTimeout(function() {
			$("#progress-modal").find('.progress-bar').removeClass('animate');
			$("#progress-modal").modal('hide');
			$(".progress-bar").css("width", "0%");
		}, 25000);
	}
}

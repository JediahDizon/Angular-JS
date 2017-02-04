/*
 * Because Angular JS has dynamic content loading, some buttons might not exist
 * yet when Ladda and MDB is loaded. That would result in buttons not being
 * binded to their corresponding plugins.
 */
setTimeout(function MDB() {
	Waves.attach(".btn", ["waves-light"]);
	setTimeout(MDB, 500);
}, 500);

setTimeout(function Ladda() {
	startLadda();
	setTimeout(Ladda, 500);
}, 500);

setTimeout(function Toggle() {
	startBootstrapToggle();
	try {
		$($(".toggle-handle")[0]).removeClass("btn-default").addClass("btn-outline-primary");
	} catch(errorEvent) {
		
	}
	setTimeout(Toggle, 500);
}, 500);

function startLadda() {
	var laddaButtons = document.getElementsByClassName("ladda-button");
	for (var index = 0; index < laddaButtons.length; index++) {
		laddaButtons[index].onclick = function() {
			Ladda.stopAll();
			var laddaButton = Ladda.create(this);
			laddaButton.start();
		}
	}
}

function startBootstrapToggle() {
	$("[type='checkbox']").bootstrapToggle({
		toggle: "toggle",
		style: "ios",
		on: "",
		off: "",
		onstyle: "primary",
		offstyle: "primary",
		width: "66",
		height: "33"
	});
}

function onLoad() {
	$(".container-fluid").css("-webkit-transition", "opacity .5s");
	$(".container-fluid").css("opacity", "1");	
	setTimeout(function() { $(".container-fluid").removeAttr("style") }, 500)
}
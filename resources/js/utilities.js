function toCelcius(farenheit) {
	return ((farenheit - 32) * 5) / 9;
}

function get_directives(name) {
    var result  = [],
        invokes = angular.module(name)._invokeQueue;

    for(var i=0; i<invokes.length; ++i) {
        if(invokes[i][1] === "directive") {
            result.push(invokes[i][2][0]);
        }
    }

    return result;
}
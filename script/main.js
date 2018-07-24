/*
CP Conversions JavaScript
(C) Optimalworks.net
*/

// setup
var ow = ow || {};

ow.Initialise = function() {

	ow.Setup = {

		// contact form
		Contact: {
			Form: "#enquiry",
			ErrorClass: "error",
			Check: [
				{ Field: "#name", Validate: ow.Validate.String, Req: true, Min: 1, Max: 80 },
				{ Field: "#telephone", Validate: ow.Validate.String, Req: false, Min: 6, Max: 20, Additonal: function(f) {
					var ret = true;
					if (f == '') {
						var g = owl.Dom.Get("#email");
						if (g.length == 1) ret = ow.Validate.Email(g[0].value, true, 6, 80);
					}
					return ret;
				} },
				{ Field: "#email", Validate: ow.Validate.Email, Req: false, Min: 6, Max: 80, Additonal: function(f) {
					var ret = true;
					if (f == '') {
						var g = owl.Dom.Get("#telephone");
						if (g.length == 1) ret = (owl.String.Trim(g[0].value).length >= 6);
					}
					return ret;
				} }
			]
		},

		// Google Analytics ID
		Analytics: "UA-114126-26"

	};

};


// ---------------------------------------------
// onload event
ow.Start = function() {
	ow.Initialise();
	new ow.Validator(ow.Setup.Contact);
	ow.Analytics();
};
new owl.Event(window, "load", ow.Start, 0);


// ---------------------------------------------
// form validation
ow.Validator = function(setup) {

	var form = owl.Dom.Get(setup.Form);
	if (form.length == 1) {
		this.Form = form[0];
		this.ErrorClass = setup.ErrorClass;
		this.Fields = setup.Check;
		var T = this;
		new owl.Event(form, "submit", function(evt) { T.Check(evt); }, 0);
	}

};

// check form
ow.Validator.prototype.Check = function(evt) {

	var valid = true;
	var form = this.Form;
	var err = this.ErrorClass;

	// check all fields
	owl.Each(this.Fields, function(f) {
		var fNode = owl.Dom.Get(f.Field, form);
		if (fNode.length == 1) fNode = fNode[0];
		if (fNode && f.Validate) {
			var v = owl.String.Trim(fNode.value);
			if (v != fNode.value) fNode.value = v;
			var check = f.Validate(v, f.Req, f.Min, f.Max);
			if (f.Additonal) check &= f.Additonal(v);
			if (!check) {
				if (valid && fNode.select && fNode.focus) { fNode.select(); fNode.focus(); }
				owl.Css.ClassApply(fNode.parentNode, err);
				valid = false;
			}
			else owl.Css.ClassRemove(fNode.parentNode, err);
		}
	});

	if (!valid) {
		evt.StopDefaultAction();
		evt.StopHandlers();
	}

	return valid;

}


// ---------------------------------------------
// field checking
ow.Validate = function() {

	// string validation
	function String(str, req, min, max) { return !req || (str && (!min || str.length >= min) && (!max || str.length <= max)); }

	// email validation
	var reEmail = /^[^@]+@[a-z0-9]+([_\.\-]{0,1}[a-z0-9]+)*([\.]{1}[a-z0-9]+)+$/;
	function Email(str, req, min, max) {
		str = str.toLowerCase();
		var valid = (str != '' && (!min || str.length >= min) && (!max || str.length <= max) && (str.replace(reEmail, "") == ""));
		return (valid || (!req && str == ''));
	}

	return {
		String: String,
		Email: Email
	};

}();


// ---------------------------------------------
// Analytics tracking
var _gaq = _gaq || [];
ow.Analytics = function() {
	if (location.host.indexOf(".co") >= 0) {
		_gaq.push(["_setAccount", ow.Setup.Analytics]);
		_gaq.push(["_trackPageview"]);
		var ga = document.createElement("script");
		ga.type = "text/javascript";
		ga.async = true;
		ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
		var s = document.getElementsByTagName("head")[0];
		s.appendChild(ga);
	}
};
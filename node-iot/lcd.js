var LCD = require('jsupm_i2clcd');
var myLcd = new LCD.Jhd1313m1(0, 0x3E, 0x62);

var cur_r = 0;
var cur_g = 0;
var cur_b = 0;

function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r : parseInt(result[1], 16),
		g : parseInt(result[2], 16),
		b : parseInt(result[3], 16)
	} : null;
}

function setColorRGB(r, g, b, opt_duration) {
	myLcd.setColor(r, g, b);
	console.log('Setting LCD color to: ', r, g, b);
	if (opt_duration) {
		setTimeout(function() {
			setColorRGB(cur_r, cur_g, cur_b);
		}, opt_duration);
	} else {
		cur_r = r;
		cur_g = g;
		cur_b = b;
	}
}

module.exports = {
	setColor : function(color, opt_duration) {
		switch (color) {
		case 'red':
			setColorRGB(255, 0, 0, opt_duration);
			break;
		case 'blue':
			setColorRGB(0, 0, 255, opt_duration);
			break;
		case 'black':
			setColorRGB(0, 0, 0, opt_duration);
			break;
		case 'white':
			setColorRGB(255, 255, 0, opt_duration);
			break;
		case 'yellow':
			setColorRGB(255, 255, 0, opt_duration);
			break;
		case 'green':
			setColorRGB(0, 255, 0, opt_duration);
			break;
		default:
			var rgbValue = hexToRgb(color);
			if (rgbValue) {
				setColorRGB(rgbValue.r, rgbValue.b, rgbValue.g, opt_duration);
			} else {
				console.log('Error in color value');
			}
			break;
		}
	},

	setColorRGB : function(r, g, b, opt_duration) {
		setColorRGB(r, g, b, opt_duration);
	},

	writeText : function(text, opt_line) {
		if (opt_line == 2) {
			myLcd.setCursor(1, 0);
			myLcd.write('                  ');
			myLcd.setCursor(1, 0);
		} else {
			myLcd.setCursor(0, 0);
			myLcd.write('                  ');
			myLcd.setCursor(0, 0);
		}
		myLcd.write(text);
	}

}
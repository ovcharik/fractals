var JuliaSet, MandelbrotSet;

function HSV2RGB(_h, _s, _v) {
	var r, g, b;
	
	var h = _h / 255 * 360,
		s = _s / 255 * 100,
		v = _v / 255 * 100;
	
	var i = Math.floor(h / 60);
	var v_min = (100 - s) * v / 100;
	var a = (v - v_min) * (h % 60) / 60;
	var v_inc = v_min + a;
	var v_dec = v - a;
	
	if (i == 0) { r = v; g = v_inc; b = v_min; }
	else if (i == 1) { r = v_dec; g = v; b = v_min; }
	else if (i == 2) { r = v_min; g = v; b = v_inc; }
	else if (i == 3) { r = v_min; g = v_dec; b = v; }
	else if (i == 4) { r = v_inc; g = v_min; b = v; }
	else if (i == 5) { r = v; g = v_min; b = v_dec; }
	
	r = Math.floor(r * 2.55);
	g = Math.floor(g * 2.55);
	b = Math.floor(b * 2.55);
	
	return (r << 16) | (g << 8) | b;
}

JuliaSet = function(params) {
	var m = 256;
	var canvas = params.canvas;
	var w = canvas.getWidth(),
		h = canvas.getHeight();
	var x_min = params.x_min,
		y_min = params.y_min;
	var dx = (params.x_max - x_min) / (w - 1),
		dy = (params.y_max - y_min) / (h - 1);
	var c = params.c,
		p = params.p;
	
	for (var i = 0; i < w; i++) {
		var x, y;
		x = x_min + i * dx;
		for (var j = 0; j < h; j++) {
			y = y_min + j * dy;
			
			var tmp, k;
			var z = { re: x, im: y };
			for (k = 0; k < m; k++) {
				tmp = z.re;
				z.re = tmp * tmp - z.im * z.im + c;
				z.im = 2 * tmp * z.im + p;
				if (z.re * z.re + z.im * z.im > 4)
					break;
			}
			canvas.setPixel(i, j, HSV2RGB(255 % k, 255, 255 * ((k < m) ? 1 : 0)));
		}
	}
	canvas.draw();
};

MandelbrotSet = function(params) {
	var m = 256;
	var canvas = params.canvas;
	var w = canvas.getWidth(),
		h = canvas.getHeight();
	var x_min = params.x_min,
		y_min = params.y_min;
	var dx = (params.x_max - x_min) / (w - 1),
		dy = (params.y_max - y_min) / (h - 1);
	
	for (var i = 0; i < w; i++) {
		var x, y;
		x = x_min + i * dx;
		for (var j = 0; j < h; j++) {
			y = y_min + j * dy;
			
			var tmp, k;
			var z = { re: x, im: y };
			for (k = 0; k < m; k++) {
				tmp = z.re;
				z.re = tmp * tmp - z.im * z.im + x;
				z.im = 2 * tmp * z.im + y;
				if (z.re * z.re + z.im * z.im > 4)
					break;
			}
			canvas.setPixel(i, j, HSV2RGB(255 % k, 255, 255 * ((k < m) ? 1 : 0)));
		}
	}
	canvas.draw();
}
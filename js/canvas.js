var Canvas;

Canvas = (function() {
	function Canvas(id) {
		this.id = id;
		this.el = document.getElementById(this.id);
		this.context = this.el.getContext('2d');
		
		this.onResize();
	}
	
	Canvas.prototype.clear = function()
	{
		this.context.fillStyle = "white";
		this.context.fillRect(0, 0, this.getWidth(), this.getHeight());
	}
	
	Canvas.prototype.setPixel = function(x, y, c, alpha)
	{
		var a = alpha ? (c >> 24) & 0xFF : 0xFF,
			r = (c >> 16) & 0xFF,
			g = (c >> 8 ) & 0xFF,
			b = (c >> 0 ) & 0xFF,
			p = (y * this.getWidth() + x) * 4;
		this.imageData.data[p++] = r;
		this.imageData.data[p++] = g;
		this.imageData.data[p++] = b;
		this.imageData.data[p++] = a;
	}
	
	Canvas.prototype.draw = function()
	{
		this.context.putImageData(this.imageData, 0, 0);
	}
	
	Canvas.prototype.getWidth = function()
	{
		return this.width;
	}
	
	Canvas.prototype.getHeight = function()
	{
		return this.height;
	}
	
	Canvas.prototype.onResize = function()
	{
		this.width = this.el.width;
		this.height = this.el.height;
		this.imageData = this.context.getImageData(0, 0, this.getWidth(), this.getHeight());
		this.clear();
	}
	
	return Canvas;
})();
// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.rA2 = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.rA2.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};
	
	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function()
	{
		this.cx = this.properties[0];
				
		this.start= this.properties[1]; /* start Value */
					
		/* create the random array */
		this.arr= new Array(this.cx);
  		
		this.scramble();
	};
	
	instanceProto.scramble= function() // the scramble function
	{
		for (var i= 0; i< this.arr.length; i++)    
		{
			var randomNumber= Math.floor(Math.random() * this.arr.length);
			this.arr[i]= randomNumber + this.start;
			for (var j= 0; j< i; j++)
			{
				if (this.arr[j] == (randomNumber + this.start))
				{
					j= -1;
					randomNumber= Math.floor(Math.random() * this.arr.length);
					this.arr[i]= randomNumber + this.start;
				}
			}	
		}
	}
	
	instanceProto.at = function (x)
	{
		x = Math.floor(x);
		
		if (x < 0)
			return 0;
		if (x > this.cx - 1)
			return 0;
					
		return this.arr[x];
	};
	
	//////////////////////////////////////
	// Conditions
	pluginProto.cnds = {};
	var cnds = pluginProto.cnds;

	cnds.CompareX = function (x, cmp, val)
	{
		return cr.do_cmp(this.at(x), cmp, val);
	};
	
	//////////////////////////////////////
	// Actions
	pluginProto.acts = {};
	var acts = pluginProto.acts;

	acts.NewScramble = function ()
	{
		this.scramble();
	};
	acts.NewSize = function (newSize)
	{
		if (newSize <= 0) return; // change nothing
		
		var oldSize= this.cx;
		this.cx = newSize;
		
		var tempArray =  this.arr; // save the current array
		this.arr= new Array(newSize);  // recreate the random array
		for (var i= 0; i< newSize; i++)
		{
			if (i < oldSize)
			{
				this.arr[i]= tempArray[i]; // save the old values
			}
			else // new size is bigger than the old size
			{
				this.arr[i]= 0;
			}
		}
	};
    
    acts.NewStart = function (newStart)
	{	
		this.start=newStart;
	};
    
	//////////////////////////////////////
	// Expressions
	pluginProto.exps = {};
	var exps = pluginProto.exps;

	exps.At = function (ret, x )
	{
		var val = this.at(x);
		
		if (typeof val === "string")
			ret.set_string(val);
		else
			ret.set_float(val);
	};
	
	exps.Width = function (ret)
	{
		ret.set_int(this.cx);
	};
	
	exps.StartValue = function (ret) /* random */
	{
		ret.set_int(this.start);
	};
	
}());
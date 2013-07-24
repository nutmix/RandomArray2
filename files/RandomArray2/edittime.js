function GetPluginSettings()
{
	return {
		"name":			"Random Array2",
		"id":			"rA2",
		"version":		"1.2",
		"description":	"Give you an array with random numbers.",
		"author":		"Joe7",
		"help url":		"http://dev.liebhard.net/",
		"category":		"Data & Storage",
		"type":			"object",			// not in layout
		"rotatable":	false,
		"flags":		0
	};
};

//////////////////////////////////////////////////////////////
// Conditions
AddNumberParam("Index", "Index of the array value to compare.", "0");
AddCmpParam("Comparison", "How to compare the value.");
AddAnyTypeParam("Value", "The value to compare the array value to.", "0");
AddCondition(0,	0, "Compare at ", "Array", "Value at <b>{0}</b> {1} <b>{2}</b>", "Compare the value at an specified position in the array.", "CompareX");



//////////////////////////////////////////////////////////////
// Actions
AddAction(0, 0, "New scramble", "Array", "New scramble", "Get new random Numbers.", "NewScramble");
AddNumberParam("Size", "Set a new size for the array.", "10");
AddAction(1, 0, "New size", "Array", "Set size to <b>{0}</b>.", "New size", "NewSize");
AddNumberParam("Start", "Set a new Start for the array.", "1");
AddAction(2, 0, "New Start", "Array", "Set Start to <b>{0}</b>.", "New Start", "NewStart");


//////////////////////////////////////////////////////////////
// Expressions
AddNumberParam("Index", "The index of the array value to get.", "0");
AddExpression(0, ef_return_number, "Get value at", "Array", "At", "Get a value at a certain position from the array.");

AddExpression(1, ef_return_number, "Get width", "Array", "Width", "Get the number of elements of the array.");

AddExpression(2, ef_return_number, "Get start", "Array", "StartValue", "Get the startvalue.");

ACESDone();

// Property grid properties for this plugin
var property_list = [
		new cr.Property(ept_integer,		"Width",		10,			"Initial number of elements."),
			
		new cr.Property(ept_integer,		"StartValue",		1,			"Initial start number for random."),
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
	if (this.properties["Width"] < 1)
		this.properties["Width"] = 1;
		
	if (this.properties["Height"] < 1)
		this.properties["Height"] = 1;
		
	if (this.properties["Depth"] < 1)
		this.properties["Depth"] = 1;
}
	
// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}

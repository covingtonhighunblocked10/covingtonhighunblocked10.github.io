/**
	1. Initialise the box2d objects
	2. Code for class inheritance
*/

var b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2AABB = Box2D.Collision.b2AABB
	, b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2Fixture = Box2D.Dynamics.b2Fixture
	, b2World = Box2D.Dynamics.b2World
	, b2MassData = Box2D.Collision.Shapes.b2MassData
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
	, b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
	, b2Shape = Box2D.Collision.Shapes.b2Shape
	, b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
	, b2Joint = Box2D.Dynamics.Joints.b2Joint
	, b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef
	, b2ContactListener = Box2D.Dynamics.b2ContactListener
	, b2Settings = Box2D.Common.b2Settings
	, b2Mat22 = Box2D.Common.Math.b2Mat22
	, b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef
	, b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape
	, b2WorldManifold = Box2D.Collision.b2WorldManifold
	;

//max speed = 10 mps for higher velocity
b2Settings.b2_maxTranslation = 10.0;
b2Settings.b2_maxRotation = 50.0;


/*
	Load image from asset manager
*/
function img_res(path)
{
	var i = new Image();
	i.src = 'code/media/'+path;
	
	return i;
}

/*
	Generic function to write text
	example :
	
	write_text({x : game.canvas_width - 100 , y : game.canvas_height - 50 , font : 'bold 35px arial' , color : '#fff' , text : time , ctx : game.ctx})
*/
function write_text(options)
{
	var x = options.x;
	var y = options.y;
	var font = options.font;
	var color = options.color;
	var text = options.text;
	var ctx = options.ctx;
	
	ctx.save();
	
	if('shadow' in options)
	{
		ctx.shadowColor = options.shadow.color;
		ctx.shadowOffsetX = options.shadow.x;
		ctx.shadowOffsetY = options.shadow.y;
		ctx.shadowBlur = options.shadow.blur;
	}
	
	ctx.font = font;
	/*ctx.textAlign = 'center';*/
	ctx.fillStyle = color;
	
	if('align' in options)
	{
		ctx.textAlign = options.align;
	}
	
	ctx.fillText( text , x , y);
	
	ctx.restore();
}

let engine = Matter.Engine.create();
let render = Matter.Render.create({
    element: document.body,
    engine: engine
});
//parms: x,y,width,height,options
let ground = Matter.Bodies.rectangle(400, 600, 810, 60, {
    isStatic: true
});
let boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
let boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
Matter.World.add(engine.world,[boxA,boxB,ground,mouseCoonstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);
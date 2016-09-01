// MADE BY SEBAS :) 
var img;

// screen dims
var w = 640;
var h = 480;

// theremin dims
var numOctaves = 3;
var maxPitch   = 440;

// on init
function setup()
{
  createCanvas(w, h)
  background(0)
  
  img = loadImage("img/hand.png");
  
  // saws 3x osc
  saw1 = new p5.Oscillator('sawtooth');
  saw1.amp(1)
  
  saw2 = new p5.Oscillator('sawtooth');
  saw2.amp(1)
  
  saw3 = new p5.Oscillator('sawtooth');
  saw3.amp(1)
}



// default touch functions
var is_click = false

// If no touchStarted() function is defined, the mousePressed()
// function will be called instead if it is defined.
function touchStarted()
{
    // interpret as mouse click over links areas
    if (touches[0]["y"] >= 175 &&
        touches[0]["y"] <= 245 &&
        touches[0]["x"] >= 230 &&
        touches[0]["x"] <= 325 ||
        
        touches[0]["y"] >= 145 &&
        touches[0]["y"] <= 215 &&
        touches[0]["x"] >= 100 &&
        touches[0]["x"] <= 195)
    {
        is_click = true
        mousePressed()
    }
    // guarantees no zoom/pan during multitouch
    else { return false }
}

// If no touchEnded() function is defined, the mouseReleased()
// function will be called instead if it is defined.
function touchEnded()
{
    // interpret as mouse click over links
    if (is_click)
    {
        mouseReleased()
        is_click = false
    }
    // guarantees no zoom/pan during multitouch
    else { return false }
}




// convert height to Hz
function heightToHz(currentPos)
{
  return (Math.pow(2, (currentPos-h)/(h/numOctaves)))*maxPitch
}


// make sure one touch at a time
var lock_saw1 = false
var lock_saw2 = false
var lock_saw3 = false

function draw()
{
  /* place hand writing */
  image(img, 0, 0);

  /* START OSC */
  
  // check for mouse saw
  if (mouseIsPressed && !lock_saw1)
  {
    lock_saw1 = true
    saw1.start()
  }    
    
  // check for saw1
  if (touchIsDown && !lock_saw1)
  {
    lock_saw1 = true
    saw1.start()
  }
  
  // check for saw2 (saw1 must be active)
  if (touchIsDown && lock_saw1 && !lock_saw2)
  {
    lock_saw2 = true
    saw2.start()
  }
  
  // check for saw3 (saw1 & saw2 must be active)
  if (touchIsDown && lock_saw1 && lock_saw2 && !lock_saw3)
  {
    lock_saw3 = true
    saw3.start()
  }
  
  
  /* MODIFY PITCH */
  
  // if still holding mouse, allow pitch manip
  if (mouseIsPressed)
  {
    // range: [C1, C4]
    saw1.freq(heightToHz(mouseY))
  }  
    
  // if still holding saw1, allow pitch manip
  if (touches[0] !== undefined)
  {
    // range: [C1, C4]
    saw1.freq(heightToHz(touches[0]["y"]))
  }
  
  // if still holding saw2, allow pitch manip
  if (touches[1] !== undefined)
  {
    // range: [C1, C4]
    saw2.freq(heightToHz(touches[1]["y"]))
  }
  
  // if still holding saw2, allow pitch manip
  if (touches[2] !== undefined)
  {
    // range: [C1, C4]
    saw3.freq(heightToHz(touches[2]["y"]))
  }
  
  
  /* END OSC */
  
  // no 3 touch, stop saw3
  if (touches[2] === undefined)
  {
    saw3.stop()
    lock_saw3 = false
  }
  
  // no 2 touch, stop saw2
  if (touches[1] === undefined)
  {
    saw2.stop()
    lock_saw2 = false
  }
  
  // no touch, stop saw1
  if (touches[0] === undefined && !mouseIsPressed)
  {
    saw1.stop()
    lock_saw1 = false
  }
}
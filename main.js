// MADE BY SEBAS :) 
var img;
var switch_off;
var switch_off_hover;
var switch_on;
var switch_on_hover;

// screen dims
var w = 850;
var h = 480;

// theremin dims
var numOctaves = 3;
var maxPitch   = 440;
var power_on   = false;

// on init
function setup()
{
  createCanvas(w, h);
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(16);
    
  img = loadImage("img/hand.png");
  switch_off = loadImage("img/switch_off.png");
  switch_off_hover = loadImage("img/switch_off_hover.png");
  switch_on = loadImage("img/switch_on.png");
  switch_on_hover = loadImage("img/switch_on_hover.png");
  
  // saws 3x osc
  saw1 = new p5.Oscillator('sawtooth');
  saw1.amp(1);
  
  saw2 = new p5.Oscillator('sawtooth');
  saw2.amp(1);
  
  saw3 = new p5.Oscillator('sawtooth');
  saw3.amp(1);
}

// default touch functions
var is_click = false;

// If no touchStarted() function is defined, the mousePressed()
// function will be called instead if it is defined.
function touchStarted()
{
    // interpret as mouse click over links areas
    if (touches[0]["y"] >= 80  &&
        touches[0]["y"] <= 160 &&
        touches[0]["x"] >= 50  &&
        touches[0]["x"] <= 215 ||
        
        touches[0]["y"] >= 150 &&
        touches[0]["y"] <= 230 &&
        touches[0]["x"] >= 355 &&
        touches[0]["x"] <= 495 ||
        
        touches[0]["y"] >= 270 &&
        touches[0]["y"] <= 350 &&
        touches[0]["x"] >= 50  &&
        touches[0]["x"] <= 215)
    {
        is_click = true;
        mousePressed();
    }
    // guarantees no zoom/pan during multitouch
    else { return false }
}



// If no touchEnded() function is defined, the mouseReleased()
// function will be called instead if it is defined.
function touchEnded()
{
    // flip the switch if appropriate
     if (650<mouseX && mouseX<770 && 130<mouseY && mouseY<250){
        power_on = !power_on;
    }
    
    // interpret as mouse click over links
    if (is_click)
    {
        mouseReleased();
        is_click = false;
    }
    // guarantees no zoom/pan during multitouch
    else { return false; }
}

// convert height to Hz
function heightToHz(currentPos)
{
  return (Math.pow(2, (currentPos-h)/(h/numOctaves)))*maxPitch
}

// make sure one touch at a time
var lock_saw1 = false;
var lock_saw2 = false;
var lock_saw3 = false;

function draw()
{
  // place hand writing
  image(img, 0, 0);

  // place the switch on screen
  if (!power_on){
    if (650<mouseX && mouseX<770 && 130<mouseY && mouseY<250){
      image(switch_off_hover, 650, 130, 120, 120);
    }else{
      image(switch_off, 650, 130, 120, 120);
    }
  }else{
    if (650<mouseX && mouseX<770 && 130<mouseY && mouseY<250){
      image(switch_on_hover, 650, 130, 120, 120);
    }else{
      image(switch_on, 650, 130, 120, 120);
    }
  }
  
  // if theremin on 
  if (power_on){
      
      // message
      fill(255, 0, 0);
      text('(click and drag for sound!)', w/2, h-80);
      
      // START OSC
      if (mouseIsPressed && !lock_saw1)
      {
        lock_saw1 = true;
        saw1.start();
      }    

      // check for saw1
      if (touchIsDown && !lock_saw1)
      {
        lock_saw1 = true;
        saw1.start();
      }

      // check for saw2 (saw1 must be active)
      if (touchIsDown && lock_saw1 && !lock_saw2)
      {
        lock_saw2 = true;
        saw2.start();
      }

      // check for saw3 (saw1 & saw2 must be active)
      if (touchIsDown && lock_saw1 && lock_saw2 && !lock_saw3)
      {
        lock_saw3 = true;
        saw3.start();
      }


      // MODIFY PITCH
      // if still holding mouse, allow pitch manip
      if (mouseIsPressed)
      {
        // range: [C1, C4]
        saw1.freq(heightToHz(mouseY));
      }  

      // if still holding saw1, allow pitch manip
      if (touches[0] !== undefined)
      {
        // range: [C1, C4]
        saw1.freq(heightToHz(touches[0]["y"]));
      }

      // if still holding saw2, allow pitch manip
      if (touches[1] !== undefined)
      {
        // range: [C1, C4]
        saw2.freq(heightToHz(touches[1]["y"]));
      }

      // if still holding saw2, allow pitch manip
      if (touches[2] !== undefined)
      {
        // range: [C1, C4]
        saw3.freq(heightToHz(touches[2]["y"]));
      }
  }else{
      
      //message
      fill(255);
      text('(flip the switch to turn it on)', w/2, h-80);
  }
  
  
  // END OSC
  // no 3 touch, stop saw3
  if (touches[2] === undefined)
  {
    saw3.stop();
    lock_saw3 = false;
  }
  
  // no 2 touch, stop saw2
  if (touches[1] === undefined);
  {
    saw2.stop();
    lock_saw2 = false;
  }
  
  // no touch, stop saw1
  if (touches[0] === undefined && !mouseIsPressed)
  {
    saw1.stop();
    lock_saw1 = false;
  }
}
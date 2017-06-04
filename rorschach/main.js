// MADE BY SEBAS :) 

// screen dims
var w = 1000;
var h = 1000;
var grid_s = 100;

function preload()
{
    p0_1  = loadImage('img/blots/grid/0_1.png');
    p0_2  = loadImage('img/blots/grid/0_2.png');
    p0_3  = loadImage('img/blots/grid/0_3.png');
    p0_4  = loadImage('img/blots/grid/0_4.png');
    p1_1  = loadImage('img/blots/grid/1_1.png');
    p1_2  = loadImage('img/blots/grid/1_2.png');
    p1_3  = loadImage('img/blots/grid/1_3.png');
    p1_4  = loadImage('img/blots/grid/1_4.png');
    p2C_1 = loadImage('img/blots/grid/2C_1.png');
    p2C_2 = loadImage('img/blots/grid/2C_2.png');
    p2C_3 = loadImage('img/blots/grid/2C_3.png');
    p2C_4 = loadImage('img/blots/grid/2C_4.png');
    p2H_1 = loadImage('img/blots/grid/2H_1.png');
    p2H_2 = loadImage('img/blots/grid/2H_2.png');
    p2H_3 = loadImage('img/blots/grid/2H_3.png');
    p2H_4 = loadImage('img/blots/grid/2H_4.png');
    p2I_1 = loadImage('img/blots/grid/2I_1.png');
    p2I_2 = loadImage('img/blots/grid/2I_2.png');
    p2I_3 = loadImage('img/blots/grid/2I_3.png');
    p2I_4 = loadImage('img/blots/grid/2I_4.png');
    p3_1  = loadImage('img/blots/grid/3_1.png');
    p3_2  = loadImage('img/blots/grid/3_2.png');
    p3_3  = loadImage('img/blots/grid/3_3.png');
    p3_4  = loadImage('img/blots/grid/3_4.png');
    p4_1  = loadImage('img/blots/grid/4_1.png');
    p4_2  = loadImage('img/blots/grid/4_2.png');
    p4_3  = loadImage('img/blots/grid/4_3.png');
    p4_4  = loadImage('img/blots/grid/4_4.png');
}

// USED TO PLACE IMAGES ON CANVAS
function draw_img(img, mir, rot, blot_size, x_index, y_index)
{
    var x = x_index*grid_s;
    var y = y_index*grid_s;
    var x_flip = -x-grid_s;
    var y_flip = -y-grid_s;
    if (blot_size == 1)
    {
        if (mir == false)
        {
            switch(rot)
            {
                case 0: /*rotate(0)*/   image(img, x,      y,      grid_s, grid_s); break;
                case 1: rotate(PI/2);   image(img, y,      x_flip, grid_s, grid_s); break;
                case 2: rotate(PI);     image(img, x_flip, y_flip, grid_s, grid_s); break;
                case 3: rotate(3*PI/2); image(img, y_flip, x,      grid_s, grid_s); break;
            }
        }
        else
        {
            switch(rot)
            {
                case 0:  /*rotate(0)*/   scale (-1, 1); image(img, x_flip, y,      grid_s, grid_s); break;
                case 1:  rotate(PI/2);   scale (-1, 1); image(img, y_flip, x_flip, grid_s, grid_s); break;
                case 2:  rotate(PI);     scale (-1, 1); image(img, x,      y_flip, grid_s, grid_s); break;
                case 3:  rotate(3*PI/2); scale (-1, 1); image(img, y,      x,      grid_s, grid_s); break;
            }
        }
    }
    else if (blot_size == 2)
    {
        var blot_s = grid_s*2;
        x = x_index*grid_s;
        y = y_index*grid_s;
        x_flip = -x-blot_s;
        y_flip = -y-blot_s;
        if (mir == false)
        {
            switch(rot)
            {
                case 0: /*rotate(0)*/   image(img, x,      y,      blot_s, blot_s); break;
                case 1: rotate(PI/2);   image(img, y,      x_flip, blot_s, blot_s); break;
                case 2: rotate(PI);     image(img, x_flip, y_flip, blot_s, blot_s); break;
                case 3: rotate(3*PI/2); image(img, y_flip, x,      blot_s, blot_s); break;
            }
        }
        else
        {
            switch(rot)
            {
                case 0:  /*rotate(0)*/   scale (-1, 1); image(img, x_flip, y,      blot_s, blot_s); break;
                case 1:  rotate(PI/2);   scale (-1, 1); image(img, y_flip, x_flip, blot_s, blot_s); break;
                case 2:  rotate(PI);     scale (-1, 1); image(img, x,      y_flip, blot_s, blot_s); break;
                case 3:  rotate(3*PI/2); scale (-1, 1); image(img, y,      x,      blot_s, blot_s); break;
            }
        }
    }

    resetMatrix();
    scale(1, 1);
}

// OBJECT THAT HOLDS ATTRIBUTES OF ALL POSSIBLE BLOTS (used in IMGS[])
function blot(img, mir, rot, T, B, L, R)
{
    this.blot     = img;
    this.mirror   = mir;
    this.rotation = rot;
    this.top      = T;
    this.bottom   = B;
    this.left     = L;
    this.right    = R;
}

// OBJECT THAT HOLDS COVERAGE/EDGE TYPES IN GRID (used in COVER[])
function coverage(cov, T, B, L, R)
{
    this.coverage = cov; 
    this.top      = T;
    this.bottom   = B;
    this.left     = L;
    this.right    = R;
}

// OBJECT THAT HOLDS ATTRIBUTES OF ACTUAL PLACED BLOT (used in PLACE[])
function placement(add, img_index, x_i, y_i, blot_s, R)
{
    this.used      = add;       // indicates whether the object is being used for plotted blot (since PLACE[] is pre-allocated to max)
    this.blot      = img_index; // reference to IMGS[] so that proper img, rotation, mirroring, can be used
    this.x_index   = x_i;       // x index of anchor point (top left)
    this.y_index   = y_i;       // y index of anchor point (top left)
    this.blot_size = blot_s;    // 0, 1, or 2. indicates 1x1 or 2x2. 0 for uninitialized 
}

function setup()
{
    createCanvas(w, h);
    background(255);
    noStroke();
}

function draw()
{
    clear();
    background(255);
    draw_img(p2C_1, false, 0, 1, 0, 0);
    draw_img(p2C_1, false, 1, 1, 1, 0);
    draw_img(p2C_1, false, 2, 1, 2, 0);
    draw_img(p2C_1, false, 3, 1, 3, 0);
    draw_img(p2C_1, true, 0, 1, 0, 1);
    draw_img(p2C_1, true, 1, 1, 1, 1);
    draw_img(p2C_1, true, 2, 1, 2, 1);
    draw_img(p2C_1, true, 3, 1, 3, 1);
    draw_img(p2C_1, false, 0, 2, 0, 2);
    draw_img(p2C_1, false, 1, 2, 2, 2);
    draw_img(p2C_1, false, 2, 2, 4, 2);
    draw_img(p2C_1, false, 3, 2, 6, 2);
    draw_img(p2C_1, true, 0, 2, 0, 4);
    draw_img(p2C_1, true, 1, 2, 2, 4);
    draw_img(p2C_1, true, 2, 2, 4, 4);
    draw_img(p2C_1, true, 3, 2, 6, 4);

    /*
    image(p2C_1, 0, grid_s, grid_s, grid_s);
    rotate(PI/2)
    image(p2C_1, 0, -grid_s, grid_s, grid_s);
    
    image(p2C_1, 100, 100, 100, 100);
    */
}
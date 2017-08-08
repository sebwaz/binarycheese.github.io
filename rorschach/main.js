// MADE BY SEBAS :) 

// screen dims
var w = 1000;
var h = 1000;
var grid_s = 100;
var IMGS;
var BLOTS;
var COVER;
var PLACE;
var debug_text;

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
    IMGS     = new Array();
    IMGS[0]  = p0_1;
    IMGS[1]  = p0_2;
    IMGS[2]  = p0_3;
    IMGS[3]  = p0_4;
    IMGS[4]  = p1_1;
    IMGS[5]  = p1_2;
    IMGS[6]  = p1_3;
    IMGS[7]  = p1_4;
    IMGS[8]  = p2C_1;
    IMGS[9]  = p2C_2;
    IMGS[10] = p2C_3;
    IMGS[11] = p2C_4;
    IMGS[12] = p2H_1;
    IMGS[13] = p2H_2;
    IMGS[14] = p2H_3;
    IMGS[15] = p2H_4;
    IMGS[16] = p2I_1;
    IMGS[17] = p2I_2;
    IMGS[18] = p2I_3;
    IMGS[19] = p2I_4;
    IMGS[20] = p3_1;
    IMGS[21] = p3_2;
    IMGS[22] = p3_3;
    IMGS[23] = p3_4;
    IMGS[24] = p4_1;
    IMGS[25] = p4_2;
    IMGS[26] = p4_3;
    IMGS[27] = p4_4;
}

// USED TO PLACE IMAGES ON CANVAS
function draw_img(img, mir, rot, blot_size, x_index, y_index)
{
    var blot_s = grid_s*blot_size;
    x = x_index*grid_s;
    y = y_index*grid_s;
    x_flip = -x-blot_s;
    y_flip = -y-blot_s;
    if (mir == false)
    {
        // print base
        switch(rot)
        {
            case 0: /*rotate(0)*/   image(img, x,      y,      blot_s, blot_s); break;
            case 1: rotate(PI/2);   image(img, y,      x_flip, blot_s, blot_s); break;
            case 2: rotate(PI);     image(img, x_flip, y_flip, blot_s, blot_s); break;
            case 3: rotate(3*PI/2); image(img, y_flip, x,      blot_s, blot_s); break;
        }
        resetMatrix();
        scale(1, 1);

        // print mirror
        switch(rot)
        {
            case 0:  /*rotate(0)*/   scale (-1, 1); image(img, -(w-x),   y,        blot_s, blot_s); break;
            case 1:  rotate(3*PI/2); scale (-1, 1); image(img, y,        w+x_flip, blot_s, blot_s); break;
            case 2:  rotate(PI);     scale (-1, 1); image(img, w+x_flip, y_flip,   blot_s, blot_s); break;
            case 3:  rotate(PI/2);   scale (-1, 1); image(img, y_flip,   -(w-x),   blot_s, blot_s); break;
        }
        resetMatrix();
        scale(1, 1);
    }
    else
    {
        // print base
        switch(rot)
        {
            case 0:  /*rotate(0)*/   scale (-1, 1); image(img, x_flip, y,      blot_s, blot_s); break;
            case 1:  rotate(PI/2);   scale (-1, 1); image(img, y_flip, x_flip, blot_s, blot_s); break;
            case 2:  rotate(PI);     scale (-1, 1); image(img, x,      y_flip, blot_s, blot_s); break;
            case 3:  rotate(3*PI/2); scale (-1, 1); image(img, y,      x,      blot_s, blot_s); break;
        }
        resetMatrix();
        scale(1, 1);

         // print mirrored
        switch(rot)
        {
            case 0: /*rotate(0)*/   image(img, w+x_flip, y,        blot_s, blot_s); break;
            case 1: rotate(3*PI/2); image(img, y_flip,   w+x_flip, blot_s, blot_s); break;
            case 2: rotate(PI);     image(img, -w+x,     y_flip,   blot_s, blot_s); break;
            case 3: rotate(PI/2);   image(img, y,        -w+x,     blot_s, blot_s); break;
        }
        resetMatrix();
        scale(1, 1);
    }
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
function coverage(cov, x_i, y_i, T, B, L, R)
{
    this.coverage = cov;
    this.x        = x_i;
    this.y        = y_i;
    this.top      = T;
    this.bottom   = B;
    this.left     = L;
    this.right    = R;
}

// OBJECT THAT HOLDS ATTRIBUTES OF ACTUAL PLACED BLOT (used in PLACE[])
function placement(rot_i, type_i, ver_i, x_i, y_i, blot_s)
{
    this.rot_index  = rot_i;  // references to IMGS[rot][type][ver]
    this.type_index = type_i; 
    this.ver_index  = ver_i;
    this.x_index    = x_i;    // x index of anchor point (top left)
    this.y_index    = y_i;    // y index of anchor point (top left)
    this.blot_size  = blot_s; // 0, 1, or 2. indicates 1x1 or 2x2. 0 for uninitialized 
}

// get a random integer between two values, inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// mouse click listener, regenerates the rorschach
function mouseClicked() {
    /////////////////
    // reset COVER //
    /////////////////
    COVER = []
    COVER = new Array(5)
    for (var i = 0; i < 5; i++)
    {
        COVER[i] = new Array(10);
        for (var j = 0; j < 10; j++)
        {
            COVER[i][j] = new coverage(false, i, j, 'n', 'n', 'n', 'n');
        }
    }
    setup();
}

// function for deciding what blots are plotted where
function generate()
{
    ///////////
    // 4 X 4 //
    ///////////
    var num_5x5 = getRandomIntInclusive(0, 1);
    if (num_5x5 == 0)
    {
        big_x = getRandomIntInclusive(0, 1);
        big_y = getRandomIntInclusive(0, 6);
        
        // pick random blot from entire set BLOTS[]
        var r_rot  = getRandomIntInclusive(0, 3);
        var r_type = getRandomIntInclusive(0, 6);
        var r_ver  = getRandomIntInclusive(0, 7);

        // add selection to PLACE[]
        PLACE[PLACE.length] = new placement(r_rot, r_type, r_ver, big_x, big_y, 4);
        
        for (var j = 0; j < 16; j++)
        {
            // mark as covered
            COVER[big_x+(j%4)][big_y+((j-(j%4))/4)].coverage = true;

            // mark edges of all squares  under 4x4 in the same way
            COVER[big_x+(j%4)][big_y+((j-(j%4))/4)].top      = COVER[big_x][big_y].top;
            COVER[big_x+(j%4)][big_y+((j-(j%4))/4)].bottom   = COVER[big_x][big_y].bottom;
            COVER[big_x+(j%4)][big_y+((j-(j%4))/4)].left     = COVER[big_x][big_y].left;
            COVER[big_x+(j%4)][big_y+((j-(j%4))/4)].right    = COVER[big_x][big_y].right;
        }
        
        // update 16 adjacent sides accordingly
        if (big_y>0)
        {
            COVER[big_x  ][big_y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
            COVER[big_x+1][big_y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
            COVER[big_x+2][big_y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
            COVER[big_x+3][big_y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
        }
        if (big_y<6)
        {
            COVER[big_x  ][big_y+4].top = BLOTS[r_rot][r_type][r_ver].bottom;
            COVER[big_x+1][big_y+4].top = BLOTS[r_rot][r_type][r_ver].bottom;
            COVER[big_x+2][big_y+4].top = BLOTS[r_rot][r_type][r_ver].bottom;
            COVER[big_x+3][big_y+4].top = BLOTS[r_rot][r_type][r_ver].bottom;
        }
        if (big_x>0)
        {
            COVER[big_x-1][big_y  ].right = BLOTS[r_rot][r_type][r_ver].left;
            COVER[big_x-1][big_y+1].right = BLOTS[r_rot][r_type][r_ver].left;
            COVER[big_x-1][big_y+2].right = BLOTS[r_rot][r_type][r_ver].left;
            COVER[big_x-1][big_y+3].right = BLOTS[r_rot][r_type][r_ver].left;
        }
        if (big_x<1)
        {
            COVER[big_x+4][big_y  ].left = BLOTS[r_rot][r_type][r_ver].right;
            COVER[big_x+4][big_y+1].left = BLOTS[r_rot][r_type][r_ver].right;
            COVER[big_x+4][big_y+2].left = BLOTS[r_rot][r_type][r_ver].right;
            COVER[big_x+4][big_y+3].left = BLOTS[r_rot][r_type][r_ver].right;
        }
    }
    
    ///////////
    // 5 X 5 //
    ///////////
    else
    {
        big_x = 0;
        big_y = getRandomIntInclusive(0, 5);
        
        // pick random blot from entire set BLOTS[]
        var r_rot  = getRandomIntInclusive(0, 3);
        var r_type = getRandomIntInclusive(0, 6);
        var r_ver  = getRandomIntInclusive(0, 7);

        // add selection to PLACE[]
        PLACE[PLACE.length] = new placement(r_rot, r_type, r_ver, big_x, big_y, 5);
        
        for (var j = 0; j < 25; j++)
        {
            // mark as covered
            COVER[big_x+(j%5)][big_y+((j-(j%5))/5)].coverage = true;

            // mark edges of all squares  under 5x5 in the same way
            COVER[big_x+(j%5)][big_y+((j-(j%5))/5)].top      = COVER[big_x][big_y].top;
            COVER[big_x+(j%5)][big_y+((j-(j%5))/5)].bottom   = COVER[big_x][big_y].bottom;
            COVER[big_x+(j%5)][big_y+((j-(j%5))/5)].left     = COVER[big_x][big_y].left;
            COVER[big_x+(j%5)][big_y+((j-(j%5))/5)].right    = COVER[big_x][big_y].right;
        }
        
        // update 10 adjacent sides accordingly (left and right don't matter here)
        if (big_y>0)
        {
            COVER[big_x  ][big_y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
            COVER[big_x+1][big_y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
            COVER[big_x+2][big_y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
            COVER[big_x+3][big_y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
            COVER[big_x+4][big_y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
        }
        if (big_y<5)
        {
            COVER[big_x  ][big_y+5].top = BLOTS[r_rot][r_type][r_ver].bottom;
            COVER[big_x+1][big_y+5].top = BLOTS[r_rot][r_type][r_ver].bottom;
            COVER[big_x+2][big_y+5].top = BLOTS[r_rot][r_type][r_ver].bottom;
            COVER[big_x+3][big_y+5].top = BLOTS[r_rot][r_type][r_ver].bottom;
            COVER[big_x+4][big_y+5].top = BLOTS[r_rot][r_type][r_ver].bottom;
        }
    }
    
    ///////////
    // 3 X 3 //
    ///////////
    for (var i = 0; i < 2; i++)
    {
        // make list of possible anchor points
        var list_open = [];
        for (var j = 0; j < 5-2; j++)
        {
            for (var k = 0; k < 10-2; k++)
            {
                if (!COVER[j][k].coverage   && !COVER[j+1][k].coverage   && !COVER[j+2][k].coverage   &&
                    !COVER[j][k+1].coverage && !COVER[j+1][k+1].coverage && !COVER[j+2][k+1].coverage &&
                    !COVER[j][k+2].coverage && !COVER[j+1][k+2].coverage && !COVER[j+2][k+2].coverage &&
                    (j==0 || !COVER[j-1][k].coverage && !COVER[j-1][k+1].coverage && !COVER[j-1][k+2].coverage) &&
                    (j==2 || !COVER[j+3][k].coverage && !COVER[j+3][k+1].coverage && !COVER[j+3][k+2].coverage) &&
                    (k==0 || !COVER[j][k-1].coverage && !COVER[j+1][k-1].coverage && !COVER[j+2][k-1].coverage) &&
                    (k==7 || !COVER[j][k+3].coverage && !COVER[j+1][k+3].coverage && !COVER[j+2][k+3].coverage))
                {
                    list_open[list_open.length] = COVER[j][k];
                }
            }
        }
        
        // if list is empty, break out of loop
        if (list_open.length == 0)
        {
            break;
        }
        // else add the 3x3s to the place buffer, update coverage accordingly
        else
        {
            // pick random point from list
            var chosen = getRandomIntInclusive(0, list_open.length-1);
            
            // pick random blot from entire set BLOTS[]
            var r_rot  = getRandomIntInclusive(0, 3);
            var r_type = getRandomIntInclusive(0, 6);
            var r_ver  = getRandomIntInclusive(0, 7);
            
            // add selection to PLACE[]
            PLACE[PLACE.length] = new placement(r_rot, r_type, r_ver, list_open[chosen].x, list_open[chosen].y, 3);
            // update COVER[] accordingly (double check all adjacent edges)
            for (var j = 0; j < 9; j++)
            {
                // mark as covered
                COVER[list_open[chosen].x+(j%3)][list_open[chosen].y+((j-(j%3))/3)].coverage = true;
                 
                // mark edges of all squares  under 3x3 in the same way
                COVER[list_open[chosen].x+(j%3)][list_open[chosen].y+((j-(j%3))/3)].top      = COVER[list_open[chosen].x][list_open[chosen].y].top;
                COVER[list_open[chosen].x+(j%3)][list_open[chosen].y+((j-(j%3))/3)].bottom   = COVER[list_open[chosen].x][list_open[chosen].y].bottom;
                COVER[list_open[chosen].x+(j%3)][list_open[chosen].y+((j-(j%3))/3)].left     = COVER[list_open[chosen].x][list_open[chosen].y].left;
                COVER[list_open[chosen].x+(j%3)][list_open[chosen].y+((j-(j%3))/3)].right    = COVER[list_open[chosen].x][list_open[chosen].y].right;
            }
            
            // update 12 adjacent sides accordingly
            if (list_open[chosen].y>0)
            {
                COVER[list_open[chosen].x  ][list_open[chosen].y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
                COVER[list_open[chosen].x+1][list_open[chosen].y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
                COVER[list_open[chosen].x+2][list_open[chosen].y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
            }
            if (list_open[chosen].y<7)
            {
                COVER[list_open[chosen].x  ][list_open[chosen].y+3].top = BLOTS[r_rot][r_type][r_ver].bottom;
                COVER[list_open[chosen].x+1][list_open[chosen].y+3].top = BLOTS[r_rot][r_type][r_ver].bottom;
                COVER[list_open[chosen].x+2][list_open[chosen].y+3].top = BLOTS[r_rot][r_type][r_ver].bottom;
            }
            if (list_open[chosen].x>0)
            {
                COVER[list_open[chosen].x-1][list_open[chosen].y  ].right = BLOTS[r_rot][r_type][r_ver].left;
                COVER[list_open[chosen].x-1][list_open[chosen].y+1].right = BLOTS[r_rot][r_type][r_ver].left;
                COVER[list_open[chosen].x-1][list_open[chosen].y+2].right = BLOTS[r_rot][r_type][r_ver].left;
            }
            if (list_open[chosen].x<2)
            {
                COVER[list_open[chosen].x+3][list_open[chosen].y  ].left = BLOTS[r_rot][r_type][r_ver].right;
                COVER[list_open[chosen].x+3][list_open[chosen].y+1].left = BLOTS[r_rot][r_type][r_ver].right;
                COVER[list_open[chosen].x+3][list_open[chosen].y+2].left = BLOTS[r_rot][r_type][r_ver].right;
            }
        }
    }
    
    ///////////
    // 2 X 2 //
    ///////////
    // pick random number of 2x2 blots: [0, 10]
    var num_2x2 = getRandomIntInclusive(0, 10);
    
    for (var i = 0; i < num_2x2; i++)
    {
        // make list of possible anchor points
        var list_open = [];
        for (var j = 0; j < 5-1; j++)
        {
            for (var k = 0; k < 10-1; k++)
            {
                if (!COVER[j][k].coverage && !COVER[j+1][k].coverage && !COVER[j][k+1].coverage && !COVER[j+1][k+1].coverage &&
                    (j==0 || !COVER[j-1][k].coverage && !COVER[j-1][k+1].coverage) &&
                    (j==3 || !COVER[j+2][k].coverage && !COVER[j+2][k+1].coverage) &&
                    (k==0 || !COVER[j][k-1].coverage && !COVER[j+1][k-1].coverage) &&
                    (k==8 || !COVER[j][k+2].coverage && !COVER[j+1][k+2].coverage))
                {
                    list_open[list_open.length] = COVER[j][k];
                }
            }
        }
        
        // if list is empty, break out of loop
        if (list_open.length == 0)
        {
            break;
        }
        // else add the 2x2s to the place buffer, update coverage accordingly
        else
        {
            // pick random point from list
            var chosen = getRandomIntInclusive(0, list_open.length-1);
            
            // pick random blot from entire set BLOTS[]
            var r_rot  = getRandomIntInclusive(0, 3);
            var r_type = getRandomIntInclusive(0, 6);
            var r_ver  = getRandomIntInclusive(0, 7);
            
            // add selection to PLACE[]
            PLACE[PLACE.length] = new placement(r_rot, r_type, r_ver, list_open[chosen].x, list_open[chosen].y, 2);
            // update COVER[] accordingly (double check all adjacent edges)
            for (var j = 0; j < 4; j++)
            {
                // mark as covered
                COVER[list_open[chosen].x+(j%2)][list_open[chosen].y+((j-(j%2))/2)].coverage = true;
                 
                // mark edges of all squares  under 2x2 in the same way
                COVER[list_open[chosen].x+(j%2)][list_open[chosen].y+((j-(j%2))/2)].top      = COVER[list_open[chosen].x][list_open[chosen].y].top;
                COVER[list_open[chosen].x+(j%2)][list_open[chosen].y+((j-(j%2))/2)].bottom   = COVER[list_open[chosen].x][list_open[chosen].y].bottom;
                COVER[list_open[chosen].x+(j%2)][list_open[chosen].y+((j-(j%2))/2)].left     = COVER[list_open[chosen].x][list_open[chosen].y].left;
                COVER[list_open[chosen].x+(j%2)][list_open[chosen].y+((j-(j%2))/2)].right    = COVER[list_open[chosen].x][list_open[chosen].y].right;
            }
            
            // update 8 adjacent sides accordingly
            if (list_open[chosen].y>0)
            {
                COVER[list_open[chosen].x  ][list_open[chosen].y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
                COVER[list_open[chosen].x+1][list_open[chosen].y-1].bottom = BLOTS[r_rot][r_type][r_ver].top;
            }
            if (list_open[chosen].y<8)
            {
                COVER[list_open[chosen].x  ][list_open[chosen].y+2].top = BLOTS[r_rot][r_type][r_ver].bottom;
                COVER[list_open[chosen].x+1][list_open[chosen].y+2].top = BLOTS[r_rot][r_type][r_ver].bottom;
            }
            if (list_open[chosen].x>0)
            {
                COVER[list_open[chosen].x-1][list_open[chosen].y  ].right = BLOTS[r_rot][r_type][r_ver].left;
                COVER[list_open[chosen].x-1][list_open[chosen].y+1].right = BLOTS[r_rot][r_type][r_ver].left;
            }
            if (list_open[chosen].x<3)
            {
                COVER[list_open[chosen].x+2][list_open[chosen].y  ].left = BLOTS[r_rot][r_type][r_ver].right;
                COVER[list_open[chosen].x+2][list_open[chosen].y+1].left = BLOTS[r_rot][r_type][r_ver].right;
            }
        }
    }
    
    //////////////////////////////////////////////
    // FORCE WHITE BORDER IF NOT DETERMINED YET //
    //////////////////////////////////////////////
    
    ///////////
    // 1 X 1 //
    ///////////
    // generate list of remaining spaces in COVER[]
    var list_open = [];   
    for (var j = 0; j < 5; j++)
    {
        for (var k = 0; k < 10; k++)
        {
            if (!COVER[j][k].coverage)
            {
                list_open[list_open.length] = COVER[j][k];
            }
        }
    }
    // for # of placements left:
    for (var i = 0; list_open.length > 0; i++)
    {
        // choose element from above list randomly
        var choose = getRandomIntInclusive(0, list_open.length-1);
        
        // get indices and values, then pop/remove the chosen element from the list
        var x_1      = list_open[choose].x
        var y_1      = list_open[choose].y
        var top_1    = COVER[x_1][y_1].top
        var bottom_1 = COVER[x_1][y_1].bottom
        var left_1   = COVER[x_1][y_1].left
        var right_1  = COVER[x_1][y_1].right
        list_open.splice(choose, 1)
        
        // create list of blots that work by checking neighbor requirements of space
        var usable_blots = []
        for (var t = 0; t < 4; t++)
        {
            for (var u = 0; u < 7; u++)
            {
                for (var v = 0; v < 8; v++)
                {
                    if ((BLOTS[t][u][v].top    == top_1    || top_1    == 'n') &&
                        (BLOTS[t][u][v].bottom == bottom_1 || bottom_1 == 'n') &&
                        (BLOTS[t][u][v].left   == left_1   || left_1   == 'n') &&
                        (BLOTS[t][u][v].right  == right_1  || right_1  == 'n'))
                    {
                        usable_blots[usable_blots.length] = [t, u, v];
                    }
                }
            }
        }
            
        // randomly pick a blot from above list
        var blot_pick = getRandomIntInclusive(0, usable_blots.length-1);
        //textSize(64);
        //fill(0, 102, 153);
        //text(choose.toString(), 10, h-64);
        //debug_text = usable_blots.length;
        // add in PLACE[]
        if (usable_blots.length > 0)
        {
            PLACE[PLACE.length] = new placement(usable_blots[blot_pick][0], usable_blots[blot_pick][1], usable_blots[blot_pick][2], x_1, y_1, 1);
        }
        //
        
        // update COVER[] accordingly
        COVER[x_1][y_1].coverage = true;
        COVER[x_1][y_1].top      = BLOTS[usable_blots[blot_pick][0]][usable_blots[blot_pick][1]][usable_blots[blot_pick][2]].top;
        COVER[x_1][y_1].bottom   = BLOTS[usable_blots[blot_pick][0]][usable_blots[blot_pick][1]][usable_blots[blot_pick][2]].bottom;
        COVER[x_1][y_1].left     = BLOTS[usable_blots[blot_pick][0]][usable_blots[blot_pick][1]][usable_blots[blot_pick][2]].left;
        COVER[x_1][y_1].right    = BLOTS[usable_blots[blot_pick][0]][usable_blots[blot_pick][1]][usable_blots[blot_pick][2]].right;
        
        // mark edges of all adjacent squares accordingly
        if (y_1>0)
        {
            COVER[x_1][y_1-1].bottom = BLOTS[usable_blots[blot_pick][0]][usable_blots[blot_pick][1]][usable_blots[blot_pick][2]].top;
        }
        if (y_1<9)
        {
            COVER[x_1][y_1+1].top    = BLOTS[usable_blots[blot_pick][0]][usable_blots[blot_pick][1]][usable_blots[blot_pick][2]].bottom;
        }
        if (x_1>0)
        {
            COVER[x_1-1][y_1].right  = BLOTS[usable_blots[blot_pick][0]][usable_blots[blot_pick][1]][usable_blots[blot_pick][2]].left;
        }
        if (x_1<4)
        {
            COVER[x_1+1][y_1].left   = BLOTS[usable_blots[blot_pick][0]][usable_blots[blot_pick][1]][usable_blots[blot_pick][2]].right;
        }
    }
}

// initialize major data tables
function setup()
{
    createCanvas(w, h);
    background(255, 0, 0);
    noStroke();
    
    //////////////////
    // set up BLOTS //
    //////////////////
    BLOTS = new Array(4);
    for (var i = 0; i < 4; i++)
    {
        BLOTS[i] = new Array(8);
        for (var j = 0; j < 8; j++)
        {
            BLOTS[i][j] = new Array(7);
        }
    }
    
    // enter standard blots (no rotation, no mirror)
    for (var i = 0; i < IMGS.length; i++)
    {
        // type 0
        if (i < 4)
        {
            BLOTS[0][(i-(i%4))/4][i%4] = new blot(IMGS[i], false, 0, 'w', 'w', 'w', 'w');
        }
        
        // type 1
        else if (i < 8)
        {
            BLOTS[0][(i-(i%4))/4][i%4] = new blot(IMGS[i], false, 0, 'b', 'w', 'w', 'w');
        }
        
        // type 2c
        else if (i < 12)
        {
            BLOTS[0][(i-(i%4))/4][i%4] = new blot(IMGS[i], false, 0, 'b', 'w', 'w', 'b');
        }
        
        // types 2h & 2i
        else if (i < 20)
        {
            BLOTS[0][(i-(i%4))/4][i%4] = new blot(IMGS[i], false, 0, 'b', 'b', 'w', 'w');
        }
        
        // type 3
        else if (i < 24)
        {
            BLOTS[0][(i-(i%4))/4][i%4] = new blot(IMGS[i], false, 0, 'b', 'w', 'b', 'b');
        }
        
        // type 4
        else if (i < 28)
        {
            BLOTS[0][(i-(i%4))/4][i%4] = new blot(IMGS[i], false, 0, 'b', 'b', 'b', 'b');
        }
    }
    
    // enter mirrored standard blots (no rotation)
    for (var i = 0; i < IMGS.length; i++)
    {
        var to_mirror = BLOTS[0][(i-(i%4))/4][i%4];
        BLOTS[0][(i-(i%4))/4][(i%4)+4] = new blot(to_mirror.blot, true, 0, to_mirror.top, to_mirror.bottom, to_mirror.right, to_mirror.left);
    }
    
    // enter rotated blots (mirrored and unmirrored)
    for (var i = 0; i < 2*IMGS.length; i++)
    {
        var to_rotate = BLOTS[0][(i-(i%8))/8][i%8];
        for (var j = 1; j < 4; j++)
        {
            switch(j)
            {
                case 1: BLOTS[j][(i-(i%8))/8][i%8] = new blot(to_rotate.blot, to_rotate.mirror, 1, to_rotate.left,   to_rotate.right, to_rotate.bottom, to_rotate.top);    break;
                case 2: BLOTS[j][(i-(i%8))/8][i%8] = new blot(to_rotate.blot, to_rotate.mirror, 2, to_rotate.bottom, to_rotate.top,   to_rotate.right,  to_rotate.left);   break;
                case 3: BLOTS[j][(i-(i%8))/8][i%8] = new blot(to_rotate.blot, to_rotate.mirror, 3, to_rotate.right,  to_rotate.left,  to_rotate.top,    to_rotate.bottom); break;
            }
        }
    }
    
    //////////////////
    // set up COVER //
    //////////////////
    COVER = new Array(5)
    for (var i = 0; i < 5; i++)
    {
        COVER[i] = new Array(10);
        for (var j = 0; j < 10; j++)
        {
            COVER[i][j] = new coverage(false, i, j, 'n', 'n', 'n', 'n');
        }
    }
    
    //////////////////
    // set up PLACE //
    //////////////////
    PLACE = [];
    
    ///////////////////////////////
    // GENERATE BLOT ARRANGEMENT //
    ///////////////////////////////
    generate();
}

function draw()
{
    clear();
    background(255);
    for (var i = 0; i < PLACE.length; i++)
    {
        var blot = BLOTS[PLACE[i].rot_index][PLACE[i].type_index][PLACE[i].ver_index].blot
        var mir  = BLOTS[PLACE[i].rot_index][PLACE[i].type_index][PLACE[i].ver_index].mirror
        var rot  = BLOTS[PLACE[i].rot_index][PLACE[i].type_index][PLACE[i].ver_index].rotation        
        draw_img(blot, mir, rot, PLACE[i].blot_size, PLACE[i].x_index, PLACE[i].y_index)
    }
    
    
    
    //textSize(64);
    //fill(0, 102, 153);
    //text(debug_text.toString(), 10, h-64);
    
    //draw_img(p2C_1, true, 1, 1, 0, 0);
    /*
    image(p2C_1, 0, grid_s, grid_s, grid_s);
    rotate(PI/2)
    image(p2C_1, 0, -grid_s, grid_s, grid_s);
    
    image(p2C_1, 100, 100, 100, 100);
    */
}
// MADE BY SEBAS :) 

// screen dims
var w = 850;
var h = 480;

// wav volumes
var wav_vol = 0.1;

// button params
var b_w = 130;
var b_h = 80;

var l_x = -200;
var r_x = 200;
var b_y = 100;

var condition = 15;

function preload()
{
    dup_a = loadSound('samples/160/2-1.wav');
    tri_a = loadSound('samples/160/3-1.wav');
    qua_a = loadSound('samples/160/4-1.wav');
    
    dup_b = loadSound('samples/180/2-1.wav');
    tri_b = loadSound('samples/180/3-1.wav');
    qua_b = loadSound('samples/180/4-1.wav');
    
    dup_c = loadSound('samples/240/2-1.wav');
    tri_c = loadSound('samples/240/3-1.wav');
    qua_c = loadSound('samples/240/4-1.wav');
    
    dup_d = loadSound('samples/320/2-1.wav');
    tri_d = loadSound('samples/320/3-1.wav');
    qua_d = loadSound('samples/320/4-1.wav');
    
    dup_e = loadSound('samples/360/2-1.wav');
    tri_e = loadSound('samples/360/3-1.wav');
    qua_e = loadSound('samples/360/4-1.wav');
}

function setup()
{
    createCanvas(w, h);
    noStroke();
    l_color = color(255, 0, 0);
    c_color = color(0, 255, 0);
    r_color = color(0, 0, 255);
    mode = 0;
    
    dup_a.setVolume(wav_vol);
    tri_a.setVolume(wav_vol);
    qua_a.setVolume(wav_vol);
    dup_b.setVolume(wav_vol);
    tri_b.setVolume(wav_vol);
    qua_b.setVolume(wav_vol);
    dup_c.setVolume(wav_vol);
    tri_c.setVolume(wav_vol);
    qua_c.setVolume(wav_vol);
    dup_d.setVolume(wav_vol);
    tri_d.setVolume(wav_vol);
    qua_d.setVolume(wav_vol);
    dup_e.setVolume(wav_vol);
    tri_e.setVolume(wav_vol);
    qua_e.setVolume(wav_vol);
}

function play_sound()
{
    condition = Math.round(Math.random()*14);
    switch (condition)
    {
        case 0:  dup_a.play(); break;
        case 1:  tri_a.play(); break;
        case 2:  qua_a.play(); break;
        case 3:  dup_b.play(); break;
        case 4:  tri_b.play(); break;
        case 5:  qua_b.play(); break;
        case 6:  dup_c.play(); break;
        case 7:  tri_c.play(); break;
        case 8:  qua_c.play(); break;
        case 9:  dup_d.play(); break;
        case 10: tri_d.play(); break;
        case 11: qua_d.play(); break;
        case 12: dup_e.play(); break;
        case 13: tri_e.play(); break;
        case 14: qua_e.play(); break;
    }
}

function stop_sound()
{
    switch (condition)
    {
        case 0:  dup_a.stop(); break;
        case 1:  tri_a.stop(); break;
        case 2:  qua_a.stop(); break;
        case 3:  dup_b.stop(); break;
        case 4:  tri_b.stop(); break;
        case 5:  qua_b.stop(); break;
        case 6:  dup_c.stop(); break;
        case 7:  tri_c.stop(); break;
        case 8:  qua_c.stop(); break;
        case 9:  dup_d.stop(); break;
        case 10: tri_d.stop(); break;
        case 11: qua_d.stop(); break;
        case 12: dup_e.stop(); break;
        case 13: tri_e.stop(); break;
        case 14: qua_e.stop(); break;
    }
}

function touchStarted()
{
    // sound already played, waiting response
    if (mode == 0)
    {
        if (mouseX > w/2+l_x-b_w/2 && mouseX < w/2+l_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            clear();
            stop_sound();
            mode = 1;
            // TODO: check correctness
            
        }
        else if (mouseX > w/2-b_w/2 && mouseX < w/2+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            clear();
            stop_sound();
            mode = 1;
            // TODO: check correctness
        }
        else if (mouseX > w/2+r_x-b_w/2 && mouseX < w/2+r_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            clear();
            stop_sound();
            mode = 1;
            // TODO: check correctness
        }
    }
    
    // display correctness, click to play next
    else if (mode == 1)
    {
        if (mouseX > w/2-b_w/2 && mouseX < w/2+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            clear();
            play_sound();
            mode = 0;
        }
    }
}

function highlight()
{
    if (mode == 0)
    {
        if (mouseX > w/2+l_x-b_w/2 && mouseX < w/2+l_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            l_color = color(255, 0, 0);
            c_color = color(255, 255, 255);
            r_color = color(255, 255, 255);
        }
        else if (mouseX > w/2-b_w/2 && mouseX < w/2+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            l_color = color(255, 255, 255);
            c_color = color(0, 255, 0);
            r_color = color(255, 255, 255);
        }
        else if (mouseX > w/2+r_x-b_w/2 && mouseX < w/2+r_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            l_color = color(255, 255, 255);
            c_color = color(255, 255, 255);
            r_color = color(0, 0, 255);
        }
        else
        {
            l_color = color(255, 255, 255);
            c_color = color(255, 255, 255);
            r_color = color(255, 255, 255);
        }
    }
    else if (mode == 1)
    {
        if (mouseX > w/2-b_w/2 && mouseX < w/2+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            c_color = color(0, 255, 0);
        }
        else
        {
            c_color = color(255, 255, 255);
        }
    }
}

function draw()
{
    // sound already played, waiting response
    if (mode == 0)
    {
        highlight();
        fill(l_color);
        quad(w/2+l_x-b_w/2,h/2+b_y+b_h/2, w/2+l_x+b_w/2,h/2+b_y+b_h/2, w/2+l_x+b_w/2,h/2+b_y-b_h/2, w/2+l_x-b_w/2,h/2+b_y-b_h/2);
        fill(c_color);
        quad(w/2-b_w/2,h/2+b_y+b_h/2, w/2+b_w/2,h/2+b_y+b_h/2, w/2+b_w/2,h/2+b_y-b_h/2, w/2-b_w/2,h/2+b_y-b_h/2);
        fill(r_color);
        quad(w/2+r_x-b_w/2,h/2+b_y+b_h/2, w/2+r_x+b_w/2,h/2+b_y+b_h/2, w/2+r_x+b_w/2,h/2+b_y-b_h/2, w/2+r_x-b_w/2,h/2+b_y-b_h/2);
    }
    else if (mode == 1)
    {
        highlight();
        fill(c_color);
        quad(w/2-b_w/2,h/2+b_y+b_h/2, w/2+b_w/2,h/2+b_y+b_h/2, w/2+b_w/2,h/2+b_y-b_h/2, w/2-b_w/2,h/2+b_y-b_h/2);
    }
}
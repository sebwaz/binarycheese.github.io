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

// experiment params
var condition = 15;
var trial_num = -1;
var ans_correct = 0;
var block = [];

// score counter
var tri_counter = 0;
var qua_counter = 0;
var tri_correct = 0;
var qua_correct = 0;

var show_scores = 0;

function preload()
{
    clv = loadSound('samples/clave.mp3');
    rim = loadSound('samples/rimshot.mp3');
    right_sound = loadSound('samples/right.mp3');
    wrong_sound = loadSound('samples/wrong.mp3');
    
    play_img = loadImage('img/playing.jpg');
}

function knuth_shuffle(arr)
{
    for (trial = 0; trial < 20; trial++)
    {
        arr[trial] = 3+(trial%2);
    }
    
    var cur_index = arr.length, temp_val, rand_index;
    while (0 !== cur_index)
    {

        rand_index = Math.floor(Math.random() * cur_index);
        cur_index -= 1;
        
        temp_val = arr[cur_index];
        arr[cur_index] = arr[rand_index];
        arr[rand_index] = temp_val;
        
    }
    return arr;
}

function setup()
{
    createCanvas(w, h);
    background(0);
    noStroke();
    
    textSize(24);
    text_color = color(0);
    textAlign(CENTER, CENTER);
    imageMode(CENTER);
    
    l_color = color(100);
    c_color = color(100);
    r_color = color(100);
    show_color = color(100);

    mode = 1;
    
    clv.setVolume(wav_vol);
    rim.setVolume(wav_vol);
    
    block = knuth_shuffle(block);
}

function play_sound()
{
    trial_num += 1;
    if (trial_num >= 20)
    {
        trial_num = 0;
        block = knuth_shuffle(block);
    }
    
    condition = block[trial_num];
    switch (condition)
    {       
        case 3:  clv.play(); break;
        case 4:  rim.play(); break;
    }
}

function stop_sound()
{
    switch (condition)
    {
        case 3:  clv.stop(); tri_counter += 1; break;
        case 4:  rim.stop(); qua_counter += 1; break;
    }
}

function touchStarted()
{
    // sound already played, waiting response
    if (mode == 0)
    {
        // respond with 3:1
        if (mouseX > w/2+l_x-b_w/2 && mouseX < w/2+l_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            clear();
            background(0);
            stop_sound();
            mode = 1;
            if (condition % 3 == 0)
            {
                tri_correct += 1;
                right_sound.play();
                ans_correct = 1;
            }
            else
            {
                wrong_sound.play();
                ans_correct = 0;
            }
        }

        // respond with 4:1
        else if (mouseX > w/2+r_x-b_w/2 && mouseX < w/2+r_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            clear();
            background(0);
            stop_sound();
            mode = 1;
            if (condition % 3 == 1)
            {
                qua_correct += 1;
                right_sound.play();
                ans_correct = 1;
            }
            else
            {
                wrong_sound.play();
                ans_correct = 0;
            }
        }
    }
    
    // display correctness, click to play next
    else if (mode == 1)
    {
        if (mouseX > w/2-b_w/2 && mouseX < w/2+b_w/2 && mouseY > h/2+2*b_y-b_h/2 && mouseY < h/2+2*b_y+b_h/2)
        {
            clear();
            background(0);
            play_sound();
            mode = 0;
        }
        else if (mouseX > w/2-b_w/2 && mouseX < w/2+b_w/2 && mouseY > 190 && mouseY < 210)
        {
            show_scores = show_scores == 1 ? 0 : 1;
        }
    }
}

function highlight()
{
    // hover over show performance
    if (mouseX > w/2-b_w/2 && mouseX < w/2+b_w/2 && mouseY > 190 && mouseY < 210)
    {
        show_color = color(255);
    }
    else
    {
        show_color = color(100);
    }
    
    // waiting response
    if (mode == 0)
    {
        // hover over 3:1
        if (mouseX > w/2+l_x-b_w/2 && mouseX < w/2+l_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            l_color = color(255);
            r_color = color(100);
        }
        // hover over 4:1
        else if (mouseX > w/2+r_x-b_w/2 && mouseX < w/2+r_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            l_color = color(100);
            r_color = color(255);
        }
        // no hover
        else
        {
            l_color = color(100);
            r_color = color(100);
        }
    }
    // ready for next
    else if (mode == 1)
    {
        // hover over next button
        if (mouseX > w/2-b_w/2 && mouseX < w/2+b_w/2 && mouseY > h/2+2*b_y-b_h/2 && mouseY < h/2+2*b_y+b_h/2)
        {
            c_color = color(255);
        }
        else
        {
            c_color = color(100);
        }
    }
}

function print_performance()
{
    
    fill(255);
    text("3:1", w/2+l_x, h/2+b_y);
    text("4:1", w/2+r_x, h/2+b_y);
    text((tri_counter.toString()).concat(" trials"), w/2+l_x, h/2+(b_y/2));
    text((qua_counter.toString()).concat(" trials"), w/2+r_x, h/2+(b_y/2));
    
    if (trial_num != -1)
    {
        if (ans_correct)
        {
            fill(0, 255, 0);
        }
        else
        {
            fill(255, 0, 0);
        }
        text("correct answer:", w/2, h/2-1.5*b_y);
        textSize(72);
        switch (condition % 3)
        {
            case 0: text("3:1", w/2, h/2-b_y); break;
            case 1: text("4:1", w/2, h/2-b_y); break;
        }
        textSize(24);
    }
    
    fill(255);
    if (tri_counter == 0)
    {
        text("-", w/2+l_x, h/2);
    }
    else
    {
        text((((tri_correct/tri_counter*100).toFixed(2)).toString()).concat(" %"), w/2+l_x, h/2);
    }
    
    if (qua_counter == 0)
    {
        text("-", w/2+r_x, h/2);
    }
    else
    {
        text((((qua_correct/qua_counter*100).toFixed(2)).toString()).concat(" %"), w/2+r_x, h/2);
    }
}

function draw()
{
    clear();
    background(0);
    
    // show trial counter
    fill(255);
    textSize(20);
    text(("Trials: ").concat((tri_counter+qua_counter).toString()), w/2, h/2-2*b_y)
    textSize(24);
    
    // show playing symbol while sound is still active
    /*
    switch (condition)
    {
        case 0:  if (dup_a.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 1:  if (tri_a.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 2:  if (qua_a.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
            
        case 3:  if (dup_b.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 4:  if (tri_b.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 5:  if (qua_b.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
            
        case 6:  if (dup_c.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 7:  if (tri_c.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 8:  if (qua_c.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
            
        case 9:  if (dup_d.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 10: if (tri_d.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 11: if (qua_d.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
            
        case 12: if (dup_e.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 13: if (tri_e.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
        case 14: if (qua_e.isPlaying()){ image(play_img, w/2, h/2-100, 128, 128); } break;
    }
    */
    
    // sound already played, waiting response
    if (mode == 0)
    {
        highlight();
        
        // left button
        fill(l_color);
        quad(w/2+l_x-b_w/2,h/2+b_y+b_h/2, w/2+l_x+b_w/2,h/2+b_y+b_h/2, w/2+l_x+b_w/2,h/2+b_y-b_h/2, w/2+l_x-b_w/2,h/2+b_y-b_h/2);
        fill(text_color);
        text("3:1", w/2+l_x, h/2+b_y);
        
        // right button
        fill(r_color);
        quad(w/2+r_x-b_w/2,h/2+b_y+b_h/2, w/2+r_x+b_w/2,h/2+b_y+b_h/2, w/2+r_x+b_w/2,h/2+b_y-b_h/2, w/2+r_x-b_w/2,h/2+b_y-b_h/2);
        fill(text_color);
        text("4:1", w/2+r_x, h/2+b_y);
    }
    else if (mode == 1)
    {
        print_performance();
        highlight();
        
        textSize(16);
        fill(show_color);
        quad(w/2-b_w/2,190, w/2+b_w/2,190,  w/2+b_w/2,210, w/2-b_w/2,210);
        if (show_scores)
        {
            fill(text_color);
            text("hide scores", w/2, 200);
        }
        else
        {
            fill(text_color);
            text("show scores", w/2, 200);
            quad(0, h/2+(b_y/2)-75, 0, h/2+(b_y/2)+75, w, h/2+(b_y/2)+75, w, h/2+(b_y/2)-75);
        }
        textSize(24);
        
        fill(c_color);
        quad(w/2-b_w/2,h/2+2*b_y+b_h/2, w/2+b_w/2,h/2+2*b_y+b_h/2, w/2+b_w/2,h/2+2*b_y-b_h/2, w/2-b_w/2,h/2+2*b_y-b_h/2);
        fill(text_color);
        text("play", w/2, h/2+2*b_y);
        fill(255);
        
    }
}
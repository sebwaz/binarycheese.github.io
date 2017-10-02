// MADE BY SEBAS :) 

// screen dims
var w = 850;
var h = 480;

// wav volumes
var wav_vol = 0.5;

// button params
var b_w = 130;
var b_h = 80;

var l_x = -200;
var r_x = 200;
var b_y = 100;
var t_y = 80;

// experiment params
var condition   = -1;
var trial_num   = -1;
var ans_correct = 0;
var block       = [];
var stim_time   = 1800;
var wait_time   = 240;
var play_time   = 2*stim_time + wait_time;

var fund_bpm_one = 200;
var fund_bpm_two = 200;
var fund_s_one  = 1/(fund_bpm_one/60);
var fund_s_two  = 1/(fund_bpm_two/60);
var max_bpm_l = 199;
var min_bpm_l = 100;
var max_bpm_h = 2*max_bpm_l;
var min_bpm_h = 2*min_bpm_l;
    
// score counter
var same_lo_counter = 0;
var diff_lo_counter = 0;
var same_hi_counter = 0;
var diff_hi_counter = 0;
var same_lo_correct = 0;
var diff_lo_correct = 0;
var same_hi_correct = 0;
var diff_hi_correct = 0;
var show_scores = 0;
var ans_text;

// interval handles (used to track intervals to close)
var cf_hand;
var rf_hand;
var tf_hand;
var w_hand;
var cs_hand;
var rs_hand;
var ts_hand;
var playing = 0;

// SDT vals
var Pc_hi;
var Pc_lo;
var dP_hi;
var dP_lo;
var Csd_hi;
var Csd_lo;
var LR_hi;
var LR_lo;

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
    for (trial = 0; trial < 32; trial++)
    {
        arr[trial] = trial % 8;
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
    playing = 1;
    condition = block[trial_num];
    
    // randomly select new fundamental bpm
    fund_bpm_one = Math.floor(Math.random()*(max_bpm_l-min_bpm_l))+min_bpm_l;
    fund_bpm_two = Math.floor(Math.random()*(max_bpm_l-min_bpm_l))+min_bpm_l;
    // double tempo for high conditions
    if (condition % 2 == 1)
    {
        fund_bpm_one *= 2;
        fund_bpm_two *= 2;
    }
    fund_s_one = 1/(fund_bpm_one/60);
    fund_s_two = 1/(fund_bpm_two/60);
    
    switch (condition)
    {   
        // Low 33
        case 0:
            same_lo_counter += 1;
            clv.loop(0, 1, wav_vol, 0, fund_s_one/3);
            rim.loop(0, 1, wav_vol, 0, fund_s_one);
            tf_hand = setTimeout(function(){clv.stop(); rim.stop(); playing = 0;}, stim_time);
            w_hand  = setTimeout(function(){
                playing = 2;
                clv.loop(0, 1, wav_vol, 0, fund_s_two/3);
                rim.loop(0, 1, wav_vol, 0, fund_s_two);},
                stim_time+wait_time);
            break;
            
        // High 33
        case 1:
            same_hi_counter += 1;
            clv.loop(0, 1, wav_vol, 0, fund_s_one/3);
            rim.loop(0, 1, wav_vol, 0, fund_s_one);
            tf_hand = setTimeout(function(){clv.stop(); rim.stop(); playing = 0;}, stim_time);
            w_hand  = setTimeout(function(){
                playing = 2;
                clv.loop(0, 1, wav_vol, 0, fund_s_two/3);
                rim.loop(0, 1, wav_vol, 0, fund_s_two);},
                stim_time+wait_time);
            break;
            
        // Low 44
        case 2:
            same_lo_counter += 1;
            clv.loop(0, 1, wav_vol, 0, fund_s_one/4);
            rim.loop(0, 1, wav_vol, 0, fund_s_one);
            tf_hand = setTimeout(function(){clv.stop(); rim.stop(); playing = 0;}, stim_time);
            w_hand  = setTimeout(function(){
                playing = 2;
                clv.loop(0, 1, wav_vol, 0, fund_s_two/4);
                rim.loop(0, 1, wav_vol, 0, fund_s_two);},
                stim_time+wait_time);
            break;
            
        // High 44
        case 3:
            same_hi_counter += 1;
            clv.loop(0, 1, wav_vol, 0, fund_s_one/4);
            rim.loop(0, 1, wav_vol, 0, fund_s_one);
            tf_hand = setTimeout(function(){clv.stop(); rim.stop(); playing = 0;}, stim_time);
            w_hand  = setTimeout(function(){
                playing = 2;
                clv.loop(0, 1, wav_vol, 0, fund_s_two/4);
                rim.loop(0, 1, wav_vol, 0, fund_s_two);},
                stim_time+wait_time);
            break;
            
        // Low 34
        case 4:
            diff_lo_counter += 1;
            clv.loop(0, 1, wav_vol, 0, fund_s_one/3);
            rim.loop(0, 1, wav_vol, 0, fund_s_one);
            tf_hand = setTimeout(function(){clv.stop(); rim.stop(); playing = 0;}, stim_time);
            w_hand  = setTimeout(function(){
                playing = 2;
                clv.loop(0, 1, wav_vol, 0, fund_s_two/4);
                rim.loop(0, 1, wav_vol, 0, fund_s_two);},
                stim_time+wait_time);
            break;
            
        // High 34
        case 5:
            diff_hi_counter += 1;
            clv.loop(0, 1, wav_vol, 0, fund_s_one/3);
            rim.loop(0, 1, wav_vol, 0, fund_s_one);
            tf_hand = setTimeout(function(){clv.stop(); rim.stop(); playing = 0;}, stim_time);
            w_hand  = setTimeout(function(){
                playing = 2;
                clv.loop(0, 1, wav_vol, 0, fund_s_two/4);
                rim.loop(0, 1, wav_vol, 0, fund_s_two);},
                stim_time+wait_time);
            break;
            
        // Low 43
        case 6:
            diff_lo_counter += 1;
            clv.loop(0, 1, wav_vol, 0, fund_s_one/4);
            rim.loop(0, 1, wav_vol, 0, fund_s_one);
            tf_hand = setTimeout(function(){clv.stop(); rim.stop(); playing = 0;}, stim_time);
            w_hand  = setTimeout(function(){
                playing = 2;
                clv.loop(0, 1, wav_vol, 0, fund_s_two/3);
                rim.loop(0, 1, wav_vol, 0, fund_s_two);},
                stim_time+wait_time);
            break;
            
        // High 43
        case 7:
            diff_hi_counter += 1;
            clv.loop(0, 1, wav_vol, 0, fund_s_one/4);
            rim.loop(0, 1, wav_vol, 0, fund_s_one);
            tf_hand = setTimeout(function(){clv.stop(); rim.stop(); playing = 0;}, stim_time);
            w_hand  = setTimeout(function(){
                playing = 2;
                clv.loop(0, 1, wav_vol, 0, fund_s_two/3);
                rim.loop(0, 1, wav_vol, 0, fund_s_two);},
                stim_time+wait_time);
            break;
    }
    ts_hand = setTimeout(function(){clv.stop(); rim.stop(); playing = 0;}, play_time);
}

function stop_sound()
{
    clv.stop();
    rim.stop();
    clearInterval(cf_hand);
    clearInterval(rf_hand);
    clearInterval(tf_hand);
    clearInterval(w_hand);
    clearInterval(cs_hand);
    clearInterval(rs_hand);
    clearInterval(ts_hand);
    playing = 0;
}

function touchStarted()
{
    // sound already played, waiting response
    if (mode == 0)
    {
        // respond with same
        if (mouseX > w/2+l_x-b_w/2 && mouseX < w/2+l_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            clear();
            background(0);
            stop_sound();
            mode = 1;
            if (condition < 4)
            {
                if(condition % 2 == 0) {same_lo_correct += 1;}
                else                   {same_hi_correct += 1;}
                right_sound.play();
                ans_correct = 1;
            }
            else
            {
                wrong_sound.play();
                ans_correct = 0;
            }
        }

        // respond with diff
        else if (mouseX > w/2+r_x-b_w/2 && mouseX < w/2+r_x+b_w/2 && mouseY > h/2+b_y-b_h/2 && mouseY < h/2+b_y+b_h/2)
        {
            clear();
            background(0);
            stop_sound();
            mode = 1;
            if (condition >= 4)
            {
                if(condition % 2 == 0) {diff_lo_correct += 1;}
                else                   {diff_hi_correct += 1;}
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
    
    // displaying correctness, click to play next
    else if (mode == 1)
    {
        // play next
        if (mouseX > w/2-b_w/2 && mouseX < w/2+b_w/2 && mouseY > h/2+2*b_y-b_h/2 && mouseY < h/2+2*b_y+b_h/2)
        {
            // increment trial num
            trial_num += 1;
            if (trial_num >= 32)
            {
                trial_num = 0;
                block = knuth_shuffle(block);
            }
            // reset screen and play sound
            clear();
            background(0);
            play_sound();
            mode = 0;
        }
        // display score switch
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
    text("LOW",  w/2+l_x, h/2);
    text("HIGH", w/2+r_x, h/2);
    
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
        switch (condition)
        {
            case 0:
            case 1:
                ans_text = " (3:1, 3:1)"; break;
            case 2:
            case 3:
                ans_text = " (4:1, 4:1)"; break;
            case 4:
            case 5:
                ans_text = " (3:1, 4:1)"; break;
            case 6:
            case 7:
                ans_text = " (4:1, 3:1)"; break;
        }
        if (condition < 4) {text("SAME".concat(ans_text), w/2, h/2-b_y);}
        else               {text("DIFF".concat(ans_text), w/2, h/2-b_y);}
        textSize(24);
    }
    
    fill(255);
    //lo counter
    var t_correct = (same_lo_correct+diff_lo_correct).toString();
    var t_trials  = (same_lo_counter+diff_lo_counter).toString();
    text(t_correct.concat(" / ", t_trials, " trials correct"), w/2+l_x, h/2+t_y/2);
    
    //hi counter
    var t_correct = (same_hi_correct+diff_hi_correct).toString();
    var t_trials  = (same_hi_counter+diff_hi_counter).toString();
    text(t_correct.concat(" / ", t_trials, " trials correct"), w/2+r_x, h/2+t_y/2);
    
    // for Same Diff SDT calculations
    if (same_lo_counter != 0 && diff_lo_counter != 0)
    {
        //z(respond diff to diff)
        var zH_lo = zfromp(diff_lo_correct/diff_lo_counter);
        //z(respond diff to same)
        var zF_lo = zfromp((same_lo_counter-same_lo_correct)/same_lo_counter);
        //prob/proportion correct
        Pc_lo = pfromz((zH_lo-zF_lo)/2);
        //sesitivity
        dP_lo = 2*zfromp(0.5*(1+Math.sqrt(2*Pc_lo-1)));
        //criterion location
        Csd_lo = -Math.sqrt(2)*zfromp((same_lo_counter-same_lo_correct)/(same_lo_counter*2))-(dP_lo/2);
        //likelihood ratio
        LR_lo = 0.5*(exp(dP_lo*Csd_lo)+exp(-dP_lo*(Csd_lo-1)));
        
        //print sensitivity
        text("d' = ".concat(dP_lo.toFixed(2).toString()), w/2+l_x, h/2+t_y);
        //print criterion
        //text("C = ".concat(Csd_lo.toFixed(2).toString()), w/2+l_x, h/2+t_y*3/2);
        //text("LR = ".concat(LR_lo.toFixed(2).toString()), w/2+l_x, h/2+t_y*2);
    }
    
    if (same_hi_counter != 0 && diff_hi_counter != 0)
    {
        //z(respond diff to diff)
        var zH_hi = zfromp(diff_hi_correct/diff_hi_counter);
        //z(respond diff to same)
        var zF_hi = zfromp((same_hi_counter-same_hi_correct)/same_hi_counter);
        //prob/proportion correct
        Pc_hi = pfromz((zH_hi-zF_hi)/2);
        //sesitivity
        dP_hi = 2*zfromp(0.5*(1+Math.sqrt(2*Pc_hi-1)));
        //criterion location
        Csd_hi = -Math.sqrt(2)*zfromp((same_hi_counter-same_hi_correct)/(same_hi_counter*2))-(dP_hi/2);
        //likelihood ratio
        LR_hi = 0.5*(exp(dP_hi*Csd_hi)+exp(-dP_hi*(Csd_hi-1)));
        
        //print sensitivity
        text("d' = ".concat(dP_hi.toFixed(2).toString()), w/2+r_x, h/2+t_y);
        //print criterion
        //text("C = ".concat(Csd_hi.toFixed(2).toString()), w/2+r_x, h/2+t_y*3/2);
        //text("LR = ".concat(LR_hi.toFixed(2).toString()), w/2+r_x, h/2+t_y*2);
    }
}

function draw()
{
    clear();
    background(0);
    
    // show trial counter
    fill(255);
    textSize(20);
    text("Are the rhythms the same?", w/2, h/2-2*b_y-28)
    textStyle(BOLD);
    text(("Trials: ").concat((same_lo_counter+diff_lo_counter+same_hi_counter+diff_hi_counter).toString()), w/2, h/2-2*b_y)
    textStyle(NORMAL);
    textSize(24);
    
    // show playing symbol while sound is still active
    switch (playing)
    {
        case 1:  image(play_img, w/2, h/2-25, 128, 128); break;
        case 2:  image(play_img, w/2, h/2+25, 128, 128); break;
    }
    
    // sound already played, waiting response
    if (mode == 0)
    {
        highlight();
        
        // left button
        fill(l_color);
        quad(w/2+l_x-b_w/2,h/2+b_y+b_h/2, w/2+l_x+b_w/2,h/2+b_y+b_h/2, w/2+l_x+b_w/2,h/2+b_y-b_h/2, w/2+l_x-b_w/2,h/2+b_y-b_h/2);
        fill(text_color);
        text("SAME", w/2+l_x, h/2+b_y);
        
        // right button
        fill(r_color);
        quad(w/2+r_x-b_w/2,h/2+b_y+b_h/2, w/2+r_x+b_w/2,h/2+b_y+b_h/2, w/2+r_x+b_w/2,h/2+b_y-b_h/2, w/2+r_x-b_w/2,h/2+b_y-b_h/2);
        fill(text_color);
        text("DIFF", w/2+r_x, h/2+b_y);
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
            //quad(0, h/2+(b_y/2)-75, 0, h/2+(b_y/2)+100, w, h/2+(b_y/2)+100, w, h/2+(b_y/2)-75);
            quad(0,         h/2+(b_y/2)-75, 0,         h/2+(b_y/2)+200, w-(b_w/2), h/2+(b_y/2)+200, w-(b_w/2), h/2+(b_y/2)-75);
            quad(w-(b_w/2), h/2+(b_y/2)-75, w-(b_w/2), h/2+(b_y/2)+200, w+(b_w/2), h/2+(b_y/2)+200, w+(b_w/2), h/2+(b_y/2)-75);
        }
        textSize(24);
        
        fill(c_color);
        quad(w/2-b_w/2,h/2+2*b_y+b_h/2, w/2+b_w/2,h/2+2*b_y+b_h/2, w/2+b_w/2,h/2+2*b_y-b_h/2, w/2-b_w/2,h/2+2*b_y-b_h/2);
        fill(text_color);
        text("play", w/2, h/2+2*b_y);
        fill(255);
        
    }
}
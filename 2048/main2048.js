var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame();
})

function newgame(){
    //初始化棋盘
    init();
    //随机生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){

            var girdCell=$("#grid-cell-"+i+"-"+j);
            girdCell.css('top',getPosTop(i,j));
            girdCell.css('left',getPosLeft(i,j));
        }

    for (var i=0;i<4; i++) {
        board[i]=new Array();
        for(var j=0;j<4;j++)
            board[i][j]=0;
    }

    updateBoardView();
    score = 0;
    $('#score').text(score);
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$('#number-cell-'+i+'-'+j);
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }
            else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
}

function generateOneNumber(){
    if(nospace(board)){
        return false;}
    //随机一个位置
    var randx,randy,k=0;
    var size =parseInt(Math.floor(Math.random()*16));
    size++;
    while(!k){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0){size--;
                if(size==0){randx=i;randy=j;k=1;break;}}
            }
            if(k)break;
        }
    }
    //随机一个数字
    var randNumber=Math.random() <0.5? 2:4;

    //显示数字
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    
    return true
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 65://left
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",320);
            }
            break;
        case 87://up
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",320);
        }
            break;
        case 68://reigt
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",320);
            }
            break;
        case 83://down
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",320);
            }
            break;
        default:
            break;
    }
});

function isgameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}

function gameover(){
    alert('gameover');
}

function moveLeft(){
    var p=0;
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++){
            var k=0;
            if(board[i][j]!=0){
                while(board[i][j-1-k]==0)
                    k++;
                if(board[i][j]==board[i][j-k-1])
                    {p=1;showMoveAnimation(i,j,i,j-k-1);board[i][j]=0;board[i][j-k-1]*=2;score+=board[i][j-k-1];board[i][j-k-1]--;updateScore(score);}
                else if(k!=0){p=1;showMoveAnimation(i,j,i,j-k);board[i][j-k]=board[i][j];board[i][j]=0;}
            }
        }
    if(p){
        jiayi(board);
        setTimeout("updateBoardView()",200);
        return true;
    }
    else return false;
}

function moveUp(){
    var p=0;
    for(var i=1;i<4;i++)
        for(var j=0;j<4;j++){
            var k=0;
            if(board[i][j]!=0){
                while((i-k-1)>=0&&board[i-k-1][j]==0)
                    k++;
                if((i-k-1)>=0&&board[i][j]==board[i-k-1][j])
                    {p=1;showMoveAnimation(i,j,i-k-1,j);board[i][j]=0;board[i-k-1][j]*=2;score+=board[i-k-1][j];board[i-k-1][j]--;updateScore(score);}
                else if(k!=0){p=1;showMoveAnimation(i,j,i-k,j);board[i-k][j]=board[i][j];board[i][j]=0;}
            }
        }
    if(p){
        jiayi(board);
        setTimeout("updateBoardView()",200);
        return true;
    }
    else return false;
}

function moveRight(){
    var p=0;
    for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--){
            var k=0;
            if(board[i][j]!=0){
                while(board[i][j+1+k]==0)
                    k++;
                if(board[i][j]==board[i][j+k+1])
                    {p=1;showMoveAnimation(i,j,i,j+k+1);board[i][j]=0;board[i][j+k+1]*=2;score+=board[i][j+k+1];board[i][j+k+1]--;updateScore(score);}
                else if(k!=0){p=1;showMoveAnimation(i,j,i,j+k);board[i][j+k]=board[i][j];board[i][j]=0;}
            }
        }
        if(p){
            jiayi(board);
            setTimeout("updateBoardView()",200);
            return true;
        }
    else return false;
}

function moveDown(){
    var p=0;
    for(var i=2;i>=0;i--)
        for(var j=0;j<4;j++){
            var k=0;
            if(board[i][j]!=0){
                while((i+k+1)<4&&board[i+k+1][j]==0)
                    k++;
                if((i+k+1)<4&&board[i][j]==board[i+k+1][j])
                    {p=1;showMoveAnimation(i,j,i+k+1,j);board[i][j]=0;board[i+k+1][j]*=2;score+=board[i+k+1][j];board[i+k+1][j]--;updateScore(score);}
                else if(k!=0){p=1;showMoveAnimation(i,j,i+k,j);board[i+k][j]=board[i][j];board[i][j]=0;}
            }
        }
    if(p){
        jiayi(board);
        setTimeout("updateBoardView()",200);
        return true;
    }
    else return false;
}
// JScript source code

var loadLabel;
var gl;
var ms = new MatrixState(); //变换矩阵管理类对象
var cube;
var water;
var island;
var skyWall;
var texture_water;
var texture_grass;
var texture_rock;
var texture_sand;
var texture_sky;
var shaderProgArray = new Array();

var cx = 0;
var cy = 2;
var cz = 24;

function start() {
    loadLabel = document.getElementById("labelMessage"); 

    gl = initWebGLCanvas("MusicPlayercanvas");
    if (!gl)
    {
        alert("创建GLES上下文失败，不支持webGL2.0!");
        return;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);//设置视口
    //设置屏幕背景色RGBA
    gl.back
    gl.clearColor(0.0, 1.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST); //开启深度检测

    var projectratio = canvas.width / canvas.height;
    ms.setInitStack();
    mouseMove();
    ms.setCamera(cx, cy, cz, 0, 0, 0, 0, 1.0, 0.0);//设置摄像机
    ms.setProjectFrustum(-projectratio, projectratio, -1, 1, 1, 100); //设置投影参数

    texture_water = loadImageTexture(gl, "img/water.png", 0);
    texture_grass = loadImageTexture(gl, "img/grass.png", 1);
    texture_rock = loadImageTexture(gl, "img/rock.png", 2);
    texture_sand = loadImageTexture(gl, "img/sand.jpg", 3);
    texture_sky = loadImageTexture(gl, "img/skycubemap_up.jpg", 4);

    loadShaderFile("shader/vertex_cube.sh", 0, shaderProgArray);
    loadShaderFile("shader/frag_cube.sh", 0, shaderProgArray);

    loadShaderFile("shader/vertex_water.sh", 1, shaderProgArray);
    loadShaderFile("shader/frag_water.sh", 1, shaderProgArray);

    loadShaderFile("shader/vertex_island.sh", 2, shaderProgArray);
    loadShaderFile("shader/frag_island.sh", 2, shaderProgArray);

    loadShaderFile("shader/vertex_skyWall.sh", 3, shaderProgArray);
    loadShaderFile("shader/frag_skyWall.sh", 3, shaderProgArray);

    load_Territory();

    var count = 0;
    var poll = function () {
        if (!shaderProgArray[0] || !shaderProgArray[1] || !loadResult[0] || !loadTerritory || !loadResult[1] || !shaderProgArray[2] || !loadResult[2] || !loadResult[3] || !shaderProgArray[3] || !loadResult[4] ) {
            if (count < 20) {
                count++;
                loadLabel.innerHTML = "Loading counts: " + count;
                setTimeout(poll, 500);
            } else {
                loadLabel.innerHTML = "Loading failed, please try again!";
            }
        }
        else {
            loadLabel.innerHTML = "Finish loading";
            cube = new Cube(gl, shaderProgArray[0]);
            water = new Water(gl, shaderProgArray[1]);
            island = new Island(gl, shaderProgArray[2]);
            skyWall = new SkyWall(gl, shaderProgArray[3]);
            setInterval("drawFrame();", 100); //定时绘制画面
            //drawFrame();
        }
    }
    poll();



}


function mouseMove() {
    var mPreviousY;
    var mPreviousX;
    var down = false;
    var cAngle = 0;
    var TOUCH_SCALE_FACTOR = 180 / 320;
    var cr = 24;

    document.onmousedown = function (event) {
        down = true; //按下鼠标
        mPreviousX = event.pageX; //获取触控点x坐标
        mPreviousY = event.pageY; //获取触控点y坐标
    }
    document.onmousemove = function (event)//鼠标移动
    {
        var x = event.pageX, y = event.pageY;
        if (down) {

            var dy = y - mPreviousY; //计算触控笔Y位移
            var dx = x - mPreviousX; //计算触控笔X位移
            cAngle += dx * TOUCH_SCALE_FACTOR;
            cx = Math.sin(Math.PI / 180 * cAngle) * cr;
            cz = Math.cos(Math.PI / 180 * cAngle) * cr;
            cy += dy / 10.0;
        }
        mPreviousY = y; //记录触控笔位置
        mPreviousX = x; //记录触控笔位置
    }
    document.onmouseup = function (event) {
        down = false; //抬起鼠标
    }
}

//渲染场景的方法
function drawCubes() {

    //更新音乐数据
    if (misicDataArray != null && analyser != null) {
        analyser.getFrequencyData();
        misicDataArray = analyser.data;

        for(var i = 0; i < 7; i++){
            var tmp = 24 - i*8
            ms.pushMatrix(); //保护现场
            ms.translate(-tmp, -14, tmp);
            ms.scale(1, 2 + misicDataArray[i*2] * 0.05, 1);
            cube.drawSelf(ms);
            ms.popMatrix(); //恢复现场
        }
    }
}


function drawFrame() {
        if (!cube) {
            console.log("加载未完成！"); //提示信息
            return;
        }

        ms.setCamera(cx, cy, cz, 0, 0, 0, 0, 1.0, 0.0);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        drawCubes();

        water.currStartAngle += (3.1415926 / 16);
        ms.pushMatrix(); //保护现场
        ms.translate(0, -14, 0);
        ms.rotate(90, 1, 0, 0);
        
        water.drawSelf(ms, texture_water);
        ms.popMatrix(); //恢复现场

        //water.currStartAngle += (3.1415926 / 16);
        ms.pushMatrix(); //保护现场
        ms.translate(0, -14, 0);
        ms.scale(1, 0.5, 1.5);
        island.drawSelf(ms, texture_grass, texture_sand, texture_rock);
        ms.popMatrix(); //恢复现场


        drawSky(28);


    }

    function drawSky(size) {
        //top
        var adjust = 0.35;
        size = size - adjust;
        ms.pushMatrix();
        ms.translate(0, size, 0);
        ms.rotate(90, 1, 0, 0);
        skyWall.drawSelf(ms, texture_sky);
        ms.popMatrix();
        //back
        ms.pushMatrix();
        ms.translate(0, 0, -size);
        skyWall.drawSelf(ms, texture_sky);
        ms.popMatrix();
        //绘制天空盒前面
        ms.pushMatrix();
        ms.translate(0, 0, size);
        ms.rotate(180, 0, 1, 0);
        skyWall.drawSelf(ms, texture_sky);
        ms.popMatrix();
        //绘制天空盒左面
        ms.pushMatrix();
        ms.translate(-size, 0, 0);
        ms.rotate(90, 0, 1, 0);
        skyWall.drawSelf(ms, texture_sky);
        ms.popMatrix();
        //绘制天空盒右面
        ms.pushMatrix();
        ms.translate(size, 0, 0);
        ms.rotate(-90, 0, 1, 0); 
        skyWall.drawSelf(ms, texture_sky);
        ms.popMatrix();
 }

function initWebGLCanvas(canvasName) {
    canvas = document.getElementById(canvasName); //获取Canvas对象
    var context = canvas.getContext('webgl2', { antialias: true }); //获取GL上下文
    return context; //返回GL上下文对象
}

var fileUrl;
function fileChange() {
    //获取Dom对象
    var file = document.getElementById("importFile").files[0];
    //创建文件链接
    fileUrl = URL.createObjectURL(file);
    //添加音频
    addAudio();
}

var audio;
var fftSize = 32;    //音乐数据频域的长度
var analyser;       //音乐数据
var misicDataArray = new Array(16);   //音乐数据数组
function addAudio() {
    //创建音频加载
    var audioLoder = new THREE.AudioLoader();
    //创建音频监听
    var listener = new THREE.AudioListener();
    //创建音频对象
    audio = new THREE.Audio(listener);
    //加载音频
    audioLoder.load(fileUrl, function (audioBuffer) {
        //设置音频数据
        audio.setBuffer(audioBuffer);
        //音频循环
        audio.setLoop(true);
        //音频播放
        audio.play();
    });

    analyser = new THREE.AudioAnalyser(audio, fftSize);
    console.log(analyser.data.length)
    misicDataArray = analyser.data;


}

function play() {
    audio.play();
}

function pause() {
    audio.pause();
}

function stop() {
    audio.stop();
}

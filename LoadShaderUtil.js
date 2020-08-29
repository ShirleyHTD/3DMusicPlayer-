function shaderObject(typeIn,textIn)//声明shaderObject类
{
    this.type=typeIn;//初始化type成员变量
    this.text=textIn;//初始化text成员变量
}
var shaderStrArray=["a","a"];
var shaderNumberCount=0;
var shaderTypeName = ["vertex", "fragment"];
var loadResult = new Array();
function processLoadShader(req, index, shaderProgArray)//处理着色器脚本内容的回调函数
{
    if (req.readyState == 4) //若状态为4
    {
        var shaderStr = req.responseText;//获取响应文本
        shaderStrArray[shaderNumberCount]=new shaderObject(shaderTypeName[shaderNumberCount],shaderStr);//顶点着色器脚本内容
        shaderNumberCount++;

        if(shaderNumberCount>1)//如果两个着色器内容均不为空
        {
            shaderNumberCount = 0;
            shaderProgArray[index] = loadShaderSerial(gl, shaderStrArray[0], shaderStrArray[1]); //加载着色
           

        }

    }
}

//加载着色器的方法
function loadShaderFile(url, index, shaderProgArray)//从服务器加载着色器脚本的函数
{
    var req = new XMLHttpRequest();//创建XMLHttpRequest对象
    req.onreadystatechange = function () //设置响应回调函数
    { processLoadShader(req, index, shaderProgArray) }; //调用processLoadShader处理响应
    req.open("GET", url, true);//用GET方式打开指定URL
    req.responseType = "text";//设置响应类型
    req.send(null);//发送HTTP请求
}

function loadShaderSerial(gl, vshader, fshader){
	//���ض�����ɫ��
	var vertexShader = loadSingleShader(gl, vshader);
	//����ƬԪ��ɫ��
	var fragmentShader = loadSingleShader(gl, fshader);

	//������ɫ������
	var program = gl.createProgram();

	//��������ɫ����ƬԪ��ɫ���ҽӵ���ɫ������
	gl.attachShader (program, vertexShader);//��������ɫ����ӵ���ɫ��������
	gl.attachShader (program, fragmentShader);//��ƬԪ��ɫ����ӵ���ɫ��������

	//������ɫ������
	gl.linkProgram(program);

	//��������Ƿ�ɹ�
	var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!linked && !gl.isContextLost())//�����Ӳ��ɹ�
    {
		//��ȡ���ڿ���̨��ӡ������Ϣ
		var error = gl.getProgramInfoLog (program);//��ȡ������Ϣ
		log("Error in program linking:"+error);//��ӡ������Ϣ

		gl.deleteProgram(program);//ɾ����ɫ������
		gl.deleteProgram(fragmentShader);//ɾ��ƬԪ��ɫ��
		gl.deleteProgram(vertexShader);//ɾ��������ɫ��

		return null;//���ؿ�
	}
	gl.useProgram(program);
	gl.enable(gl.DEPTH_TEST);
	return program;//������ɫ������
}

function loadSingleShader(ctx, shaderScript)
{
	if (shaderScript.type == "vertex")//��Ϊ������ɫ��
		var shaderType = ctx.VERTEX_SHADER;//������ɫ������
	else if (shaderScript.type == "fragment")//��ΪƬԪ��ɫ��
		var shaderType = ctx.FRAGMENT_SHADER;//ƬԪ��ɫ������
	else {//�����ӡ������Ϣ
		log("*** Error: shader script of undefined type '"+shaderScript.type+"'");
	return null;
	}

	//�������ʹ�����ɫ������
	var shader = ctx.createShader(shaderType);

	//������ɫ���ű�
	ctx.shaderSource(shader, shaderScript.text);

	//������ɫ��
	ctx.compileShader(shader);

	//������״̬
	var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
	if (!compiled && !ctx.isContextLost()) {//���������
		var error = ctx.getShaderInfoLog(shader);//��ȡ������Ϣ
		log("*** Error compiling shader '"+shaderId+"':"+error);//��ӡ������Ϣ
		ctx.deleteShader(shader);//ɾ����ɫ������
		return null;//���ؿ�
	}
	return shader;//������ɫ������
}







//加载纹理图的方法
function loadImageTexture(gl, url, loadIndex) {
    
    //创建纹理ID
    var texture = gl.createTexture();
    //创建图片对象
    var image = new Image();
    //调用实际加载纹理的函数
    image.onload = function () { doLoadImageTexture(gl, image, texture,loadIndex) }
    //返回指定纹理图的URL
    image.src = url;
    //返回纹理ID
    return texture;
    //texMap[texName] = texture;
}

function doLoadImageTexture(gl, image, texture, loadIndex) {
    //绑定纹理ID
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //加载纹理进缓存
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    //设置MAG采样方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //设置MIN采样方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //设置S轴拉伸方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    //设置T轴拉伸方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    //纹理加载成功后释放纹理图
    gl.bindTexture(gl.TEXTURE_2D, null);
    loadResult[loadIndex] = true;
 }

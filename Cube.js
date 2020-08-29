// JScript source code
function Cube(gl, programIn) {
    this.program = programIn; 	//初始化着色器程序id
    

    var UNIT_SIZE = 1;
    this.vertexData = [
    //前面
		0.0, 0.0, UNIT_SIZE,
		UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
		-UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
		0.0, 0.0, UNIT_SIZE,
		-UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
		-UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		0.0, 0.0, UNIT_SIZE,
		-UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		0.0, 0.0, UNIT_SIZE,
		UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
    //后面
		0.0, 0.0, -UNIT_SIZE,
		UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		0.0, 0.0, -UNIT_SIZE,
		UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		-UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		0.0, 0.0, -UNIT_SIZE,
		-UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		-UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		0.0, 0.0, -UNIT_SIZE,
		-UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
    //左面
		-UNIT_SIZE, 0.0, 0.0,
		-UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
		-UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		-UNIT_SIZE, 0.0, 0.0,
		-UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		-UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		-UNIT_SIZE, 0.0, 0.0,
		-UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		-UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		-UNIT_SIZE, 0.0, 0.0,
		-UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		-UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
    //右面
		UNIT_SIZE, 0.0, 0.0,
		UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
		UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		UNIT_SIZE, 0.0, 0.0,
		UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		UNIT_SIZE, 0.0, 0.0,
		UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		UNIT_SIZE, 0.0, 0.0,
		UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
    //上面
		0.0, UNIT_SIZE, 0.0,
		UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
		UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		0.0, UNIT_SIZE, 0.0,
		UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		-UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		0.0, UNIT_SIZE, 0.0,
		-UNIT_SIZE, UNIT_SIZE, -UNIT_SIZE,
		-UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
		0.0, UNIT_SIZE, 0.0,
		-UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
		UNIT_SIZE, UNIT_SIZE, UNIT_SIZE,
    //下面
		0.0, -UNIT_SIZE, 0.0,
		UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		-UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		0.0, -UNIT_SIZE, 0.0,
		-UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE,
		-UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		0.0, -UNIT_SIZE, 0.0,
		-UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		0.0, -UNIT_SIZE, 0.0,
		UNIT_SIZE, -UNIT_SIZE, -UNIT_SIZE,
		UNIT_SIZE, -UNIT_SIZE, UNIT_SIZE
	];
    
    this.vertexBuffer = gl.createBuffer(); 			//创建顶点坐标数据缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer); 	//绑定顶点坐标数据缓冲
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexData), gl.STATIC_DRAW); //将顶点坐标数据送入缓冲

    

    this.colorsData = [
    //前面
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
    //后面
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
    //左面
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 1.0, 1.0,
    //右面
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
    //上面
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
    //下面
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 1.0, 1.0, 1.0,
		0.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 1.0, 1.0, 1.0,
		0.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 1.0, 1.0, 1.0,
		0.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, //中间为白色
		0.0, 1.0, 1.0, 1.0,
		0.0, 1.0, 1.0, 1.0
	];
    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer); 	//绑定颜色数据缓冲
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsData), gl.STATIC_DRAW); //将颜色数据送入缓冲

    

    
    var uMVPMatrixHandle = gl.getUniformLocation(this.program, "uMVPMatrix");

    this.vcount = this.vertexData.length / 3; 				//得到顶点数量
    this.drawSelf = function (ms) {
        gl.useProgram(this.program); //指定使用某套着色器程序

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer); 	//绑定顶点坐标数据缓冲
        var positionHandler = gl.getAttribLocation(this.program, "aPosition");
        gl.vertexAttribPointer(positionHandler, 3, gl.FLOAT, false, 0, 0); //给管线指定顶点坐标数据
        gl.enableVertexAttribArray(positionHandler); //启用顶点坐标数据数组

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer); 	//绑定颜色数据缓冲
        var colorHandler = gl.getAttribLocation(this.program, "aColor");
        gl.vertexAttribPointer(colorHandler, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colorHandler); //启用顶点坐标数据数组

        gl.uniformMatrix4fv(uMVPMatrixHandle, false, new Float32Array(ms.getFinalMatrix())); //getFinalMatrix为矩阵状态中的//将总变换矩阵送入渲染管线
        gl.drawArrays(gl.TRIANGLES, 0, this.vcount); 	//用顶点法绘制物体
    }

}
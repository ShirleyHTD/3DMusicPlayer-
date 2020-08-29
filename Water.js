// JScript source code
function Water(gl, programIn) {
     	//初始化着色器程序id
    //gl.useProgram(this.program); //指定使用某套着色器程序
   
    //this.textureData = [
        //-UNIT_SIZE, UNIT_SIZE, 0,
        //UNIT_SIZE, UNIT_SIZE, 0,
        //-UNIT_SIZE, -UNIT_SIZE, 0,

        //UNIT_SIZE, UNIT_SIZE, 0,
        //UNIT_SIZE, -UNIT_SIZE, 0,
        //-UNIT_SIZE, -UNIT_SIZE, 0
    //];
    this.program = programIn; 
    var WIDTH_SPAN = 3.3;
    this.currStartAngle = 0;

    var cols = 96;
    var rows = 96;
    var count = 0;
    var UNIT_SIZE = 28*WIDTH_SPAN / cols;
    this.vertexData = new Array();
    for(var j=0;j<rows;j++)
        {
        	for(var i=0;i<cols;i++)
        	{        		
        		var zsx=-UNIT_SIZE*cols/2+i*UNIT_SIZE;
        		var zsy=UNIT_SIZE*rows/2-j*UNIT_SIZE;
        		var zsz=0;

        		this.vertexData[count++] = zsx;
        		this.vertexData[count++] = zsy;
        		this.vertexData[count++] = zsz;

        		this.vertexData[count++] = zsx;
        		this.vertexData[count++] = zsy - UNIT_SIZE;
        		this.vertexData[count++] = zsz;

        		this.vertexData[count++] = zsx + UNIT_SIZE;
        		this.vertexData[count++] = zsy;
        		this.vertexData[count++] = zsz;

        		this.vertexData[count++] = zsx + UNIT_SIZE;
        		this.vertexData[count++] = zsy;
        		this.vertexData[count++] = zsz;

        		this.vertexData[count++] = zsx;
        		this.vertexData[count++] = zsy - UNIT_SIZE;
        		this.vertexData[count++] = zsz;

        		this.vertexData[count++] = zsx + UNIT_SIZE;
        		this.vertexData[count++] = zsy - UNIT_SIZE;
        		this.vertexData[count++] = zsz; 
        	}
        }

    this.vcount = this.vertexData.length / 3;

    this.vertexBuffer = gl.createBuffer(); 			//创建顶点坐标数据缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer); 	//绑定顶点坐标数据缓冲
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexData), gl.STATIC_DRAW); //将顶点坐标数据送入缓冲

    //this.textureData = [
      //  0, 0,
      //  1, 0,
      //  0, 1,

      //  1, 0,
      //  1, 1,
      //  0, 1
    //];

    this.textureData = new Array();
    var sizew = 1.0/cols;//����
    var sizeh = 0.75/rows;//����
    var c = 0;
    for(var i = 0; i < rows; i++)
    {
    	for(var j = 0; j < cols; j++)
    	{
    		//ÿ����һ�����Σ������������ι��ɣ��������㣬12����������
    		var s = j*sizew;
    		var t = i*sizeh;
    			
    		this.textureData[c++]=s;
    		this.textureData[c++]=t;
    			
    		this.textureData[c++]=s;
    		this.textureData[c++]=t+sizeh;
    			
    		this.textureData[c++]=s+sizew;
    		this.textureData[c++]=t;
    			
    			
    		this.textureData[c++]=s+sizew;
    		this.textureData[c++]=t;
    			
    		this.textureData[c++]=s;
    		this.textureData[c++]=t+sizeh;
    			
    		this.textureData[c++]=s+sizew;
    		this.textureData[c++]=t+sizeh;    			
    	}
    }

    this.textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer); 	//绑定颜色数据缓冲
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureData), gl.STATIC_DRAW); //将颜色数据送入缓冲

    
    

    this.drawSelf = function (ms, texture)						
    {
        gl.useProgram(this.program);
        var uMVPMatrixHandle = gl.getUniformLocation(this.program, "uMVPMatrix");
        gl.uniformMatrix4fv(uMVPMatrixHandle, false, new Float32Array(ms.getFinalMatrix()));

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        var positionHandler = gl.getAttribLocation(this.program, "aPosition");
        gl.vertexAttribPointer(positionHandler, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionHandler);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        var textureHandler = gl.getAttribLocation(this.program, "aTexCoor");    
        gl.vertexAttribPointer(textureHandler, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(textureHandler);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(gl.getUniformLocation(this.program, "sTexture"), 0);

        gl.uniform1f(gl.getUniformLocation(this.program, "uStartAngle"), this.currStartAngle);
        gl.uniform1f(gl.getUniformLocation(this.program, "uWidthSpan"), WIDTH_SPAN);

        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);

    }



}
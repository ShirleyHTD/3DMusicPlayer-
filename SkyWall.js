// JScript source code
function SkyWall(gl, programIn) {
    this.program = programIn; 	//初始化着色器程序id
    var UNIT_SIZE = 28;

    this.vertexData = [-UNIT_SIZE, UNIT_SIZE, 0,
						-UNIT_SIZE, -UNIT_SIZE, 0,
						UNIT_SIZE, -UNIT_SIZE, 0,

						UNIT_SIZE, -UNIT_SIZE, 0,
						UNIT_SIZE, UNIT_SIZE, 0,
						-UNIT_SIZE, UNIT_SIZE, 0];

    this.vertexBuffer = gl.createBuffer(); 			//创建顶点坐标数据缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer); 	//绑定顶点坐标数据缓冲
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexData), gl.STATIC_DRAW); //将顶点坐标数据送入缓冲

    this.vcount = this.vertexData.length / 3;

    this.textureData = [1, 0, 1, 1, 0, 1,
					    0, 1, 0, 0, 1, 0];

    this.textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer); 	//绑定颜色数据缓冲
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureData), gl.STATIC_DRAW); //将颜色数据送入缓冲

    this.drawSelf = function (ms, texture) {
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

        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);

    }


}
varying vec2 vuv;
varying vec2 vPos;
varying vec2 vCoordinates;
attribute vec3 aCoordinates;

attribute float aSpeed;
attribute float aOffset;
 
uniform float move;
uniform float time;

void main() {
	vuv = uv;
	vec3 pos = position;
	// pos.z = position.z + move*aSpeed * aOffset;
	pos.z = mod(position.z + move*30.*aSpeed * aOffset, 1000.)-500.;

	vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
	
	gl_PointSize = 1000. * (1. / - mvPosition.z );
	gl_Position = projectionMatrix * mvPosition;

	vCoordinates = aCoordinates.xy;
	// vPos = pos;
}
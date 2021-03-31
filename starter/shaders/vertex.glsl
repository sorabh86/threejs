varying vec2 vuv;

void main() {
	vuv = uv;

	vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
	gl_PointSize = 50. * (1. / - mvPosition.z );
	gl_Position = projectionMatrix * mvPosition;
}
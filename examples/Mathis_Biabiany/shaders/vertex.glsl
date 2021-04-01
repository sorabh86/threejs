void main() {
	vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
	
	gl_PointSize = 300. * (1. / - mvPosition.z );
	gl_Position = projectionMatrix * mvPosition;
}
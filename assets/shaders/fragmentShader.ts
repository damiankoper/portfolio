const fragmentShader = `
uniform float scale;
uniform float time;
uniform vec3 diffuse;
uniform float opacity;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * scale * sin(vUv.y * 10.0 + time);
    vec3 color = diffuse;
    gl_FragColor = vec4(	diffuse, opacity);
}
`;

export default fragmentShader;

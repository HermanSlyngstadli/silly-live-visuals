uniform vec3 u_color;
uniform vec3 time;

varying vec2 vUv;
varying float vNoiseValue;

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec3 colorA = vec3(0.912, 0.191, 0.652);
vec3 colorB = vec3(1.0, 0.777, 0.052);

void main() {
    vec3 color = mix(colorA, colorB, vNoiseValue);
    gl_FragColor = vec4(color, 1.0);
}

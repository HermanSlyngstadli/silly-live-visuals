uniform vec3 u_color;
uniform float u_time;

varying vec2 vUv;
varying float vNoiseValue;

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec3 colorA = vec3(0.912, 0.191, 0.652);
vec3 colorB = vec3(1.0, 0.777, 0.052);

void main() {
    float R1 = 0.312 * sin(u_time * 0.01 + 1.0);
    float G1 = 0.191;
    float B1 = 0.252 * cos(u_time * 0.03);

    float R2 = 1.0;
    float G2 = 0.8 - 0.377 * cos(u_time * 0.03 + 1.0);
    float B2 = 0.8 - 0.252 * sin(u_time * 0.01);

    colorA = vec3(R1, G1, B1);
    colorB = vec3(R2, G2, B2);
    vec3 color = mix(colorA, colorB, vNoiseValue);
    gl_FragColor = vec4(color, 1.0);
}

#include utils/snoise
#include utils/cnoise

uniform float u_time;
uniform float u_avgAudio;

varying vec2 vUv;
varying float vNoiseValue;
varying vec3 vPosition;

void main() {
    float noiseIntensity = u_avgAudio * 1.0;
    //float noiseIntensity = 10.0;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec3 noiseOffset = (position * noiseIntensity + u_time) * vec3(1.0);
    noiseOffset = position * 3.0 + vec3(1.0) * u_time * 0.3;
    
    vNoiseValue = cos(position.x * 10.0 + sin(u_time * 0.2) * 20.0)*0.2;
    vNoiseValue = vNoiseValue+cnoise(noiseOffset*2.0)*u_avgAudio*0.01;
    vNoiseValue = vNoiseValue+cnoise(noiseOffset);
    vNoiseValue = cnoise(vec3(vNoiseValue) * 2.0);
    vNoiseValue = abs(vNoiseValue);

    vNoiseValue = vNoiseValue * 0.9 * sin(u_time * 0.2) + sin(position.x * 40.0 + sin(u_time * 0.6) * 20.0)*0.2;

    vec3 weightedNormal = normal * vNoiseValue * 0.1;
    
    modelPosition = vec4(position, 1.0) + vec4(weightedNormal, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_PointSize = 1.0;

    gl_Position = projectedPosition;
}

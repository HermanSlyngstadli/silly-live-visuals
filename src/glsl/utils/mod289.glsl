/*
original_author: [Ian McEwan, Ashima Arts]
description: modulus of 289
use: mod289(<float|vec2|vec3|vec4> x)
*/

#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(const vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 mod289(const vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(const vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

#endif

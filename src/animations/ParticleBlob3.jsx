import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color } from 'three'

export const ParticleBlob3 = () => {
    const ref = useRef()
    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            u_color: { value: new Color('#ff86dd') },
        }),
        []
    )

    useFrame((state) => {
        const { clock } = state
        ref.current.material.uniforms.u_time.value = clock.getElapsedTime()
    })

    const vertexShader = `
        uniform float u_time;

        varying vec2 vUv;
        varying float vNoiseValue;

        //	Simplex 3D Noise 
        //	by Ian McEwan, Ashima Arts
        //
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){ 
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

            // First corner
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 =   v - i + dot(i, C.xxx) ;

            // Other corners
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );

            //  x0 = x0 - 0. + 0.0 * C 
            vec3 x1 = x0 - i1 + 1.0 * C.xxx;
            vec3 x2 = x0 - i2 + 2.0 * C.xxx;
            vec3 x3 = x0 - 1. + 3.0 * C.xxx;

            // Permutations
            i = mod(i, 289.0 ); 
            vec4 p = permute( permute( permute( 
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

            // Gradients
            // ( N*N points uniformly over a square, mapped onto an octahedron.)
            float n_ = 1.0/7.0; // N=7
            vec3  ns = n_ * D.wyz - D.xzx;

            vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );

            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);

            //Normalise gradients
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            // Mix final noise value
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                            dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
            float timeMultiplier = 0.2;
            float noiseIntensity = 10.0;

            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            vec3 noiseOffset = position * vec3(noiseIntensity, noiseIntensity, noiseIntensity) + vec3(u_time*timeMultiplier, u_time*timeMultiplier, u_time*timeMultiplier);
            vNoiseValue = snoise(noiseOffset);
            
            vec3 weightedNormal = normal * vNoiseValue * 0.05;

            modelPosition = vec4(position, 1.0) + vec4(weightedNormal, 1.0);

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            
            gl_PointSize = 1.0;

            gl_Position = projectedPosition;
        }
    `

    const fragmentShader = `
        uniform vec3 u_color;
        
        varying vec2 vUv;
        varying float vNoiseValue;

        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        vec3 colorA = vec3(0.912,0.191,0.652);
        vec3 colorB = vec3(1.000,0.777,0.052);

        void main() {
            vec3 color = mix(colorA, colorB, vNoiseValue);
            gl_FragColor = vec4(color, 1.0);
        }
    `

    return (
        <points ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <icosahedronGeometry args={[0.4, 100]} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe />
        </points>
    )
}

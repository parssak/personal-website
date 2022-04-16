import * as THREE from "three";

export const fresnelMaterial = () => {
  const vertex = /* glsl */ `
                attribute vec3 position;
                attribute vec3 normal;
                uniform mat4 modelMatrix;
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                uniform vec3 cameraPosition;
                varying vec3 vWorldNormal;
                varying vec3 vViewDirection;

                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
                    vViewDirection = normalize(cameraPosition - worldPosition.xyz);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;

  // include wireframe in the fragment shader
  const fragment = /* glsl */ `
                precision highp float;
                uniform vec3 uBaseColor;
                uniform vec3 uFresnelColor;
                uniform float uFresnelPower;
                varying vec3 vWorldNormal;
                varying vec3 vViewDirection;


                void main() {
                    float fresnelFactor = abs(dot(vViewDirection, vWorldNormal));
                    float inverseFresnelColor = 1.0 - fresnelFactor;
                    // Shaping function
                    fresnelFactor = pow(fresnelFactor, uFresnelPower);
                    inverseFresnelColor = pow(inverseFresnelColor, uFresnelPower);

                    // Mix the fresnel color and the base color
                    vec3 color = mix(uFresnelColor, uBaseColor, inverseFresnelColor);
                    
                    gl_FragColor = vec4(fresnelFactor * uBaseColor + inverseFresnelColor * uFresnelColor, 1.0);
                }
            `;

  const params = {
    // // backgroundColor: new THREE.Color("#34D399"),
    // // baseColor: new THREE.Color("#6FE7B7"),
    // // fresnelColor: new THREE.Color("#82FD47"),
    // backgroundColor: new THREE.Color("#c36704"),
    baseColor: new THREE.Color("#b055fa"),
    fresnelColor: new THREE.Color("#fa1496"),
    fresnelFactor: 1.5,
  };

  const uniforms = {
    uBaseColor: { value: params.baseColor },
    uFresnelColor: { value: params.fresnelColor },
    uFresnelPower: { value: params.fresnelFactor },
  };

  return new THREE.RawShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
  });
};

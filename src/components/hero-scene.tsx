"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VERTEX_SHADER = `
uniform float uTime;
uniform float uIntensity;
varying vec3 vPos;
varying float vNoise;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  float n = snoise(position * 1.35 + uTime * 0.28);
  float n2 = snoise(position * 3.2 - uTime * 0.16) * 0.35;
  vNoise = n + n2;
  vec3 displaced = position + normal * (vNoise * uIntensity);
  vPos = displaced;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const FRAGMENT_SHADER = `
uniform vec3 uColorDeep;
uniform vec3 uColorPrimary;
uniform vec3 uColorRim;
varying vec3 vPos;
varying float vNoise;

void main() {
  vec3 fdx = dFdx(vPos);
  vec3 fdy = dFdy(vPos);
  vec3 normal = normalize(cross(fdx, fdy));

  vec3 viewDir = normalize(cameraPosition - vPos);
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.4);

  vec3 lightDir = normalize(vec3(0.6, 0.9, 1.0));
  float diff = max(dot(normal, lightDir), 0.0);

  float shade = smoothstep(-1.2, 1.4, vNoise);
  vec3 base = mix(uColorDeep, uColorPrimary, shade);
  base += diff * 0.12;
  vec3 color = base + uColorRim * fresnel * 0.85;

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };
    resize();

    const isMobile = window.innerWidth < 768;

    const uniforms = {
      uTime: { value: 0 },
      uIntensity: { value: prefersReducedMotion ? 0.18 : 0.32 },
      uColorDeep: { value: new THREE.Color("#241b52") },
      uColorPrimary: { value: new THREE.Color("#8b76ff") },
      uColorRim: { value: new THREE.Color("#c4b8ff") },
    };

    const blobGeo = new THREE.IcosahedronGeometry(1.15, isMobile ? 20 : 44);
    const blobMat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
    });
    const blob = new THREE.Mesh(blobGeo, blobMat);

    const shellGeo = new THREE.IcosahedronGeometry(1.72, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: "#ab9bff",
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);

    const particleCount = prefersReducedMotion ? 0 : isMobile ? 450 : 900;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cViolet = new THREE.Color("#8b76ff");
    const cLight = new THREE.Color("#d5ccff");
    const cWhite = new THREE.Color("#f2f0fa");

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.55 + Math.pow(Math.random(), 1.6) * 1.5;
      const spread = (Math.random() - 0.5) * 0.9;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = spread * radius * 0.45;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const r = Math.random();
      const c = r < 0.55 ? cViolet : r < 0.85 ? cLight : cWhite;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.022,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);

    const group = new THREE.Group();
    group.add(blob);
    group.add(shell);
    group.add(particles);
    group.position.set(isMobile ? 0 : 0.85, -0.1, 0);
    scene.add(group);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let scrollProgress = 0;
    let st: ScrollTrigger | undefined;
    if (!prefersReducedMotion) {
      st = ScrollTrigger.create({
        trigger: "#about",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress = self.progress;
        },
      });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    let running = true;
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    });
    io.observe(container);

    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    const timer = new THREE.Timer();
    let frame = 0;

    const renderFrame = () => {
      const delta = Math.min(timer.getDelta(), 0.05);
      const elapsed = timer.getElapsed();

      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;

      uniforms.uTime.value = elapsed;

      blob.rotation.y += delta * 0.12;
      blob.rotation.x = pointer.y * 0.25;
      shell.rotation.y -= delta * 0.07;
      shell.rotation.z += delta * 0.03;
      particles.rotation.y += delta * 0.05;

      group.rotation.y = pointer.x * 0.3 + scrollProgress * 1.4;
      group.rotation.x = pointer.y * 0.18 + scrollProgress * 0.3;
      group.position.y = -0.1 - scrollProgress * 1.4;
      group.scale.setScalar(1 - scrollProgress * 0.25);
      uniforms.uIntensity.value =
        0.32 - scrollProgress * 0.15 + Math.sin(elapsed * 0.6) * 0.03;

      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      timer.update();
      renderFrame();
    } else {
      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!running) return;
        timer.update();
        renderFrame();
      };
      tick();
    }

    return () => {
      cancelAnimationFrame(frame);
      st?.kill();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      blobGeo.dispose();
      blobMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 [&>canvas]:w-full [&>canvas]:h-full"
    />
  );
}

/**
 * Gradient Engine — Generative ambient gradient system
 *
 * Uses simplex-style noise and metaball-like blobs to create
 * a living, breathing background that responds to playback state.
 */

// ──────────────────────────────────────────────
// Simplex-inspired 2D noise (compact implementation)
// ──────────────────────────────────────────────

const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;

const GRAD2 = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
];

// Deterministic permutation table
const PERM = new Uint8Array(512);
const PERM_MOD8 = new Uint8Array(512);

function seedNoise(seed: number) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    // Fisher-Yates shuffle with seed
    let s = seed;
    for (let i = 255; i > 0; i--) {
        s = (s * 16807 + 0) % 2147483647;
        const j = s % (i + 1);
        [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) {
        PERM[i] = p[i & 255];
        PERM_MOD8[i] = PERM[i] % 8;
    }
}
seedNoise(42);

function noise2D(x: number, y: number): number {
    const s = (x + y) * F2;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const t = (i + j) * G2;

    const x0 = x - (i - t);
    const y0 = y - (j - t);

    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    const ii = i & 255;
    const jj = j & 255;

    let n = 0;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
        t0 *= t0;
        const g = GRAD2[PERM_MOD8[ii + PERM[jj]]];
        n += t0 * t0 * (g[0] * x0 + g[1] * y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
        t1 *= t1;
        const g = GRAD2[PERM_MOD8[ii + i1 + PERM[jj + j1]]];
        n += t1 * t1 * (g[0] * x1 + g[1] * y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
        t2 *= t2;
        const g = GRAD2[PERM_MOD8[ii + 1 + PERM[jj + 1]]];
        n += t2 * t2 * (g[0] * x2 + g[1] * y2);
    }

    return 70 * n; // Returns -1..1
}

// ──────────────────────────────────────────────
// Color utilities
// ──────────────────────────────────────────────

export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

export function hexToRGBA(hex: string, alpha = 1): RGBA {
    const clean = hex.replace('#', '');
    return {
        r: parseInt(clean.slice(0, 2), 16),
        g: parseInt(clean.slice(2, 4), 16),
        b: parseInt(clean.slice(4, 6), 16),
        a: alpha,
    };
}

function lerpColor(a: RGBA, b: RGBA, t: number): RGBA {
    return {
        r: a.r + (b.r - a.r) * t,
        g: a.g + (b.g - a.g) * t,
        b: a.b + (b.b - a.b) * t,
        a: a.a + (b.a - a.a) * t,
    };
}

// ──────────────────────────────────────────────
// Blob (metaball) system
// ──────────────────────────────────────────────

export interface Blob {
    x: number;       // 0..1 normalized position
    y: number;
    radius: number;  // 0..1 normalized
    color: RGBA;
    noiseOffsetX: number;
    noiseOffsetY: number;
    speed: number;   // base noise traversal speed
    phaseX: number;  // Accumulated phase X
    phaseY: number;  // Accumulated phase Y
    phaseBreathe: number; // Accumulated breathing phase
    currentIntensity?: number; // Lerped intensity for smooth state transitions
}

export interface SoundscapeState {
    isPlaying: boolean;
    progress: number;      // 0..1 through the episode
    energy: number;        // 0..1 overall intensity (smoothed)
    chapterIndex: number;
    topicColors: string[];
}

export interface EngineConfig {
    blobCount: number;
    baseSpeed: number;       // noise traversal speed when idle
    playingSpeedMultiplier: number;
    baseRadius: number;
    radiusPulseAmount: number;
    globalOpacity: number;
}

export const DEFAULT_CONFIG: EngineConfig = {
    blobCount: 5,
    baseSpeed: 0.00015, // Majestic slow drift
    playingSpeedMultiplier: 2.0, // Smooth, engaging acceleration
    baseRadius: 0.45,
    radiusPulseAmount: 0.05, // Distinct, calm breathing
    globalOpacity: 0.45, // Full vibrant atmosphere 
};

// Default palette when no topic colors are provided
const DEFAULT_PALETTE = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ca8a04'];

export function createBlobs(config: EngineConfig, topicColors: string[]): Blob[] {
    const colors = topicColors.length > 0 ? topicColors : DEFAULT_PALETTE;
    const blobs: Blob[] = [];

    for (let i = 0; i < config.blobCount; i++) {
        const angle = (i / config.blobCount) * Math.PI * 2;
        blobs.push({
            x: 0.5 + Math.cos(angle) * 0.2,
            y: 0.5 + Math.sin(angle) * 0.2,
            radius: config.baseRadius + (Math.random() - 0.5) * 0.1,
            color: hexToRGBA(colors[i % colors.length], 0.6),
            noiseOffsetX: i * 100,
            noiseOffsetY: i * 100 + 50,
            speed: config.baseSpeed * (0.8 + Math.random() * 0.4),
            phaseX: i * 100,
            phaseY: i * 100 + 50,
            phaseBreathe: i * 100,
        });
    }

    return blobs;
}

// ──────────────────────────────────────────────
// Engine: per-frame update + render
// ──────────────────────────────────────────────

export function updateBlobs(
    blobs: Blob[],
    deltaTime: number, // Use deltaTime instead of absolute time
    state: SoundscapeState,
    config: EngineConfig,
): void {
    const speedMult = state.isPlaying ? config.playingSpeedMultiplier : 1;
    const targetIntensity = state.isPlaying ? 0.6 : 0.4;

    for (const blob of blobs) {
        const effectiveSpeed = blob.speed * speedMult;

        // Accumulate phase dynamically to prevent instant jumps when multiplier changes
        blob.phaseX += deltaTime * effectiveSpeed;
        blob.phaseY += deltaTime * effectiveSpeed;
        blob.phaseBreathe += deltaTime * 0.0008 * speedMult;

        // Smoothly fade intensity instead of flashing
        if (blob.currentIntensity === undefined) {
            blob.currentIntensity = targetIntensity;
        }
        const lerpFactor = 1 - Math.exp(-deltaTime * 0.002);
        blob.currentIntensity += (targetIntensity - blob.currentIntensity) * lerpFactor;

        // Noise-driven organic movement
        blob.x = 0.5 + noise2D(blob.phaseX, 0) * 0.4;
        blob.y = 0.5 + noise2D(0, blob.phaseY) * 0.4;

        // Radius breathing 
        const breathe = Math.sin(blob.phaseBreathe) * config.radiusPulseAmount;
        blob.radius = config.baseRadius + breathe;
    }
}

export function renderToCanvas(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    blobs: Blob[],
    state: SoundscapeState,
    config: EngineConfig,
    isDark: boolean,
): void {
    // Clear with theme-appropriate base
    ctx.clearRect(0, 0, width, height);

    // Draw each blob as a radial gradient
    for (const blob of blobs) {
        const cx = blob.x * width;
        const cy = blob.y * height;
        const r = blob.radius * Math.max(width, height);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);

        // Use the smoothly lerped intensity 
        const intensity = blob.currentIntensity ?? 0.4;
        const { r: cr, g: cg, b: cb } = blob.color;

        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${intensity * config.globalOpacity})`);
        gradient.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, ${intensity * config.globalOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }

    // Add subtle noise texture via compositing
    if (isDark) {
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = `rgba(255, 255, 255, 0.015)`;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
    }
}

// ──────────────────────────────────────────────
// Palette interpolation for chapter transitions
// ──────────────────────────────────────────────

export function interpolatePalette(
    blobs: Blob[],
    targetColors: string[],
    t: number, // 0..1 interpolation factor
): void {
    if (targetColors.length === 0) return;

    for (let i = 0; i < blobs.length; i++) {
        const target = hexToRGBA(targetColors[i % targetColors.length], 0.6);
        blobs[i].color = lerpColor(blobs[i].color, target, t);
    }
}

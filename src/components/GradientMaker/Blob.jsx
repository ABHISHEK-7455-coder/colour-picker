import React, { useState, useEffect } from 'react';
import "./Blob.css"

// Generate curved blob path using Catmull-Rom to Bezier conversion
const generateBlobPath = (points = 6, randomness = 0.3, smoothness = 0.5, size = 100) => {
    if (points < 3) return '';
    const angleStep = (Math.PI * 2) / points;
    const coords = [];

    for (let i = 0; i < points; i++) {
        const angle = i * angleStep;
        const r = size + (Math.random() - 0.5) * randomness * size * 2;
        coords.push([
            Math.cos(angle) * r,
            Math.sin(angle) * r
        ]);
    }

    const getPoint = (index) => coords[(index + coords.length) % coords.length];

    const bezierCommand = (p0, p1, p2, p3) => {
        const [x1, y1] = p1;
        const cp1x = x1 + (p2[0] - p0[0]) / 6 * smoothness;
        const cp1y = y1 + (p2[1] - p0[1]) / 6 * smoothness;
        const cp2x = p2[0] - (p3[0] - x1) / 6 * smoothness;
        const cp2y = p2[1] - (p3[1] - y1) / 6 * smoothness;

        return `C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
    };

    let d = `M${coords[0][0].toFixed(2)},${coords[0][1].toFixed(2)}`;
    for (let i = 0; i < coords.length; i++) {
        d += ' ' + bezierCommand(
            getPoint(i - 1),
            getPoint(i),
            getPoint(i + 1),
            getPoint(i + 2)
        );
    }

    return d + ' Z';
};

export default function BlobGenerator() {
    const [points, setPoints] = useState(6);
    const [randomness, setRandomness] = useState(0.3);
    const [smoothness, setSmoothness] = useState(0.5);
    const [fillType, setFillType] = useState('solid');
    const [color1, setColor1] = useState('#6C63FF');
    const [color2, setColor2] = useState('#00C9A7');
    const [blobPath, setBlobPath] = useState('');

    useEffect(() => {
        setBlobPath(generateBlobPath(points, randomness, smoothness, 80));
    }, [points, randomness, smoothness]);

    const fill = fillType === 'solid' ? color1 : `url(#blobGradient)`;

    return (
        <div className="blob-container">
            <h1 className="blob-heading">React Blob Generator</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="inputs">
                    <div>
                        <div><label className="label">Points</label></div>
                        <input
                            type="range"
                            min="3"
                            max="9"
                            value={points}
                            onChange={(e) => setPoints(+e.target.value)}
                            className="w-full"
                        />
                        <p>{points}</p>
                    </div>

                    <div>
                        <div><label className="label">Randomness</label></div>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={randomness}
                            onChange={(e) => setRandomness(+e.target.value)}
                            className="w-full"
                        />
                        <p>{randomness}</p>
                    </div>

                    <div>
                       <div> <label className="label">Smoothness</label></div>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={smoothness}
                            onChange={(e) => setSmoothness(+e.target.value)}
                            className="w-full"
                        />
                        <p>{smoothness}</p>
                    </div>

                    <div>
                        <div><label className="label">Fill Type</label></div>
                        <select
                            value={fillType}
                            onChange={(e) => setFillType(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="solid">Solid</option>
                            <option value="gradient">Gradient</option>
                        </select>
                    </div>

                    {fillType === 'solid' ? (
                        <div>
                           <div><label className="label">Color</label></div>
                            <input
                                type="color"
                                value={color1}
                                onChange={(e) => setColor1(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <div >
                                <div><label className="label">Color 1</label></div>
                                <input
                                    type="color"
                                    value={color1}
                                    onChange={(e) => setColor1(e.target.value)}
                                />
                            </div>
                            <div>
                                <div><label className="label">Color 2</label></div>
                                <input
                                    type="color"
                                    value={color2}
                                    onChange={(e) => setColor2(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="blob">
                    <svg
                        viewBox="-100 -100 200 300"
                        width="300"
                        height="500"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {fillType === 'gradient' && (
                            <defs>
                                <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={color1} />
                                    <stop offset="100%" stopColor={color2} />
                                </linearGradient>
                            </defs>
                        )}
                        <path d={blobPath} fill={fill} />
                    </svg>
                </div>
            </div>

            {/* Export */}
            <div className="mt-6">
                <h2 className="font-semibold text-lg mb-2">SVG Path</h2>
                <textarea
                    readOnly
                    value={`<svg viewBox='-100 -100 200 200'><path d='${blobPath}' fill='${fill}' /></svg>`}
                    className="w-full p-2 border rounded h-40 font-mono"
                />
            </div>
        </div>
    );
}

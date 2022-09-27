import React from "react";

export function getPixels(url: string) {
  return new Promise<{ r: number; g: number; b: number }[]>(
    (resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const data = ctx.getImageData(0, 0, img.width, img.height);
        const rgbPixels = rgb(data.data);

        resolve(squalizes(rgbPixels, 0));
      };
    }
  );
}

function rgb(pixels: Uint8ClampedArray) {
  const rbgVal = [];
  for (let i = 0; i < pixels.length; i += 4) {
    const rgbPixels = {
      r: pixels[i],
      g: pixels[i + 1],
      b: pixels[i + 2],
    };

    rbgVal.push(rgbPixels);
  }
  return rbgVal;
}

function getBigPixelsColor(rgbPixels: { r: number; g: number; b: number }[]) {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbPixels.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });
  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const maxRange = Math.max(rRange, gRange, bRange);

  switch (maxRange) {
    case rRange:
      return "r";
    case gRange:
      return "g";
    default:
      return "b";
  }
}

function squalizes(
  rgbValue: { r: number; g: number; b: number }[],
  depth: number
): { r: number; g: number; b: number }[] {
  const MAX_DEPTH = 4;
  if (MAX_DEPTH === depth || rgbValue.length === 0) {
    const colors = rgbValue.reduce(
      (acc, n) => {
        if (n.r === 0 || n.g === 0 || n.b === 0) {
          return n;
        }
        acc.r += n.r;
        acc.g += n.g;
        acc.b += n.b;
        return acc;
      },
      { r: 0, g: 0, b: 0 }
    );
    colors.r = Math.round(colors.r / rgbValue.length);
    colors.g = Math.round(colors.g / rgbValue.length);
    colors.b = Math.round(colors.b / rgbValue.length);
    return [colors];
  }

  const sortedRgb = getBigPixelsColor(rgbValue);
  rgbValue = rgbValue.sort((a, b) => a[sortedRgb] - b[sortedRgb]);
  const midleValue = rgbValue.length / 2;
  return [
    ...squalizes(rgbValue.slice(0, midleValue), depth + 1),
    ...squalizes(rgbValue.slice(midleValue + 1), depth + 1),
  ];
}

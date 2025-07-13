import type { Element } from "hast";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * SVGファイルを読み込んでHAST Element形式に変換する
 * @param svgPath - SVGファイルのパス（プロジェクトルートからの相対パス）
 * @param className - 追加するCSSクラス名
 * @returns HAST Element形式のSVG
 */
export function loadSvgAsElement(svgPath: string, className?: string): Element {
  try {
    const fullPath = path.resolve(process.cwd(), svgPath);
    const svgContent = readFileSync(fullPath, "utf8");

    // 簡単なSVGパーサー（viewBox、path、fillを抽出）
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const pathMatch = svgContent.match(/<path[^>]*d="([^"]+)"[^>]*>/);
    const widthMatch = svgContent.match(/width="([^"]+)"/);
    const heightMatch = svgContent.match(/height="([^"]+)"/);

    const viewBox = viewBoxMatch?.[1] || "0 0 24 24";
    const pathData = pathMatch?.[1] || "";
    const width = widthMatch?.[1] || "16px";
    const height = heightMatch?.[1] || "16px";

    const svgElement: Element = {
      type: "element",
      tagName: "svg",
      properties: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox,
        width,
        height,
        fill: "currentColor",
        ...(className && { className: [className] }),
      },
      children: [
        {
          type: "element",
          tagName: "path",
          properties: {
            d: pathData,
          },
          children: [],
        },
      ],
    };

    return svgElement;
  }
  catch {
    // フォールバック: シンプルなテキストアイコン
    return {
      type: "element",
      tagName: "span",
      properties: {
        ...(className && { className: [className] }),
      },
      children: [{ type: "text", value: "icon" }],
    };
  }
}

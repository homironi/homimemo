"use client";

import { useEffect } from "react";

/**
 * コードをクリップボードにコピーするボタンのハンドラ
 * @returns 何も返さないことでイベントハンドラだけ登録する
 */
export default function CopyCodeHandler() {
  useEffect(() => {
    /**
     * クリックイベントハンドラ
     * @param e クリックイベント
     */
    async function onClick(e: MouseEvent) {
      const btn = e.target as HTMLElement;
      if (!btn.matches("button.copy-btn")) return;

      const selector = btn.dataset.copyTarget!;
      const code = document.querySelector<HTMLElement>(selector);
      if (!code) return;
      const raw = code.textContent ?? "";

      // 不要に空行が入ってしまうので、整形する
      const cleaned = raw
        .replace(/^\s*\n+|\n+\s*$/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .split("\n")
        .reduce<{ indent: number; lines: string[] }>(
          (acc, line) => {
            if (!line.trim()) {
              acc.lines.push("");
              return acc;
            }

            const m = line.match(/^(\s+)/);
            const indent = m ? m[1].length : 0;
            acc.indent = acc.lines.length ? Math.min(acc.indent, indent) : indent;
            acc.lines.push(line);
            return acc;
          },
          { indent: Infinity, lines: [] },
        );

      const { indent, lines } = cleaned;
      const finalCleaned = lines.map(l => l.slice(isFinite(indent) ? indent : 0)).join("\n");

      try {
        btn.textContent = "Copying...";
        await navigator.clipboard.writeText(finalCleaned);
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 1500);
      }
      catch {
        btn.textContent = "Failed";
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

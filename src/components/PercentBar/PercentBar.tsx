import styles from "./PercentBar.module.css";

type PercentBarProps = {
  max: number;
  current: number;
};

/**
 * 割合を示すバー
 * @param root0 引数オブジェクト
 * @param root0.max 最大数
 * @param root0.current 現在数：バーの満たす数
 * @returns 割合を示すバー要素
 */
export function PercentBar({ max, current }: PercentBarProps){
  const ratio = current / max * 100;
  return (
    <div className={ styles.container } >
      <div style={ {width: `${ratio < 0 ? 0 : ratio}%`} } className={ styles.bar } />
    </div>
  );
}
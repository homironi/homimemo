
export type AdSenseType = "display" | "multiplex";

const adSenseData  = new Map<AdSenseType,Record<string,string>>([
  ["display", {
    "data-ad-slot": "5147370849",
    "data-ad-format": "auto",
    "data-full-width-responsive": "true"
  }],
  ["multiplex", {
    "data-ad-format": "autorelaxed",
    "data-ad-slot": "9245757321",
  }],
]);

export type AdSenseProps = {
  adSenseType: AdSenseType;
};

/**
 * Google AdSenseの広告表示位置決定Component
 * @param root0 引数オブジェクト
 * @param root0.adSenseType 広告の種類
 * @description ページで1回 @see AdSenseHandler が必要。productionビルドの時だけ表示される
 * @returns AdSenseの広告表示位置決定Component
 */
export function AdSense({adSenseType}:AdSenseProps){
  if(process.env.NODE_ENV !== "production"){
    return <p>productionビルドでは「{adSenseType}」の広告が表示されます。現在：{process.env.NODE_ENV}</p>;
  }

  return (
    <ins
      className="adsbygoogle"
      style={ {display:"block"} }
      data-ad-client="ca-pub-7565570537846567"
      { ...adSenseData.get(adSenseType) }
    />
  );
}
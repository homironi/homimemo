import { Thing, WithContext } from "schema-dts";

export type Props = {
  schema: WithContext<Thing>;
};

/**
 * JsonLd
 * @param root0 引数オブジェクト
 * @param root0.schema JsonLdスキーマ
 * @returns JsonLdのスクリプトタグ
 */
export function JsonLd({schema}:Props){
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={ {__html: JSON.stringify(schema)} }
    />);
}
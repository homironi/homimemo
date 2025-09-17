"use client";

import { useEffect } from "react";

/**
 * GoogleAdSenseの手動広告の読み込み用処理を実行するだけのComponent
 * @description 記事でDynamicComponentにするためにここだけ分離
 * @returns なんのComponentも返さない。Google AdSenseの手動広告の読み込みを行う。
 */
export function AdSenseHandler(){
  useEffect(()=>{
    try{
     
    if (typeof window !== "undefined") {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } 
    }
    catch{
      return;
    }
  }, []);
  
  return null;
}
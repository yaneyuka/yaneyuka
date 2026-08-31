'use client';

import React from 'react';

// 関数名 -> 構文説明 のマップ
// ★ここに載せてよいのは FormulaEngine に実装がある関数だけ。
//   未実装のものを載せるとサジェストに出た関数が #NAME? になり、使えると誤解させる。
//   （以前は SUMIF / VLOOKUP / INDEX / MATCH / LEFT など未実装の10個が並んでいた）
const functionSignatures: Record<string, string> = {
  // 集計
  SUM: 'SUM(数値1, 数値2, ...)',
  AVERAGE: 'AVERAGE(数値1, 数値2, ...)',
  MIN: 'MIN(数値1, 数値2, ...)',
  MAX: 'MAX(数値1, 数値2, ...)',
  COUNT: 'COUNT(値1, ...)  ※数値セルのみ',
  COUNTA: 'COUNTA(値1, ...)  ※空でないセル',
  COUNTBLANK: 'COUNTBLANK(範囲)  ※空セルの数',
  PRODUCT: 'PRODUCT(数値1, ...)  ※すべて掛ける',
  MEDIAN: 'MEDIAN(数値1, ...)',
  LARGE: 'LARGE(範囲, 順位)  ※大きい方からN番目',
  SMALL: 'SMALL(範囲, 順位)  ※小さい方からN番目',
  // 条件付き集計
  SUMIF: 'SUMIF(範囲, 条件, [合計範囲])  条件例: "建具" ">=100" "*タイル*"',
  COUNTIF: 'COUNTIF(範囲, 条件)',
  AVERAGEIF: 'AVERAGEIF(範囲, 条件, [平均範囲])',
  // 数値
  ROUND: 'ROUND(数値, 桁数)',
  ROUNDUP: 'ROUNDUP(数値, 桁数)  ※切り上げ',
  ROUNDDOWN: 'ROUNDDOWN(数値, 桁数)  ※切り捨て',
  INT: 'INT(数値)',
  MOD: 'MOD(数値, 除数)  ※余り',
  POWER: 'POWER(数値, 指数)',
  SQRT: 'SQRT(数値)',
  CEILING: 'CEILING(数値, 基準値)  ※基準値の倍数へ切り上げ',
  FLOOR: 'FLOOR(数値, 基準値)  ※基準値の倍数へ切り捨て',
  ABS: 'ABS(数値)',
  SIGN: 'SIGN(数値)',
  // 論理
  IF: 'IF(条件, 真の場合の値, 偽の場合の値)',
  IFERROR: 'IFERROR(値, エラーの場合の値)',
  AND: 'AND(条件1, 条件2, ...)',
  OR: 'OR(条件1, 条件2, ...)',
  NOT: 'NOT(条件)',
  ISBLANK: 'ISBLANK(値)',
  ISNUMBER: 'ISNUMBER(値)',
  ISTEXT: 'ISTEXT(値)',
  // 検索
  VLOOKUP: 'VLOOKUP(検索値, 範囲, 列番号, [完全一致=FALSE])',
  HLOOKUP: 'HLOOKUP(検索値, 範囲, 行番号)',
  INDEX: 'INDEX(範囲, 行番号, [列番号])',
  MATCH: 'MATCH(検索値, 範囲, 0)  ※完全一致のみ',
  // 文字列
  LEN: 'LEN(文字列)',
  LEFT: 'LEFT(文字列, 文字数)',
  RIGHT: 'RIGHT(文字列, 文字数)',
  MID: 'MID(文字列, 開始位置, 文字数)',
  TRIM: 'TRIM(文字列)',
  UPPER: 'UPPER(文字列)',
  LOWER: 'LOWER(文字列)',
  CONCATENATE: 'CONCATENATE(文字列1, ...)  ※& でも連結できます',
  CONCAT: 'CONCAT(文字列1, ...)',
  SUBSTITUTE: 'SUBSTITUTE(文字列, 検索文字, 置換文字)',
  REPT: 'REPT(文字列, 繰り返し回数)',
  FIND: 'FIND(検索文字, 対象文字列)',
  VALUE: 'VALUE(文字列)  ※文字を数値に',
  TEXT: 'TEXT(値, 表示形式)  例: "#,##0" "0.00" "yyyy-mm-dd"',
  // 日付（"YYYY-MM-DD" の文字列で扱います）
  TODAY: 'TODAY()',
  NOW: 'NOW()',
  DATE: 'DATE(年, 月, 日)',
  YEAR: 'YEAR(日付)',
  MONTH: 'MONTH(日付)',
  DAY: 'DAY(日付)',
  WEEKDAY: 'WEEKDAY(日付)  ※日曜=1',
  DAYS: 'DAYS(終了日, 開始日)  ※日数の差',
  EDATE: 'EDATE(日付, 月数)  ※Nか月後',
};

interface FormulaSyntaxHintProps {
  formula: string;
  cursorIndex: number;
  position: { top: number; left: number };
}

const FormulaSyntaxHint: React.FC<FormulaSyntaxHintProps> = ({
  formula,
  cursorIndex,
  position,
}) => {
  // カーソル位置までの文字列を取得し、最後の関数名+括弧開始を検出
  const uptoCursor = formula.slice(0, cursorIndex);
  const match = uptoCursor.match(/([A-Za-z_]+)\($/i);
  
  if (!match) return null;
  
  const funcName = match[1].toUpperCase();
  const signature = functionSignatures[funcName];
  
  if (!signature) return null;

  return (
    <div
      className="absolute z-50 bg-blue-50 border border-blue-300 rounded shadow-lg px-3 py-2 text-sm"
      style={{ top: position.top, left: position.left }}
    >
      <strong className="text-blue-700">{funcName}</strong>関数: <span className="text-gray-700">{signature}</span>
    </div>
  );
};

export default FormulaSyntaxHint;


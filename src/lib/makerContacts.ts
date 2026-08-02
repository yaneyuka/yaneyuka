/**
 * Maker conect の送信先レジストリ。
 *
 * 宛先アドレスはサーバー側でのみ解決する。クライアントから `to` を受け取ると
 * 誰でも任意の相手にメールを送れるオープンリレーになるため、API は
 * category / manufacturer の組をキーにこの一覧を引く。
 *
 * ※現在はサンプルデータ（@example.com）。実メーカーの連絡先に差し替える際も
 * このファイルだけを更新すれば、クライアント・API の両方に反映される。
 */

export const MATERIAL_CATEGORIES = [
  '屋根', '外壁', '開口部', '外壁仕上げ', '外部床', '外部その他', '内部床材',
  '内装壁材', '内装天井材', '内装その他', '防水', '金物', 'ファニチャー',
  '電気設備', '機械設備', '外構', 'エクステリア',
] as const;

export type Manufacturer = { name: string; email: string };

export const MANUFACTURERS: Record<string, Manufacturer[]> = {
  '屋根': [{ name: 'サンプル屋根A', email: 'roof-a@example.com' }, { name: 'サンプル屋根B', email: 'roof-b@example.com' }],
  '外壁': [{ name: 'サンプル外壁A', email: 'wall-a@example.com' }],
  '開口部': [{ name: 'サンプル開口A', email: 'opening-a@example.com' }],
  '外壁仕上げ': [{ name: 'サンプル仕上A', email: 'finish-a@example.com' }],
  '外部床': [{ name: 'サンプル外部床A', email: 'extfloor-a@example.com' }],
  '外部その他': [{ name: 'サンプル外部その他A', email: 'extetc-a@example.com' }],
  '内部床材': [{ name: 'サンプル内部床A', email: 'intfloor-a@example.com' }],
  '内装壁材': [{ name: 'サンプル内装壁A', email: 'intwall-a@example.com' }],
  '内装天井材': [{ name: 'サンプル内装天井A', email: 'intceil-a@example.com' }],
  '内装その他': [{ name: 'サンプル内装その他A', email: 'intetc-a@example.com' }],
  '防水': [{ name: 'サンプル防水A', email: 'waterproof-a@example.com' }],
  '金物': [{ name: 'サンプル金物A', email: 'hardware-a@example.com' }],
  'ファニチャー': [{ name: 'サンプル家具A', email: 'furniture-a@example.com' }],
  '電気設備': [{ name: 'サンプル電気A', email: 'electrical-a@example.com' }],
  '機械設備': [{ name: 'サンプル機械A', email: 'mechanical-a@example.com' }],
  '外構': [{ name: 'サンプル外構A', email: 'exinfra-a@example.com' }],
  'エクステリア': [{ name: 'サンプルエクステリアA', email: 'exterior-a@example.com' }],
};

export const PURPOSES = ['打合せ依頼', 'カタログ請求', 'サンプル請求'] as const;
export type Purpose = (typeof PURPOSES)[number];

export function isPurpose(value: unknown): value is Purpose {
  return typeof value === 'string' && (PURPOSES as readonly string[]).includes(value);
}

/** category / manufacturer の組から送信先を解決する。未登録なら null。 */
export function resolveManufacturerEmail(category: unknown, manufacturer: unknown): string | null {
  if (typeof category !== 'string' || typeof manufacturer !== 'string') return null;
  const found = MANUFACTURERS[category]?.find((m) => m.name === manufacturer);
  return found ? found.email : null;
}

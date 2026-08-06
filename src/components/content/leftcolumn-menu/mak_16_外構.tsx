import React, { useState } from 'react';
import MakerLink from '@/components/MakerLink';
import MakerRows from '@/components/MakerRows';

interface ExteriorInfrastructureContentProps {
  subcategory: string;
}

const ExteriorInfrastructureContent: React.FC<ExteriorInfrastructureContentProps> = ({ subcategory }) => {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const [showBasicKnowledge, setShowBasicKnowledge] = useState(false);

  const handleImageError = (imageKey: string) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }));
  };

  // リンクの実体は src/components/MakerLink.tsx。
  // 404 になったメーカーページは会社トップへ自動で振り替わる。
  const renderLink = (url: string | undefined, label: string) => (
    <MakerLink url={url} label={label} />
  );

  const renderRecruitmentCard = () => (
    <div className="border rounded p-3 bg-white text-sm w-[240px] h-[365px] card">
      <img
        src={imageErrors['recruitment'] ? '/image/掲載募集中a.png' : '/image/掲載募集中a.png'}
        alt="掲載企業様募集中"
        className="w-30 mb-1 w-[clamp(300px,5vw,120px)]"
        onError={() => handleImageError('recruitment')}
      />
      <div className="font-bold text-sm mb-2">□□□</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <a href="#" target="_blank" className="bg-gray-200 text-black text-center py-1 rounded hover:bg-gray-700 hover:text-white transition">商品ページ</a>
        <a href="#" className="bg-gray-200 text-center py-1 rounded hover:bg-gray-700 hover:text-white transition">カタログ</a>
        <a href="#" className="bg-gray-200 text-center py-1 rounded hover:bg-gray-700 hover:text-white transition">営業所</a>
        <a href="#" className="bg-gray-200 text-center py-1 rounded hover:bg-gray-700 hover:text-white transition">お問い合わせ</a>
        <a href="#" className="bg-gray-200 text-center py-1 rounded hover:bg-gray-700 hover:text-white transition">サンプル</a>
        <a href="#" className="bg-gray-200 text-center py-1 rounded text-[10px] hover:bg-gray-700 hover:text-white transition">CADDOWNLOAD</a>
      </div>
      <img
        src={imageErrors['commercial'] ? '/image/ChatGPT Image 2025年5月1日 16_25_41.webp' : '/image/ChatGPT Image 2025年5月1日 16_25_41.webp'}
        alt="Manufacturer Commercial"
        className="mt-3 w-full rounded w-[clamp(180px,22vw,320px)]"
        onError={() => handleImageError('commercial')}
      />
    </div>
  );

  const renderCompanyRow = (companyName: string, links: { [key: string]: string }) => {
    return (
      <div className="text-[13px] flex items-start gap-2">
        <span className="w-[180px]">・{companyName}</span>
        <span className="flex gap-1 flex-wrap">
          {renderLink(links.products, '商品ページ')}｜
          {renderLink(links.catalog, 'カタログ')}｜
          {renderLink(links.office, '営業所')}｜
          {renderLink(links.contact, 'お問い合わせ')}｜
          {renderLink('#', 'サンプル')}｜
          {renderLink('#', 'CADDOWNLOAD')}
        </span>
      </div>
    );
  };

  const renderSectionHeader = (title: string) => (
    <div className="flex items-center mt-4 mb-1">
      <span className="inline-flex items-center px-3 py-1 text-[13px] font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-full">{title}</span>
      <div className="flex-1 h-px bg-gray-300 ml-2"></div>
    </div>
  );

  const renderHeader = (title: string) => (
    <div className="mb-2">
      <h2 className="text-xl font-semibold inline">{title}</h2>
      <a href="/register" className="ml-2 align-baseline text-gray-600 hover:text-gray-800 text-[11px]">掲載希望はコチラ</a>
    </div>
  );

  const renderCurbstoneCategory = () => (
    <div>
      <div className="mb-2">
        <h2 className="text-xl font-semibold inline">縁石</h2>
        <button
          onClick={() => setShowBasicKnowledge(!showBasicKnowledge)}
          className="ml-2 align-baseline text-blue-600 hover:text-blue-800 text-[11px] underline"
        >
          <span className={`inline-block transition-transform ${showBasicKnowledge ? 'rotate-90' : ''}`}>&gt;</span> 基本知識
        </button>
        <a href="/register" className="ml-2 align-baseline text-gray-600 hover:text-gray-800 text-[11px]">掲載希望はコチラ</a>
      </div>
      
      {/* 基本知識トグル */}
      {showBasicKnowledge && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs">
          <h3 className="font-bold text-[13px] mb-1.5">【コンクリート縁石（地先・歩車道）】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「地先（ちさき）」と「歩車道（ほしゃどう）」の強度差</h4>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>地先ブロック（A種など）</strong>： 10cm角〜12cm角程度の細いもの。敷地内の見切りや花壇用。車が乗ると割れるため、駐車場には使えない。</li>
            <li><span className="mr-1">・</span><strong>歩車道ブロック（片面・両面）</strong>: 道路で見かける大きなもの。車が乗り上げても割れない強度がある。駐車場の縁石には必ずこちらを選定する。</li>
          </ul>
          
          <h4 className="font-bold text-[12px] mb-1">タイヤを守る「Ｒ面（アールめん）」形状</h4>
          
          <p className="mb-1 text-xs ml-3">
            駐車場に使う場合、角が直角（ピン角）の縁石だと、タイヤを擦った時にサイドウォールが裂ける（バーストする）リスクがある。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            推奨: 角が丸く加工された<strong>「R面取り」</strong>の製品を選ぶことで、万が一乗り上げてもタイヤへのダメージを最小限に抑えられる。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">見えない「根巻き（ねまき）」が寿命を決める</h4>
          
          <p className="mb-1 text-xs ml-3">
            縁石はただ置いているわけではない。土の圧力や車の衝撃で倒れないよう、地面の下で<strong>「コンクリートで足元を固める（根巻き）」</strong>必要がある。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            このバックアップコンクリートが薄いと、数年で縁石が外側に傾いてくる。見積もりの施工断面図で確認すべきポイント。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【ピンコロ石（小舗石）】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">唯一無二の「曲線（カーブ）」対応力</h4>
          
          <p className="mb-1 text-xs ml-3">
            9cm角程度のサイコロ状の自然石。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            コンクリート縁石は直線しか作れないが、ピンコロは<strong>「自由な曲線」</strong>を描けるため、柔らかいデザインのアプローチや花壇作りに必須。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            注意点: 1個ずつ手作業で並べるため、既製品の縁石に比べて施工費（職人の手間賃）が高くなる。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">「割り肌」と「サビ」の風合い</h4>
          
          <p className="mb-1 text-xs ml-3">
            表面がゴツゴツした「割り肌」仕上げが一般的。
          </p>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>御影石</strong>: グレーや黒、桜色が定番。</li>
            <li><span className="mr-1">・</span><strong>サビ石</strong>: 茶色や黄色が混じったもの。和風・洋風どちらにも合うが、天然の錆成分を含むため、雨で土間コンクリートに茶色いシミ（貰い錆）が流れることがある。</li>
          </ul>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【車止め（パーキングブロック）】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「接着剤」だけでは止まらない</h4>
          
          <p className="mb-1 text-xs ml-3">
            車止めをコンクリートボンドだけで固定するDIY施工が見られるが、タイヤが当たった衝撃で簡単に剥がれる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            鉄則: 必ずコンクリート床に穴を開け、<strong>「アンカーピン」</strong>を打ち込んで物理的に固定しないと、いざという時に車止めごと動いて壁に衝突する。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">「コンクリート製」と「ゴム・樹脂製」</h4>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>コンクリート</strong>: 非常に重く丈夫で安い。ただし硬いため、バンパーやホイールを擦ると車側が大きく傷つく。</li>
            <li><span className="mr-1">・</span><strong>ゴム・樹脂</strong>: 衝撃を吸収するため車に優しい。反射板が付いているものが多く、夜間の視認性が高い。安全性重視ならこちら。</li>
          </ul>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-8">
        {renderRecruitmentCard()}
      </div>
      <div className="mt-4">
        {<MakerRows category="外構" page="縁石" />}
      </div>
    </div>
  );

  const renderPavementCategory = () => (
    <div>
      <div className="mb-2">
        <h2 className="text-xl font-semibold inline">舗装</h2>
        <button
          onClick={() => setShowBasicKnowledge(!showBasicKnowledge)}
          className="ml-2 align-baseline text-blue-600 hover:text-blue-800 text-[11px] underline"
        >
          <span className={`inline-block transition-transform ${showBasicKnowledge ? 'rotate-90' : ''}`}>&gt;</span> 基本知識
        </button>
        <a href="/register" className="ml-2 align-baseline text-gray-600 hover:text-gray-800 text-[11px]">掲載希望はコチラ</a>
      </div>
      
      {/* 基本知識トグル */}
      {showBasicKnowledge && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs">
          <h3 className="font-bold text-[13px] mb-1.5">【アスファルト舗装】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">夏場の「沈下」とバイクスタンド</h4>
          
          <p className="mb-1 text-xs ml-3">
            アスファルトは熱可塑性（熱で柔らかくなる）のため、真夏は表面が高温になり柔らかくなる。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            リスク: その状態でバイクのスタンドや、ジャッキ、細い椅子の脚などで一点に荷重をかけると、ズブッとめり込んで穴が空く。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            住宅の駐車場で採用する場合は、タイヤが乗る部分だけコンクリートにするか、この特性を許容する必要がある。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">「轍（わだち）」と水たまり</h4>
          
          <p className="mb-1 text-xs ml-3">
            常に同じ場所に車を停めたり、同じラインを通行したりすると、タイヤの部分だけが沈んで「轍（くぼみ）」ができ、そこに水が溜まるようになる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            コンクリートに比べて初期費用は安いが、補修頻度は高い。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">「開粒度（かいりゅうど）」と「密粒度（みつりゅうど）」</h4>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>密粒度</strong>: 隙間なく石が詰まった一般的な舗装。水を通さないため、水勾配が必要。</li>
            <li><span className="mr-1">・</span><strong>開粒度（透水性）</strong>： 隙間が多く、雨水を地面に逃がす舗装。水たまりができにくく、走行音も静かだが、強度は密粒に劣る。</li>
          </ul>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【土間コンクリート舗装】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">強度の要「ワイヤーメッシュ」の位置</h4>
          
          <p className="mb-1 text-xs ml-3">
            コンクリートの割れを防ぐため、中に鉄の網（ワイヤーメッシュ）を入れる。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            重要: メッシュはコンクリートの厚みの<strong>「中央〜やや上」</strong>に入っていないと意味がない。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            手抜き工事で地面に直接メッシュを置いて上からコンクリートを流すと、メッシュが一番底に沈んでしまい、強度が発揮されずすぐにひび割れる（「カブリ厚」不足）。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">水たまりを作らない「水勾配（みずこうばい）」</h4>
          
          <p className="mb-1 text-xs ml-3">
            コンクリートは水を吸わないため、傾斜（勾配）をつけないと水たまりができる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            基準: 最低でも<strong>2%（1mで2cm下がる）</strong>程度の勾配が必要。平らに見せたいデザイン住宅の駐車場でも、この勾配確保は必須。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">タイヤ痕が目立つ理由</h4>
          
          <p className="mb-1 text-xs ml-3">
            コンクリートは白っぽいため、黒いタイヤ痕（特に切り返しの跡）が非常に目立つ。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            気になる場合は、最初から少し黒を混ぜたコンクリートにするか、タイヤ痕が目立ちにくい「洗い出し仕上げ」を提案する。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【インターロッキングブロック】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「不陸（ふりく）」の発生と修正の容易さ</h4>
          
          <p className="mb-1 text-xs ml-3">
            コンクリートブロックを砂に噛み合わせて敷き詰める工法。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            下地が砂（サンドクッション）なので、長期間車が乗ると凸凹（不陸）が生じやすい。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            メリット: コンクリートと違い、沈んだ部分のブロックを剥がして、砂を足して戻すだけで直せる。配管工事などで掘り返す必要がある場所に適している。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">「保水性」によるヒートアイランド対策</h4>
          
          <p className="mb-2 text-xs ml-3">
            ブロック自体が水を保水し、気化熱で温度を下げる「保水性ブロック」は、夏場の照り返しを軽減するため、公共施設や商業施設の広場で標準採用されている。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【ポーラスコンクリート（透水性コンクリート）】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「勾配不要」の画期的メリット</h4>
          
          <p className="mb-1 text-xs ml-3">
            雷おこしのように隙間だらけのコンクリート（ドライテック、オコシコン等）。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            水を瞬時に通すため、「水勾配」をつける必要がない。平らな駐車場が作れる唯一のコンクリート系舗装として人気急上昇中。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">目詰まりと高圧洗浄</h4>
          
          <p className="mb-1 text-xs ml-3">
            隙間に土埃や苔が詰まると透水性が失われる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            機能を維持するには、定期的に高圧洗浄機で隙間の汚れを飛ばすメンテナンスが必要。
          </p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-8">
        {renderRecruitmentCard()}
      </div>
      <div className="mt-4">
        {renderSectionHeader('ブロック')}
        {<MakerRows category="外構" page="外構舗装" />}
      </div>
    </div>
  );

  const renderCoverCategory = () => (
    <div>
      <div className="mb-2">
        <h2 className="text-xl font-semibold inline">桝蓋</h2>
        <button
          onClick={() => setShowBasicKnowledge(!showBasicKnowledge)}
          className="ml-2 align-baseline text-blue-600 hover:text-blue-800 text-[11px] underline"
        >
          <span className={`inline-block transition-transform ${showBasicKnowledge ? 'rotate-90' : ''}`}>&gt;</span> 基本知識
        </button>
        <a href="/register" className="ml-2 align-baseline text-gray-600 hover:text-gray-800 text-[11px]">掲載希望はコチラ</a>
      </div>
      
      {/* 基本知識トグル */}
      {showBasicKnowledge && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs">
          <h3 className="font-bold text-[13px] mb-1.5">【耐荷重（T荷重）の絶対ルール】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「T-2」と「T-14」の境界線</h4>
          
          <p className="mb-1 text-xs ml-3">
            蓋の強度は、通過する車両の総重量で決まる。
          </p>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>T-2（乗用車）</strong>： 一般住宅の駐車場。2トン以下の車。</li>
            <li><span className="mr-1">・</span><strong>T-14（中型トラック）</strong>: 商店の搬入口や、消防車が入る可能性がある場所。6トン〜14トン。</li>
            <li><span className="mr-1">・</span><strong>T-25（大型トラック）</strong>: 幹線道路や物流倉庫。20トン以上。</li>
          </ul>
          
          <p className="mb-2 text-xs ml-3">
            鉄則: 住宅であっても、ゴミ収集車や引越しのトラックがバックで入ってくる可能性がある場所（旗竿地の入り口など）には、念のため<strong>「T-14」</strong>を入れておかないと、割れてトラックが脱輪する。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">樹脂蓋の「耐圧」と「非耐圧」</h4>
          
          <p className="mb-1 text-xs ml-3">
            白いプラスチック蓋には、「車乗禁止（歩行用）」と「耐圧（2tまで）」がある。見た目は似ているが、裏側のリブ（補強）の構造が全く違う。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            施工中にトラックが乗って割れることが多いため、工事期間中は鉄板を敷くなどの養生が必須。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【安全・防災機能の知識】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">豪雨時の「浮上防止（ロック）」機能</h4>
          
          <p className="mb-1 text-xs ml-3">
            ゲリラ豪雨で下水管が満水になると、空気圧と水圧でマンホールの蓋がポンッと飛び上がり、道路に流される危険がある。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            対策: 内圧が上がるとガスだけを逃がす「圧力開放機能」や、蓋が枠から外れない<strong>「浮上防止（ロック）機能」</strong>がついた製品（災害対策型）を選定することが、近年の都市型水害対策の標準。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">転落防止の「セーフティネット」</h4>
          
          <p className="mb-2 text-xs ml-3">
            蓋を開けた状態や、万が一蓋が外れた時に、人が穴に落ちないようにするための落下防止網（転落防止梯子）。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            深いマンホールや、子供が通る通学路付近の桝には必須の安全装備。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【素材とメンテナンス性】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「鋳鉄（ちゅうてつ）」のサビと寿命</h4>
          
          <p className="mb-1 text-xs ml-3">
            道路のマンホールは錆びにくいダクタイル鋳鉄製。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            表面は黒い瀝青（れきせい）塗装がされているが、経年で剥がれて赤錆が出る。強度的には問題ないが、美観を気にするエントランス等では、錆びない<strong>「ステンレス製化粧蓋」</strong>にするか、塗装メンテナンスが必要。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">コンクリート蓋の「固着」問題</h4>
          
          <p className="mb-1 text-xs ml-3">
            昔ながらのコンクリート蓋は、枠と蓋の隙間に砂や泥が詰まり、いざ点検しようとした時に<strong>「全く開かない」</strong>ことが多発する。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            バールでこじ開けようとして角が欠けることも多い。点検頻度が高い場所には、開閉ハンドルがついた金属製か、軽量な樹脂製への交換が推奨される。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【グレーチング蓋の騒音対策】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「ガタつき防止」のゴムパッキン</h4>
          
          <p className="mb-1 text-xs ml-3">
            側溝の蓋（グレーチング）の上を車が通ると「ガチャン！」と大きな音が鳴り、近隣クレームになる。
          </p>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>ボルト固定</strong>: 蓋をボルトで固定して動かなくする。</li>
            <li><span className="mr-1">・</span><strong>落とし込みゴム</strong>: 受枠にゴムクッションが付いている「防音型」を選ぶ。</li>
          </ul>
          
          <p className="mb-2 text-xs ml-3">
            住宅地では、この騒音対策がされていないと夜間の車庫入れがストレスになる。
          </p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-8">
        {renderRecruitmentCard()}
      </div>
      <div className="mt-4">
        {<MakerRows category="外構" page="桝蓋" />}
      </div>
    </div>
  );

  const renderOtherCategory = () => (
    <div>
      <div className="mb-2">
        <h2 className="text-xl font-semibold inline">その他</h2>
        <button
          onClick={() => setShowBasicKnowledge(!showBasicKnowledge)}
          className="ml-2 align-baseline text-blue-600 hover:text-blue-800 text-[11px] underline"
        >
          <span className={`inline-block transition-transform ${showBasicKnowledge ? 'rotate-90' : ''}`}>&gt;</span> 基本知識
        </button>
        <a href="/register" className="ml-2 align-baseline text-gray-600 hover:text-gray-800 text-[11px]">掲載希望はコチラ</a>
      </div>
      
      {/* 基本知識トグル */}
      {showBasicKnowledge && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs">
          <h3 className="font-bold text-[13px] mb-1.5">【舗装材（アプローチ・テラス床）】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「乱形石（らんけいせき）」の職人技</h4>
          
          <p className="mb-1 text-xs ml-3">
            自然石をパズルのように組み合わせる石張り。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            注意点: 職人の腕によって仕上がりに雲泥の差が出る。「目地（石と石の隙間）」が均一で細いほど美しく、広すぎるとモルタルばかり目立って安っぽくなる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            雨に濡れると滑りやすくなる石種（大理石など）は避け、表面がザラザラした<strong>「滑り止め加工（バーナー仕上げ等）」</strong>がされた石を選ぶのが鉄則。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">「インターロッキング」の透水性</h4>
          
          <p className="mb-1 text-xs ml-3">
            コンクリートブロックを敷き詰める舗装。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            機能: 雨水を地面に逃がす<strong>「透水性タイプ」</strong>を選べば、水たまりができにくく、ゲリラ豪雨対策にもなる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            下地が砂決め（砂の上に置くだけ）の場合、経年で波打ったり、目地から雑草が生えたりするリスクがあるため、防草シートや固まる砂の併用が推奨される。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">「洗い出し（あらいだし）」の意匠</h4>
          
          <p className="mb-2 text-xs ml-3">
            コンクリートが固まる前に表面を洗い流し、中の砂利を見せる技法。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            和風・洋風どちらにも合い、滑り止め効果も高いが、施工直後の雨に弱く、職人の技術が必要。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【ガーデンルーム・テラス囲い】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「固定資産税」の対象になるか</h4>
          
          <p className="mb-1 text-xs ml-3">
            サンルームやガーデンルームは、3方向が壁やガラスで囲まれ、屋根があると「建物（増築）」とみなされ、固定資産税の課税対象になる場合がある。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            また、建ぺい率・容積率の制限を受けるため、敷地いっぱいに建てると違法建築になるリスクがある。事前の法規チェックが必須。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">夏場の「温室化」対策</h4>
          
          <p className="mb-1 text-xs ml-3">
            ガラスで囲まれた空間は、夏場は猛烈に暑くなる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            必須: <strong>「内部日除け（シェード）」や、屋根材に「熱線遮断ポリカ」</strong>を採用しないと、夏の間は灼熱地獄で使えないデッドスペースになる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            換気のための窓（網戸付き）も重要。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【外構照明（ライティング）】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「12V（ローボルト）」の安全性</h4>
          
          <p className="mb-1 text-xs ml-3">
            以前は100Vの照明が主流だったが、漏電リスクや資格が必要なため、現在はトランスで電圧を下げた<strong>「12Vシステム」</strong>が主流。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            メリット: 資格不要でDIYでも設置可能。万が一配線を切っても感電せず、配置換えも容易。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">植栽を魅せる「アップライト」</h4>
          
          <p className="mb-1 text-xs ml-3">
            シンボルツリーを下から照らす照明。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            配置: 樹木の真下ではなく、少し離して幹や葉の裏側を照らすと、ドラマチックな影ができる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            光害: 角度を間違えると、隣家の窓や通行人の目を直撃してトラブルになるため、フード付きや角度調整可能な器具を選ぶ。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【水栓柱（立水栓）・ガーデンパン】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「凍結防止」機能</h4>
          
          <p className="mb-1 text-xs ml-3">
            寒冷地では、冬場に水道管が凍結・破裂する。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            対策: 内部の水を抜くことができる<strong>「不凍水栓柱（ふとうすいせんちゅう）」</strong>を選ばないと、ひと冬で壊れることがある。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">使い勝手を決める「高さ」と「パン（受け皿）」</h4>
          
          <p className="mb-1 text-xs ml-3">
            高さ: 散水用なら低くても良いが、手洗いや洗い物をするなら腰高（80cm程度）がないと使いにくい。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            パン: 水跳ねを防ぐため、深さのあるパンを選ぶか、砂利を敷いて水流を和らげる工夫が必要。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【土留め（どどめ）・擁壁（ようへき）】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「ブロック塀」は土留めではない</h4>
          
          <p className="mb-1 text-xs ml-3">
            普通のコンクリートブロック（CB）は、土の圧力に耐えられる構造ではない。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            土を留める場合は、必ず強度の高い<strong>「型枠ブロック（CP）」や「擁壁（RC）」</strong>にする必要がある。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            高さ2mを超える擁壁は確認申請が必要になるなど、法規制が厳しいため、安易なDIYは危険。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【雑草対策】の重要知識</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「防草シート」のグレード</h4>
          
          <p className="mb-1 text-xs ml-3">
            砂利の下に敷くシート。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            安価な織物（クロス）タイプは、隙間からスギナなどの強害雑草が突き抜けてくる。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            推奨: 不織布タイプで厚みがあり、遮光性が高い<strong>「高耐久防草シート（ザバーン240等）」</strong>を選ばないと、数年で敷き直しになる。
          </p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-8">
        {renderRecruitmentCard()}
      </div>
      <div className="mt-4">
        {<MakerRows category="外構" page="外構その他" />}
      </div>
    </div>
  );

  const renderGenericCategory = (title: string) => (
    <div>
      {renderHeader(title)}
      <div className="flex flex-wrap gap-2 mb-8">
        {renderRecruitmentCard()}
      </div>
      <div className="mt-4">
        {renderCompanyRow('奥岡製作所', {
          products: 'https://www.okuoka.co.jp/product/',
          catalog: 'https://www.okuoka.co.jp/catalog/',
          office: 'https://www.okuoka.co.jp/company/',
          contact: 'https://www.okuoka.co.jp/contact/'
        })}
        {renderCompanyRow('ダイクレ', {
          products: 'https://www.daikure.co.jp/products/',
          catalog: '#',
          office: 'https://www.daikure.co.jp/network/',
          contact: 'https://www.daikure.co.jp/contact/'
        })}
        {renderCompanyRow('中部コーポレーション', {
          products: 'https://www.chubu-corp.co.jp/products/',
          catalog: '#',
          office: 'https://www.chubu-corp.co.jp/company/',
          contact: 'https://www.chubu-corp.co.jp/contact/'
        })}
      </div>
    </div>
  );

  const renderRainwaterInletCategory = () => (
    <div>
      <div className="mb-2">
        <h2 className="text-xl font-semibold inline">雨水桝</h2>
        <button
          onClick={() => setShowBasicKnowledge(!showBasicKnowledge)}
          className="ml-2 align-baseline text-blue-600 hover:text-blue-800 text-[11px] underline"
        >
          <span className={`inline-block transition-transform ${showBasicKnowledge ? 'rotate-90' : ''}`}>&gt;</span> 基本知識
        </button>
        <a href="/register" className="ml-2 align-baseline text-gray-600 hover:text-gray-800 text-[11px]">掲載希望はコチラ</a>
      </div>
      
      {/* 基本知識トグル */}
      {showBasicKnowledge && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs">
          <h3 className="font-bold text-[13px] mb-1.5">【塩ビ桝（小口径桝）とコンクリート桝】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「コンクリート」から「塩ビ」への進化</h4>
          
          <p className="mb-1 text-xs ml-3">
            昔はコンクリート製が主流だったが、重くて施工が大変な上、経年で継ぎ目から木の根が侵入して詰まるトラブルが多かった。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            現在: ツルツルして汚れが流れやすく、接着接合で根の侵入を防ぐ<strong>「塩ビ製小口径桝」</strong>が標準。高圧洗浄もしやすいため、リフォーム時にコンクリートから塩ビへ交換する工事も多い。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">泥を止める「溜め桝（ためます）」機能</h4>
          
          <p className="mb-1 text-xs ml-3">
            汚水桝（トイレ等）は底に溝がある「インバート桝」を使ってスムーズに流すが、雨水桝はあえて底を深くした<strong>「溜め桝（泥溜め）」</strong>を使うのが基本。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            雨と一緒に流れてきた砂や落ち葉をここで沈殿させ、配管の奥で詰まるのを防ぐ役割がある。定期的な底の掃除が必要。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【蓋（ふた）の耐荷重選定】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">駐車場で「樹脂蓋」は割れる</h4>
          
          <p className="mb-1 text-xs ml-3">
            一般的な白いプラスチック（PVC/PP）の蓋は「歩行用」。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            鉄則: 車が乗る可能性がある場所には、必ず<strong>「耐圧タイプ（車乗用）」または「鋳鉄製（マンホール）」</strong>の蓋を選定しないと、タイヤが乗った瞬間にバキッと割れて脱輪事故になる。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">「浸透（しんとう）桝」の法的義務</h4>
          
          <p className="mb-1 text-xs ml-3">
            都市部では、ゲリラ豪雨対策として、雨水を下水に流さず地面に染み込ませる<strong>「雨水浸透桝」</strong>（底や側面に穴が空いている）の設置が条例で義務付けられている地域が多い。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            自分の敷地の水はけが悪いからといって、勝手に密閉蓋に変えたりコンクリートで埋めたりすると条例違反になる場合がある。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【意匠性を高める「化粧蓋（けしょうぶた）」】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">桝を「隠す」テクニック</h4>
          
          <p className="mb-1 text-xs ml-3">
            お洒落な石畳やタイルのアプローチに、白いプラスチックの丸い蓋があると非常に目立つ。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            化粧ハッチ: 蓋の上に床と同じタイルや石を貼ることができる<strong>「フロアハッチ（化粧蓋）」</strong>を採用することで、点検機能を残しつつ、桝の存在を完全に消すことができる。高級外構の必須テクニック。
          </p>
          
          <h4 className="font-bold text-[12px] mb-1">砂利敷きの中の「砂利保護カバー」</h4>
          
          <p className="mb-1 text-xs ml-3">
            砂利の中に桝があると、蓋の上に砂利が乗って開けにくかったり、白が目立ったりする。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            蓋の上に砂利を乗せられるメッシュ状のカバーを使うと、景色に馴染ませることができる。
          </p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-8">
        {renderRecruitmentCard()}
      </div>
      <div className="mt-4">
        {<MakerRows category="外構" page="雨水桝" />}
      </div>
    </div>
  );

  const renderGratingCategory = () => (
    <div>
      <div className="mb-2">
        <h2 className="text-xl font-semibold inline">外構 グレーチング</h2>
        <button
          onClick={() => setShowBasicKnowledge(!showBasicKnowledge)}
          className="ml-2 align-baseline text-blue-600 hover:text-blue-800 text-[11px] underline"
        >
          <span className={`inline-block transition-transform ${showBasicKnowledge ? 'rotate-90' : ''}`}>&gt;</span> 基本知識
        </button>
        <a href="/register" className="ml-2 align-baseline text-gray-600 hover:text-gray-800 text-[11px]">掲載希望はコチラ</a>
      </div>
      
      {/* 基本知識トグル */}
      {showBasicKnowledge && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs">
          <h3 className="font-bold text-[13px] mb-1.5">【耐荷重（T荷重）の絶対ルール】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「T-2」と「T-14」の境界線</h4>
          
          <p className="mb-1 text-xs ml-3">
            桝蓋と同様、通過する車両の重量でランクが決まる。
          </p>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>T-2（乗用車）</strong>： 一般住宅の駐車場。2トン車まで。</li>
            <li><span className="mr-1">・</span><strong>T-14（中型トラック）</strong>: 商店の搬入口や、消防車・ゴミ収集車が入る可能性がある路地。</li>
            <li><span className="mr-1">・</span><strong>T-25（大型トラック）</strong>: 幹線道路や物流倉庫。</li>
          </ul>
          
          <p className="mb-2 text-xs ml-3">
            失敗例: 住宅だからとT-2を選んだが、引越しやリフォームのトラックが乗って「くの字」に曲がってしまう事故が多い。迷ったら<strong>「T-14」</strong>にしておくのが安全側の鉄則。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【目合い（隙間）の選び方】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「普通目（なみめ）」と「細目（さいめ）」</h4>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>普通目</strong>: 格子の隙間が30mm程度。安価で排水性が良く、ゴミも流れやすいが、ハイヒールのかかとや杖、ベビーカーのタイヤがハマる。車専用道路向け。</li>
            <li><span className="mr-1">・</span><strong>細目</strong>: 隙間が10mm程度。人が歩く場所、特にエントランスアプローチや商店街では、バリアフリー対応として<strong>「細目」が必須</strong>。</li>
          </ul>
          
          <p className="mb-2 text-xs ml-3">
            ※ただし、細目は落ち葉や泥ですぐに詰まるため、清掃頻度が高くなることを説明する必要がある。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【騒音（ガタつき）対策】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">近隣トラブルNo.1の「金属音」</h4>
          
          <p className="mb-1 text-xs ml-3">
            車が通るたびに「ガチャン！ガチャン！」と鳴る音は、深夜には響き渡り、深刻な近隣クレームになる。
          </p>
          
          <p className="mb-1 text-xs ml-3">
            対策:
          </p>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>ゴム付き</strong>: 受枠と接触する部分にゴムクッションが付いた製品を選ぶ。</li>
            <li><span className="mr-1">・</span><strong>ボルト固定</strong>: 枠と本体をボルトで固定して動かなくする（清掃時は手間）。</li>
            <li><span className="mr-1">・</span><strong>110度開閉式</strong>: コンクリートに埋め込んだ蝶番で固定されており、跳ね上がらないタイプ（ますぶた）を採用する。</li>
          </ul>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【表面加工と安全対策】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">雨の日のスリップ事故防止「ザラザラ（ノンスリップ）」</h4>
          
          <p className="mb-1 text-xs ml-3">
            フラットな金属バーは、雨に濡れると非常に滑りやすい。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            標準仕様: 外部に使う場合は、バーの表面にギザギザの刻みを入れた<strong>「ノンスリップ（セレーション）加工」</strong>付きを選ぶのが基本。これがないとバイクや自転車が転倒する原因になる。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【盗難防止対策】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「持ち去り」を防ぐ構造</h4>
          
          <p className="mb-1 text-xs ml-3">
            金属価格が高騰すると、グレーチングが盗まれる事件が多発する。
          </p>
          
          <p className="mb-2 text-xs ml-3">
            対策: ただ置くだけのタイプではなく、<strong>「鎖（チェーン）付き」</strong>にするか、ヒンジでコンクリートに固定されるタイプを選定することで、盗難抑止力となる。
          </p>
          
          <h3 className="font-bold text-[13px] mb-1.5 mt-3">【U字溝用と「かさ上げ」の違い】</h3>
          
          <h4 className="font-bold text-[12px] mb-1">「溝（みぞ）蓋」と「枡（ます）蓋」</h4>
          
          <ul className="mb-2 space-y-0.5 text-xs ml-3 list-none">
            <li><span className="mr-1">・</span><strong>U字溝用</strong>: 側溝の縁（コンクリート）に引っ掛ける「耳」がついているタイプ。</li>
            <li><span className="mr-1">・</span><strong>かさ上げ（落とし込み）</strong>: コンクリートの蓋受け部分（段差）にスッポリはめるタイプ。</li>
          </ul>
          
          <p className="mb-2 text-xs ml-3">
            リフォームや交換の際、この形状を間違えると設置できないため、現調時の寸法確認（特に耳の有無と高さ）が最重要。
          </p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-8">
        {renderRecruitmentCard()}
      </div>
      <div className="mt-4">
        {<MakerRows category="外構" page="外構グレーチング" />}
      </div>
    </div>
  );

  switch (subcategory) {
    case '縁石':
      return renderCurbstoneCategory();
    case '外構舗装':
      return renderPavementCategory();
    case '雨水桝':
      return renderRainwaterInletCategory();
    case '桝蓋':
      return renderCoverCategory();
    case '外構グレーチング':
      return renderGratingCategory();
    case '外構その他':
      return renderOtherCategory();
    default:
      return null;
  }
};

export default ExteriorInfrastructureContent; 
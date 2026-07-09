import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type PluginItem = {
  no: string;
  name: string;
  keyword: string;
  desc: string;
  icon?: string;
  compact?: boolean;
  productIcon?: boolean;
};

const plugins: PluginItem[] = [
  {
    no: '01',
    name: 'Computer Use',
    keyword: '操作电脑',
    desc: '看屏幕、点按钮、改设置，替你跑桌面软件和重复流程。',
    icon: 'icons/computer-use.png',
  },
  {
    no: '02',
    name: 'Chrome',
    keyword: '接管浏览器',
    desc: '用你的登录态查后台、看资料、操作真实网页工作流。',
    icon: 'icons/chrome.png',
  },
  {
    no: '03',
    name: 'Creative Production',
    keyword: '视觉出图',
    desc: '把 brief、产品图、活动主题变成海报、广告和视觉方向。',
    icon: 'icons/creative-production.png',
    compact: true,
  },
  {
    no: '04',
    name: 'HyperFrames',
    keyword: '网页成片',
    desc: '用 HTML 动效做标题卡、产品展示、图文转短视频。',
    icon: 'icons/hyperframes.png',
  },
  {
    no: '05',
    name: 'Figma',
    keyword: '设计到代码',
    desc: '读取设计稿、组件和样式，辅助生成可修改的前端页面。',
    icon: 'icons/figma.png',
  },
  {
    no: '06',
    name: 'Product Design',
    keyword: '想法成原型',
    desc: '把一句产品想法拆成页面结构、交互草图和功能流。',
    productIcon: true,
  },
  {
    no: '07',
    name: 'Browser',
    keyword: '网页自测',
    desc: '打开本地网页，截图验收按钮、表单、跳转和响应式布局。',
    icon: 'icons/browser.png',
  },
  {
    no: '08',
    name: 'Spreadsheets',
    keyword: '表格会算',
    desc: '生成 Excel，清洗数据，加公式、图表、统计和指标解读。',
    icon: 'icons/spreadsheets.png',
  },
  {
    no: '09',
    name: 'Presentations',
    keyword: '一键出 PPT',
    desc: '把大纲和素材做成可编辑 PPT，适合汇报初稿和课程页。',
    icon: 'icons/presentations.png',
  },
  {
    no: '10',
    name: 'GitHub',
    keyword: '仓库里干活',
    desc: '看 PR、Issue、CI 报错，帮你定位问题并处理协作流程。',
    icon: 'icons/github.png',
  },
];

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const t = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    ...clamp,
    easing: ease,
  });

const ProductIcon = () => (
  <svg viewBox="0 0 96 96" width="76" height="76" aria-hidden="true">
    <rect x="12" y="12" width="72" height="72" rx="20" fill="#EEF2FF" />
    <rect
      x="26"
      y="26"
      width="44"
      height="44"
      rx="8"
      fill="#FFFFFF"
      stroke="#7C3AED"
      strokeWidth="6"
    />
    <path d="M26 40H70M40 26V70M56 26V70" stroke="#A855F7" strokeWidth="5" />
  </svg>
);

const Icon = ({item}: {item: PluginItem}) => (
  <div style={styles.iconBox}>
    {item.productIcon ? (
      <ProductIcon />
    ) : (
      <Img src={staticFile(item.icon ?? '')} style={styles.iconImage} />
    )}
  </div>
);

const Card = ({item, index}: {item: PluginItem; index: number}) => {
  const frame = useCurrentFrame();
  const inStart = 42 + index * 10;
  const enter = t(frame, inStart, inStart + 24);
  const focusStart = 170 + index * 3;
  const focus = interpolate(frame, [focusStart, focusStart + 18, focusStart + 42], [0, 1, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const y = interpolate(enter, [0, 1], [42, 0]);
  const scale = interpolate(enter, [0, 1], [0.965, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const accentOpacity = interpolate(enter, [0, 1], [0.35, 1]);

  return (
    <div
      style={{
        ...styles.card,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        boxShadow: `0 ${22 + focus * 8}px ${48 + focus * 26}px rgba(37, 99, 235, ${
          0.08 + focus * 0.09
        })`,
        borderColor: focus > 0 ? `rgba(37, 99, 235, ${0.22 + focus * 0.22})` : '#dbe8ff',
      }}
    >
      <div
        style={{
          ...styles.cardAccent,
          opacity: accentOpacity,
          width: 8 + focus * 4,
        }}
      />
      <div style={styles.cardHeader}>
        <Icon item={item} />
        <div style={styles.headerText}>
          <div style={styles.rank}>No.{item.no}</div>
          <div style={{...styles.name, fontSize: item.compact ? 29 : 32}}>{item.name}</div>
        </div>
      </div>
      <div style={styles.keyword}>{item.keyword}</div>
      <div style={styles.desc}>{item.desc}</div>
    </div>
  );
};

const styles = {
  fill: {
    fontFamily:
      'Inter, "SF Pro Display", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif',
    color: '#0f172a',
    background:
      'linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px), radial-gradient(circle at 88% 14%, rgba(37,99,235,0.22), transparent 34%), radial-gradient(circle at 10% 86%, rgba(14,165,233,0.15), transparent 32%), linear-gradient(180deg, #f8fbff 0%, #edf5ff 100%)',
    backgroundSize: '56px 56px, 56px 56px, auto, auto, auto',
  },
  canvasShade: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 36%, rgba(219,234,254,0.18) 100%)',
  },
  brand: {
    position: 'absolute',
    right: 64,
    top: 62,
    color: '#2563eb',
    fontSize: 23,
    fontWeight: 900,
  },
  content: {
    position: 'absolute',
    inset: '70px 60px 58px',
  },
  titleWrap: {
    paddingTop: 28,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    whiteSpace: 'nowrap',
  },
  title: {
    margin: 0,
    fontSize: 68,
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: 0,
  },
  topBadge: {
    padding: '15px 20px 17px',
    borderRadius: 32,
    background: '#111827',
    color: '#fff',
    fontSize: 50,
    lineHeight: 1,
    fontWeight: 950,
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.2)',
  },
  subtitle: {
    display: 'inline-block',
    marginTop: 26,
    padding: '16px 25px',
    borderRadius: 999,
    border: '1px solid rgba(37,99,235,0.16)',
    background: 'rgba(255,255,255,0.8)',
    color: '#475569',
    fontSize: 26,
    lineHeight: 1.2,
    fontWeight: 850,
    boxShadow: '0 20px 56px rgba(37, 99, 235, 0.08)',
  },
  board: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 255,
    bottom: 76,
    padding: 34,
    borderRadius: 60,
    background: 'rgba(255,255,255,0.84)',
    border: '1px solid rgba(37,99,235,0.16)',
    boxShadow: '0 60px 160px rgba(37,99,235,0.16)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 18,
    height: '100%',
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 252,
    padding: '25px 24px 21px',
    borderRadius: 36,
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
    border: '2px solid #dbe8ff',
  },
  cardAccent: {
    position: 'absolute',
    inset: '0 auto 0 0',
    background: 'linear-gradient(180deg, #2563eb, #60a5fa)',
  },
  cardHeader: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    minWidth: 0,
  },
  iconBox: {
    width: 76,
    height: 76,
    flex: '0 0 auto',
    borderRadius: 28,
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden',
    background: '#fff',
    border: '1px solid #e3ebff',
    boxShadow: '0 18px 36px rgba(15, 23, 42, 0.09)',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
    padding: 7,
  },
  headerText: {
    minWidth: 0,
  },
  rank: {
    color: '#2563eb',
    fontSize: 21,
    lineHeight: 1,
    fontWeight: 950,
  },
  name: {
    marginTop: 8,
    color: '#111827',
    lineHeight: 1.03,
    fontWeight: 950,
    overflowWrap: 'anywhere' as const,
  },
  keyword: {
    position: 'relative',
    zIndex: 1,
    marginTop: 20,
    color: '#2563eb',
    fontSize: 30,
    lineHeight: 1,
    fontWeight: 950,
  },
  desc: {
    position: 'relative',
    zIndex: 1,
    marginTop: 13,
    color: '#475569',
    fontSize: 22,
    lineHeight: 1.28,
    fontWeight: 780,
  },
} satisfies Record<string, React.CSSProperties>;

export const PluginTop10 = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = t(frame, 0, 32);
  const titleHoldScale = interpolate(frame, [0, 90, 280, 360], [1.04, 1, 1, 1.012], clamp);
  const titleY = interpolate(titleIn, [0, 1], [-36, 0]);
  const boardIn = t(frame, 24, 56);
  const boardY = interpolate(boardIn, [0, 1], [70, 0]);
  const boardOpacity = interpolate(boardIn, [0, 1], [0, 1]);
  const sweep = interpolate(frame, [120, 250], [-420, 1120], clamp);
  const endGlow = interpolate(frame, [270, 335], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill style={styles.fill}>
      <div style={styles.canvasShade} />
      <div
        style={{
          position: 'absolute',
          width: 680,
          height: 680,
          right: -230,
          top: -190,
          borderRadius: 999,
          background: 'rgba(37,99,235,0.08)',
          filter: 'blur(12px)',
          opacity: 0.75,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 680,
          height: 680,
          left: -270,
          bottom: -220,
          borderRadius: 999,
          background: 'rgba(14,165,233,0.08)',
          filter: 'blur(14px)',
        }}
      />
      <div style={styles.brand}>YOUR BRAND</div>
      <div style={styles.content}>
        <div
          style={{
            ...styles.titleWrap,
            opacity: titleIn,
            transform: `translateY(${titleY}px) scale(${titleHoldScale})`,
            transformOrigin: 'left top',
          }}
        >
          <div style={styles.titleRow}>
            <h1 style={styles.title}>Codex 必备插件</h1>
            <div style={styles.topBadge}>TOP 10</div>
          </div>
          <div
            style={{
              ...styles.subtitle,
              opacity: t(frame, 18, 44),
              transform: `translateX(${interpolate(t(frame, 18, 44), [0, 1], [-18, 0])}px)`,
            }}
          >
            把网页、设计、表格、PPT、仓库和电脑操作都交给 Agent
          </div>
        </div>
        <div
          style={{
            ...styles.board,
            opacity: boardOpacity,
            transform: `translateY(${boardY}px)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: sweep,
              width: 210,
              transform: 'skewX(-18deg)',
              background:
                'linear-gradient(90deg, transparent, rgba(96,165,250,0.22), transparent)',
              opacity: frame > 116 && frame < 255 ? 1 : 0,
            }}
          />
          <div style={styles.grid}>
            {plugins.map((item, index) => (
              <Card key={item.no} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          boxShadow: `inset 0 0 0 ${Math.round(20 + endGlow * 4)}px rgba(255,255,255,${
            0.32 + endGlow * 0.18
          })`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 60,
          bottom: 42,
          color: '#64748b',
          fontSize: 21,
          fontWeight: 850,
          opacity: interpolate(frame, [8 * fps, 9 * fps], [0, 1], clamp),
        }}
      >
        Codex 插件清单
      </div>
    </AbsoluteFill>
  );
};

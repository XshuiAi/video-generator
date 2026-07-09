import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

type IconItem = {
  name: string;
  src: string;
  layer: 'inner' | 'outer';
  angle: number;
  size: number;
  focus?: boolean;
};

type OverviewItem = {
  name: string;
  keyword: string;
  desc: string;
  src: string;
};

const icons: IconItem[] = [
  {name: 'Computer Use', src: 'icons/computer-use.png', layer: 'inner', angle: -70, size: 90, focus: true},
  {name: 'Chrome', src: 'icons/chrome.png', layer: 'inner', angle: -25, size: 78, focus: true},
  {name: 'Browser', src: 'icons/browser.png', layer: 'inner', angle: 20, size: 76, focus: true},
  {name: 'GitHub', src: 'icons/github.png', layer: 'inner', angle: 65, size: 74, focus: true},
  {name: 'Product Design', src: 'icons/product-design.png', layer: 'inner', angle: 112, size: 78, focus: true},
  {name: 'Figma', src: 'icons/figma.png', layer: 'inner', angle: 158, size: 76, focus: true},
  {name: 'Creative Production', src: 'icons/creative-production.png', layer: 'inner', angle: 205, size: 78, focus: true},
  {name: 'HyperFrames', src: 'icons/hyperframes.png', layer: 'inner', angle: 252, size: 82, focus: true},
  {name: 'Spreadsheets', src: 'icons/spreadsheets.png', layer: 'inner', angle: 300, size: 78, focus: true},
  {name: 'Presentations', src: 'icons/presentations.png', layer: 'inner', angle: 338, size: 78, focus: true},
  {name: 'Remotion', src: 'icons/remotion.png', layer: 'outer', angle: -92, size: 70},
  {name: 'Vercel', src: 'icons/vercel.png', layer: 'outer', angle: -48, size: 66},
  {name: 'Canva', src: 'icons/canva.png', layer: 'outer', angle: -2, size: 72},
  {name: 'Documents', src: 'icons/documents.png', layer: 'outer', angle: 42, size: 68},
  {name: 'PDF', src: 'icons/pdf.png', layer: 'outer', angle: 89, size: 66},
  {name: 'BioRender', src: 'icons/biorender.png', layer: 'outer', angle: 141, size: 66},
  {name: 'Slack', src: 'icons/slack.png', layer: 'outer', angle: 178, size: 66},
  {name: 'Data Analytics', src: 'icons/data-analytics.png', layer: 'outer', angle: 216, size: 68},
  {name: 'Linear', src: 'icons/linear.png', layer: 'outer', angle: 248, size: 66},
  {name: 'NVIDIA', src: 'icons/nvidia.png', layer: 'outer', angle: 282, size: 66},
  {name: 'OpenAI Developer', src: 'icons/openai-developer.png', layer: 'outer', angle: 318, size: 68},
  {name: 'Gmail', src: 'icons/gmail.png', layer: 'outer', angle: 346, size: 70},
];

const topTen: OverviewItem[] = [
  {name: 'Computer Use', keyword: '直接操作电脑', desc: '看屏幕、点按钮、改设置，替你跑桌面软件和重复流程。', src: 'icons/computer-use.png'},
  {name: 'Chrome', keyword: '接管真实浏览器', desc: '沿用登录状态，查后台、看资料、操作真实网页工作流。', src: 'icons/chrome.png'},
  {name: 'Creative Production', keyword: '创意视觉出图', desc: '把 brief、产品图和活动主题变成海报、广告与视觉方向。', src: 'icons/creative-production.png'},
  {name: 'HyperFrames', keyword: '网页动效成片', desc: '用 HTML 动效制作标题卡、产品展示和图文短视频。', src: 'icons/hyperframes.png'},
  {name: 'Figma', keyword: '设计稿到代码', desc: '读取组件、样式和页面结构，辅助生成可修改的前端页面。', src: 'icons/figma.png'},
  {name: 'Product Design', keyword: '想法快速成原型', desc: '把产品想法拆成页面结构、交互草图与完整功能流。', src: 'icons/product-design.png'},
  {name: 'Browser', keyword: '网页自动验收', desc: '打开本地网页，截图检查按钮、表单、跳转和响应式布局。', src: 'icons/browser.png'},
  {name: 'Spreadsheets', keyword: '表格自动处理', desc: '生成 Excel、清洗数据、添加公式图表并解读关键指标。', src: 'icons/spreadsheets.png'},
  {name: 'Presentations', keyword: '一键生成 PPT', desc: '把大纲和素材做成可编辑演示文稿、汇报初稿与课程页。', src: 'icons/presentations.png'},
  {name: 'GitHub', keyword: '仓库协作自动化', desc: '查看 PR、Issue 和 CI 报错，定位问题并推进代码协作。', src: 'icons/github.png'},
];

const fontFamily =
  'Inter, "SF Pro Display", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif';

const orbitLabels = [
  {text: 'Automate', angle: -70, radius: 345, layer: 'inner'},
  {text: 'Create', angle: -22, radius: 510, layer: 'outer'},
  {text: 'Review', angle: 28, radius: 365, layer: 'inner'},
  {text: 'Design', angle: 82, radius: 500, layer: 'outer'},
  {text: 'Deploy', angle: 138, radius: 382, layer: 'inner'},
  {text: 'Sheets', angle: 196, radius: 505, layer: 'outer'},
  {text: 'Slides', angle: 252, radius: 360, layer: 'inner'},
  {text: 'Agent', angle: 315, radius: 492, layer: 'outer'},
];

const particles = Array.from({length: 168}, (_, i) => {
  const angle = (i * 137.508) % 360;
  const radius = 120 + ((i * 37) % 560);
  return {
    angle,
    radius,
    size: 2 + (i % 5),
    delay: (i % 17) * 3,
    opacity: 0.18 + (i % 7) * 0.04,
  };
});

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.45, 0, 0.55, 1);

const progress = (frame: number, start: number, end: number, easing = easeOut) =>
  interpolate(frame, [start, end], [0, 1], {
    ...clamp,
    easing,
  });

const Background = () => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(circle at 18% 50%, rgba(56,189,248,0.16), transparent 27%), radial-gradient(circle at 82% 20%, rgba(37,99,235,0.11), transparent 28%), linear-gradient(180deg, #fbfdff 0%, #eef7ff 100%)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.08))',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: -180,
        top: 120,
        width: 560,
        height: 560,
        borderRadius: 999,
        background: 'rgba(14,165,233,0.11)',
        filter: 'blur(18px)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: -150,
        bottom: -190,
        width: 620,
        height: 620,
        borderRadius: 999,
        background: 'rgba(37,99,235,0.1)',
        filter: 'blur(20px)',
      }}
    />
  </AbsoluteFill>
);

const ParticleField = ({cx, cy, shift, fade}: {cx: number; cy: number; shift: number; fade: number}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {particles.map((p, i) => {
        const spin = frame * 0.56 + p.angle;
        const rad = (spin * Math.PI) / 180;
        const pulse = Math.sin((frame + p.delay) / 16) * 0.35 + 0.65;
        const orbitPull = interpolate(shift, [0, 1], [1, 0.55]);
        const x = cx + Math.cos(rad) * p.radius * orbitPull;
        const y = cy + Math.sin(rad) * p.radius * orbitPull * 0.68;
        return (
          <div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: 999,
              background: i % 3 === 0 ? '#38bdf8' : '#2563eb',
              opacity: p.opacity * pulse * fade,
              boxShadow: '0 0 18px rgba(56,189,248,0.7)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </>
  );
};

const OrbitIcon = ({item, index, cx, cy, move, outro, fade}: {item: IconItem; index: number; cx: number; cy: number; move: number; outro: number; fade: number}) => {
  const frame = useCurrentFrame();
  const appear = progress(frame, 5 + index * 3, 60 + index * 2);
  const scatterRadius = item.layer === 'inner' ? 690 : 820;
  const orbitRadius = item.layer === 'inner' ? 292 : 430;
  const rotationSpeed = item.layer === 'inner' ? 1.28 : -0.92;
  const exitBoost = interpolate(outro, [0, 1], [1, 1.65]);
  const angle = item.angle + frame * rotationSpeed;
  const rad = (angle * Math.PI) / 180;
  const depth = (Math.sin(rad) + 1) / 2;
  const orbitStretch = interpolate(move, [0, 1], [1.08, 0.88]) * interpolate(outro, [0, 1], [1, 1.14]);
  const targetX = cx + Math.cos(rad) * orbitRadius * orbitStretch;
  const targetY = cy + Math.sin(rad) * orbitRadius * 0.54 * orbitStretch;
  const startRad = ((item.angle * 2.7 + 55) * Math.PI) / 180;
  const startX = 960 + Math.cos(startRad) * scatterRadius;
  const startY = 540 + Math.sin(startRad) * scatterRadius * 0.6;
  const x = interpolate(appear, [0, 1], [startX, targetX]);
  const y = interpolate(appear, [0, 1], [startY, targetY]);
  const scale = interpolate(depth, [0, 1], [0.84, 1.28]) * interpolate(move, [0, 1], [1.14, 0.82]) * interpolate(outro, [0, 1], [1, 0.92]) * 1.08;
  const blur = interpolate(depth, [0, 1], [1.1, 0]);
  const opacity = interpolate(appear, [0, 1], [0, item.layer === 'inner' ? 1 : 0.9]) * interpolate(outro, [0, 1], [1, 0.32]) * fade;
  const size = item.size * scale;
  const trailCount = item.focus ? 3 : 2;
  const trailStep = item.layer === 'inner' ? 13 : -12;

  return (
    <>
      {Array.from({length: trailCount}, (_, i) => {
        const trailAngle = angle - trailStep * (i + 1) * exitBoost;
        const trailRad = (trailAngle * Math.PI) / 180;
        const trailX = cx + Math.cos(trailRad) * orbitRadius * orbitStretch;
        const trailY = cy + Math.sin(trailRad) * orbitRadius * 0.54 * orbitStretch;
        const trailScale = scale * (1 - i * 0.07);
        return (
          <div
            key={`${item.name}-trail-${i}`}
            style={{
              position: 'absolute',
              left: interpolate(appear, [0, 1], [startX, trailX]),
              top: interpolate(appear, [0, 1], [startY, trailY]),
              width: item.size * trailScale,
              height: item.size * trailScale,
              borderRadius: 24 * trailScale,
              transform: 'translate(-50%, -50%)',
              opacity: opacity * (0.18 - i * 0.045),
              filter: `blur(${3 + i * 2}px)`,
              zIndex: Math.round(depth * 100) - 4 - i,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.8)',
            }}
          >
            <Img src={staticFile(item.src)} style={{width: '100%', height: '100%', objectFit: 'contain', padding: item.name === 'Vercel' ? 15 : 8}} />
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: 24 * scale,
          transform: `translate(-50%, -50%) rotate(${interpolate(outro, [0, 1], [0, item.layer === 'inner' ? 8 : -8])}deg)`,
          opacity,
          filter: `blur(${blur}px)`,
          zIndex: Math.round(depth * 100) + (item.focus ? 20 : 0),
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: -20,
            borderRadius: 999,
            background: 'rgba(56,189,248,0.19)',
            filter: 'blur(12px)',
            opacity: item.focus ? 0.95 : 0.52,
          }}
        />
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 24 * scale,
            background: 'rgba(255,255,255,0.95)',
            border: '1px solid rgba(37,99,235,0.16)',
            boxShadow: `0 ${16 + depth * 20}px ${38 + depth * 34}px rgba(15,23,42,${0.09 + depth * 0.09})`,
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Img src={staticFile(item.src)} style={{width: '100%', height: '100%', objectFit: 'contain', padding: item.name === 'Vercel' ? 15 : 8}} />
        </div>
      </div>
    </>
  );
};

const OrbitLabels = ({cx, cy, shift, fade, outro}: {cx: number; cy: number; shift: number; fade: number; outro: number}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {orbitLabels.map((label, index) => {
        const appear = progress(frame, 34 + index * 4, 82 + index * 3);
        const speed = label.layer === 'inner' ? 0.8 : -0.58;
        const angle = label.angle + frame * speed + outro * 42;
        const rad = (angle * Math.PI) / 180;
        const radius = label.radius * interpolate(shift, [0, 1], [1, 0.82]) * interpolate(outro, [0, 1], [1, 1.1]);
        const x = cx + Math.cos(rad) * radius;
        const y = cy + Math.sin(rad) * radius * 0.48;
        const front = (Math.sin(rad) + 1) / 2;
        return (
          <div
            key={label.text}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${interpolate(front, [0, 1], [-13, 12])}deg) scale(${interpolate(front, [0, 1], [0.82, 1.08])})`,
              padding: '8px 16px 9px',
              borderRadius: 999,
              color: index % 3 === 0 ? '#0f172a' : '#2563eb',
              background: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(37,99,235,0.13)',
              boxShadow: '0 18px 42px rgba(37,99,235,0.11)',
              fontSize: 20,
              fontWeight: 900,
              opacity: appear * fade * interpolate(outro, [0, 1], [0.9, 0.28]) * interpolate(front, [0, 1], [0.38, 0.78]),
              fontFamily,
              zIndex: Math.round(front * 70),
            }}
          >
            {label.text}
          </div>
        );
      })}
    </>
  );
};

const OrbitCluster = () => {
  const frame = useCurrentFrame();
  const shift = progress(frame, 104, 150, easeInOut);
  const overview = progress(frame, 196, 214, easeInOut);
  const signature = progress(frame, 360, 402, easeInOut);
  const shiftedCx = interpolate(shift, [0, 1], [960, 590]);
  const cx = interpolate(signature, [0, 1], [shiftedCx, 910]);
  const cy = interpolate(signature, [0, 1], [540, 522]);
  const clusterScale = interpolate(shift, [0, 1], [1.04, 0.84]) * interpolate(signature, [0, 1], [1, 0.76]);
  const orbitVisibility = interpolate(overview, [0, 1], [1, 0]) + signature;
  const clusterOpacity = interpolate(overview, [0, 1], [1, 0]) + signature * 0.36;
  const sweep = interpolate(frame, [112, 164], [-360, 2120], clamp);

  return (
    <>
      <ParticleField cx={cx} cy={cy} shift={shift} fade={clusterOpacity} />
      <OrbitLabels cx={cx} cy={cy} shift={shift} fade={clusterOpacity} outro={signature} />
      <div
        style={{
          position: 'absolute',
          left: cx,
          top: cy,
          width: 720 * clusterScale,
          height: 720 * clusterScale,
          transform: 'translate(-50%, -50%)',
          borderRadius: 999,
          border: '1px solid rgba(37,99,235,0.14)',
          opacity: clusterOpacity * 0.65,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: cx,
          top: cy,
          width: 430 * clusterScale,
          height: 430 * clusterScale,
          transform: 'translate(-50%, -50%)',
          borderRadius: 999,
          border: '1px solid rgba(56,189,248,0.26)',
          boxShadow: '0 0 70px rgba(56,189,248,0.18)',
          opacity: clusterOpacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: cx,
          top: cy,
          width: 118 * clusterScale,
          height: 118 * clusterScale,
          transform: 'translate(-50%, -50%)',
          borderRadius: 999,
          background: 'radial-gradient(circle, rgba(56,189,248,0.32), rgba(37,99,235,0.08) 58%, transparent)',
          filter: 'blur(2px)',
          opacity: clusterOpacity,
        }}
      />
      {icons.map((item, index) => (
        <OrbitIcon key={item.name} item={item} index={index} cx={cx} cy={cy} move={shift} outro={signature} fade={orbitVisibility} />
      ))}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: sweep,
          width: 220,
          transform: 'skewX(-18deg)',
          background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.22), transparent)',
          opacity: frame > 112 && frame < 166 ? 1 : 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: interpolate(frame, [208, 244], [-520, 2100], clamp),
          width: 360,
          transform: 'skewX(-16deg)',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.18), rgba(56,189,248,0.34), transparent)',
          filter: 'blur(1px)',
          opacity: frame > 208 && frame < 244 ? 1 : 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: interpolate(frame, [346, 390], [-560, 2140], clamp),
          width: 420,
          transform: 'skewX(-18deg)',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.12), rgba(56,189,248,0.38), transparent)',
          filter: 'blur(2px)',
          opacity: frame > 346 && frame < 390 ? 1 : 0,
        }}
      />
    </>
  );
};

const TitleScene = () => {
  const frame = useCurrentFrame();
  const blockIn = progress(frame, 122, 158);
  const topIn = progress(frame, 148, 176);
  const subIn = progress(frame, 160, 190);
  const out = progress(frame, 186, 208, easeInOut);

  return (
    <div
      style={{
        position: 'absolute',
        left: 1060,
        top: 265,
        width: 650,
        opacity: (1 - out) * blockIn,
        transform: `translateX(${interpolate(blockIn, [0, 1], [70, 0])}px)`,
      }}
    >
      <div
        style={{
          color: '#2563eb',
          fontSize: 27,
          fontWeight: 950,
          fontFamily,
          letterSpacing: 0,
          marginBottom: 22,
        }}
      >
        Codex 插件清单
      </div>
      <div
        style={{
          color: '#0f172a',
          fontSize: 102,
          lineHeight: 1.05,
          fontWeight: 1000,
          letterSpacing: 0,
          fontFamily,
        }}
      >
        Codex
        <br />
        必备插件
      </div>
      <div
        style={{
          marginTop: 28,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 20,
          opacity: topIn,
          transform: `translateY(${interpolate(topIn, [0, 1], [24, 0])}px)`,
        }}
      >
        <span
          style={{
            padding: '15px 24px 17px',
            borderRadius: 28,
            background: '#111827',
            color: '#fff',
            fontSize: 70,
            lineHeight: 1,
            fontWeight: 1000,
            fontFamily,
            boxShadow: '0 22px 56px rgba(15,23,42,0.22)',
          }}
        >
          Top 10
        </span>
        <span
          style={{
            width: 78,
            height: 6,
            borderRadius: 999,
            background: '#38bdf8',
            boxShadow: '0 0 24px rgba(56,189,248,0.65)',
          }}
        />
      </div>
      <div
        style={{
          marginTop: 30,
          color: '#475569',
          fontSize: 28,
          lineHeight: 1.35,
          fontWeight: 820,
          opacity: subIn,
          fontFamily,
        }}
      >
        从操作电脑到设计、表格、PPT 和代码协作，把 Agent 能力接进真实工作流。
      </div>
    </div>
  );
};

const SignatureScene = () => {
  const frame = useCurrentFrame();
  const enter = progress(frame, 368, 406, easeInOut);
  const pulse = Math.sin(frame / 18) * 0.5 + 0.5;
  const dots = Array.from({length: 34}, (_, i) => {
    const angle = (i * 137.5 + frame * 0.18) % 360;
    const r = 180 + (i % 6) * 32;
    const rad = (angle * Math.PI) / 180;
    return {
      x: 960 + Math.cos(rad) * r,
      y: 520 + Math.sin(rad) * r * 0.42,
      size: 3 + (i % 4),
      opacity: 0.12 + (i % 5) * 0.07,
    };
  });

  return (
    <div style={{position: 'absolute', inset: 0, opacity: enter}}>
      {dots.map((d, i) => (
        <div
          key={`signature-dot-${i}`}
          style={{
            position: 'absolute',
            left: interpolate(enter, [0, 1], [960, d.x]),
            top: interpolate(enter, [0, 1], [540, d.y]),
            width: d.size,
            height: d.size,
            borderRadius: 999,
            background: i % 2 ? '#2563eb' : '#38bdf8',
            opacity: d.opacity * enter * (0.7 + pulse * 0.3),
            boxShadow: '0 0 18px rgba(56,189,248,0.6)',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 410,
          transform: `translate(-50%, ${interpolate(enter, [0, 1], [28, 0])}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: '#2563eb',
            fontSize: 32,
            fontWeight: 950,
            marginBottom: 22,
            fontFamily,
          }}
        >
          AI科技博主
        </div>
        <div
          style={{
            color: '#0f172a',
            fontSize: 130,
            lineHeight: 1,
            fontWeight: 1000,
            letterSpacing: 0,
            textShadow: '0 22px 70px rgba(37,99,235,0.14)',
            fontFamily,
          }}
        >
          YOUR BRAND
        </div>
        <div
          style={{
            margin: '30px auto 0',
            width: 240,
            height: 7,
            borderRadius: 999,
            background: 'linear-gradient(90deg, #2563eb, #38bdf8)',
            boxShadow: '0 0 32px rgba(56,189,248,0.55)',
          }}
        />
      </div>
    </div>
  );
};

const OverviewCard = ({item, index, sceneOut}: {item: OverviewItem; index: number; sceneOut: number}) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, 220 + index * 4, 242 + index * 4);
  const column = index % 5;
  const row = Math.floor(index / 5);
  const direction = column < 2 ? -1 : column > 2 ? 1 : 0;
  const x = interpolate(enter, [0, 1], [direction * 46, 0]);
  const y = interpolate(enter, [0, 1], [row === 0 ? -34 : 34, 0]);
  const exitX = interpolate(sceneOut, [0, 1], [0, (2 - column) * 86]);
  const exitY = interpolate(sceneOut, [0, 1], [0, row === 0 ? 90 : -90]);
  const scale = interpolate(enter, [0, 1], [0.9, 1]) * interpolate(sceneOut, [0, 1], [1, 0.72]);

  return (
    <div
      style={{
        position: 'relative',
        minWidth: 0,
        padding: '24px 24px 22px',
        borderRadius: 26,
        border: '1px solid rgba(37,99,235,0.18)',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(244,249,255,0.96))',
        boxShadow: '0 22px 56px rgba(37,99,235,0.11)',
        opacity: enter * (1 - sceneOut),
        transform: `translate(${x + exitX}px, ${y + exitY}px) scale(${scale})`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -34,
          bottom: -44,
          width: 120,
          height: 120,
          borderRadius: 999,
          background: 'rgba(37,99,235,0.07)',
        }}
      />
      <div style={{display: 'flex', alignItems: 'center', gap: 15, minWidth: 0}}>
        <div
          style={{
            width: 66,
            height: 66,
            flex: '0 0 auto',
            borderRadius: 19,
            display: 'grid',
            placeItems: 'center',
            background: '#fff',
            border: '1px solid rgba(37,99,235,0.14)',
            boxShadow: '0 12px 28px rgba(15,23,42,0.1)',
            overflow: 'hidden',
          }}
        >
          <Img src={staticFile(item.src)} style={{width: '100%', height: '100%', objectFit: 'contain', padding: 6}} />
        </div>
        <div style={{minWidth: 0}}>
          <div style={{color: '#2563eb', fontSize: 17, lineHeight: 1, fontWeight: 950, fontFamily}}>No.{String(index + 1).padStart(2, '0')}</div>
          <div
            style={{
              marginTop: 7,
              color: '#0f172a',
              fontSize: item.name.length > 18 ? 24 : 27,
              lineHeight: 1.02,
              fontWeight: 1000,
              fontFamily,
              overflowWrap: 'anywhere',
            }}
          >
            {item.name}
          </div>
        </div>
      </div>
      <div style={{marginTop: 20, color: '#2563eb', fontSize: 27, lineHeight: 1.05, fontWeight: 1000, fontFamily}}>{item.keyword}</div>
      <div style={{marginTop: 12, color: '#475569', fontSize: 19, lineHeight: 1.38, fontWeight: 760, fontFamily}}>{item.desc}</div>
    </div>
  );
};

const PluginOverviewScene = () => {
  const frame = useCurrentFrame();
  const sceneIn = progress(frame, 212, 234, easeInOut);
  const sceneOut = progress(frame, 340, 374, easeInOut);
  const titleIn = progress(frame, 214, 234);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '52px 58px 48px',
        opacity: sceneIn,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          opacity: (1 - sceneOut) * titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [-24, 0])}px)`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'baseline', gap: 22}}>
          <div style={{color: '#0f172a', fontSize: 62, lineHeight: 1, fontWeight: 1000, fontFamily}}>Codex 必备插件</div>
          <div style={{color: '#2563eb', fontSize: 62, lineHeight: 1, fontWeight: 1000, fontFamily}}>TOP 10</div>
        </div>
        <div style={{color: '#64748b', fontSize: 22, lineHeight: 1, fontWeight: 850, fontFamily}}>从电脑操作到内容生产，一张图快速看懂</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 18,
          height: 790,
          marginTop: 38,
        }}
      >
        {topTen.map((item, index) => (
          <OverviewCard key={item.name} item={item} index={index} sceneOut={sceneOut} />
        ))}
      </div>
    </div>
  );
};

export const OrbitOpener = () => {
  return (
    <AbsoluteFill style={{fontFamily}}>
      <Background />
      <OrbitCluster />
      <TitleScene />
      <PluginOverviewScene />
      <SignatureScene />
    </AbsoluteFill>
  );
};

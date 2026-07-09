# Production Workflow

## 1. Source Intake

Accept URLs, Feishu documents, local files, scripts, raw notes, screenshots, images, and reference videos. Make an inventory before writing scenes:

- source sections and their hierarchy;
- claims, examples, numbers, and calls to action;
- images or screenshots that prove each claim;
- assets that must be downloaded locally;
- missing facts that would make a scene misleading.

For long documents, summarize and restructure. Do not animate the article paragraph by paragraph.

## 2. Production Brief

Record these decisions in the project README or `DESIGN.md`:

- audience and publishing platform;
- output type: opener, insert, tutorial, ranked list, or complete explainer;
- ratio: `9:16`, `3:4`, `16:9`, or another explicit format;
- target duration and pace;
- visual references and what to borrow from each;
- audio, voice-over, captions, branding, and CTA requirements.

When the user is undecided, ask for the missing brief in one compact pass:

```text
我先确认 5 个制作参数：
1. 内容是什么？可以给链接、文档、脚本、标题或一段原始想法。
2. 素材有哪些？比如截图、Logo、产品图、人物图、参考视频。
3. 画幅选横屏 16:9、竖屏 9:16、3:4，还是其他？
4. 配色想要哪种？默认我用蓝白科技感。
5. 先看 3 张静态关键帧，还是直接渲染视频？
```

Propose two or three static directions when color, layout, or density is the main decision. Do not spend a full render to compare colors or layouts.

### Default Style

Default to blue-white technology styling when no palette is specified:

- white or very light blue background;
- black primary title;
- blue/cyan accent for numbers, glows, sweeps, particles, and active states;
- real icons and screenshots instead of abstract placeholder graphics;
- quiet shadows and readable cards, not dark sci-fi unless the topic calls for it.

### Aspect Ratio Guidance

- Use `16:9` for horizontal YouTube/Bilibili intros, product explainers, course inserts, and shareable keynote-style videos.
- Use `9:16` for Douyin, Xiaohongshu, Shorts, Reels, vertical rankings, and phone-first tutorials.
- Use `3:4` when the user wants a compact vertical social post that does not feel as tall as `9:16`.
- If a dense list cannot read well in one vertical frame, split it into scenes but never render internal labels like “前 6 个 / 后 4 个”.

## 3. Content Map

Convert source material into a scene table:

| Scene | Message | Evidence asset | On-screen copy | Motion purpose | Duration |
| --- | --- | --- | --- | --- | --- |
| 01 | Hook/title | icon field | one strong title | establish topic | 2-4s |
| 02 | Core point | screenshot | claim + proof | explain | 4-7s |
| 03 | Summary | selected items | concise recap | hold/close | 3-5s |

Every scene should answer one question. Use the evidence image next to the claim it supports.

## 4. Static Approval Gate

Create at least three static keyframes:

1. opening/title;
2. densest information scene;
3. representative final state of the strongest motion beat.

Check hierarchy, information density, icon/image quality, mobile readability, and external-facing copy. Pause for approval unless the user explicitly waives this gate.

## 5. Motion Plan

For each transition, state its narrative job. Reusable motion beats include:

- staggered card entrance;
- icon orbit with depth, blur, trails, and counter-rotation;
- cluster shift that creates room for a title;
- sweep/wipe connecting two scene states;
- focused glow or scale emphasis;
- page turn for one-item detail scenes;
- screenshot pan, crop, or spotlight;
- typewriter text only where typing itself communicates the idea.

Do not animate everything. Establish a dominant beat, supporting beats, and quiet holds for reading.

Explain effects to users in outcome language, not implementation jargon. Say “图标先聚拢成旋转星云，再向左让出标题位置” instead of “orbit transform with translateX”.

## 6. Build And Render

- Start from the final readable layout, then animate into it.
- Use deterministic frame/time calculations.
- Keep all text as live HTML/React text, not baked into generated images.
- Localize rendering assets and fail clearly when an asset is missing.
- Render a short draft or representative range before the final-quality export.

## 7. Verification

Verify:

- exact dimensions, duration, frame rate, and audio state;
- first frame is not unintentionally blank;
- start, middle, and end frames are correctly composed;
- no clipping, overlap, tiny text, or broken images;
- transitions do not expose off-canvas content or leave accidental gaps;
- final hold is long enough to read;
- personal contact or branding appears only when requested.

Use `scripts/verify-video.sh` for metadata and frame extraction, then inspect the frames visually.

---
name: video-generator
description: Generate standalone visual videos, video assets, openers, ranked lists, feature overviews, animated editorial decks, infographic clips, screenshot tutorials, and other non-talking-head motion videos from links, documents, scripts, raw text, screenshots, images, and visual references. Use when the user wants a coding agent such as Codex/Codecs, Claude Code, or Workbody-style agents to turn content into horizontal or vertical videos with structured storyboards, static keyframes, Remotion/HyperFrames motion, real assets, and verified MP4 output. Ask for content, source materials, color direction, aspect ratio, and intended platform before production when missing. Do not use for packaging existing talking-head footage; use shui-video-packager instead.
---

# Video Generator | 视频生成器

把链接、文档、脚本、文字和配图转成可视化视频素材或完整视频。先完成内容提炼和静态关键帧，再进入动效制作，避免直接渲染整片后反复推翻。

## Capability Boundary

- Use this skill when the main output is a generated visual video, motion graphic, opener, list, tutorial, or explainer.
- Support `16:9` horizontal videos, `9:16` vertical short videos, `3:4` social cards, and custom ratios when the platform requires them.
- Use `shui-video-packager` when the main material is an existing person-speaking video that needs captions, cuts, callouts, and packaging.
- A generated visual clip may later be inserted into a talking-head video; create it here first, then hand it to `shui-video-packager`.

## Intake First

If any of the following are missing, ask briefly before implementation. Use the defaults only when the user clearly wants you to proceed.

1. **Content**: What is the source topic, script, document, link, or message?
2. **Materials**: What screenshots, logos, photos, icons, charts, or reference videos must be used?
3. **Palette**: Which color direction should it use? Default to clean blue-white technology styling when unspecified.
4. **Aspect ratio**: Horizontal `16:9`, vertical `9:16`, `3:4`, or another platform-specific size?
5. **Output type**: opener, ranked list, product explainer, tutorial insert, ad concept, brand video, travel/culture promo, or full video?
6. **Approval gate**: Should Codex show static keyframes first? Default to yes unless the user explicitly asks for direct rendering.

## Required Workflow

1. Inspect every supplied source. Fetch linked documents when possible and inventory text, images, screenshots, charts, audio, and brand assets.
2. Establish a production brief: audience, platform, aspect ratio, duration, purpose, visual direction, audio, branding, and delivery format. Infer low-risk details from context; ask only for decisions that materially change the result.
3. Build a content map. Condense long material into claims, proof, examples, and calls to action. Keep source images attached to the section they support.
4. Select a template or propose a new scene system. Read [references/template-catalog.md](references/template-catalog.md).
5. Write a project `DESIGN.md` before implementation. Define palette, typography, composition, motion language, and explicit anti-goals.
6. Produce static keyframes first: at minimum the opening frame, the densest information frame, and one representative transition/end-state frame. Do not render the full video until the user approves these, unless they explicitly ask to skip previews.
7. Implement deterministic motion with Remotion or HyperFrames. Reuse a bundled template when it fits instead of rebuilding its animation system.
8. Render a draft, inspect start/middle/end frames, check text fit and asset loading, then render the final MP4.
9. Deliver the source project, final video, preview frames, and a concise verification report.

## Engine Choice

- Choose **Remotion** for frame-exact, data-driven compositions: ranked lists, icon fields, orbit openers, grids, counters, repeated cards, and multi-format variants.
- Choose **HyperFrames** for HTML-first editorial storytelling: document explainers, screenshot tutorials, paper/deck layouts, and scene-based feature walkthroughs.
- Load and follow the current engine skill before editing. Existing templates are visual references, not permission to ignore current Remotion or HyperFrames rules.

## Motion Language Examples

When presenting a plan to the user, explain motion choices in plain language. Useful examples:

- **Icon orbit / 图标旋转星云**: many icons gather, rotate in two depth layers, then move aside to reveal a title.
- **Staggered cards / 卡片依次弹入**: list items enter one by one with small delays, useful for TOP lists and tool collections.
- **Light sweep / 蓝色光扫转场**: a soft blue-white sweep connects two scenes without looking like a hard cut.
- **Page turn / 翻页进入**: one plugin, product, or feature appears like a card page turning to the front.
- **Screenshot spotlight / 截图聚焦**: crop, zoom, or glow on the exact UI area being explained.
- **Typewriter / 打字机文字**: use only when typing, prompting, coding, or search is part of the story.

## Template Use

Copy a starter with:

```bash
scripts/create-from-template.sh <template-name> <target-directory>
```

Bundled templates:

- `ranked-list-remotion`: vertical ranked list with staggered cards, focus beats, sweep, and final hold.
- `orbit-opener-remotion`: horizontal icon-orbit opener that transitions into a structured overview.
- `editorial-deck-hyperframes`: horizontal full-screen editorial deck for documents, tutorials, and feature explainers.

Replace all sample copy, icons, source images, and branding. Do not publish the example content unchanged.

Read [references/prompt-examples.md](references/prompt-examples.md) when the user asks how to invoke the skill or wants reusable prompts. Read [references/motion-effects.md](references/motion-effects.md) before proposing effects.

## Non-Negotiable Rules

- Treat references as direction, never as a layout to copy.
- Do not show internal production language such as “前六个/后四个”, “按冲击力排序”, or approval notes.
- Use real icons and source screenshots whenever available. Do not ship placeholder logos.
- Preserve enough information to be useful, but keep every frame readable on the target device.
- Avoid nested card-on-card layouts, duplicate titles, decorative stripes without purpose, and unreadable dark text boxes.
- Do not add creator signatures, QR codes, contact pages, calls to action, voice-over, or music unless requested.
- Localize remote assets needed for rendering. Record their source and usage rights.
- Verify text clipping, overlap, blank frames, missing assets, duration, dimensions, frame rate, and audio before delivery.

Read [references/visual-rules.md](references/visual-rules.md) before designing and [references/workflow.md](references/workflow.md) before production.

## Verification

Run:

```bash
scripts/verify-video.sh path/to/final.mp4 path/to/verification-output
```

Review the generated metadata and frame captures visually. Automated checks do not replace visual inspection.

## Extension Rule

When adding a new reusable format, keep only the public template, routing criteria, and necessary usage instructions in this repository. Keep private product plans, internal critiques, and unpublished experiments outside the public repo.

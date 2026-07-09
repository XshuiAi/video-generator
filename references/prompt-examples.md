# Prompt Examples

Use these prompts when users want a copy-ready way to invoke Video Generator from Codex, Claude Code, Workbody-style agents, or another coding agent.

## Minimal Start

```text
请使用 $video-generator，把下面的内容做成一个视频素材。
先问我内容、素材、配色、横屏/竖屏和是否先看静态关键帧，不要直接渲染完整视频。
```

## Horizontal Opener

```text
请使用 $video-generator，做一条 16:9 横屏视频开场。
主题是：[主题]
素材有：[链接/图片/截图/Logo]
风格用默认蓝白科技感。
我希望先看到 3 张关键帧：开头、信息最密的一幕、结尾。
确认后再用 Remotion 或 HyperFrames 做成 MP4。
```

## Vertical TOP List

```text
请使用 $video-generator，把这 10 个工具做成一条 9:16 竖屏 TOP 清单视频。
每个工具要有真实图标、工具名、一句抓人的关键词和一行具体用途。
不要出现“前几个/后几个/内部排序逻辑”这种对内文字。
先出静态预览图，不要直接生成视频。
```

## Document To Visual Explainer

```text
请使用 $video-generator，把这个文档/网页变成一条视觉讲解视频。
请先提炼核心观点，保留关键截图或证据图，生成分镜表和 3 张关键帧。
默认蓝白科技感；如果你认为更适合纸质编辑风，也可以给一个备选方向。
```

## Product Or Ad Concept

```text
请使用 $video-generator，基于这个产品介绍和素材做一条 15 秒广告概念视频。
目标是让用户快速理解产品解决什么问题、核心卖点和最终行动。
先给我 2 个视觉方向和关键帧，不要直接渲染。
```

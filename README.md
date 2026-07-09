# Video Generator | 视频生成器

把链接、文档、脚本、文字、截图和配图转成可视化视频素材或完整视频的 Coding Agent Skill。

适合 Codex/Codecs、Claude Code、Workbody 这类 Coding Agent 一键调用：先问清内容、素材、配色、横屏/竖屏，再生成分镜、静态关键帧、Remotion/HyperFrames 动效和最终 MP4。

它负责非口播型视频：内容提炼、图文匹配、分镜规划、静态关键帧、交互动效、横竖屏视频实现和成片验收。已有真人口播素材的剪辑与包装由 `shui-video-packager` 负责。

## Showcase

### 横屏插件旋转开场

<video src="./assets/showcase/codex-plugin-orbit-opener.mp4" controls width="720"></video>

### 竖屏 TOP 清单

<video src="./assets/showcase/codex-plugin-top10-vertical.mp4" controls width="360"></video>

## Core Workflow

1. 读取并整理来源素材。
2. 建立内容地图和分镜表。
3. 先问清内容、素材、颜色/配色、横屏/竖屏、发布平台。
4. 选择模板、画幅与视觉路线；默认蓝白科技感。
5. 先生成静态关键帧确认。
6. 用 Remotion 或 HyperFrames 制作动效。
7. 导出并检查首、中、尾帧及视频参数。

## First Questions

调用后建议先问：

```text
我先确认 5 个制作参数：
1. 内容是什么？可以给链接、文档、脚本、标题或一段原始想法。
2. 素材有哪些？比如截图、Logo、产品图、人物图、参考视频。
3. 画幅选横屏 16:9、竖屏 9:16、3:4，还是其他？
4. 配色想要哪种？默认我用蓝白科技感。
5. 先看 3 张静态关键帧，还是直接渲染视频？
```

## Motion Effects

- 图标旋转星云：图标从四周聚拢成双层旋转轨道，适合工具合集和插件开场。
- 卡片依次弹入：榜单、清单、功能列表逐项出现，最后形成完整总览。
- 蓝色光扫转场：用蓝白光效连接两幕，适合科技感视频。
- 翻页进入：单个工具或功能像翻书一样进入详情页。
- 截图聚焦：对 UI 截图局部放大、描边、发光，用于教程讲解。
- 打字机文字：适合提示词、代码、搜索、生成状态，不适合普通长段落。

## Included Templates

- `ranked-list-remotion`: 竖屏榜单、清单、工具合集。
- `orbit-opener-remotion`: 横屏多图标环绕开场与信息总览。
- `editorial-deck-hyperframes`: 横屏文档、教程和功能讲解。

## Install

如果使用支持 Skills 的 Coding Agent，可以从 GitHub 安装：

```bash
skills@latest add XshuiAi/video-generator --skill video-generator --agent codex --global --copy -y
```

本地 Codex 挂载建议：

```bash
ln -sfn "/path/to/video-generator" "$HOME/.codex/skills/video-generator"
```

使用：

```text
请使用 $video-generator，把这份文档和配图做成一支 16:9 的功能讲解视频。
先提炼内容并给我三张静态关键帧，不要直接生成完整视频。
```

也可以在 Claude Code、Codex/Codecs、Workbody 这类 Coding Agent 中复制本仓库作为 Skill/Agent 能力目录使用。

## Repository Layout

- `SKILL.md`: 技能入口和执行规则。
- `references/`: 工作流、视觉规范、模板目录、提示词和动效说明。
- `assets/templates/`: 可复制的视频工程模板。
- `scripts/`: 模板复制与成片验收脚本。

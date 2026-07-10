<div align="center">

# 🌴 Tropic Forest Venture

**热带雨林探险品牌 · 高端沉浸式营销网站**

[![Version](https://img.shields.io/github/v/release/MgGaWin/tropic-forest-venture?style=flat-square&label=Version&color=blue)](https://github.com/MgGaWin/tropic-forest-venture/releases)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-0078d4?style=flat-square&logo=visualstudiocode)]()
[![License](https://img.shields.io/github/license/MgGaWin/tropic-forest-venture?style=flat-square&color=green)](LICENSE)
[![Stars](https://img.shields.io/github/stars/MgGaWin/tropic-forest-venture?style=flat-square&color=yellow)]()

---

[功能特性](#-功能特性) · [快速开始](#-快速开始) · [页面结构](#-页面结构) · [视觉特效](#-视觉特效) · [设计语言](#-设计语言) · [许可证](#-许可证)

</div>

## ✨ 功能特性

| 功能 | 说明 |
|:---|:---|
| 🌿 **雾气层叠** | CSS 动画驱动的薄雾漂浮效果，营造雨林氛围 |
| ☀️ **神光效果** | Hero 区域对角线光束（god rays），模拟林间阳光 |
| 🍃 **浮动叶片** | 滚动触发的叶片视差飘落动画 |
| 🎬 **全屏视频 Hero** | 慢速缩放视频背景 + 动态标题文字（"Where the canopy breathes"） |
| 📰 **跑马灯横幅** | "Into the canopy" / "Borneo" / "Costa Rica" 滚动文字带 |
| 🗺️ **探险卡片** | 非对称网格展示三条探险路线：哥斯达黎加、婆罗洲、丹翠雨林 |
| 📖 **田野笔记** | 杂志风格博客区："苔藓的语言" / "倾听树冠" / "根系网络" |
| 📧 **联系表单** | Cloudflare Turnstile 验证 + Resend 邮件发送 + 内存限流 |
| 🎞️ **clip-path 裁剪揭示** | 图片从 `inset(10%)` 裁剪展开到全尺寸，非淡入 |
| ♿ **无障碍支持** | `prefers-reduced-motion` 全局适配 |

## 🚀 快速开始

```bash
git clone https://github.com/MgGaWin/tropic-forest-venture.git
cd tropic-forest-venture
npm install
npm run dev
```

打开 **http://localhost:3000** 预览。

## 📄 页面结构

```
Hero          → 全屏视频 + 薄雾 + 神光 + 动态标题
Marquee       → 滚动文字横幅（目的地名称）
Philosophy    → 品牌理念（左文右图视差）
Expeditions   → 三条探险路线卡片（非对称网格）
Journal       → 田野笔记（杂志风格博客）
Contact       → 联系表单（Turnstile 验证）
Footer        → 极简页脚
```

### 探险路线

| 路线 | 目的地 | 特色 |
|:---|:---|:---|
| ☁️ **Cloud Forest** | 哥斯达黎加 | 云雾缭绕的高山雨林 |
| 🌳 **Heart of Borneo** | 马来西亚 | 婆罗洲原始丛林深处 |
| 🌿 **The Daintree** | 澳大利亚 | 世界上最古老的热带雨林 |

## 🎬 视觉特效

| 特效 | 实现方式 |
|------|------|
| 🌫️ 薄雾漂浮 | CSS 动画，缓慢水平漂移 |
| ☀️ 神光光束 | 对角线渐变，CSS 动画脉动 |
| 🍃 浮动叶片 | Framer Motion 视差，滚动驱动 |
| 🎞️ 裁剪揭示 | `clipPath: inset(10%)` → `inset(0%)` |
| 🎞️ 电影质感 | SVG 噪声纹理覆盖（grain overlay） |
| 📝 文字遮罩 | 文字作为背景图的遮罩层 |
| 🖼️ 暖色叠层 | 悬停时 `mix-blend-multiply` 琥珀渐变 |

## 🎨 设计语言

**STUDIO ANONIMO × Aesop × Kinfolk** — 奢华护肤品牌遇见自然杂志。

### 颜色

| 名称 | 色值 | 用途 |
|------|------|------|
| 深林绿 | `#1a2a1a` | 主色调，背景 |
| 大地棕 | `#8b7355` | 强调色 |
| 雾白 | `#f5f2ed` | 浅色背景 |

### 字体

| 字体 | 用途 |
|------|------|
| Playfair Display | 标题（衬线） |
| DM Sans | 正文（无衬线） |

### 布局原则

- 左对齐、非对称、大量留白
- 杂志感排版，图文交替
- 自然色调，克制的色彩运用

## 🛠️ 技术栈

- **Next.js 16** + React 19（App Router）
- **Tailwind CSS v4**
- **Framer Motion 12**（滚动视差、clip-path、文字揭示）
- **Resend**（邮件发送）
- **Cloudflare Turnstile**（人机验证）
- **TypeScript**

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

---

<div align="center">

**如果觉得有用，请给个 ⭐ Star 支持一下！**

</div>

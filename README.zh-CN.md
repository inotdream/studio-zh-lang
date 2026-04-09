[![GitHub release](https://img.shields.io/github/release/eez-open/studio.svg)](https://github.com/eez-open/studio/releases) [![license](https://img.shields.io/github/license/eez-open/studio.svg)](https://github.com/eez-open/studio/blob/master/LICENSE.TXT) [![liberapay](https://img.shields.io/liberapay/receives/eez-open.svg?logo=liberapay)](https://liberapay.com/eez-open/donate) [![Downloads](https://img.shields.io/github/downloads/eez-open/studio/total)](https://github.com/eez-open/studio/releases)

**语言：** [English](README.md) | **简体中文**

本仓库在官方 EEZ Studio 基础上增加了**简体中文界面**（i18n 与语言包）。构建与运行方式与上游一致。

### 技术支持

欢迎在 [Issues](https://github.com/eez-open/studio/issues) 中提交意见、功能请求与缺陷报告。Envox 团队会尽力处理，但响应节奏请合理预期。若需要更及时、更高质量的响应与直接技术支持，可选择 [Support plans](https://www.envox.eu/support-plans/)（另见[此文](https://www.envox.eu/premium-technical-support-for-eez-studio/)）。也可加入 [Discord](https://discord.gg/q5KAeeenNG) 社区，或在 [Discussions](https://github.com/eez-open/studio/discussions) 发起讨论。

### 版权与许可

贡献者名单见 CONTRIB.TXT。本项目采用 GPL v3，详见 LICENSE.TXT。  
EEZ Studio 采用 [C4.1（集体代码建设合约）](http://rfc.zeromq.org/spec:22) 流程。问题请通过 [EEZ Studio issue tracker](https://github.com/eez-open/studio/issues) 反馈。

_重要说明：除使用 EEZ Flow 且按 MIT 许可提供的工程外，Envox d.o.o. 对「构建」命令所生成源码不主张所有权。_  
_用户拥有 `.eez-project` 文件及由工程文件模板定义所生成的一切源码。EEZ Studio 也可能生成 MIT、BSD 2.0 或公有领域许可的文件。_

### 链接

-   [官网](https://www.envox.eu/studio/studio-introduction/)
-   [常见问题（Wiki）](https://github.com/eez-open/studio/wiki/Q&A)
-   [Discord](https://discord.gg/q5KAeeenNG)
-   [X (Twitter)](https://twitter.com/envox)
-   [Mastodon](https://mastodon.social/@envox)
-   [YouTube](https://www.youtube.com/c/eezopen)
-   [Liberapay](https://liberapay.com/eez-open/donate) 捐赠 <img src="https://liberapay.com/assets/liberapay/icon-v2_white-on-yellow.svg" width="16" />

## 简介

EEZ Studio 是一款免费开源的跨平台低代码可视化工具，面向桌面与嵌入式 GUI，支持 [LVGL](https://lvgl.io/)。内置 _EEZ Flow_ 可用于测试测量自动化场景，**仪器（Instrument）**功能可远程控制多台设备及 T&M 仪器，包括 [EEZ BB3](https://github.com/eez-open/modular-psu) 机箱、[EEZ H24005](https://github.com/eez-open/psu-hw) 电源，以及支持 [SCPI](https://www.ivifoundation.org/scpi/) 的 Keysight、Rigol、Siglent 等设备。

### EEZ Studio **工程（Project）**

![EEZ Studio Project](docs/images/projects_intro.png)

-   模块化可视化环境，用于设计 TFT 界面与用户交互（嵌入式 GUI）
-   生成可嵌入 [STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html)（BB3 等 STM32）或 [Arduino IDE](https://www.arduino.cc/en/software)（H24005 等兼容板）的 C++ 代码
-   **仪器定义文件（IDF）**构建器，带上下文相关 SCPI 帮助（基于 Keysight [Offline Command Expert](https://www.keysight.com/main/software.jspx?cc=US&lc=eng&ckey=2333687&nid=-11143.0.00&id=2333687) 的 XML 结构），适用于 EEZ Studio 仪器与 [Keysight Command Expert](https://www.keysight.com/en/pd-2036130/command-expert)
-   基于书签 HTML 的 SCPI 帮助生成（由 .odt 经 [EEZ WebPublish](https://github.com/eez-open/WebPublish) 等工具产出）
-   支持 [LVGL](https://lvgl.io/) 8.x / 9.x
-   工程模板（giteo.io 等）与工程对比
-   拖拽式仪器桌面仪表盘编辑器
-   基于流程图的低代码编程（桌面仪表盘）

![Flow](docs/images/flow_intro.png)

### EEZ Studio **仪器（Instrument）**

![EEZ Studio Instrument](docs/images/instruments_intro.png)

-   多仪器配置与会话式交互
-   串口（USB）、以太网、VISA（如 [R&S®VISA](https://www.rohde-schwarz.com/us/driver-pages/remote-control/3-visa-and-tools_231388.html)）等接口
-   直接导入 EEZ Studio 生成的 IDF 与 **Keysight Offline Command Expert** 命令集
-   IEXT（仪器扩展）目录，持续增加 Rigol、Siglent、Keysight 等型号
-   全量活动历史，支持搜索与过滤
-   日历「热力图」或会话列表快速导航
-   快捷键（热键/按钮），可自定义或来自 IDF，可含单条/多条 SCPI 或 JavaScript
-   JavaScript 自动化（日志、列表上下传等）可绑定到快捷键
-   带搜索的 SCPI 上下文帮助
-   文件上传（仪器→PC），支持图像预览（如截屏）
-   文件下载（PC→仪器）自动化传输配置
-   简易任意波形编辑器（包络/表格模式）
-   测量数据曲线显示
-   FFT、谐波与简单数学（周期、频率、最小、最大、峰峰值、平均）
-   曲线导出为 CSV

---

## 安装

所有情况均需 **64 位**操作系统。

### Linux

按发行版选择 `.deb`、`.rpm` 等包并用对应方式安装。另有 **AppImage**：下载后需在文件「权限」中勾选「允许作为程序执行」再运行。若 AppImage 无法启动，可尝试 `./EEZ-Studio-[版本].AppImage --no-sandbox`。

### Mac

下载 `eezstudio-mac.zip`，解压后将 `eezstudio.app` 拖入「应用程序」。

### Windows

下载并运行 `EEZ_Studio_setup.exe`。

### Nix

**说明：** Nix 打包目前存在问题（见 [#940](https://github.com/eez-open/studio/issues/940)），欢迎社区贡献。

Nix flake 提供本软件的推导或 overlay，可通过 [Nix](https://nixos.org/) 安装。

### 从源码构建与运行（全平台）

-   安装 **Node.js 16.x** 或更新版本
-   安装 **node-gyp**，参见 https://github.com/nodejs/node-gyp#installation

#### 仅 Linux：

```
sudo apt-get install build-essential libudev-dev libnss3
```

#### 仅 Raspbian：

在树莓派上安装 Node.js 16 与 npm：https://lindevs.com/install-node-js-and-npm-on-raspberry-pi/

```
sudo apt-get install build-essential libudev-dev libopenjp2-tools ruby-full
sudo gem install fpm
```

#### 全平台：

```
git clone https://github.com/eez-open/studio
cd studio
npm install
npm run build
```

启动：

```
npm start
```

生成分发包（除 macOS 与 Raspbian 外一般用）：

```
npm run dist
```

在 **macOS**：

```
npm run dist-mac-arm64
```

或

```
npm run dist-mac-x64
```

在 **Raspbian**：

```
npm run dist-raspbian
```

#### Nix 构建

```
nix build 'github:eez-open/studio'
```

运行：

```
nix run 'github:eez-open/studio'
```

## USB TMC

若要在 EEZ Studio **仪器**中通过 **USB-TMC** 访问仪器，需安装 USB TMC 驱动。

### Windows

下载并运行 [Zadig](http://zadig.akeo.ie/)，选择设备，选 **libusb-win32**，点击「Replace Driver」：

![Zadig](docs/images/usbtmc_zadin_windows.png)

### Linux

通常需将用户加入 **usbtmc** 用户组。USB 连接并开机，待启动完成后执行：

```
ls -l /dev/usbtmc*
```

若为 `root`，执行：

```
sudo groupadd usbtmc
```

将 `<username>` 加入该组：

```
sudo usermod -a -G usbtmc <username>
```

**需要重启**。之后 `/dev/usbtmc0` 的 gid 应为 `usbtmc`，即可通过 USB-TMC 使用仪器。

## 常见问题

[FAQ Wiki](https://github.com/eez-open/studio/wiki/FAQ)

**问**：数据库文件默认在哪？  
**答**：因系统而异：

-   Linux：`~/.config/eezstudio/storage.db`
-   Mac：`~/Library/Application\ Support/eezstudio/storage.db`
-   Windows：`%appdata%\eezstudio\storage.db`

默认数据库及路径可在 EEZ Studio **设置**中修改。

**问**：用于访问仪器的 IEXT 存在哪？  
**答**：

-   Linux：`~/.config/eezstudio/extensions`
-   Mac：`~/Library/Application\ Support/eezstudio/extensions`
-   Windows：`%appdata%\eezstudio\extensions`

---

本项目由 [NLnet](https://nlnet.nl/project/BB3-CM5/) 资助。

![nlnet](docs/images/nlnet-logo.png)

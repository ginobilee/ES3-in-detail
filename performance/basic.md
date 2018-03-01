

> 当创建一个 web 应用的时候，参考 [PRPL 模式](https://link.juejin.im/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ffundamentals%2Fperformance%2Fprpl-pattern%2F) 和 [应用程序 shell 体系结构](https://link.juejin.im/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Fupdates%2F2015%2F11%2Fapp-shell)。这个想法很简单: 用最少的代码来将初始路由的交互快速呈现，然后使用 service worker 进行缓存和预缓存资源，然后使用懒加载异步加载所需的路由。

> ### 速效方案
>
> 这个列表非常全面，完成所有的优化可能需要很长时间。所以，如果你只有一个小时的时间来进行重大的改进，你会怎么做？让我们把这一切归结为**10个低挂的水果**。显然，在你开始之前和完成之后，测量结果，包括开始渲染时间以及在 3G 和电缆连接下的速度指数。
>
> 1. 测量实际环境的体验并设定适当的目标。一个好的目标是：第一次有意义的绘制 < 1 s，速度指数 < 1250，在慢速的 3G 网络上的交互 < 5s，对于重复访问，TTI < 2s。优化渲染开始时间和交互时间。
> 2. 为您的主模板准备关键的 CSS，并将其包含在页面的 `<head>` 中。（你的预算是 14 KB）。对于 CSS/JS，文件大小[不超过 170 KB gzipped](https://link.juejin.im?target=https%3A%2F%2Finfrequently.org%2F2017%2F10%2Fcan-you-afford-it-real-world-web-performance-budgets%2F)（解压后 0.8-1 MB）。
> 3. 延迟加载尽可能多的脚本，包括您自己的和第三方的脚本——特别是社交媒体按钮、视频播放器和耗时的 JavaScript 脚本。
> 4. 添加资源提示，使用 `dns-lookup`、`preconnect`、`prefetch` 和 `preload` 加速传输。
> 5. 分离 web 字体，并以异步方式加载它们（或切换到系统字体）。
> 6. 优化图像，并在重要页面（例如登录页面）中考虑使用 WebP。
> 7. 检查 HTTP 缓存头和安全头是否设置正确。
> 8. 在服务器上启用 Brotli 或 Zopfli 压缩。（如果做不到，不要忘记启用 Gzip 压缩。）
> 9. 如果 HTTP/2 可用，启用 HPACK 压缩并开启混合内容警告监控。如果您正在运行 LTS，也可以启用 OCSP stapling。
> 10. 在 service worker 缓存中尽可能多的缓存资产，如字体、样式、JavaScript 和图像。

[Debugging React performance with React 16 and Chrome Devtools.](https://building.calibreapp.com/debugging-react-performance-with-react-16-and-chrome-devtools-c90698a522ad)


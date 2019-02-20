您也可以在 Activity 代码中创建新 View，并通过将新 View 插入 ViewGroup 来创建视图层次，然后通过将根 ViewGroup 传递到 setContentView() 来使用该布局。

<activity> 元素还可指定各种 Intent 过滤器—使用 <intent-filter> 元素—以声明其他应用组件激活它的方法。

您可以通过调用 startActivity()，并将其传递给描述您想启动的 Activity 的 Intent 来启动另一个 Activity。Intent 对象会指定您想启动的具体 Activity 或描述您想执行的操作类型（系统会为您选择合适的 Activity，甚至是来自其他应用的 Activity）。 Intent 对象还可能携带少量供所启动 Activity 使用的数据。


由于 onPause() 是这三个方法中的第一个，因此 Activity 创建后，onPause() 必定成为最后调用的方法，然后才能终止进程 — 如果系统在紧急情况下必须恢复内存，则可能不会调用 onStop() 和 onDestroy()。因此，您应该使用 onPause() 向存储设备写入至关重要的持久性数据（例如用户编辑）。不过，您应该对 onPause() 调用期间必须保留的信息有所选择，因为该方法中的任何阻止过程都会妨碍向下一个 Activity 的转变并拖慢用户体验。




不过，当系统为了恢复内存而销毁某项 Activity 时，Activity 对象也会被销毁，因此系统在继续 Activity 时根本无法让其状态保持完好，而是必须在用户返回 Activity 时重建 Activity 对象。但用户并不知道系统销毁 Activity 后又对其进行了重建，因此他们很可能认为 Activity 状态毫无变化。 在这种情况下，您可以实现另一个回调方法对有关 Activity 状态的信息进行保存，以确保有关 Activity 状态的重要信息得到保留：onSaveInstanceState()。

由于 onSaveInstanceState() 的默认实现有助于保存 UI 的状态，因此如果您为了保存更多状态信息而替换该方法，应始终先调用 onSaveInstanceState() 的超类实现，然后再执行任何操作。 同样，如果您替换 onRestoreInstanceState() 方法，也应调用它的超类实现，以便默认实现能够恢复视图状态

系统会先调用 onSaveInstanceState()，然后再使 Activity 变得易于销毁。系统会向该方法传递一个 Bundle，您可以在其中使用 putString() 和 putInt() 等方法以名称-值对形式保存有关 Activity 状态的信息。然后，如果系统终止您的应用进程，并且用户返回您的 Activity，则系统会重建该 Activity，并将 Bundle 同时传递给 onCreate() 和 onRestoreInstanceState()。您可以使用上述任一方法从 Bundle 提取您保存的状态并恢复该 Activity 状态。如果没有状态信息需要恢复，则传递给您的 Bundle 是空值（如果是首次创建该 Activity，就会出现这种情况）。

注：由于无法保证系统会调用 onSaveInstanceState()，因此您只应利用它来记录 Activity 的瞬态（UI 的状态）— 切勿使用它来存储持久性数据，而应使用 onPause() 在用户离开 Activity 后存储持久性数据（例如应保存到数据库的数据）。

您只需旋转设备，让屏幕方向发生变化，就能有效地测试您的应用的状态恢复能力。 当屏幕方向变化时，系统会销毁并重建 Activity，以便应用可供新屏幕配置使用的备用资源。 单凭这一理由，您的 Activity 在重建时能否完全恢复其状态就显得非常重要，因为用户在使用应用时经常需要旋转屏幕。

您可以利用这种可预测的生命周期回调顺序管理从一个 Activity 到另一个 Activity 的信息转变。 例如，如果您必须在第一个 Activity 停止时向数据库写入数据，以便下一个 Activity 能够读取该数据，则应在 onPause() 而不是 onStop() 执行期间向数据库写入数据。




Android 会自动将 CATEGORY_DEFAULT 类别应用于传递给 startActivity() 和 startActivityForResult() 的所有隐式 Intent。因此，如需 Activity 接收隐式 Intent，则必须将 "android.intent.category.DEFAULT" 的类别包括在其 Intent 过滤器中（如上文的 <intent-filter> 示例所示）。




例如，主页应用通过使用指定 ACTION_MAIN 操作和 CATEGORY_LAUNCHER 类别的 Intent 过滤器查找所有 Activity，以此填充应用启动器。



---------------- about webview -----------------
The WebView class is an extension of Android's View class that allows you to display web pages as a part of your activity layout. 

The object that is bound to your JavaScript runs in another thread and not in the thread in which it was constructed.

By default, requests to open new windows are ignored. This is true whether they are opened by JavaScript or by the target attribute in a link. You can customize your WebChromeClient to provide your own behavior for opening multiple windows.

这里的multi window是什么样的呈现方式？









常见的架构原则
如果您无法使用应用组件存储应用数据和状态，那么应该如何构造应用？

您应该侧重的最重要的一点是在应用中分离关注点。一种常见的错误是在一个 Activity 或 Fragment 中编写所有代码。任何不处理界面或操作系统交互的代码都不应该在这些类中。应尽可能使这些类保持精简，这样可以避免许多与生命周期相关的问题。不要忘记，您并不拥有这些类，它们只是体现了操作系统与应用之间关系的粘合类。Android 操作系统可能会根据用户交互或内存不足等其他因素随时销毁它们。最好尽量减少对它们的依赖，以提供可靠的用户体验。

第二个重要原则是您应该通过模型驱动界面，最好是持久性模型。持久性是理想之选有两个原因：如果操作系统销毁您的应用以释放资源，用户不会丢失数据，并且即使网络连接不稳定或未连接，您的应用也会继续工作。模型是负责为应用处理数据的组件。它们独立于应用中的视图和应用组件，因此不受这些组件的生命周期问题的影响。应使界面代码保持简单且摆脱应用逻辑，这样可使其更易于管理。应用所基于的模型类应明确定义数据管理职责，这样将使这些模型类可测试，并且使应用保持一致。



应用的核心是使其脱颖而出的因素。不要花时间做无用功或一次又一次地编写相同的样板代码。相反，应将精力集中在能使应用与众不同的因素上，而让 Android 架构组件以及建议的其他库处理重复的样板。
保留尽可能多的相关数据和最新数据，以便在设备处于离线模式时您的应用可用。虽然您可能享受着恒定的高速连接，但是您的用户可能并没有。
存储区应将一个数据源指定为单一可信来源。每当应用需要访问这部分数据时，该数据应始终源于单一可信来源。详情请参阅单一可信来源。




-------- service 组件 ------------
注意：服务在其托管进程的主线程中运行，它既不创建自己的线程，也不在单独的进程中运行（除非另行指定）。 这意味着，如果服务将执行任何 CPU 密集型工作或阻止性操作（例如 MP3 播放或联网），则应在服务内创建新线程来完成这项工作。通过使用单独的线程，可以降低发生“应用无响应”(ANR) 错误的风险，而应用的主线程仍可继续专注于运行用户与 Activity 之间的交互。

如需在主线程外部执行工作，不过只是在用户正在与应用交互时才有此需要，则应创建新线程而非服务。 例如，如果您只是想在 Activity 运行的同时播放一些音乐，则可在 onCreate() 中创建线程，在 onStart() 中启动线程，然后在 onStop() 中停止线程。您还可以考虑使用 AsyncTask 或 HandlerThread，而非传统的 Thread 类。如需了解有关线程的详细信息，请参阅进程和线程文档。

请记住，如果您确实要使用服务，则默认情况下，它仍会在应用的主线程中运行，因此，如果服务执行的是密集型或阻止性操作，则您仍应在服务内创建新线程。



服务启动之后，其生命周期即独立于启动它的组件，并且可以在后台无限期地运行，即使启动服务的组件已被销毁也不受影响。 

注意：默认情况下，服务与服务声明所在的应用运行于同一进程，而且运行于该应用的主线程中。 因此，如果服务在用户与来自同一应用的 Activity 进行交互时执行密集型或阻止性操作，则会降低 Activity 性能。 为了避免影响应用性能，您应在服务内启动新线程。


------- jetpack -----------
尽管 Activity 是系统提供的您的应用界面的入口点，但在相互分享数据以及转场方面，Activity 表现得不够灵活，这就让它不适合作为构建您的应用内导航的理想架构。今天，我们宣布推出导航组件，作为构建您的应用内界面的框架，重点是让单 Activity 应用成为首选架构。利用导航组件对 Fragment 的原生支持，您可以获得架构组件的所有好处（例如生命周期和 ViewModel），同时让此组件为您处理 FragmentTransaction 的复杂性。此外，导航组件还可以让您声明我们为您处理的转场。

作者：zhuxh
链接：https://www.jianshu.com/p/fea5789f5d6d
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。



在这个图中，ActivityManagerService和ActivityStack位于同一个进程中，而ApplicationThread和ActivityThread位于另一个进程中。其中，ActivityManagerService是负责管理Activity的生命周期的，ActivityManagerService还借助ActivityStack是来把所有的Activity按照后进先出的顺序放在一个堆栈中；对于每一个应用程序来说，都有一个ActivityThread来表示应用程序的主进程，而每一个ActivityThread都包含有一个ApplicationThread实例，它是一个Binder对象，负责和其它进程进行通信。


--------------------- 
作者：罗升阳 
来源：CSDN 
原文：https://blog.csdn.net/luoshengyang/article/details/6685853 
版权声明：本文为博主原创文章，转载请附上博文链接！


questions: 
1. 调用隐式 intent 会传到系统，再由系统调起，但如果调 显式 intent呢，也会么？
2. 安卓下一个新窗口总是一个activity，一个activity总是一个新线程么？

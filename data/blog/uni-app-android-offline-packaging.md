---
title: uni-app：Android离线打包
date: '2026-03-11'
tags: ['uni-app', 'Android','Vue']
draft: false
type: Blog
summary: '对应HBuilderX的云端打包功能，uni-app、5+ App等项目发行为原生App时，无需将App资源及打包要使用的签名证书等提交到云端打包服务器，在开发者本地配置的原生开发环境中生成安装包apk/ipa。'
---

## uni-app：Android离线打包

App离线开发工具包，即App离线SDK，是把App运行环境（runtime）封装为原生开发调用接口，开发者可以在自己的 Android 及 iOS 原生开发环境配置工程使用，包括 Android离线开发SDK 及 iOS离线开发SDK。

### AppKey

从3.1.10版本开始使用App离线SDK需要申请Appkey，具体请参考链接 [申请Appkey](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey.html)。

### 开发环境

1. Android Studio 下载地址：[Android Studio官网](https://developer.android.google.cn/studio/index.html) .
2. [HBuilderX](https://www.dcloud.io/hbuilderx.html)
3. App离线SDK下载：[最新android平台SDK下载](https://nativesupport.dcloud.net.cn/AppDocs/download/android.html)，推荐使用和彩云。

### SDK目录说明

```
	|-- HBuilder-Hello				App离线打包演示应用
	|-- HBuilder-Integrate-AS		集成uni-app的最简示例
	|-- SDK							SDK库文件目录
	|-- Feature-Android.xls			Android平台各扩展Feature API对应的详细配置
	|-- Readme.txt					版本说明文件及注意事项
	|-- UniPlugin-Hello-AS			uni原生插件开发示例

```

### 导入工程

导入`HBuilder-Integrate-AS`工程，直接运行`simpleDemo`项目即可。

### 配置工程

1. 应用配置

打开`Androidmanifest.xml`， 导航到`Application`节点，修改`meta-data`节点，`name`为`dcloud_appkey`，`value`为申请的AppKey如下所示：

![](/static/images/uni-app-android-offline-packaging/Snipaste_2026-03-11_15-19-46.png)

```xml
<application
    ...>
    <meta-data
        android:name="dcloud_appkey"
        android:value="替换为自己申请的Appkey" />

```

打开`build.gradle`配置应用版本号和`applicationId`以及`signingConfigs`

![](/static/images/uni-app-android-offline-packaging/image-20260311152022065.png)

```makefile
defaultConfig {
        applicationId "离线key中的包名/appid/域名"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1120
        versionName "1.1.20"
        multiDexEnabled true
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
    }
signingConfigs {
        config {
            keyAlias '别名'
            keyPassword '证书文件密码'
            storeFile file('证书文件，放在项目根目录中')
            storePassword '证书文件密码'
            v1SigningEnabled true
            v2SigningEnabled true
        }
    }
```

`versionCode`为应用的版本号（整数值），用于各应用市场的升级判断，建议与`manifest.json`中`version -> code`值一致。

`versionName`为应用的版本名称（字符串），在系统应用管理程序中显示的版本号，建议与`manifest.json`中`version -> name`值一致。

`applicationId`为应用的包名，一般设置为反向域名，不建议修改。

建议将`targetSdkVersion`设置为30或以上。

注意：如果`targetSdkVersion`设置为34时，需要在`build.gradle`的android节点下新增以下内容：

```cmake
packagingOptions {
	jniLibs {
		useLegacyPackaging true
	}
}

```

App离线SDK minSdkVersion最低支持21，小于21在部分5.0以下机型上将无法正常使用。

2. 资源配置

删除simpleDemo中`assets/apps/`下所有资源，从HBuilderX中生成本地App打包资源，将生成的的资源复制到该路径下。修改`dcloud_control.xml`中的appid确保`dcloud_control.xml`中的appid与`manifest.json`中的id与文件夹名一致，如下图所示：

![](/static/images/uni-app-android-offline-packaging/Snipaste_2026-03-11_16-19-16.png)

![](/static/images/uni-app-android-offline-packaging/Snipaste_2026-03-11_15-22-49.png)
连接手机或启动虚拟机，点击按钮，运行即可。

![](/static/images/uni-app-android-offline-packaging/Snipaste_2026-03-11_16-15-00.png)

### 打包发行

点击`Build->Generate Signed App Bundle Or APK...`选择APK的方式打包，证书就是之前申请Appkey时的证书文件。

## 参考链接
- [uni-app App离线打包](https://nativesupport.dcloud.net.cn/AppDocs/)
- [Android平台App本地离线打包](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)
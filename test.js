var intent = new Intent();
//打开无障碍设置界面
//intent.setAction("android.settings.ACCESSIBILITY_SETTINGS");

//飞行模式
//intent.setAction("android.settings.CAPTIONING_SETTINGS");
//辅助功能
//intent.setAction("android.settings.ACCESSIBILITY_SETTINGS");
//添加账户
//intent.setAction("android.settings.ADD_ACCOUNT_SETTINGS");
//系统设置首页
//intent.setAction("android.settings.AIRPLANE_MODE_SETTINGS");
//APN设置
//intent.setAction("android.settings.APN_SETTINGS");
//应用管理
//intent.setAction("android.settings.APPLICATION_SETTINGS");
//节电助手
//intent.setAction("android.settings.BATTERY_SAVER_SETTINGS");
//蓝牙
//intent.setAction("android.settings.BLUETOOTH_SETTINGS");
//字幕
//intent.setAction("android.settings.CAPTIONING_SETTINGS");
//无线显示
//intent.setAction("android.settings.CAST_SETTINGS");
//移动网络
//intent.setAction("android.settings.DATA_ROAMING_SETTINGS");
//日期和时间设置
//intent.setAction("android.settings.DATE_SETTINGS");
//关于手机
//intent.setAction("android.settings.DEVICE_INFO_SETTINGS");
//显示设置
//intent.setAction("android.settings.DISPLAY_SETTINGS");
//互动屏保设置
//intent.setAction("android.settings.DREAM_SETTINGS");
//实体键盘
//intent.setAction("android.settings.HARD_KEYBOARD_SETTINGS");
//应用权限,默认应用设置,特殊权限
//intent.setAction("android.settings.HOME_SETTINGS");
//忽略电池优化设置
//intent.setAction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS");
//可用虚拟键盘设置
//intent.setAction("android.settings.INPUT_METHOD_SETTINGS");
//安卓键盘语言设置(AOSP)
//intent.setAction("android.settings.INPUT_METHOD_SUBTYPE_SETTINGS");
//内存和存储
//intent.setAction("android.settings.INTERNAL_STORAGE_SETTINGS");
//语言偏好设置
//intent.setAction("android.settings.LOCALE_SETTINGS");
//定位服务设置
//intent.setAction("android.settings.LOCATION_SOURCE_SETTINGS");
//所有应用
//intent.setAction("android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS");
//应用管理
//intent.setAction("android.settings.MANAGE_APPLICATIONS_SETTINGS");
//与ACTION_HOME_SETTINGS相同
//intent.setAction("android.settings.MANAGE_DEFAULT_APPS_SETTINGS");
//在其他应用上层显示,悬浮窗
//intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION");
//安装未知应用 安卓8.0
//intent.setAction("android.settings.MANAGE_UNKNOWN_APP_SOURCES");
//可修改系统设置 权限
intent.setAction("android.settings.action.MANAGE_WRITE_SETTINGS");
//内存与存储
//intent.setAction("android.settings.MEMORY_CARD_SETTINGS");
//可用网络选择
//intent.setAction("android.settings.NETWORK_OPERATOR_SETTINGS");
//NFC设置
//intent.setAction("android.settings.NFCSHARING_SETTINGS");
//网络中的 更多设置
//intent.setAction("android.settings.NFC_SETTINGS");
//通知权限设置
//intent.setAction("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS");
//勿扰权限设置
//intent.setAction("android.settings.NOTIFICATION_POLICY_ACCESS_SETTINGS");
//打印服务设置
//intent.setAction("android.settings.ACTION_PRINT_SETTINGS");
//备份和重置
//intent.setAction("android.settings.PRIVACY_SETTINGS");
//安全设置
//intent.setAction("android.settings.SECURITY_SETTINGS");
//监管信息
//intent.setAction("android.settings.SHOW_REGULATORY_INFO");
//声音设置
//intent.setAction("android.settings.SOUND_SETTINGS");
//添加账户设置
//intent.setAction("android.settings.SYNC_SETTINGS");
//有权查看使用情况的应用
//intent.setAction("android.settings.USAGE_ACCESS_SETTINGS");
//个人词典
//intent.setAction("android.settings.USER_DICTIONARY_SETTINGS");
//辅助应用和语音输入
//intent.setAction("android.settings.VOICE_INPUT_SETTINGS");
//VPN设置
//intent.setAction("android.settings.VPN_SETTINGS");
//VR助手
//intent.setAction("android.settings.VR_LISTENER_SETTINGS");
//选择webview
//intent.setAction("android.settings.WEBVIEW_SETTINGS");
//高级WLAN设置
//intent.setAction("android.settings.WIFI_IP_SETTINGS");
//选择WIFI,连接WIFI
//intent.setAction("android.settings.WIFI_SETTINGS");

app.startActivity(intent);

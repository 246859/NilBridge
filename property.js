/**
 *【使用前必读】
 * 这里是 NilBridge 的重要细节配置文件，可以修改许多核心功能与细节功能；
 * 若您不理解某些配置的意思，请切勿随意改动，以下默认配置均为测试后的最佳配置，
 * 但是若您熟悉这些细节，您可以修改绝大部分设置，需要重启生效。
 * 
 * 
 *【无计算机语言基础者请阅读】
 * 文本值，双引号之间是文本描述（字符串），类似于 "UTF-8" ，"Hello" 等等；
 * 真假值, true 代表准许 false 代表禁止；
 * 数字值，直接书写即可,无需双引号，列如 1,2,3,5.565,20000,5555 等；
 * 注释，纯属用来看的，毫无作用 // 代表单行注释；
 * 
 * 请放心，这不是要你书写计算机语言，而是进行十分简单的编辑；
 * 当然你可以选择不改动此文件。
 * 
 * 
 * 项目尽可能在 UTF8 编码环境中运行。
 *
 * 
 * 【配置开始，谨慎修改】
*/

// 机器人的账号
NIL.CONFIG.QQ = 2837945976

// 是否使用扫码登录
// 可填： true/false
NIL.CONFIG.LOGIN_WITH_QRCODE = true


// 机器人登录协议
// 1 手机
// 2 pad
// 3 手表
// 4 MacOS
// 5 ipad
NIL.CONFIG.LOGIN_PROTOCOL = 3

// 机器人登录密码
// 如果使用扫码登录可以忽略此项
NIL.CONFIG.PASSWORD = '114514'

// 是否启用本地文档服务器
NIL.CONFIG.LOACL_WEBSITE = true

// 文档服务器监听端口
// 开启只会您可以访问127.0.0.1:端口 来查看文档
NIL.CONFIG.LOACL_WEBSITE_PORT = 3000

// 全局管理员，可以在群聊中执行命令
// 示例 [111,222]
NIL.CONFIG.ADMIN = [2959435045]

// 主要群聊
// 用来执行命令和获取白名单
NIL.CONFIG.GROUP_MAIN = 808776416

// 聊天群
// 用来与服务器聊天
// 与主群可以是同一个
NIL.CONFIG.GROUP_CHAT = 808776416
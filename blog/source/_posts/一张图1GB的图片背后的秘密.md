---
title: 一张图1GB的图片背后的秘密
date: 2019-05-17 21:03:09
tags:
	- Crake
	- CTF
categories: CTF
description: 「如需访问请联系夺旗小贼」
password: *****
message: 「输入密码」
---
# 大家好，我是小旗，大家有所不知，其实我自称“夺旗怪”，就我小旗就给大家如何夺取这个网站的flag
## 工具
- 浏览器（除了手机浏览器）
- notepad++
 打开浏览器在搜索框输入：https://duoqixiaozei.github.io/login
 	进去会看到这个网页
 首先观察有什么动静 我们可以按住F12 或者 鼠标右键审查元素 去看这个网站
打开我们下载好的照片，右键属性里详细信息看看有什么内容，发现标题里面出现 “where is the flag?” 
<img src="find.PNG" width = 50% height = 50% alt = "find" />
我们用notepad++打开图片搜索flag 发现并没有flag(tips:notepad按ctr+F可以查看关键词)
<img src="findflag.PNG" width= = 50% height = 50%  alt = "findflag" />
 却发现了AdobePhotoshop我们可以看的出这张图片是被P过的，然后按着ctrl+f搜索flag（因为我们看到标题“where is the flag?”）
  再次打开网页我们发现还是有一个没点击我们点击Try看看发现是一张加载不了的图片，加载不出的图片有的浏览器可以直接右键保存，而又一些就不行我们就按F12 点击Sources看到second.jpg我们下载到桌面，重复刚才的步骤，打开notepad++查看second然后按着ctrl+f搜索flag发现和刚才的图片一样，我们查看日期发现和那张图片日期都一样。
  紧接着我们看到两张图片的图片大小 发现one图片只有58.2 KB而second图片只有58.3 KB。
<img src="ram.PNG" width= = 50% height = 50%  alt = "字节" />
  可能是压缩包我们用改后缀为rar，不出意料，发现到一个文本文件，打开发现flag。
<img src="gain.PNG" width= = 50% height = 50%  alt = "gain" />
  发现flag发现是小写字母和数字 怀疑可能是md5 （如果MD5为32位是大写字母），推断是MD5 16位的。
 <img src="gain2.PNG" width= = 50% height = 50%  alt = "gain2" />
解密完我们把解密完的密文复制然后粘贴在那个网址里，复制完后再输入框双击。
<img src="double.PNG" width= = 50% height = 50%  alt = "double" />
 # 第二种思路 （不推荐碰运气有时候可以）
 暴力破解，在输入框跑字典（几率太小）
 # 第三种思路 在被禁按钮之后（推荐）
 我们在按F12和右键都按不了的时候我们可以尝试 在网站前面加view-source：然后就会出现网站的所编写的代码
 <img src="tips.PNG" width= = 50% height = 50%  alt = "tips" />
 看到js文件一个是禁掉按钮一个是文本框加密，找到参数，得知密码。
 作者：小旗
 	>上述的题目是CTF常见的隐写术，还有加密，之后我们会发布更多的CTF 有机会发布CTF相关介绍


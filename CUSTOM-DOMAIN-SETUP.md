# 🌐 自定义域名配置指南

## 方案：阿里云域名 + Vercel 部署

这个方案可以让你使用自己的域名访问 Vercel 上的网站，提升品牌形象和访问体验。

---

## 📋 配置步骤

### 第一步：在 Vercel 添加自定义域名

#### 方法 A：通过 Vercel 网页（推荐）

1. **访问项目设置页面**
   - 登录 Vercel：https://vercel.com
   - 进入项目：`education1`
   - 点击顶部的 **"Settings"**
   - 在左侧菜单选择 **"Domains"**

2. **添加域名**
   - 在输入框中输入你的域名（例如：`edu.yourdomain.com`）
   - 点击 **"Add"**

3. **获取 DNS 配置信息**
   - Vercel 会显示需要配置的 DNS 记录
   - 通常是一条 CNAME 记录，指向：`cname.vercel-dns.com`

#### 方法 B：通过命令行

```bash
# 添加域名到 Vercel 项目
vercel domains add edu.yourdomain.com education1
```

---

### 第二步：在阿里云配置 DNS

1. **登录阿里云控制台**
   - 访问：https://dns.console.aliyun.com/
   - 登录你的阿里云账号

2. **进入域名解析设置**
   - 在域名列表中找到你的域名
   - 点击 **"解析设置"**

3. **添加 CNAME 记录**
   - 点击 **"添加记录"**
   - 填写以下信息：

   ```
   记录类型: CNAME
   主机记录: edu (如果你的完整域名是 edu.yourdomain.com)
   解析线路: 默认
   记录值: cname.vercel-dns.com
   TTL: 10分钟 (或默认值)
   ```

4. **保存配置**
   - 点击 **"确认"**

---

### 第三步：等待 DNS 生效

- **生效时间**：通常 5-10 分钟，最长可能需要 24 小时
- **验证方式**：在 Vercel 项目的 Domains 页面会显示验证状态

---

## 🔍 验证配置

### 检查 DNS 解析

在 PowerShell 中执行：

```powershell
# 检查 DNS 是否生效
nslookup edu.yourdomain.com

# 或使用在线工具
# https://tool.chinaz.com/dns/
```

### 访问测试

配置成功后，可以通过以下方式访问：
- ✅ `https://edu.yourdomain.com` (你的自定义域名)
- ✅ `https://education1-obtp3svl6-duliangkuans-projects.vercel.app` (Vercel 原始域名)

---

## 📊 DNS 配置示例

### 示例 1：使用子域名

假设你的主域名是 `example.com`，想用 `edu.example.com`：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| CNAME | edu | cname.vercel-dns.com | 600 |

结果：`https://edu.example.com` → Vercel 网站

### 示例 2：使用二级子域名

假设想用 `zhanshi.study.example.com`：

首先确保 `study.example.com` 已配置，然后：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| CNAME | zhanshi.study | cname.vercel-dns.com | 600 |

---

## ⚙️ 高级配置

### SSL/HTTPS 证书

- **自动配置**：Vercel 会自动为你的自定义域名申请 Let's Encrypt 免费 SSL 证书
- **生效时间**：域名验证通过后，SSL 证书会在几分钟内自动配置
- **强制 HTTPS**：建议在 Vercel 项目设置中开启

### 配置多个域名

可以为同一个项目配置多个域名：
```
edu.yourdomain.com (主域名)
www.edu.yourdomain.com (WWW 前缀)
study.yourdomain.com (备用域名)
```

---

## ❓ 常见问题

### Q: 域名需要备案吗？
A: 
- 如果服务器在国外（Vercel 在国外），理论上不需要备案
- 但国内访问速度可能受影响
- 如果想在国内快速访问，建议：
  - 域名进行 ICP 备案
  - 或使用 CDN 加速

### Q: CNAME 和 A 记录的区别？
A:
- **CNAME**（推荐）：指向域名，Vercel 推荐使用
- **A 记录**：指向 IP 地址，Vercel 的 IP 可能会变化

### Q: DNS 配置后多久生效？
A:
- **最快**：5-10 分钟
- **通常**：1-2 小时
- **最长**：24-48 小时（极少数情况）

### Q: 为什么访问还是很慢？
A: 可能的原因：
- DNS 还未完全生效（等待一段时间）
- Vercel 在国内访问本身有限制
- 考虑使用 CDN 加速服务

### Q: 配置错误怎么办？
A:
1. 检查 DNS 记录是否正确
2. 确认 Vercel 中的域名拼写
3. 等待足够的时间让 DNS 生效
4. 清除浏览器缓存和 DNS 缓存：`ipconfig /flushdns`

---

## 🎯 推荐子域名建议

根据你的项目（智慧学伴），以下是一些好的子域名建议：

- `edu.yourdomain.com` - 教育相关
- `study.yourdomain.com` - 学习相关
- `ai.yourdomain.com` - AI 相关
- `smart.yourdomain.com` - 智能相关
- `learn.yourdomain.com` - 学习平台
- `zhanshi.yourdomain.com` - 展示平台

---

## 📞 需要帮助？

配置过程中遇到问题，可以：
1. 检查 Vercel 项目的 Domains 页面的状态提示
2. 使用阿里云的 DNS 检测工具验证配置
3. 查看 Vercel 文档：https://vercel.com/docs/concepts/projects/custom-domains

---

**配置成功后，你的网站就可以通过自定义域名访问了！** 🎉


<template>
  <div class="icon-uploader">
    <div class="upload-area" @click="triggerFileInput" @dragover.prevent @drop="handleDrop">
      <input 
        ref="fileInput" 
        type="file" 
        accept="image/*" 
        @change="handleFileSelect" 
        style="display: none"
      />
      
      <div v-if="!previewUrl" class="upload-placeholder">
        <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
        <p class="upload-text">点击或拖拽上传图标</p>
        <p class="upload-hint">支持 PNG、JPG、SVG 格式，最大5MB</p>
      </div>
      
      <div v-else class="preview-area">
        <img :src="previewUrl" alt="图标预览" class="preview-image" />
        <div class="preview-overlay">
          <button @click.stop="removeImage" class="remove-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="previewUrl" class="upload-actions">
      <button @click="confirmUpload" class="confirm-btn">确认使用</button>
      <button @click="removeImage" class="cancel-btn">重新选择</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconUploader',
  props: {
    agentId: {
      type: String,
      required: true
    },
    currentIcon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      previewUrl: '',
      selectedFile: null
    }
  },
  mounted() {
    if (this.currentIcon) {
      this.previewUrl = this.currentIcon
    }
  },
  beforeUnmount() {
    // 组件销毁前释放blob URL资源
    if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.previewUrl)
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        this.processFile(file)
      }
    },
    
    handleDrop(event) {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      if (file) {
        this.processFile(file)
      }
    },
    
    processFile(file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件（支持 PNG、JPG、SVG 格式）')
        return
      }
      
      // 检查文件大小 (限制为5MB，支持更大图片)
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB，请选择更小的图片')
        return
      }
      
      // 检查文件是否为空
      if (file.size === 0) {
        alert('文件为空，请选择有效的图片文件')
        return
      }
      
      this.selectedFile = file
      
      // 使用 createObjectURL 创建本地文件URL
      try {
        this.previewUrl = URL.createObjectURL(file)
        console.log('文件预览创建成功，文件大小:', file.size, 'bytes')
        console.log('本地URL:', this.previewUrl)
      } catch (error) {
        console.error('文件URL创建失败:', error)
        alert('文件处理失败，请重试')
        // 重置状态
        this.selectedFile = null
        this.previewUrl = ''
        this.$refs.fileInput.value = ''
      }
    },
    
    removeImage() {
      // 释放本地URL资源
      if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(this.previewUrl)
      }
      this.previewUrl = ''
      this.selectedFile = null
      this.$refs.fileInput.value = ''
    },
    
    confirmUpload() {
      if (this.selectedFile && this.previewUrl) {
        // 压缩图片并转换为base64
        this.compressAndSaveImage(this.selectedFile)
      } else if (this.previewUrl) {
        // 如果只是预览现有图标，直接保存
        try {
          this.saveIconToStorage(this.previewUrl)
          this.$emit('icon-uploaded', {
            agentId: this.agentId,
            iconUrl: this.previewUrl
          })
          this.showSuccessMessage()
        } catch (error) {
          console.error('保存失败:', error)
          alert('保存失败，请重试')
        }
      } else {
        alert('没有可保存的图片，请先选择图片')
      }
    },
    
    // 图片压缩方法
    compressAndSaveImage(file) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // 根据文件大小动态调整压缩参数
        let maxWidth, maxHeight, quality
        
        if (file.size > 3 * 1024 * 1024) { // 大于3MB
          maxWidth = 1000
          maxHeight = 1333
          quality = 0.7
        } else if (file.size > 1 * 1024 * 1024) { // 1-3MB
          maxWidth = 1200
          maxHeight = 1600
          quality = 0.8
        } else { // 小于1MB
          maxWidth = 1500
          maxHeight = 2000
          quality = 0.9
        }
        
        let { width, height } = img
        
        // 按比例缩放
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width *= ratio
          height *= ratio
        }
        
        // 设置canvas尺寸
        canvas.width = width
        canvas.height = height
        
        // 绘制压缩后的图片
        ctx.drawImage(img, 0, 0, width, height)
        
        // 转换为base64，使用动态质量参数
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        
        console.log('原文件大小:', file.size, 'bytes')
        console.log('压缩后base64大小:', compressedBase64.length, 'bytes')
        console.log('压缩比例:', ((file.size - compressedBase64.length) / file.size * 100).toFixed(1) + '%')
        console.log('压缩参数: 尺寸', width + 'x' + height, '质量', quality)
        
        // 如果压缩后仍然太大，进行二次压缩
        if (compressedBase64.length > 2 * 1024 * 1024) {
          console.log('进行二次压缩...')
          this.performSecondCompression(canvas, file, quality * 0.7)
          return
        }
        
        try {
          // 保存压缩后的base64到localStorage
          this.saveIconToStorage(compressedBase64)
          
          // 发送事件给父组件
          this.$emit('icon-uploaded', {
            agentId: this.agentId,
            iconUrl: compressedBase64,
            fileSize: file.size,
            fileName: file.name,
            compressedSize: compressedBase64.length
          })
          
          // 显示成功提示
          this.showSuccessMessage()
          
          // 清除选择状态，保持预览
          this.selectedFile = null
        } catch (error) {
          console.error('保存失败:', error)
          alert('保存失败，可能是存储空间不足，请选择更小的图片')
        }
      }
      
      img.onerror = () => {
        alert('图片处理失败，请重试')
      }
      
      // 加载图片
      img.src = this.previewUrl
    },
    
    // 二次压缩方法
    performSecondCompression(canvas, file, quality) {
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
      
      console.log('二次压缩后大小:', compressedBase64.length, 'bytes')
      
      try {
        this.saveIconToStorage(compressedBase64)
        
        this.$emit('icon-uploaded', {
          agentId: this.agentId,
          iconUrl: compressedBase64,
          fileSize: file.size,
          fileName: file.name,
          compressedSize: compressedBase64.length
        })
        
        this.showSuccessMessage()
        this.selectedFile = null
      } catch (error) {
        console.error('二次压缩保存失败:', error)
        alert('图片过大，请选择更小的图片')
      }
    },
    
    showSuccessMessage() {
      // 根据agentId显示不同的成功消息
      const message = this.agentId === 'book-cover' ? '书籍封面上传成功！' : '图标上传成功！'
      
      // 创建临时成功提示
      const successMsg = document.createElement('div')
      successMsg.textContent = message
      successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
      `
      
      // 添加动画样式
      const style = document.createElement('style')
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `
      document.head.appendChild(style)
      
      document.body.appendChild(successMsg)
      
      // 3秒后自动移除
      setTimeout(() => {
        successMsg.remove()
        style.remove()
      }, 3000)
    },
    
    saveIconToStorage(iconUrl) {
      try {
        const savedIcons = JSON.parse(localStorage.getItem('agentIcons') || '{}')
        
        // 直接保存base64字符串（简化存储格式）
        savedIcons[this.agentId] = iconUrl
        
        // 检查localStorage大小
        const dataString = JSON.stringify(savedIcons)
        if (dataString.length > 8 * 1024 * 1024) { // 8MB限制
          throw new Error('存储空间不足，请删除一些图标或选择更小的图片')
        }
        
        localStorage.setItem('agentIcons', dataString)
        
        // 添加调试信息
        console.log(`图标已保存到localStorage - AgentId: ${this.agentId}`)
        console.log('Base64大小:', iconUrl.length)
        console.log('总存储大小:', dataString.length)
      } catch (error) {
        console.error('localStorage保存失败:', error)
        throw error
      }
    }
  }
}
</script>

<style scoped>
.icon-uploader {
  width: 100%;
  max-width: 200px;
}

.upload-area {
  width: 100%;
  height: 120px;
  border: 2px dashed var(--theme-card-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--theme-card-bg);
  position: relative;
  overflow: hidden;
}

.upload-area:hover {
  border-color: var(--theme-highlight);
  background: rgba(255, 255, 255, 0.05);
}

.upload-placeholder {
  text-align: center;
  color: var(--theme-text-secondary);
}

.upload-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
  color: var(--theme-text-secondary);
}

.upload-text {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px 0;
}

.upload-hint {
  font-size: 12px;
  margin: 0;
  opacity: 0.7;
}

.preview-area {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background: white;
  padding: 2px;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-area:hover .preview-overlay {
  opacity: 1;
}

.remove-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: white;
  transform: scale(1.1);
}

.remove-btn svg {
  width: 16px;
  height: 16px;
  color: #e74c3c;
}

.upload-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.confirm-btn, .cancel-btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-btn {
  background: var(--theme-highlight);
  color: white;
}

.confirm-btn:hover {
  filter: brightness(1.1);
}

.cancel-btn {
  background: transparent;
  color: var(--theme-text-secondary);
  border: 1px solid var(--theme-card-border);
}

.cancel-btn:hover {
  background: var(--theme-card-bg);
}
</style>

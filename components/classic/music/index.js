// components/classic/music/index.js
import {classicBeh} from '../classic-beh'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached:function(event) {
    // 页面开关
    this._recoverStatus()
    // 后台开关控制
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = "music"
      }
      else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    // 恢复播放状态
    _recoverStatus: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      // 如果当前音乐与正在播放音乐相同
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch:function() {
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(()=>{
        this._recoverStatus()
      })
      mMgr.onStop(()=>{
        this._recoverStatus()
      })
      mMgr.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})

<template>
  <b-container>
    <b-row class="mx-auto my-4">
      <div class="embed-responsive embed-responsive-16by9">
        <video
          ref="video"
          class="embed-responsive-item"
          muted
          controls
          autoplay
          loop
          playsinline
        />
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Peer from 'skyway-js'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Watch'
    }
  },

  data() {
    return {
      room: null,
      video: null,
      localStream: null,
      peer: null,
      constraints: {
        video: true,
        audito: true
      }
    }
  },

  mounted() {
    this.video = this.$refs.video
    this.peer = new Peer({ key: process.env.SKYWAY_KEY })
    this.peer.on('open', () => {
      this.room = this.peer.joinRoom(process.env.MONITOR_ROOM_NAME)
      this.room.on('stream', stream => {
        this.video.srcObject = stream
        this.video.play()
      })
    })

    this.peer.on('error', err => {
      alert(err.message)
    })
  },

  beforeDestroy() {
    if (this.room) {
      this.room.close()
      this.room = null
    }
  }
}
</script>

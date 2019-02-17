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
      title: 'Live'
    }
  },

  data() {
    return {
      room: null,
      video: null,
      localStream: null,
      peer: null,
      constraints: {
        video: {
          facingMode: {
            exact: 'environment'
          }
        },
        audio: true
      }
    }
  },

  async mounted() {
    this.peer = new Peer({ key: process.env.SKYWAY_KEY })
    this.video = this.$refs.video
    await navigator.mediaDevices
      .getUserMedia(this.constraints)
      .then(stream => {
        this.localStream = stream
        this.video.srcObject = stream
        this.video.play()
        if (this.room) {
          this.room.replaceStream(stream)
        } else {
          this.room = this.peer.joinRoom(process.env.MONITOR_ROOM_NAME, {
            stream: stream
          })
        }
      })
      .catch(error => {
        console.error(`mediaDevice.getUserMedia() error: ${error}`) // eslint-disable-line no-console
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

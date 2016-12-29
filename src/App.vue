<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <hello></hello> -->
    <line-c :beats=16 :current-note=8 :on-notes= "[3, 7]" ></line-c>
    <line-c :beats=16 :current-note=2 :on-notes= "[1, 4]" ></line-c>
    <line-c :beats=16 :current-note=4 :on-notes= "[2, 8]" ></line-c>
  </div>
</template>

<script>
import Hello from './components/Hello'
import LineC from './components/Line'

// import Wad from "web-audio-daw"

// var saw = new Wad({source : 'square'})
// saw.setVolume(.25)
// saw.play({pitch: "C5"})
// saw.play({pitch: "E5"})
// saw.play({pitch: "G5"})

export default {
  name: 'app',
  components: {
    Hello, LineC
  },
  data: function() {
    return {
      isPlaying: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

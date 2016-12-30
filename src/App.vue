<template lang="pug">

    #app
        button(@click='togglePlay') Play / Stop
        button(@click='instruments++') Add Instrument
        label BPM: 
        input(type="text" v-model.number='bpm')
        hr

        instrument(v-for="i in instruments", :res = "res", :time = "time")
</template>

<script lang="coffee">
# import Hello from './components/Hello'
# import LineC from './components/Line'

Hello = require './components/Hello'
LineC = require './components/Line'
Instrument = require './components/Instrument'


# // import Wad from "web-audio-daw"

# // var saw = new Wad({source : 'square'})
# // saw.setVolume(.25)
# // saw.play({pitch: "C5"})
# // saw.play({pitch: "E5"})
# // saw.play({pitch: "G5"})


module.exports = {
    name: 'app',
    components: {
        Hello, LineC, Instrument
    }
    data: -> {
        time: -1
        res: 16
        isPlaying: false
        instruments: 1
        bpm: 120
    }
    methods: {
        nextTick: () ->
            if !(this.isPlaying)
                this.time = -1
                return
            timeBetweenBeats = (60 * 1000) / (this.bpm * this.res)
            this.time = (this.time + 1)
            # console.log this.time
            self = this
            setTimeout(
                () -> self.nextTick(),
                timeBetweenBeats)
        togglePlay: () ->
            if this.time == -1
                this.isPlaying = true
                this.nextTick()
            else
                this.time == -1
                this.isPlaying = false
    }
    # created: () ->
    #     this.nextTick()

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

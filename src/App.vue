<template lang="pug">
    #app
        h1 [ Insert better name here ]
        button(@click='togglePlay') Play / Stop
        button(@click='instruments++') Add Instrument
        label BPM: 
        input(type="text" v-model.number='bpm')
        hr

        instrument(v-for="i in instruments", :res = "res", :time = "time")
        a(href="https://github.com/bsteephenson/Step-Sequencer") Source

</template>

<script lang="coffee">

Hello = require './components/Hello'
LineC = require './components/Line'
Instrument = require './components/Instrument'



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
        bpm: 80
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

}
</script>

<style lang="stylus">
#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    // text-align: center
    color: #2c3e50
    margin-top: 60px

input, select, button
    margin: 10px


</style>

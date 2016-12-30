<template lang="pug">

    #app
        line-c(:beats = "beats", :current-note="currentBeat", v-for="(onNotes, pitch) in notes", :pitch = "pitch", :on-notes="onNotes", @toggle-box = "handleToggleBox")
</template>

<script lang="coffee">
# import Hello from './components/Hello'
# import LineC from './components/Line'

Hello = require './components/Hello'
LineC = require './components/Line'

Wad = require('web-audio-daw')

# // import Wad from "web-audio-daw"

# // var saw = new Wad({source : 'square'})
# // saw.setVolume(.25)
# // saw.play({pitch: "C5"})
# // saw.play({pitch: "E5"})
# // saw.play({pitch: "G5"})


module.exports = {
    name: 'app',
    components: {
        Hello, LineC
    },
    data: () ->
        bpm = 160
        measures = 8
        beats = 48
        timeBetweenBeats = (60 * 1000) / (bpm / measures * 16)
        console.log timeBetweenBeats, "time"
        return {
            # notes: [
            #     { pitch: "A3", onNotes: [0, 3, 6] }
            #     { pitch: "B3", onNotes: [0, 4, 6] }
            # ],
            notes : {
                "C6" : []
                "B5" : []
                "A#5" : []
                "A5" : []
                "G#5" : []
                "G5" : []
                "F#5" : []
                "F5" : []
                "E5" : []
                "D#5" : []
                "D5" : []
                "C#5" : []
                "C5" : []
                "B4" : []
                "A#4" : []
                "A4" : []
                "G#4" : []
                "G4" : []
                "F#4" : []
                "F4" : []
                "E4" : []
                "D#4" : []
                "D4" : []
                "C#4" : []
                "C4" : []
                "B3" : []
                "A#3" : []
                "A3" : []
                "G#3" : []
                "G3" : []
                "F#3" : []
                "F3" : []
                "E3" : []
                "D#3" : []
                "D3" : []
                "C#3" : []
                "C3" : []            }
            beats: beats
            timeBetweenBeats: timeBetweenBeats
            currentBeat: 0
        }
    methods: {
        nextTick: () ->
            self = this
            this.currentBeat = (this.currentBeat + 1) % this.beats
            # console.log this.currentBeat, "currentBeat"
            for pitch, onNotes of this.notes
                if (this.currentBeat in onNotes)
                    this.players[pitch][this.currentBeat].play()
                # else
                #     this.player.stop({pitch: pitch})
            setTimeout(
                () -> self.nextTick(),
                self.timeBetweenBeats)

        handleToggleBox: (pitch, pos) ->
            if pos in this.notes[pitch]
                index = this.notes[pitch].indexOf(pos);
                if(index != -1)
                    this.notes[pitch].splice( index, 1 );
            else
                this.notes[pitch].push(pos)
                this.players[pitch][0].play()

    }
    created: () ->
        console.log this.notes
        this.players = {}
        for pitch, notes of this.notes
            this.players[pitch] = {}
            for i in [0.. this.beats]
                saw = new Wad({
                    source : 'triangle',
                    pitch: pitch
                    env     : {   
                        attack  : 0.0,  
                        decay   : 1.5,  
                        sustain : 0.0,  
                        hold    : 0.0, #alue, oscillators must be manually stopped by calling their stop() method.
                        release : 0.00    
                    },
                    # delay   : {
                    #     delayTime : this.timeBetweenBeats / 1000.0 * 3, 
                    #     wet       : .25,
                    #     feedback  : .75,
                    # },
                    filter  : {
                        type      : 'lowpass', # What type of filter is applied.
                        frequency : 2000,       # The frequency, in hertz, to which the filter is applied.
                        q         : 1,         # Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
                    },
                })
                saw.setVolume(.25)
                this.players[pitch][i] = saw
                console.log(this.players[pitch][i])
        this.nextTick()
        console.log(this.players)

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

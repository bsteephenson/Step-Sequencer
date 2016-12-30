<template lang="pug">

    .instrument
        label Steps: 
        input(type="text", v-model.number='steps')
        label Measures: 
        input(type="text", v-model.number='measures')
        line-c(:beats = "steps", :current-note="currentStep", v-for="(onNotes, pitch) in notes", :pitch = "pitch", :on-notes="onNotes", @toggle-box = "handleToggleBox")
        hr
</template>

<script lang="coffee">
# import Hello from './components/Hello'
# import LineC from './components/Line'

Hello = require './Hello'
LineC = require './Line'

Tone = require('tone')

# // import Wad from "web-audio-daw"

# // var saw = new Wad({source : 'square'})
# // saw.setVolume(.25)
# // saw.play({pitch: "C5"})
# // saw.play({pitch: "E5"})
# // saw.play({pitch: "G5"})


module.exports = {
    name: 'instrument',
    components: {
        Hello, LineC
    },
    props: ['time', 'res']
    data: () ->
        # bpm = 160
        # measures = 8
        # beats = 48
        # timeBetweenBeats = (60 * 1000) / (bpm / measures * 16)
        # console.log timeBetweenBeats, "time"
        return {
            # notes: [
            #     { pitch: "A3", onNotes: [0, 3, 6] }
            #     { pitch: "B3", onNotes: [0, 4, 6] }
            # ],
            notes : {
                "C5" : []
                "B4" : []
                "A4" : []
                "G4" : []
                "F4" : []
                "E4" : []
                "D4" : []
                "C4" : []
            },
            steps: 16
            measures: 4
        }
    computed: {
        currentStep: () ->
            ticksPerStep = this.measures * this.res / this.steps
            # console.log 'ticksPerStep', ticksPerStep, this.time
            # console.log Math.floor(this.time / ticksPerStep) % this.steps, "currentStep"
            return Math.floor(this.time / ticksPerStep) % this.steps
    }
    watch: {
        currentStep: () ->
            # console.log "time"
            this.playNextStep()
        steps: () ->
            for key of this.notes
                this.notes[key] = []
    }
    methods: {
        playNextStep: () ->
            self = this
            # console.log this.currentBeat, "currentBeat"
            for pitch, onNotes of this.notes
                if (this.currentStep in onNotes)
                    this.player.triggerAttackRelease(pitch)
                # else
                #     this.player.stop({pitch: pitch})
            # setTimeout(
            #     () -> self.nextTick(),
            #     self.timeBetweenBeats)

        handleToggleBox: (pitch, pos) ->
            if pos in this.notes[pitch]
                index = this.notes[pitch].indexOf(pos);
                if(index != -1)
                    this.notes[pitch].splice( index, 1 );
            else
                this.notes[pitch].push(pos)
                this.player.triggerAttackRelease(pitch, "8n")
    }

    created: () ->
        # console.log this.notes
        this.player
        # saw = new Wad({
        #     source : 'triangle',
        #     env     : {   
        #         attack  : 0.0,  
        #         decay   : 1.5,  
        #         sustain : 0.0,  
        #         hold    : 0.0, #alue, oscillators must be manually stopped by calling their stop() method.
        #         release : 0.00    
        #     },
        #     # delay   : {
        #     #     delayTime : this.timeBetweenBeats / 1000.0 * 3, 
        #     #     wet       : .25,
        #     #     feedback  : .75,
        #     # },
        #     filter  : {
        #         type      : 'lowpass', # What type of filter is applied.
        #         frequency : 2000,       # The frequency, in hertz, to which the filter is applied.
        #         q         : 1,         # Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
        #     },
        # })
        
        synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
        synth.set({
            # "oscillator" : {
            #     "type" : "pwm",
            #     "modulationFrequency" : 0.2
            # },
            "envelope" : {
                "attack" : 0.01,
                "decay" : 2.0,
                "sustain" : 0.0,
                "release" : 0.9,
            }
        })
        this.player = synth
        # this.nextTick()
        # console.log(this.players)

}
</script>

<style lang="stylus">
.instrument
    margin-bottom: 50px
</style>

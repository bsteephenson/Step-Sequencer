<template lang="pug">

    .instrument
        label Steps: 
        input(type="text", v-model.number='steps')
        label Measures: 
        input(type="text", v-model.number='measures')
        label Transpose: 
        input(type="text", v-model.number='transpose')
        label Velocity %: 
        input(type="text", v-model.number='volume')
        label Synth type: 
        select(v-model="synth")
            option sine
            option sawtooth
            option square
            option triangle
        label Filter Cutoff Hz: 
        input(type="text", v-model.number='filterCutoff')
        label Distortion %: 
        input(type="text", v-model.number='distortion')
        label Chorus %: 
        input(type="text", v-model.number='chorus')
        label Reverb %: 
        input(type="text", v-model.number='reverbWet')
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
            synth: "sine"
            transpose: 0
            filterCutoff: 2000
            reverbWet: 10
            distortion: 0
            chorus: 0
            volume: 100
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
        synth: (val) ->
            this.player.set({
                oscillator: {
                    type: val
                }
            })
        transpose: (val) ->
            if isNaN(parseInt(val))
                val = 0
            this.player.set({
                oscillator: {
                    detune: val * 100
                }
                })
        filterCutoff: (val) ->
            if !isNaN(parseInt(val))
                this.filter.set({
                    frequency: val
                    })
        reverbWet: (val) ->
            if !isNaN(parseInt(val))
                this.reverb.set(wet: val / 100)            
        distortion: (val) ->
            if !isNaN(parseInt(val))
                this.distortionFx.set(wet: val / 100)            
                this.distortionFx.set(distortion: val / 100)            
        chorus: (val) ->
            if !isNaN(parseInt(val))
                this.chorusFx.set(wet: val / 100) 
        volume: (val) ->
            if !isNaN(parseInt(val))
                this.player.set(volume: val / 100) 

    }
    methods: {
        playNextStep: () ->
            self = this
            # console.log this.currentBeat, "currentBeat"
            for pitch, onNotes of this.notes
                if (this.currentStep in onNotes)
                    this.player.triggerAttackRelease(pitch, "8n", "+0", this.volume / 100)
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
                this.player.triggerAttackRelease(pitch, "8n", "+0", this.volume / 100)

    }

    created: () ->

        
        synth = new Tone.PolySynth(8, Tone.OmniSynth)

        synth.set({
            "oscillator" : {
                "type" : this.synth
                detune: this.transpose * 100
            }
        })

        defaultEnv = {
            "envelope" : {
                "attack" : 0.01,
                "decay" : 2.0,
                "sustain" : 0.0,
                "release" : 0.9,
            }
        }

        synth.set(defaultEnv)
        this.filter = new Tone.Filter(this.filterCutoff, "lowpass");
        # synth = new Tone.Noise("pink")
        # synth.connect(Tone.Master)

        this.synthPlayer = synth

        this.reverb = new Tone.Freeverb()
        this.reverb.set(wet: this.reverbWet / 100)

        this.distortionFx = new Tone.Distortion()
        this.distortionFx.set(wet: this.distortion / 100)
        this.distortionFx.set(distortion: this.distortion / 100)

        this.chorusFx = new Tone.Chorus()
        this.chorusFx.set(wet: this.chorus / 100)

        synth.connect(this.filter)
        this.filter.connect(this.distortionFx)
        this.distortionFx.connect(this.chorusFx)
        this.chorusFx.connect(this.reverb)
        this.reverb.connect(Tone.Master)
        this.player = synth
        this.player.set(volume: this.volume / 100)
        # this.nextTick()
        # console.log(this.players)

}
</script>

<style lang="stylus">
.instrument
    margin-bottom: 50px
</style>

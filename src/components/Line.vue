<template lang="pug">
    .box-container
        .box(v-for="(elem, index) in beatsArray", :class="{active: elem, played: index == currentNote}")
</template>

<script lang="coffee">

Wad = require('web-audio-daw')
# saw = new Wad({source : 'square'})
# saw.setVolume(.25)
# saw.play({pitch: "C5"})
# saw.play({pitch: "E5"})
# saw.play({pitch: "G5"})

module.exports = {
    name: 'line'
    props: ['beats', 'currentNote', 'onNotes']
    computed: {
        beatsArray: () ->
            it = new Array(this.beats)
            for onNote in @onNotes
                it[onNote] = true
            console.log it
            return it
    }
}

</script>

<style lang="stylus">
.box-container
    display:flex
    flex-direction: row
    justify-content: space-between
.box
    background-color: alpha(black, .05)
    margin: 10px
    height: 50px
    width: 50px
    &.active
        background-color:alpha(black, .25)
    &.played
        background-color: alpha(green, .5)
</style>

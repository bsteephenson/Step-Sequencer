<script lang="coffee">
presetMap = {}
presetMap["None"] =
  {
      synth: "none"
      transpose: "none"
      filterCutoff: "none"
      decay: "none"
      attack: "none"
      release: "none"
      sustain: "none"
  }
presetMap["Kick"] =
  {
      synth: "sine"
      transpose: -4
      filterCutoff: 1000
      decay: 0.01
      attack: 0.02
      release: 0.01
      sustain: 0.01
  }

module.exports = {
    name: "preset",
    get: (val) -> return presetMap[val]
}
</script>

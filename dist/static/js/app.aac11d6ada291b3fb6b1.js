webpackJsonp([1,0],[function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}var r=n(22),o=s(r),i=n(16),a=s(i);window.vm=new o.default({el:"#app",template:"<App/>",components:{App:a.default}})},,function(t,e,n){n(9);var s=n(1)(n(4),n(19),"data-v-4d1f3b45",null);t.exports=s.exports},function(t,e,n){n(8);var s=n(1)(n(7),n(18),null,null);t.exports=s.exports},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"hello",data:function(){return{msg:"Welcome to Your Vue.js App"}}}},function(t,e,n){var s,r,o;s=n(2),o=n(3),r=n(17),t.exports={name:"app",components:{Hello:s,LineC:o,Instrument:r},data:function(){return{time:-1,res:16,isPlaying:!1,instruments:1,bpm:80,globalTranspose:0}},methods:{nextTick:function(){var t,e;return this.isPlaying?(e=6e4/(this.bpm*this.res),this.time=this.time+1,t=this,setTimeout(function(){return t.nextTick()},e)):void(this.time=-1)},togglePlay:function(){return this.time===-1?(this.isPlaying=!0,this.nextTick()):(this.time===-1,this.isPlaying=!1)}}}},function(t,e,n){var s,r,o,i=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1};s=n(2),r=n(3),o=n(15),t.exports={name:"instrument",components:{Hello:s,LineC:r},props:["time","res","globalTranspose"],data:function(){return{notes:{C5:[],B4:[],A4:[],G4:[],F4:[],E4:[],D4:[],C4:[]},steps:16,measures:4,synth:"sine",transpose:0,filterCutoff:3e3,volume:80,attack:.01,decay:2}},computed:{currentStep:function(){var t;return t=this.measures*this.res/this.steps,Math.floor(this.time/t)%this.steps},computedTranspose:function(){return this.transpose+this.globalTranspose}},watch:{currentStep:function(){return this.playNextStep()},steps:function(){var t,e;e=[];for(t in this.notes)e.push(this.notes[t]=[]);return e},synth:function(t){return this.player.set({oscillator:{type:t}}),o.context.resume(),this.player.triggerAttackRelease("C4","8n","+0",this.volume/100)},computedTranspose:function(t){return isNaN(t)&&(t=0),this.player.set({oscillator:{detune:100*t}})},filterCutoff:function(t){if(!isNaN(parseInt(t))&&parseInt(t)>0)return this.filter.set({frequency:t})},volume:function(t){if(!isNaN(parseInt(t)))return this.player.set({volume:t/100})},attack:function(t){if(!isNaN(parseInt(t)))return this.player.set({envelope:{attack:t}})},decay:function(t){if(!isNaN(parseInt(t)))return this.player.set({envelope:{decay:t,release:t}})}},methods:{playNextStep:function(){var t,e,n,s,r,a;a=this,n=this.notes,r=[];for(e in n)t=n[e],s=this.currentStep,i.call(t,s)>=0?(o.context.resume(),r.push(this.player.triggerAttackRelease(e,"8n","+0",this.volume/100))):r.push(void 0);return r},handleToggleBox:function(t,e){var n;return i.call(this.notes[t],e)>=0?(n=this.notes[t].indexOf(e),n!==-1?this.notes[t].splice(n,1):void 0):(this.notes[t].push(e),o.context.resume(),this.player.triggerAttackRelease(t,"8n","+0",this.volume/100))}},created:function(){var t,e;return e=new o.PolySynth(4,o.OmniSynth),e.set({oscillator:{type:this.synth,detune:100*this.transpose}}),t={envelope:{attack:this.attack,decay:this.decay,sustain:0,release:this.decay}},e.set(t),this.filter=new o.Filter(this.filterCutoff,"lowpass"),this.synthPlayer=e,e.connect(this.filter),this.filter.connect(o.Master),this.player=e,this.player.set({volume:this.volume/100}),this.player.set({oscillator:{detune:100*this.computedTranspose}})}}},function(t,e){t.exports={name:"line",props:["beats","currentNote","onNotes","pitch"],computed:{beatsArray:function(){var t,e,n,s,r;for(e=new Array(this.beats),r=this.onNotes,t=0,n=r.length;t<n;t++)s=r[t],s<this.beats&&(e[s]=!0);return e}},methods:{handleClick:function(t){return this.$emit("toggle-box",this.pitch,t)}}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,function(t,e,n){n(11);var s=n(1)(n(5),n(21),null,null);t.exports=s.exports},function(t,e,n){n(10);var s=n(1)(n(6),n(20),null,null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box-container"},t._l(t.beatsArray,function(e,s){return n("div",{staticClass:"box",class:{active:e,played:s==t.currentNote},on:{click:function(e){t.handleClick(s)}}})}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("Core Docs")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("Forum")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://gitter.im/vuejs/vue",target:"_blank"}},[t._v("Gitter Chat")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("Twitter")])]),t._v(" "),n("br"),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("Docs for This Template")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[t._v("vue-router")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[t._v("vuex")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[t._v("vue-loader")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[t._v("awesome-vue")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"instrument"},[n("div",{staticClass:"controls"},[n("div",[n("label",[t._v("Steps: ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.steps,expression:"steps",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.steps},on:{input:function(e){e.target.composing||(t.steps=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",[n("label",[t._v("Measures: ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.measures,expression:"measures",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.measures},on:{input:function(e){e.target.composing||(t.measures=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",[n("label",[t._v("Transpose (semitones): ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.transpose,expression:"transpose",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.transpose},on:{input:function(e){e.target.composing||(t.transpose=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",[n("label",[t._v("Velocity (%): ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.volume,expression:"volume",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.volume},on:{input:function(e){e.target.composing||(t.volume=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",[n("label",[t._v("Synth type: ")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.synth,expression:"synth"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.synth=e.target.multiple?n:n[0]}}},[n("option",{attrs:{disabled:"disabled"}}),n("option",[t._v("sine")]),n("option",[t._v("sawtooth")]),n("option",[t._v("square")]),n("option",[t._v("triangle")]),n("option",{attrs:{disabled:"disabled"}}),n("option",[t._v("sine4")]),n("option",[t._v("sawtooth4")]),n("option",[t._v("square4")]),n("option",[t._v("triangle4")]),n("option",{attrs:{disabled:"disabled"}}),n("option",[t._v("fmsine")]),n("option",[t._v("fmsawtooth")]),n("option",[t._v("fmsquare")]),n("option",[t._v("fmtriangle")]),n("option",{attrs:{disabled:"disabled"}}),n("option",[t._v("fatsine")]),n("option",[t._v("fatsawtooth")]),n("option",[t._v("fatsquare")]),n("option",[t._v("fattriangle")])])]),n("div",[n("label",[t._v("Attack (seconds): ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.attack,expression:"attack",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.attack},on:{input:function(e){e.target.composing||(t.attack=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",[n("label",[t._v("Decay (seconds): ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.decay,expression:"decay",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.decay},on:{input:function(e){e.target.composing||(t.decay=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",[n("label",[t._v("Filter cutoff (hz): ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.filterCutoff,expression:"filterCutoff",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.filterCutoff},on:{input:function(e){e.target.composing||(t.filterCutoff=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})])]),n("div",{staticClass:"boxes"},t._l(t.notes,function(e,s){return n("line-c",{attrs:{beats:t.steps,"current-note":t.currentStep,pitch:s,"on-notes":e},on:{"toggle-box":t.handleToggleBox}})}))]),n("hr")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("h1",[t._v("Music is fun")]),n("button",{on:{click:t.togglePlay}},[t._v("Play / Stop")]),n("button",{on:{click:function(e){t.instruments++}}},[t._v("Add Instrument")]),n("label",[t._v("BPM: ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.bpm,expression:"bpm",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.bpm},on:{input:function(e){e.target.composing||(t.bpm=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}}),n("label",[t._v("Min step resolution:")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.res,expression:"res",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.res},on:{input:function(e){e.target.composing||(t.res=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}}),n("label",[t._v("Global transpose:")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.globalTranspose,expression:"globalTranspose",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:t.globalTranspose},on:{input:function(e){e.target.composing||(t.globalTranspose=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}}),n("hr"),t._l(t.instruments,function(e){return n("instrument",{attrs:{res:t.res,time:t.time,globalTranspose:t.globalTranspose}})}),n("a",{attrs:{href:"https://github.com/bsteephenson/Step-Sequencer"}},[t._v("Source")])],2)},staticRenderFns:[]}}]);
//# sourceMappingURL=app.aac11d6ada291b3fb6b1.js.map
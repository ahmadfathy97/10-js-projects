<template>
  <div class="code-container">
    <div class="header">
      <span>{{title | UpperCase}}</span>
    </div>
    <codemirror v-model="code" :options="cmOptions" @changes="updateResult($event)" />
  </div>
</template>

<script>
// the main component
import { codemirror } from 'vue-codemirror';
//the main style sheet
import 'codemirror/lib/codemirror.css';
//theme
import 'codemirror/theme/material-darker.css';
//modes
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/javascript/javascript.js';


export default {
  components:{
    codemirror
  },
  data () {
    return {
      code: '',
      cmOptions: {
        tabSize: 2,
        mode: '',
        theme: 'material-darker',
        lineNumbers: true,
        line: true,
        lint: true,
        lineWrapping: true
      }
    }
  },
  props: ["title", "lang"],
  mounted(){
    this.cmOptions.mode = this.lang
  },
  methods:{
    updateResult(e){
      this.$emit('update-result', {lang: e.doc.modeOption ,code: this.code});
    }
  },
  filters:{
    UpperCase(val){
      if(!val) return;
      return val.toString().toUpperCase();
    }
  }
}
</script>

<style scoped>
.code-container{
  background: #444;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 0 5px rgba(20,20,20,.6);
  overflow: hidden;
}
.code-container .header{
  /*background: #444;*/
  padding: .5rem .5rem .5rem 1rem;
  color: #f8f8f8;
  font-size: 22px;
  border-radius: 15px 15px 0 0;
}


</style>

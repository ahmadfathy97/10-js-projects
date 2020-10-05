<template>
  <div id="app">
    <div class="code">
      <CodeContainer title="html" lang="xml" @update-result="update($event)" />
      <CodeContainer title="css" lang="css" @update-result="update($event)" />
      <CodeContainer title="js" lang="javascript" @update-result="update($event)" />
    </div>
    <div class="result">
      <iframe
        :srcdoc="srcDoc"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height=""></iframe>
    </div>
  </div>
</template>

<script>
import CodeContainer from './components/CodeContainer.vue'

export default {
  name: 'App',
  components: {
    CodeContainer
  },
  data(){
    return{
      xml: '',
      css: '',
      javascript: '',
      srcDoc: ''
    }
  },
  methods:{
    update(obj){
      if(obj.lang === 'xml') this.xml = obj.code
      if(obj.lang === 'css') this.css = obj.code
      if(obj.lang === 'javascript') this.javascript = obj.code
      this.srcDoc = `
      <html>
        <head>
          <style>${this.css}</style>
        </head>
        <body>
          ${this.xml}
          <script>${this.javascript}</script>
          // there is an error here the iframe doesn't accept scrpt tag :(
        </body>
      </html>
      `
    }
    // ,
    // waitSec(obj){
    //   let timeout = setTimeout(()=>{
    //     this.update(obj);
    //   },800)
    //   return clearTimeout(timeout);
    // }
  }
}
</script>

<style>
*{padding: 0;margin: 0;box-sizing: border-box;}
*::-webkit-scrollbar {
    width: 1em;
}
body::-webkit-scrollbar-track {
  background: #222;
}
*::-webkit-scrollbar-thumb {
    background: #f8f8f8;
    cursor: pointer;
    box-shadow: 0px 0px 0px #888 inset;
}
*::-webkit-scrollbar-thumb:hover {
    box-shadow: 0px 0px 5px #888 inset;
}

.code{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .25rem;
  padding: .25rem;
}
.vue-codemirror{
  height: 300px;
  padding: 5px;

}
.CodeMirror{
  height: 100% !important;
}
.result iframe{
  display: block;
  min-height: 100vh;
}
</style>

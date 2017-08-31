<template>
  <script :id="randomId" name="content" type="text/plain"></script>
</template>
<script>
  export default {
    name: 'VueUEditor',
    props: {
      ueditorPath: {
        type: String,
        default: '/static/ueditor1_4_3_3/'
      },
      ueditorConfig: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    data () {
      return {
        randomId: 'editor_' + (Math.random() * 100000000000000000),
        instance: null,
        scriptTagStatus: 0
      }
    },
    created () {
      if (window.UE !== undefined) {
        this.scriptTagStatus = 2
        this.initEditor()
      } else {
        this.insertScriptTag()
      }
    },
    mounted() {
    },
    beforeDestory () {
      if (this.instance !== null && this.instance.destroy){
        this.instance.destroy()
      }
    },
    methods: {
      insertScriptTag () {
        let editorScriptTag = document.getElementById("editorScriptTag")
        let configScriptTag = document.getElementById("configScriptTag") 
        if(editorScriptTag === null) {
          editorScriptTag = document.createElement('script')
          editorScriptTag.type = 'text/javascript'
          editorScriptTag.src = this.ueditorPath + 'ueditor.all.js'
          editorScriptTag.id = 'editorScriptTag'
          configScriptTag = document.createElement('script')
          configScriptTag.type = 'text/javascript'
          configScriptTag.src = this.ueditorPath + 'ueditor.config.js'
          configScriptTag.id = 'configScriptTag'
          let s = document.getElementsByTagName('head')[0]
          s.appendChild(editorScriptTag)
          s.appendChild(configScriptTag)
        }
        if(configScriptTag.loaded) {
          this.scriptTagStatus++
        } else {
          configScriptTag.addEventListener('load', () => {
            this.scriptTagStatus++
            configScriptTag.loaded = true
            this.initEditor()
          })
        }
        if(editorScriptTag.loaded) {
          this.scriptTagStatus++
        } else {
          editorScriptTag.addEventListener('load', () => {
            this.scriptTagStatus++
            editorScriptTag.loaded = true
            this.initEditor()
          })
        }
        this.initEditor()
      },
      initEditor () {
        console.log(this.scriptTagStatus)
        if (this.scriptTagStatus === 2 && this.instance === null) {
          this.$nextTick(() => {
            this.instance = window.UE.getEditor(this.randomId,this.ueditorConfig)
            this.instance.addListener('ready', () => {
              this.$emit('ready', this.instance)
            });
          })
        }
      }
    }
  }
</script>
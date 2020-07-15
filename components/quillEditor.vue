<template>
  <div>
    <quill-editor ref="editor" v-model="content" :options="editorOption" />
  </div>
</template>

<script>
export default {
  props: ['previousContent'],
  data() {
    return {
      content: this.previousContent || '',
      editorOption: {
        theme: 'snow',
        placeholder: 'Spill that shit...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: 1 }, { header: 2 }, 'blockquote'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['video'],
            [{ header: [1, 2, 3, 4, 5, 6, false] }]
          ]
        }
      }
    };
  }
};
</script>

<style scoped>
.quill-editor {
  background-color: var(--color-4);
  overflow-y: auto;
  margin: 0 30px;
  border-radius: 8px;
}
</style>

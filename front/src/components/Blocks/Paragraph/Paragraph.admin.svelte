<script>
  import showdown from "showdown";
  export let content = "";
  const converter = new showdown.Converter({ simpleLineBreaks: true });
</script>

<p contenteditable="true">
  {@html converter.makeHtml(content)}
</p>

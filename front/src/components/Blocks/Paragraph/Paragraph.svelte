<script>
  import showdown from "showdown";
  export let content = "";
  const converter = new showdown.Converter({ simpleLineBreaks: true });
</script>

<p>
  {@html converter.makeHtml(content)}
</p>

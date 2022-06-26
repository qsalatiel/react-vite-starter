export const TINYMCE_TOOLBAR = `
image paste |
bold italic strikethrough underline table |
charmap tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry |
alignleft aligncenter alignright alignjustify |
bullist numlist outdent indent | 
removeformat |
undo redo
`

export const TINYMCE_PLUGINS = [
  'advlist autolink lists link image charmap anchor',
  'searchreplace code fullscreen imagetools charmap',
  'insertdatetime media table paste code wordcount',
]

export const TINYMCE_CONTENT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
body { font-family:"Open Sans",Helvetica,Arial,sans-serif; font-size:16px }
`

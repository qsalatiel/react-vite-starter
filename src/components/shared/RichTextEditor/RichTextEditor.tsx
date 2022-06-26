import { Editor } from '@tinymce/tinymce-react'
import $ from 'jquery'
import '@wiris/mathtype-tinymce5'
import { FormControl, FormLabel } from '@chakra-ui/react'

import './RichTextEditor.css'
import { useRef } from 'react'
import { TINYMCE_CONTENT_STYLE, TINYMCE_PLUGINS, TINYMCE_TOOLBAR } from '@config/tinymce'

const jsDemoImagesTransform = document.createElement('script')
jsDemoImagesTransform.type = 'text/javascript'
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image'
document.head.appendChild(jsDemoImagesTransform)

window.$ = $

interface Props {
  value: string
  label: string
  height: number
  onChange: (value: string) => void
  inline?: boolean
}

export const RichTextEditor = ({
  value,
  label,
  height,
  inline = false,
  onChange,
}: Props): JSX.Element => {
  const ref = useRef<unknown>(null)

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Editor
        onInit={(_, editor): void => {
          ref.current = editor

          editor.targetElm.addEventListener('paste', event => {
            const paste = (event.clipboardData || window.clipboardData).getData('text')
          })
        }}
        onEditorChange={(editorValue): void => {
          if (editorValue) {
            onChange(editorValue)
          }
        }}
        value={value}
        init={{
          height,
          language: 'pt-BR',
          language_url: '/tinymce_pt_BR.js',
          menubar: false,
          inline,
          external_plugins: {
            tiny_mce_wiris: '/plugin.min.js',
          },
          plugins: TINYMCE_PLUGINS,
          toolbar: TINYMCE_TOOLBAR,
          content_style: TINYMCE_CONTENT_STYLE,
          paste_data_images: true,
          htmlAllowedTags: ['.*'],
          htmlAllowedAttrs: ['.*'],
          file_picker_callback: (cb, value, meta) => {
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'image/*')

            input.addEventListener('change', e => {
              const file = e.target.files[0]

              const reader = new FileReader()
              reader.addEventListener('load', () => {
                /*
              Note: Now we need to register the blob in TinyMCEs image blob
              registry. In the next release this part hopefully won't be
              necessary, as we are looking to handle it internally.
            */
                const id = `blobid${new Date().getTime()}`
                const { blobCache } = tinymce.activeEditor.editorUpload
                const base64 = reader.result.split(',')[1]
                const blobInfo = blobCache.create(id, file, base64)
                blobCache.add(blobInfo)

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name })
              })
              reader.readAsDataURL(file)
            })

            input.click()
          },
        }}
      />
    </FormControl>
  )
}

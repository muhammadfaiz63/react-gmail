import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import StaticVar from 'config/StaticVar'

export default function InputTextArea(props) {
  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'blockQuote',
        'insertTable',
        '|',
        'imageUpload',
        'undo',
        'redo',
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  }

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader)
    }
  }

  class MyUploadAdapter {
    constructor(props) {
      // CKEditor 5's FileLoader instance.
      this.loader = props
      // URL where to send files.
      this.url = StaticVar.URL_API + '/upload/imgbase'
    }

    // Starts the upload process.
    upload() {
      return new Promise((resolve, reject) => {
        this._initRequest()
        this._initListeners(resolve, reject)
        this._sendRequest()
      })
    }

    // Aborts the upload process.
    abort() {
      if (this.xhr) {
        this.xhr.abort()
      }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
      const xhr = (this.xhr = new XMLHttpRequest())

      xhr.open('POST', this.url, true)
      xhr.responseType = 'json'
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhr.setRequestHeader('authtoken', localStorage.authtoken)
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject) {
      const xhr = this.xhr
      const loader = this.loader
      console.log('loader', loader)
      const genericErrorText =
        "Couldn't upload file:" + ` ${loader?.file?.name}.`

      xhr.addEventListener('error', () => reject(genericErrorText))
      xhr.addEventListener('abort', () => reject())
      xhr.addEventListener('load', () => {
        const response = xhr.response
        if (!response || response.error) {
          return reject(
            response && response.error
              ? response.error.message
              : genericErrorText,
          )
        }

        // If the upload is successful, resolve the upload promise with an object containing
        // at least the "default" URL, pointing to the image on the server.
        resolve({
          default: StaticVar.API_SERVICES + '/upload/' + response,
        })
      })

      if (xhr.upload) {
        xhr.upload.addEventListener('progress', (evt) => {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total
            loader.uploaded = evt.loaded
          }
        })
      }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
      this.loader.file.then(async (result) => {
        let reader = new FileReader()
        let xhr = this.xhr
        reader.readAsDataURL(result)
        reader.onload = function () {
          const base64String = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '')
          const dateNow = Date.now()
          xhr.send(
            JSON.stringify({
              rootfile: `repo/img/questionbank/`,
              filename: `image-${dateNow}.png`,
              filedata: base64String,
            }),
          )
        }
      })
    }
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      onReady={(editor) => {
        editor.editing.view.change((writer) => {
          writer.setStyle(
            'height',
            '150px',
            editor.editing.view.document.getRoot(),
          )
        })
      }}
      config={custom_config}
      onChange={props?.handleChange}
      data={props.value}
      {...props}
    />
  )
}

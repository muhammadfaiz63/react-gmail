import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export default function InputTextArea(props) {
	const custom_config = {
		extraPlugins: [MyCustomUploadAdapterPlugin],
		toolbar: {
			items: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "blockQuote", "insertTable", "|", "imageUpload", "undo", "redo"]
		},
		table: {
			contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
		}
	}

	function MyCustomUploadAdapterPlugin(editor) {
		editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
			return new MyUploadAdapter(loader)
		}
	}

	const uploadAdapter = () => {}

	class MyUploadAdapter {
		constructor(props) {
			// CKEditor 5's FileLoader instance.
			this.loader = props
			// URL where to send files.
			//   console.log(
			//     'post_upload_content_editor_photo',
			//     post_upload_content_editor_photo,
			//   )
			this.url = ``
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

			xhr.open("POST", this.url, true)
			xhr.responseType = "json"
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
			// xhr.setRequestHeader('Authorization', getToken())
		}

		// Initializes XMLHttpRequest listeners.
		_initListeners(resolve, reject) {
			const xhr = this.xhr
			const loader = this.loader
			const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`

			xhr.addEventListener("error", () => reject(genericErrorText))
			xhr.addEventListener("abort", () => reject())
			xhr.addEventListener("load", () => {
				const response = xhr.response
				if (!response || response.error) {
					return reject(response && response.error ? response.error.message : genericErrorText)
				}

				// If the upload is successful, resolve the upload promise with an object containing
				// at least the "default" URL, pointing to the image on the server.
				resolve({
					default: response.s3Url
				})
			})

			if (xhr.upload) {
				xhr.upload.addEventListener("progress", (evt) => {
					if (evt.lengthComputable) {
						loader.uploadTotal = evt.total
						loader.uploaded = evt.loaded
					}
				})
			}
		}

		// Prepares the data and sends the request.
		_sendRequest() {
			const data = new FormData()

			this.loader.file.then((result) => {
				data.append("file", result)
				this.xhr.send(data)
			})
		}
	}

	return (
		<CKEditor
			editor={ClassicEditor}
			onReady={(editor) => {
				editor.editing.view.change((writer) => {
					writer.setStyle("height", "450px", editor.editing.view.document.getRoot())
				})
			}}
			config={custom_config}
			onChange={props?.handleChange}
			data={props.value}
			{...props}
		/>
	)
}

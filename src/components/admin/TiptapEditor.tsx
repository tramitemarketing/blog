'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[400px] font-serif text-ghiaccio leading-[1.85] text-[17px]',
      },
    },
  })

  if (!editor) return null

  const e = editor

  function toggleBold() { e.chain().focus().toggleBold().run() }
  function toggleItalic() { e.chain().focus().toggleItalic().run() }
  function toggleBlockquote() { e.chain().focus().toggleBlockquote().run() }
  function toggleH2() { e.chain().focus().toggleHeading({ level: 2 }).run() }
  function toggleH3() { e.chain().focus().toggleHeading({ level: 3 }).run() }

  function setLink() {
    const url = prompt('URL del link:')
    if (url) {
      e.chain().focus().setLink({ href: url }).run()
    } else {
      e.chain().focus().unsetLink().run()
    }
  }

  function insertImage() {
    const url = prompt('URL immagine (ImgBB / Cloudinary):')
    if (url) e.chain().focus().setImage({ src: url }).run()
  }

  const btnBase = 'px-3 py-1.5 font-sans text-[10px] uppercase tracking-[2px] border transition-colors'
  const btnActive = 'border-oro text-oro bg-oro/10'
  const btnInactive = 'border-ghiaccio/20 text-ghiaccio/50 hover:border-ghiaccio/40'

  return (
    <div className="border border-ghiaccio/20 rounded-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b border-ghiaccio/10 bg-viola-profondo">
        <button type="button" onClick={toggleBold} className={`${btnBase} ${editor.isActive('bold') ? btnActive : btnInactive} font-bold`}>B</button>
        <button type="button" onClick={toggleItalic} className={`${btnBase} ${editor.isActive('italic') ? btnActive : btnInactive} italic`}>I</button>
        <button type="button" onClick={toggleBlockquote} className={`${btnBase} ${editor.isActive('blockquote') ? btnActive : btnInactive}`}>&ldquo;&rdquo;</button>
        <button type="button" onClick={toggleH2} className={`${btnBase} ${editor.isActive('heading', { level: 2 }) ? btnActive : btnInactive}`}>H2</button>
        <button type="button" onClick={toggleH3} className={`${btnBase} ${editor.isActive('heading', { level: 3 }) ? btnActive : btnInactive}`}>H3</button>
        <button type="button" onClick={setLink} className={`${btnBase} ${editor.isActive('link') ? btnActive : btnInactive}`}>Link</button>
        <button type="button" onClick={insertImage} className={`${btnBase} ${btnInactive}`}>Img</button>
      </div>

      {/* Editor area */}
      <div className="p-6 bg-viola-notte min-h-[400px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

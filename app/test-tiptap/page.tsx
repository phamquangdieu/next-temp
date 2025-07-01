'use client'


// Usage in your Next.js component
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { CustomHeading } from './custom'
import { useState, useEffect } from 'react'
import { Markdown } from 'tiptap-markdown'

export default function MyEditor() {
  const [markdown, setMarkdown] = useState('')
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the default heading extension
        heading: false,
      }),
      // Use our custom heading extension
      CustomHeading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Markdown,
    ],
    content: '<p>Type ! followed by a space to create a heading!</p>',
    onUpdate: ({ editor }) => {
        const markdown = editor.storage.markdown.getMarkdown();
      // Convert HTML content to Markdown
      setMarkdown(markdown)
    }
  })

  // Function to set heading level
  const setHeading = (level: number) => {
    editor?.chain().focus().setHeading({ level }).run()
  }

  // Function to convert to paragraph
  const setParagraph = () => {
    editor?.chain().focus().unsetHeading().run()
  }

  // Check if heading is active
  const isHeadingActive = (level: number) => {
    return editor?.isActive('heading', { level }) ?? false
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <div className="editor-toolbar">
          <button 
            onClick={() => setParagraph()}
            className={`toolbar-button ${editor?.isActive('paragraph') ? 'active' : ''}`}
          >
            Paragraph
          </button>
          {[1, 2, 3, 4, 5, 6].map(level => (
            <button 
              key={level}
              onClick={() => setHeading(level)}
              className={`toolbar-button ${isHeadingActive(level) ? 'active' : ''}`}
            >
              H{level}
            </button>
          ))}
        </div>
        <EditorContent editor={editor} />
      </div>
      
      <div className="markdown-preview">
        <h3>HTML Output</h3>
        <pre>{markdown}</pre>
      </div>
      
      <style jsx>{`
        .editor-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 800px;
          margin: 20px auto;
        }
        .editor-container {
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow: hidden;
        }
        .editor-toolbar {
          display: flex;
          padding: 8px;
          border-bottom: 1px solid #ccc;
          background-color: #f5f5f5;
        }
        .toolbar-button {
          margin-right: 5px;
          padding: 4px 8px;
          border: 1px solid #ddd;
          background-color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .toolbar-button:hover {
          background-color: #f0f0f0;
        }
        .toolbar-button.active {
          background-color: #e3e3e3;
          font-weight: bold;
        }
        .markdown-preview {
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 16px;
          background-color: #f9f9f9;
        }
        .markdown-preview h3 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #333;
        }
        .markdown-preview pre {
          background-color: #fff;
          padding: 10px;
          border-radius: 4px;
          overflow-x: auto;
          border: 1px solid #eee;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  )
}
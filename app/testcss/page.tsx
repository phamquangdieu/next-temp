'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { Markdown } from 'tiptap-markdown';
import { marked } from 'marked';

// Create proper type interfaces for our extension
interface CustomToken {
  type: string;
  raw: string;
  depth: number;
  text: string;
  tokens: any[];
}

const TestCSSPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  // Configure marked to handle custom heading syntax
  useEffect(() => {
    // Simpler approach - use marked's built-in extensions API
    const customRenderer = {
      name: 'customHeadings',
      level: 'block' as const,
      // Custom renderer that converts ! syntax to proper headings
      renderer(token: any) {
        // Process content between tags properly
        return token.raw;
      },
    };

    // Add a preprocessor to convert our custom syntax to standard markdown
    const processCustomSyntax = {
      name: 'customSyntaxProcessor',
      level: 'block' as const,
      start(src: string) {
        const match = src.match(/^!{1,3} /);
        return match ? match.index : undefined;
      },
      tokenizer(src: string) {
        const h1Rule = /^! (.+)$/m;
        const h2Rule = /^!! (.+)$/m;
        const h3Rule = /^!!! (.+)$/m;

        let match;

        if ((match = h1Rule.exec(src))) {
          return {
            type: 'heading',
            raw: match[0],
            depth: 1,
            text: match[1],
            tokens: [],
          };
        }

        if ((match = h2Rule.exec(src))) {
          return {
            type: 'heading',
            raw: match[0],
            depth: 2,
            text: match[1],
            tokens: [],
          };
        }

        if ((match = h3Rule.exec(src))) {
          return {
            type: 'heading',
            raw: match[0],
            depth: 3,
            text: match[1],
            tokens: [],
          };
        }

        return undefined;
      },
    };

    // Set options for marked
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    // Convert custom syntax to standard markdown before rendering
    const originalMarked = marked;
    const customMarked = (
      markdown: string,
      options?: Parameters<typeof marked>[1]
    ) => {
      // Convert custom heading syntax to standard markdown
      const standardizedMarkdown = markdown
        .replace(/^! (.+)$/gm, '# $1')
        .replace(/^!! (.+)$/gm, '## $1')
        .replace(/^!!! (.+)$/gm, '### $1');

      // Use standard marked with our preprocessed markdown
      return originalMarked(standardizedMarkdown, options);
    };

    // Replace the global marked function with our custom one
    (window as any).originalMarked = marked;
    (window as any).customMarked = customMarked;
  }, []);

  // Helper function to replace heading markdown symbols
  const replaceHeadingSymbols = (markdown: string) => {
    return markdown
      .replace(/^# (.+)$/gm, '! $1') // Replace # with ! for H1
      .replace(/^## (.+)$/gm, '!! $1') // Replace ## with !! for H2
      .replace(/^### (.+)$/gm, '!!! $1'); // Replace ### with !!! for H3
  };

  // Helper function to parse markdown content safely
  const parseMarkdown = (markdown: string) => {
    try {
      // Convert custom syntax back to standard markdown for rendering
      const standardizedMarkdown = markdown
        .replace(/^! (.+)$/gm, '# $1')
        .replace(/^!! (.+)$/gm, '## $1')
        .replace(/^!!! (.+)$/gm, '### $1');

      return marked(standardizedMarkdown);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return 'Error rendering markdown content';
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown.configure({
        html: true, // Allow HTML in markdown
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content:
      '<p>Hello World! 🌎️</p><h1>This is H1</h1><h2>This is H2</h2><h3>This is H3</h3><p>Try <strong>bold</strong> and <em>italic</em> text</p>',
    onUpdate: ({ editor }) => {
      // Get the markdown content and replace heading symbols
      const markdown = editor.storage.markdown.getMarkdown();
      const modifiedMarkdown = replaceHeadingSymbols(markdown);
      setMarkdownContent(modifiedMarkdown);
      console.log(modifiedMarkdown);
    },
  });

  const getMarkdownContent = () => {
    if (editor) {
      // Get the markdown content and replace heading symbols
      const markdown = editor.storage.markdown.getMarkdown();
      return replaceHeadingSymbols(markdown);
    }
    return '';
  };

  // Get markdown with custom syntax for rendering with marked
  const getCustomSyntaxMarkdown = () => {
    if (editor) {
      const markdown = editor.storage.markdown.getMarkdown();
      return replaceHeadingSymbols(markdown);
    }
    return '';
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="mr-2"
        >
          Bold
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="mr-2"
        >
          Italic
        </Button>
        <Button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="mr-2"
        >
          H1
        </Button>
        <Button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="mr-2"
        >
          H2
        </Button>
        <Button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="mr-2"
        >
          H3
        </Button>
        <Button
          onClick={() => setMarkdownContent(getMarkdownContent())}
          className="mr-2"
        >
          Get Markdown
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="mb-2 font-medium">Editor:</h3>
          <div className="border p-4 rounded">
            <EditorContent editor={editor} />
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-medium">Markdown Output (Custom Syntax):</h3>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {markdownContent}
          </pre>
        </div>

        <div>
          <h3 className="mb-2 font-medium">
            Rendered Markdown (Custom Syntax):
          </h3>
          <div
            className="border p-4 rounded prose"
            dangerouslySetInnerHTML={{
              __html: parseMarkdown(getCustomSyntaxMarkdown()),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestCSSPage;

import { Node, mergeAttributes } from '@tiptap/core'
import { textblockTypeInputRule } from '@tiptap/core'

export interface HeadingOptions {
  levels: number[]
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    heading: {
      setHeading: (attributes: { level: Level }) => ReturnType
      toggleHeading: (attributes: { level: Level }) => ReturnType
      unsetHeading: () => ReturnType
    }
  }
}

export const CustomHeading = Node.create<HeadingOptions>({
  name: 'heading',

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {},
    }
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    }
  },

  parseHTML() {
    return this.options.levels
      .map((level: number) => ({
        tag: `h${level}`,
        attrs: { level },
      }))
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level = hasLevel ? node.attrs.level : this.options.levels[0]

    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setHeading: attributes => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false
        }

        return commands.setNode(this.name, attributes)
      },
      toggleHeading: attributes => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false
        }

        return commands.toggleNode(this.name, 'paragraph', attributes)
      },
      unsetHeading: () => ({ commands }) => {
        return commands.setNode('paragraph')
      },
    }
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce((items, level) => ({
      ...items,
      [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level }),
    }), {})
  },

  addInputRules() {
    return this.options.levels.map(level => {
      return textblockTypeInputRule({
        find: new RegExp(`^(!{1,${level}})\\s$`), // Changed from # to !
        type: this.type,
        getAttributes: {
          level,
        },
      })
    })
  },
})
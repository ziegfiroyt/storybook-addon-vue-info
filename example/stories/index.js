import { storiesOf } from '@storybook/vue'

import VueInfoAddon, { withInfo } from 'storybook-addon-vue-info'

import BaseBlank from '../components/BaseBlank.vue'
import BaseButton from '../components/BaseButton.vue'
import NumberList from '../components/NumberList.vue'

storiesOf('Examples/Basic usage', module)
  .add(
    'Simple example',
    withInfo({})(() => ({
      components: { LocalButton: BaseButton },
      template: '<local-button label="I\'m a button!"/>'
    }))
  )
  .add(
    'Show summary',
    withInfo(`
    # This is _summary_

    You can write summary in [Markdown](https://en.wikipedia.org/wiki/Markdown).

    There is also syntax highlighting powered by [Highlight.js](https://highlightjs.org/).

    \`\`\`js
    export function foo() {
      console.log('Hello, World!')
    }
    \`\`\`
    `)(() => ({
      components: { BaseButton },
      template: '<base-button disabled label="I\'m a button!"/>'
    }))
  )
  .add(
    'Multiple components',
    withInfo(`
      You can specify more than one components to show info tables.
    `)(() => ({
      components: { BaseButton, NumberList },
      template: `
        <div>
          <base-button label="button"/>
          <number-list/>
        </div>
      `
    }))
  )
  .add(
    'Specify components',
    withInfo({
      summary: `
        You can specify which components to be shown in info tables by passing \`components\` option to the addon.

        \`\`\`js
        storiesOf('...').add('...', withInfo({
          // Addon looks this
          components: { BaseButton, NumberList }
        })(() => ({
          // not this
          components: { BaseButton, NumberList, BaseBlank },
          template: '...'
        })))
        \`\`\`
      `,
      components: { BaseButton, NumberList }
    })(() => ({
      components: { BaseButton, NumberList, BaseBlank },
      template: `
        <div>
          <base-button label="button"/>
          <base-blank/>
          <number-list/>
        </div>
      `
    }))
  )

storiesOf('Examples/Advance usage', module)
  .add(
    'Hide header',
    withInfo({
      summary: `
        To hide header section, set \`header\` option to \`false\`.

        \`\`\`js
        withInfo({
          header: false
        })
        \`\`\`
      `,
      header: false
    })(() => ({
      components: { BaseButton },
      template: '<base-button label="I\'m a button!"/>'
    }))
  )
  .add(
    'Hide story source',
    withInfo({
      summary: `
        To hide story source, set \`source\` option to \`false\`.

        \`\`\`js
        withInfo({
          source: false
        })
        \`\`\`
      `,
      source: false
    })(() => ({
      components: { BaseButton },
      template: '<base-button label="I\'m a button!"/>'
    }))
  )
  .add(
    'Ignore docgen info',
    withInfo({
      summary: `
        To ignore component's information generated by vue-docgen-api,
        set \`useDocgen\` option to \`false\`.
        This only affects when you set our custom loader in Storybook's webpack config.

        \`\`\`js
        withInfo({
          useDocgen: false
        })
        \`\`\`
      `,
      useDocgen: false
    })(() => ({
      components: { BaseButton },
      template: '<base-button label="I\'m a button!"/>'
    }))
  )
  .add(
    'Set props description',
    withInfo({
      summary: `
        You can set description for each props explicitly.

        \`\`\`js
        withInfo({})(() => ({
          components: { BaseButton },
          template: '<base-button label="I\'m a button!"/>',
          propsDescription: {
            BaseButton: {
              disabled: 'DISABLED!',
              type: 'TYPE!',
              label: 'LABEL!'
            }
          }
        }))
        \`\`\`

        This will override descriptions generated by docgen.
      `
    })(() => ({
      components: { BaseButton },
      template: '<base-button label="I\'m a button!"/>',
      propsDescription: {
        BaseButton: {
          disabled: 'DISABLED!',
          type: 'TYPE!',
          label: 'LABEL!'
        }
      }
    }))
  )
  .add(
    'Custom styles',
    withInfo({
      summary: `
        To style docs, set \`styles\` option.
      `,
      styles: {
        info: {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          padding: '5rem 3rem',
          backgroundColor: '#222',
          color: '#fff',
          fontFamily: 'sans-serif'
        },
        header: {
          h2: {
            color: '#e33'
          },
          body: {
            marginBottom: '3rem'
          }
        },
        infoContent: {
          padding: '1rem 1rem',
          borderRadius: '4px',
          background: '#eee'
        }
      }
    })(() => ({
      components: { BaseButton },
      template: '<base-button label="I\'m a button!"/>'
    }))
  )
  .add(
    'Writes story in JSX',
    withInfo({
      summary: `
        You can also write story in render function with JSX.
        Of course you should configure Babel.

        \`\`\`jsx
        withInfo({})(() => ({
          render(h) {
            return <BaseButton label="I'm a button!"/>
          }
        }))
        \`\`\`
      `
    })(() => ({
      render(h) {
        return <BaseButton label="I'm a button!" />
      }
    }))
  )

storiesOf('Examples/Deprecated usage', module)
  .addDecorator(VueInfoAddon)
  .add('Decorator usage', () => ({
    components: { BaseButton },
    template: `
      <div>
        <base-button disabled label="deprecated!"/>
        <p>
          Using this addon as decorator is deprecated since @storybook/vue
          changed its decorators interface.
        </p>
      </div>
    `
  }))

storiesOf('Issues/#53', module).add(
  'Should load tables even for PascalCase components',
  withInfo({
    summary: '<https://github.com/pocka/storybook-addon-vue-info/issues/53>',
    useDocgen: false
  })(() => ({
    components: { NumberList },
    template: '<NumberList :numbers="[1, 2]"/>'
  }))
)

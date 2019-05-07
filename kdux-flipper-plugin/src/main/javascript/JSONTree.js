import React from 'react'
import ReactJSONTree from 'react-json-tree/src/index'

const getLabelStyle = ({ style }, nodeType, expanded) => ({
  style: {
    ...style,
    textTransform: expanded ? 'uppercase' : style.textTransform
  }
});

const getBoolStyle = ({ style }, nodeType) => ({
  style: {
    ...style,
    border: nodeType === 'Boolean' ? '1px solid #DD3333' : style.border,
    borderRadius: nodeType === 'Boolean' ? 3 : style.borderRadius
  }
});

const getItemString = type => (
  <span>
    {' // '}
    {type}
  </span>
);

const getValueLabelStyle = ({ style }, nodeType, keyPath) => ({
  style: {
    ...style,
    color:
      !Number.isNaN(keyPath[0]) && !(parseInt(keyPath, 10) % 2)
        ? '#33F'
        : style.color
  }
});

// const longString =
//   'Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.'; // eslint-disable-line max-len
//
// const Custom = function(value) {
//   this.value = value;
// };
// Custom.prototype[Symbol.toStringTag] = 'Custom';
//
// const data = {
//   array: [1, 2, 3],
//   emptyArray: [],
//   bool: true,
//   date: new Date(),
//   error: new Error(longString),
//   object: {
//     foo: {
//       bar: 'baz',
//       nested: {
//         moreNested: {
//           evenMoreNested: {
//             veryNested: {
//               insanelyNested: {
//                 ridiculouslyDeepValue: 'Hello'
//               }
//             }
//           }
//         }
//       }
//     },
//     baz: undefined,
//     func: function User() {}
//   },
//   emptyObject: {},
//   symbol: Symbol('value'),
//   // eslint-disable-next-line new-cap
//   immutable: Map([
//     ['key', 'value'],
//     [{ objectKey: 'value' }, { objectKey: 'value' }]
//   ]),
//   map: new window.Map([
//     ['key', 'value'],
//     [0, 'value'],
//     [{ objectKey: 'value' }, { objectKey: 'value' }]
//   ]),
//   weakMap: new window.WeakMap([
//     [{ objectKey: 'value' }, { objectKey: 'value' }]
//   ]),
//   set: new window.Set(['value', 0, { objectKey: 'value' }]),
//   weakSet: new window.WeakSet([
//     { objectKey: 'value1' },
//     { objectKey: 'value2' }
//   ]),
//   hugeArray: Array.from({ length: 10000 }).map((_, i) => `item #${i}`),
//   customProfile: {
//     avatar: new Custom('placehold.it/50x50'),
//     name: new Custom('Name')
//   },
//   longString
// };

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};


type P = {
  data: Object
}

type S = {

}

export default class JSONTree extends React.PureComponent<P,S> {

  render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {data} = this.props
    return <ReactJSONTree data={data} theme={theme} invertTheme={true} />
  }
}
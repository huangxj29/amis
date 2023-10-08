/**
 * @file fis-conf.js 配置
 */
const path = require('path');
const fs = require('fs');
const package = require('./packages/amis/package.json');
const transformNodeEnvInline = require('./scripts/transform-node-env-inline');

// 配置只编译哪些文件。
fis
  .get('project.ignore')
  .push(
    'public/**',
    'scripts/**',
    'npm/**',
    'gh-pages/**',
    'lib/**',
    'sdk/**',
    'build/dist/**',
    '.*/**',
    'node_modules/**'
  );
fis.set('project.files', ['build/sdk-placeholder.html']);

const Resource = fis.require('postpackager-loader/lib/resource.js');
const versionHash = fis.util.md5(package.version);

Resource.extend({
  buildResourceMap: function () {
    const resourceMap = this.__super();
    if (resourceMap === '') {
      return '';
    }

    const map = JSON.parse(resourceMap.substring(20, resourceMap.length - 2));

    Object.keys(map.res).forEach(function (key) {
      if (map.res[key].pkg) {
        map.res[key].pkg = `${versionHash}-${map.res[key].pkg}`;
      }
    });
    Object.keys(map.pkg).forEach(function (key) {
      map.pkg[`${versionHash}-${key}`] = map.pkg[key];
      delete map.pkg[key];
    });

    return `amis.require.resourceMap(${JSON.stringify(map)});`;
  },

  calculate: function () {
    this.__super.apply(this);

    // 标记这个文件，肯定是异步资源，即便是同步加载了。
    Object.keys(this.loaded).forEach(id => {
      const file = this.getFileById(id);

      if (file && file.subpath === '/examples/loadMonacoEditor.ts') {
        this.loaded[id] = true;
      }
    });
  }
});

fis.match('*.scss', {
  parser: fis.plugin('sass', {
    sourceMap: false
  }),
  rExt: '.css'
});
fis.match('_*.scss', {
  release: false
});

fis.match('icons/**.svg', {
  rExt: '.js',
  isJsXLike: true,
  isJsLike: true,
  isMod: true,
  parser: [
    fis.plugin('svgr', {
      svgProps: {
        className: 'icon'
      },
      prettier: false,
      dimensions: false
    }),
    fis.plugin('typescript', {
      importHelpers: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      sourceMap: false
    })
  ]
});

fis.match('icons/**.svg', {
  optimizer: fis.plugin('uglify-js'),
  moduleId: function (m, path) {
    return fis.util.md5(package.version + 'amis-sdk' + path);
  }
});

fis.match('/node_modules/**.{js,cjs}', {
  isMod: true,
  rExt: 'js'
});
fis.set('project.fileType.text', 'cjs');

fis.match('*.min.js', {
  optimizer: null
});

fis.match('tinymce/{tinymce.js,plugins/**.js,themes/silver/theme.js}', {
  ignoreDependencies: true
});

fis.match('tinymce/plugins/*/index.js', {
  ignoreDependencies: false
});

fis.match(/(?:mpegts\.js|object\-inspect\/util\.inspect\.js)/, {
  ignoreDependencies: true
});

fis.match('monaco-editor/min/**.js', {
  isMod: false,
  ignoreDependencies: true,
  optimizer: null
});

fis.match('{monaco-editor,amis,amis-core}/**', {
  packTo: null
});

fis.match('monaco-editor/**.css', {
  standard: false
});

fis.match('markdown-it/**', {
  preprocessor: fis.plugin('js-require-file')
});

fis.match('*.html:jsx', {
  parser: fis.plugin('typescript'),
  rExt: '.js',
  isMod: false
});

// 这些用了 esm
fis.match(
  '{echarts/**.js,zrender/**.js,echarts-wordcloud/**.js,markdown-it-html5-media/**.js,react-hook-form/**.js,qrcode.react/**.js,axios/**.js}',
  {
    parser: fis.plugin('typescript', {
      sourceMap: false,
      importHelpers: true,
      esModuleInterop: true,
      emitDecoratorMetadata: false,
      experimentalDecorators: false
    })
  }
);

// 过滤掉 process.env.NODE_ENV 分支中无关代码
// 避免被分析成依赖，因为 fis 中是通过正则分析 require 语句的
fis.on('process:start', transformNodeEnvInline);

fis.unhook('components');
fis.hook('node_modules', {
  shimProcess: false,
  shimGlobal: false,
  shimBuffer: false
  // shutup: true
});
fis.hook('commonjs', {
  sourceMap: false,
  extList: ['.js', '.jsx', '.tsx', '.ts', '.cjs'],
  paths: {
    'monaco-editor': '/examples/loadMonacoEditor'
  }
});

fis.match('*.map', {
  release: false
});

fis.match('/{examples,scss,src}/(**)', {
  release: '/$1'
});

fis.match('/node_modules/(**)', {
  release: '/thirds/$1'
});

fis.match('/node_modules/(*)/dist/(**)', {
  release: '/thirds/$1/$2'
});

fis.match('{*.ts,*.jsx,*.tsx,/examples/**.js,/src/**.js,/src/**.ts}', {
  parser: [
    // docsGennerator,
    fis.plugin('typescript', {
      importHelpers: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      sourceMap: false
    }),
    function (content) {
      return content
        .replace(/\b[a-zA-Z_0-9$]+\.__uri\s*\(/g, '__uri(')
        .replace(/\(\d+, (tslib_\d+\.__importStar)\)/g, '$1')
        .replace(
          /return\s+(tslib_\d+)\.__importStar\(require\(('|")(.*?)\2\)\);/g,
          function (_, tslib, quto, value) {
            return `return new Promise(function(resolve){require(['${value}'], function(ret) {resolve(${tslib}.__importStar(ret));})});`;
          }
        );
    }
  ],
  preprocessor: fis.plugin('js-require-css'),
  isMod: true,
  rExt: '.js'
});

fis.match('/build/mod.js', {
  useCompile: false,
  isMod: false,
  optimizer: fis.plugin('terser')
});

fis.match('*.{js,jsx,ts,tsx}', {
  optimizer: fis.plugin('terser'),
  moduleId: function (m, path) {
    return fis.util.md5(package.version + 'amis-sdk' + path);
  }
});

fis.match('/build/loader.ts', {
  isMod: false
});

fis.on('compile:end', function (file) {
  if (
    file.subpath === '/packages/amis/src/index.tsx' ||
    file.subpath === '/build/mod.js' ||
    file.subpath === '/build/loader.ts'
  ) {
    file.setContent(file.getContent().replace(/@version/g, package.version));
  } else if (file.subpath === '/packages/amis-core/src/index.tsx') {
    file.setContent(
      file
        .getContent()
        .replace(/__buildVersion/g, JSON.stringify(package.version))
    );
  }
});

fis.on('compile:optimizer', function (file) {
  if (file.isJsLike && file.isMod) {
    var contents = file.getContent();

    if (
      typeof contents === 'string' &&
      contents.substring(0, 7) === 'define('
    ) {
      contents = 'amis.' + contents;

      contents = contents.replace(
        'function(require, exports, module)',
        'function(require, exports, module, define)'
      );

      file.setContent(contents);
    }

    // 替换 worker 地址的路径，让 sdk 加载同目录下的文件。
    // 如果 sdk 和 worker 不是部署在一个地方，请通过指定 MonacoEnvironment.getWorkerUrl
    if (
      file.subpath === '/node_modules/amis-ui/lib/components/Editor.js' ||
      file.subpath === '/examples/loadMonacoEditor.ts'
    ) {
      contents = contents.replace(
        /function\sfilterUrl\(url\)\s\{\s*return\s*url;/m,
        function () {
          return `var _path = '';
            try {
              throw new Error()
            } catch (e) {
              _path = (/((?:https?|file):.*?)\\n/.test(e.stack) && RegExp.$1).replace(/\\/[^\\/]*$/, '');
            }
            function filterUrl(url) {
              return _path + url.substring(1);`;
        }
      );

      file.setContent(contents);
    }
  }
});

fis.match('::package', {
  packager: fis.plugin('deps-pack', {
    'sdk.js': [
      'build/mod.js',
      'examples/embed.tsx',
      'examples/embed.tsx:deps',
      'examples/loadMonacoEditor.ts',
      '!mpegts.js/**',
      '!hls.js/**',
      '!froala-editor/**',
      '!codemirror/**',
      '!tinymce/**',
      '!zrender/**',
      '!echarts/**',
      '!echarts-stat/**',
      '!echarts-wordcloud/**',
      '!papaparse/**',
      '!exceljs/**',
      '!xlsx/**',
      '!docsearch.js/**',
      '!monaco-editor/**.css',
      '!amis-ui/lib/components/RichText.js',
      '!amis-ui/lib/components/Tinymce.js',
      '!amis-ui/lib/components/ColorPicker.js',
      '!react-color/**',
      '!material-colors/**',
      '!reactcss/**',
      '!tinycolor2/**',
      '!cropperjs/**',
      '!react-json-view/**',
      '!react-cropper/**',
      '!jsbarcode/**',
      '!amis-ui/lib/components/BarCode.js',
      '!amis-ui/lib/renderers/Form/CityDB.js',
      '!amis-ui/lib/components/Markdown.js',
      '!amis-core/lib/utils/markdown.js',
      '!highlight.js/**',
      '!entities/**',
      '!linkify-it/**',
      '!mdurl/**',
      '!uc.micro/**',
      '!markdown-it/**',
      '!markdown-it-html5-media/**',
      '!punycode/**',
      '!office-viewer/**',
      '!fflate/**',
      '!amis-formula/lib/doc.js'
    ],

    'rich-text.js': ['amis-ui/lib/components/RichText.js', 'froala-editor/**'],

    'tinymce.js': ['amis-ui/lib/components/Tinymce.js', 'tinymce/**'],

    'codemirror.js': ['codemirror/**'],
    'papaparse.js': ['papaparse/**'],

    'exceljs.js': ['exceljs/**'],

    'xlsx.js': ['xlsx/**'],

    'markdown.js': [
      'amis-ui/lib/components/Markdown.js',
      'highlight.js/**',
      'entities/**',
      'linkify-it/**',
      'mdurl/**',
      'uc.micro/**',
      'markdown-it/**',
      'markdown-it-html5-media/**',
      'punycode/**'
    ],

    'color-picker.js': [
      'amis-ui/lib/components/ColorPicker.js',
      'react-color/**',
      'material-colors/**',
      'reactcss/**',
      'tinycolor2/**'
    ],

    'cropperjs.js': ['cropperjs/**', 'react-cropper/**'],

    'barcode.js': ['src/components/BarCode.tsx', 'jsbarcode/**'],

    'charts.js': [
      'zrender/**',
      'echarts/**',
      'echarts-stat/**',
      'echarts-wordcloud/**'
    ],

    'office-viewer.js': ['office-viewer/**', 'fflate/**'],
    'json-view.js': 'react-json-view/**',
    'fomula-doc.js': 'amis-formula/lib/doc.js',

    'rest.js': [
      '*.js',
      '!monaco-editor/**',
      '!codemirror/**',
      '!mpegts.js/**',
      '!hls.js/**',
      '!froala-editor/**',

      '!amis-ui/lib/components/RichText.js',
      '!zrender/**',
      '!echarts/**',
      '!echarts-wordcloud/**',
      '!papaparse/**',
      '!exceljs/**',
      '!xlsx/**',
      '!highlight.js/**',
      '!argparse/**',
      '!entities/**',
      '!linkify-it/**',
      '!mdurl/**',
      '!uc.micro/**',
      '!markdown-it/**',
      '!markdown-it-html5-media/**',
      '!office-viewer/**',
      '!fflate/**'
    ]
  }),
  postpackager: [
    fis.plugin('loader', {
      useInlineMap: false,
      resourceType: 'mod'
    }),

    require('./build/embed-packager')
  ]
});

fis.match('/node_modules/react/**', {
  moduleId: 'react',
  release: false
});
fis.match('/node_modules/react-dom/**', {
  moduleId: 'react-dom',
  release: false
});

fis.match('/node_modules/react-dom/client.js', {
  release: true,
  isMod: true,
  moduleId: function (m, path) {
    return fis.util.md5(package.version + 'amis-sdk' + path);
  }
});

fis.match('*', {
  domain: '.',
  deploy: [
    fis.plugin('skip-packed'),
    function (_, modified, total, callback) {
      var i = modified.length - 1;
      var file;

      while ((file = modified[i--])) {
        if (file.skiped || /\.map$/.test(file.subpath)) {
          modified.splice(i + 1, 1);
        }
      }

      i = total.length - 1;
      while ((file = total[i--])) {
        if (file.skiped || /\.map$/.test(file.subpath)) {
          total.splice(i + 1, 1);
        }
      }

      callback();
    },
    fis.plugin('local-deliver', {
      to: './build/dist'
    })
  ]
});

## [中文说明文档](./README-CN.md)

## Use

I don't like in some i18n file add different string, and in your code use a atlas.
i18fn is zero config i18n package, juse in you code like this:

```js
const i18fn = require('i18fn');
const hello = i18fn.lang({ english: 'hello', chinese: '你好' });
console.log(hello);
```

## Use params

```js
const i18fn = require('i18fn');
const personHello = i18fn.lang(
    { english: '__person__, hello', chinese: '__person__, 你好' },
    {
      person: { english: 'Mr.Ming', chinese: '小明' },
    },
  );
console.log(personHello);
});
```

## Miss language

If HTML language is chinese, but your forget add chinese txt, like this:

```js
const say = i18fn.lang({ english: 'hello' });

// In production, i18fn use english to forget language
// And In Devloper, i18fn use add - [Miss i18fn: languageType] in english
if (process.env.NODE_ENV === 'production') {
  console.log(say); // hello
} else {
  console.log(say); // hello - [Miss i18fn: english]
}
```

## set now language

```js
const i18fn = require('i18fn');

i18fn.now('chinese');
```

## Add other language

Default languages:

- english;
- chinese;
- chineseTraditional;
- spanish;
- dutch;
- korea;
- french;
- german;
- italian;
- portuguese;
- swedish;
- japanese;

If you have mars application, you can add mars language like this:

```js
const i18fn = require('i18fn');

const language = (
  navigator['browserLanguage'] || navigator.language
).toLowerCase();
if (language.indexOf('MarsLanguage') > -1) {
  // add i18func language
  i18func.now('MarsLanguage');
}

// ok like default use:
const hello = i18fn.lang({ english: 'hello', MarsLanguage: '£ª˜√øø˚˜´' });
console.log(hello);
```

## Still love config? you can like this

Normally, a language is a configuration file, but when you need to add a new string, you need to open many language files one by one, often missing. We can write multiple languages in a file like this:

```js
const { lang } = require('i18fn');
const languages = {
  done: lang({ english: 'done!', chinese: '完成!' }),
  hello: lang({ english: 'hello', chinese: '你好' }),
  please: params =>
    lang({ english: '__open__, please.', chinese: '请__open__.' }, params),
};

console.log(languages.done);
console.log(
  languages.please({
    open: { english: 'Open the box', chinese: '打开盒子' },
  }),
);
```

## test

Install package jest:
```sh
$ yarn install && yarn test
```

You can check test in src/index.test.js

```
$ jest
 PASS  src/index.test.js
  ✓ test chinese (4ms)
  ✓ test english
  ✓ test english params (1ms)
  ✓ test english params, use object
  ✓ test config
  ✓ test config function
  ✓ test error chinese
  ✓ test error english
  ✓ test error chinese prod
  ✓ test error english prod

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        1.257s
Ran all test suites.
✨  Done in 1.98s.
```


That's all, thank.

i18fn is [MIT licensed](./LICENSE).


// import i18fn from './index';
const i18fn = require('./index');

it('test chinese', () => {
  i18fn.now('chinese');
  const str = i18fn.lang({ chinese: '你好', english: 'hello' });
  expect(str).toMatch('你好');
});

it('test english', () => {
  i18fn.now('english');
  const str = i18fn.lang({ chinese: '您好', english: 'hello' });
  expect(str).toMatch('hello');
});

it('test english params', () => {
  i18fn.now('english');
  const str = i18fn.lang(
    { english: '__person__, hello', chinese: '__person__, 你好' },
    {
      person: i18fn.lang({ english: 'Mr.Ming', chinese: '小明' }),
    },
  );
  expect(str).toMatch('Mr.Ming, hello');
});

it('test english params, use object', () => {
  i18fn.now('english');
  const str = i18fn.lang(
    { english: '__person__, hello', chinese: '__person__, 你好' },
    {
      person: { english: 'Mr.Ming', chinese: '小明' },
    },
  );
  expect(str).toMatch('Mr.Ming, hello');
});

it('test config', () => {
  const lang = i18fn.lang;
  i18fn.now('english');

  const languages = {
    done: lang({ english: 'done!', chinese: '完成!' }),
  };
  expect(languages.done).toMatch('done!');
});

it('test config function', () => {
  const lang = i18fn.lang;
  i18fn.now('english');
  const languages = {
    please: params =>
      lang({ english: '__open__, please.', chinese: '请__open__.' }, params),
  };
  const fnString = languages.please({
    open: { english: 'Open the box', chinese: '打开盒子' },
  });
  expect(fnString).toMatch('Open the box, please.');
});

it('test error chinese', () => {
  i18fn.now('chinese');
  const say = i18fn.lang({ english: 'hello' });
  expect(say).toMatch('hello - [Miss i18fn: chinese]');
});

it('test error english', () => {
  i18fn.now('english');
  const say = i18fn.lang({ chinese: 'hello' });
  expect(String(say)).toMatch('undefined');
});

it('test error chinese prod', () => {
  process.env.NODE_ENV = 'production';
  i18fn.now('chinese');
  const say = i18fn.lang({ english: 'hello' });
  expect(say).toMatch('hello');
});

it('test error english prod', () => {
  i18fn.now('english');
  const say = i18fn.lang({ chinese: 'hello' });
  expect(String(say)).toMatch('undefined');
});

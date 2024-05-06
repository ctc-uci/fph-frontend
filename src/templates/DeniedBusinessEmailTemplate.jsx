import { Email, Item, Span, A } from 'react-html-email';

const deniedEmailTemplate = () => (
  <Email title={'Application Denied'}>
    <Item align="center">
      <Span fontSize={20}>
        Unfotunately your application has been denied
        <A href="https://github.com/chromakode/react-html-email">react-html-email</A>.
      </Span>
    </Item>
  </Email>
);

export default deniedEmailTemplate;

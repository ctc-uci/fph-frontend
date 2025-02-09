import { Email, Item, Span } from 'react-html-email';

const deniedEmailTemplate = () => (
  <Email title={'Application Denied'}>
    <Item align="center">
      <Span fontSize={20}>Unfortunately your application has been denied.</Span>
    </Item>
  </Email>
);

export default deniedEmailTemplate;

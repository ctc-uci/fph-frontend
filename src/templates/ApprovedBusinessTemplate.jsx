import { Email, Item, Span, A } from 'react-html-email';

const approvedEmailTemplate = id => (
  <Email title="Congradulations!">
    <Item align="center">
      <Span fontSize={20}>
        You have been approved by FPH follow this link to sign up with our website!
        <A href={`http://localhost:3000/SignupBusiness?id=${id}`}>FPH Login</A>.
        <A href="https://github.com/chromakode/react-html-email">react-html-email</A>.
      </Span>
    </Item>
  </Email>
);

export default approvedEmailTemplate;

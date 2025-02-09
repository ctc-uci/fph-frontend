import { A, Email, Item, Span } from 'react-html-email';

const approvedEmailTemplate = (id) => (
  <Email title="Congratulations!">
    <Item align="center">
      <Span fontSize={20}>
        You have been approved by FPH follow this link to sign up with our website!
        <A href={`${window.location.href}/login/SignupBusiness?id=${id}`}>FPH Login</A>
      </Span>
    </Item>
  </Email>
);

export default approvedEmailTemplate;

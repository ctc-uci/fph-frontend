import { Email, Item, Span, A } from 'react-html-email';

export const approvedEmailTemplateAdmin = (
  <Email title="Congratulations!">
    <Item align="center">
      <Span fontSize={20}>
        You have been approved by FPH follow this link to sign up with our website!
        <A href={`http://localhost:3000/SignupAdmin`}>FPH Login</A>.
        <A href="https://github.com/chromakode/react-html-email">react-html-email</A>.
      </Span>
    </Item>
  </Email>
);

export const editedEmailTemplateAdmin = (
  <Email title="Hello,">
    <Item align="center">
      <Span fontSize={20}>
        Your information has been updated by FPH. If this was not authrorized, immediately contact
        FPH. Otherwise, you do not need to do anything.
        <A href="https://github.com/chromakode/react-html-email">react-html-email</A>.
      </Span>
    </Item>
  </Email>
);

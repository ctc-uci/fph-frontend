import { A, Email, Item, Span } from 'react-html-email';

export const approvedEmailTemplateAdmin = (
  <Email title="Congratulations!">
    <Item align="center">
      <Span fontSize={20}>
        You have been approved by FPH follow this link to sign up with our website!
      </Span>
      <A href={`${window.location.href}/SignupAdmin`}>FPH Login</A>.
    </Item>
  </Email>
);

export const editedEmailTemplateAdmin = (
  <Email title="Hello,">
    <Item align="center">
      <Span fontSize={20}>
        Your information has been updated by FPH. If this was not authrorized, immediately contact
        FPH. Otherwise, you do not need to do anything.
      </Span>
    </Item>
  </Email>
);

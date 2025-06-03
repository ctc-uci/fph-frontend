import { Email, Item, Span } from 'react-html-email';

export const ReminderTemplate = () => {
  return (
    <Email title="Donation Form Reminder" align="left">
      <Item align="left">
        <Span fontSize={20} fontWeight="bold">
          This is a friendly reminder to submit your donation form for your business before the due
          date.
        </Span>
      </Item>

      <Item align="left">
        <Span fontSize={14}>Feeding Pets of the Homeless</Span>
      </Item>
    </Email>
  );
};

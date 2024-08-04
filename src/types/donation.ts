export type Donation = {
  business_id: number;
  donation_id: number;
  food_bank_donation: string;
  reporter: string;
  email: string;
  date: string;
  canned_dog_food_quantity: number | null;
  dry_dog_food_quantity: number | null;
  canned_cat_food_quantity: number | null;
  dry_cat_food_quantity: number | null;
  misc_items: string | null;
  volunteer_hours: number;
};

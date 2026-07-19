import { contact } from "./contact";

export interface SocialItem {
  id: string;
  name: string;
  username: string;
  url: string;
  iconName: string;
}

export const social: SocialItem[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    username: "Digital Office",
    url: contact.whatsappUrl,
    iconName: "whatsapp"
  },
  {
    id: "telegram",
    name: "Telegram",
    username: contact.telegram,
    url: contact.telegramUrl,
    iconName: "telegram"
  },
  {
    id: "twitter",
    name: "X",
    username: contact.twitter,
    url: contact.twitterUrl,
    iconName: "twitter"
  }
];

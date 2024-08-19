import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsExperienceItem extends Schema.Component {
  collectionName: 'components_components_experience_items';
  info: {
    displayName: 'Experience Item';
    description: '';
  };
  attributes: {
    DateStarted: Attribute.Date;
    DateFinished: Attribute.Date;
    IsCurrent: Attribute.Boolean & Attribute.DefaultTo<false>;
    Position: Attribute.String;
    CompanyName: Attribute.String;
    Description: Attribute.Text;
    TechStacks: Attribute.Component<'components.stacks', true>;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    Url: Attribute.String;
    Text: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ComponentsStacks extends Schema.Component {
  collectionName: 'components_components_stacks';
  info: {
    displayName: 'Stacks';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface LayoutContactSection extends Schema.Component {
  collectionName: 'components_layout_contact_sections';
  info: {
    displayName: 'Contact Section';
    description: '';
  };
  attributes: {
    NameLabel: Attribute.String;
    EmailLabel: Attribute.String;
    SubjectLabel: Attribute.String;
    MessageLabel: Attribute.String;
    ButtonTextLabel: Attribute.String;
    SuccessMessage: Attribute.String;
    Title: Attribute.String;
    Description: Attribute.Text;
  };
}

export interface LayoutExperienceSection extends Schema.Component {
  collectionName: 'components_layout_experience_sections';
  info: {
    displayName: 'Experience Section';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Description: Attribute.Text;
  };
}

export interface LayoutHeroSection extends Schema.Component {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    Heading: Attribute.String;
    SubHeading: Attribute.String;
    Description: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.experience-item': ComponentsExperienceItem;
      'components.link': ComponentsLink;
      'components.stacks': ComponentsStacks;
      'layout.contact-section': LayoutContactSection;
      'layout.experience-section': LayoutExperienceSection;
      'layout.hero-section': LayoutHeroSection;
    }
  }
}

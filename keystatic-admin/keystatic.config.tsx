import React from 'react';
import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'EmmyStack01/I-am-Mily_wayz',
  },

  ui: {
    brand: {
      name: 'Mily Wayz — Digital Business Card',
      mark: () => {
        const PLACEHOLDER = 'https://res.cloudinary.com/dq7dwhxqn/image/upload/v1782299989/profile-picture-placeholder_yvcbul.jpg';
        const [imageSrc, setImageSrc] = React.useState(PLACEHOLDER);

        React.useEffect(() => {
          fetch('https://milywayz.wezuduemoih.workers.dev/data.json')
            .then(r => r.json())
            .then(d => {
              if (d.profile?.profilePicture) {
                const filename = d.profile.profilePicture.split('/').pop();
                setImageSrc(`https://milywayz.wezuduemoih.workers.dev/profile/${filename}`);
              }
            })
            .catch(() => {});
        }, []);

        return (
          <img
            src={imageSrc}
            alt="Mily Wayz"
            style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
          />
        );
      },
    },
    navigation: {
      'Digital Business Card': ['card'],
    },
  },

  singletons: {
    card: singleton({
      label: 'Digital Business Card',
      path: 'keystatic-admin/public/data',
      format: { data: 'json' },
      schema: {
        profile: fields.object({
          name: fields.text({ label: 'Full Name' }),
          jobTitle: fields.text({ label: 'Job Title / Role' }),
          bio: fields.text({
            label: 'Bio',
            description: 'Shown via the typing animation on the card. Max 170 characters.',
            multiline: true,
            validation: { length: { max: 170 } },
          }),
          profilePicture: fields.image({
            label: 'Profile Picture',
            directory: 'keystatic-admin/public/profile',
            publicPath: '/profile/',
          }),
        }, { label: 'Profile' }),

        socials: fields.array(
          fields.object({
            icon: fields.text({
              label: 'Remix Icon class',
              description: 'e.g. ri-instagram-fill — browse icons at remixicon.com',
            }),
            label: fields.text({ label: 'Platform name (for accessibility)' }),
            url: fields.url({ label: 'Profile URL' }),
          }),
          {
            label: 'Social Icons',
            itemLabel: (props) => props.fields.label.value || 'Social link',
          }
        ),

        featuredButton: fields.object({
          url: fields.url({ label: 'Link URL' }),
          hoverText: fields.text({ label: 'Hover text (e.g. "Listen")' }),
          defaultText: fields.text({ label: 'Default text (e.g. "My Spotify Playlist")' }),
        }, { label: 'Featured Button' }),

        linksHeading: fields.text({ label: 'Links Section Heading' }),

        links: fields.array(
          fields.object({
            text: fields.text({ label: 'Link Text' }),
            url: fields.url({ label: 'Link URL' }),
          }),
          {
            label: 'Links',
            itemLabel: (props) => props.fields.text.value || 'Link',
            validation: { length: { max: 10 } },
          }
        ),

        vcard: fields.object({
          fullName: fields.text({ label: 'Full Name' }),
          title: fields.text({ label: 'Title' }),
          email: fields.text({ label: 'Email' }),
          phone: fields.text({ label: 'Phone' }),
          website: fields.url({ label: 'Website' }),
        }, { label: 'Save Contact (vCard) Details' }),

        footerSpacer: fields.text({
          label: 'Built by Emmy STACK01',
          description: 'This field is intentionally unused — keeps the dashboard scroll bug from hiding real fields. So do not input anything here.',
          validation: { isRequired: false },
          defaultValue: '',
        }),
      },
    }),
  },
});

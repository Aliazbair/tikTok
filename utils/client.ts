import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'rvlhg134',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token:
    'skKiK7xlt1m5iWaTtvmDYO0y2a169wSU2cRJFEc8lCt1lLQdZowJw2F7qP8hMKfpAtZPtZE72EWih2WcLOnrKpmWxeHy0Ezp0Yg1SqDPVKTJJ1XRuBJgeFGbz19r7imj8v975NybsF0M4IhBXEZPGjdGrDfMMohJvjLyMRBja7JAD0RVoEKR',
});

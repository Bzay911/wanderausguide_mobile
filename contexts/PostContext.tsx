import React, { createContext, useContext, ReactNode } from 'react'; 
import {PostContextType } from '@/types/post';

interface ImageProviderProps {
  children: ReactNode;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({children}: ImageProviderProps) => {
    const posts = [
        {
    id: '1',
    title: 'Epic Road Trip Across Australia',
    description: 'Just completed the most incredible 30-day road trip from Sydney to Perth! The outback views, wildlife encounters, and hidden beaches were absolutely breathtaking.',
    images: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
      'https://images.unsplash.com/photo-1589330273594-fadcdbb0c1d5',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      'https://images.unsplash.com/photo-1503220317375-aaad61436b1b'
    ],
    category: ['road-trip', 'adventure', 'outback']
  },
  {
    id: '2',
    title: 'Hidden Gems in Melbourne',
    description: 'Spent the weekend discovering Melbourne\'s secret laneways, rooftop bars, and underground art galleries.',
    images: [
      'https://images.unsplash.com/photo-1514395462725-fb4566210144',
      'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8',
      'https://images.unsplash.com/photo-1545044846-351ba102b6d5',
      'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
    ],
    category: ['city', 'urban', 'culture', 'art']
  },
  {
    id: '3',
    title: 'Whitehaven Beach Paradise',
    description: 'The whitest sand and clearest water I\'ve ever seen! Whitsunday Islands are truly heaven on Earth.',
    images: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a'
    ],
    category: ['beach', 'island', 'paradise', 'tropical']
  },
  {
    id: '4',
    title: 'Blue Mountains Sunrise',
    description: 'Woke up at 4 AM to catch this magical sunrise over the Three Sisters. The fog rolling through the valleys was absolutely surreal!',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'
    ],
    category: ['lookout', 'sunrise', 'mountains', 'hiking']
  },
  {
    id: '5',
    title: 'Sydney Food Tour',
    description: 'Ate my way through Sydney this weekend! From Bondi\'s best brunch spots to Chinatown\'s hidden dumpling joints.',
    images: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe'
    ],
    category: ['food', 'restaurants', 'culinary', 'city']
  },
  {
    id: '6',
    title: 'Great Barrier Reef Adventure',
    description: 'Snorkeling in the Great Barrier Reef was a dream come true! The coral colors and marine life are out of this world.',
    images: [
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      'https://images.unsplash.com/photo-1544551763-92ef2cc6a0e4',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7',
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b'
    ],
    category: ['reef', 'snorkeling', 'marine-life', 'adventure']
  },
  {
    id: '7',
    title: 'Tasmania Wilderness',
    description: 'Hiked through Cradle Mountain and the scenery was absolutely mind-blowing! Tasmania\'s wilderness is untouched.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
      'https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b'
    ],
    category: ['wilderness', 'hiking', 'forest', 'adventure']
  },
  {
    id: '8',
    title: 'Uluru Sunset Magic',
    description: 'Watching Uluru change colors at sunset was a spiritual experience. The red rock glowing against the outback sky.',
    images: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
      'https://images.unsplash.com/photo-1502472584811-0a2f2feb8968',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'
    ],
    category: ['sunset', 'outback', 'sacred-sites', 'lookout']
  },
  {
    id: '9',
    title: 'Perth Beach Life',
    description: 'Living my best life on Perth\'s stunning beaches! Cottesloe Beach at sunset is pure perfection.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19'
    ],
    category: ['beach', 'sunset', 'coastal', 'relaxation']
  },
  {
    id: '10',
    title: 'Byron Bay Vibes',
    description: 'Chasing waterfalls and catching waves in Byron Bay! This hippie paradise has stolen my heart.',
    images: [
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0',
      'https://images.unsplash.com/photo-1502933691298-84fc14542831',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a'
    ],
    category: ['beach', 'surfing', 'hippie', 'waterfalls']
  },
  {
    id: '11',
    title: 'Adelaide Wine Country',
    description: 'Spent the weekend wine tasting in Barossa Valley! The vineyards are gorgeous and the wines are world-class.',
    images: [
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
      'https://images.unsplash.com/photo-1474073705359-5da2a8270c64',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b',
      'https://images.unsplash.com/photo-1513618827672-0d7c5ad591b1'
    ],
    category: ['wine', 'vineyards', 'culinary', 'countryside']
  },
  {
    id: '12',
    title: 'Kangaroo Island Wildlife',
    description: 'Up close with kangaroos, koalas, and sea lions! Kangaroo Island is a wildlife lover\'s paradise.',
    images: [
      'https://images.unsplash.com/photo-1521651201144-634f700b36ef',
      'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9',
      'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433',
      'https://images.unsplash.com/photo-1555169062-013468b47731',
      'https://images.unsplash.com/photo-1623943093135-68e6d2d8f2a7'
    ],
    category: ['wildlife', 'animals', 'nature', 'island']
  },
  {
    id: '13',
    title: 'Gold Coast Skyline',
    description: 'The Gold Coast skyline never gets old! Surfing by day, partying by night.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785'
    ],
    category: ['city', 'skyline', 'surfing', 'nightlife']
  },
  {
    id: '14',
    title: 'Daintree Rainforest Explorer',
    description: 'Trekking through the world\'s oldest rainforest! The Daintree is absolutely magical.',
    images: [
      'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
      'https://images.unsplash.com/photo-1448375240586-882707db888b',
      'https://images.unsplash.com/photo-1511497584788-876760111969'
    ],
    category: ['rainforest', 'jungle', 'hiking', 'nature']
  },
  {
    id: '15',
    title: 'Sydney Opera House Views',
    description: 'Caught a performance at the iconic Opera House and watched the sunset from Circular Quay.',
    images: [
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
      'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8',
      'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
    ],
    category: ['landmarks', 'city', 'architecture', 'lookout']
  },
  {
    id: '16',
    title: 'Ningaloo Reef Swimming',
    description: 'Swam with whale sharks at Ningaloo Reef! This was hands down the most incredible experience.',
    images: [
      'https://images.unsplash.com/photo-1544551763-92ef2cc6a0e4',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7',
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19'
    ],
    category: ['reef', 'whale-sharks', 'marine-life', 'adventure']
  },
  {
    id: '17',
    title: 'Freycinet Peninsula Beauty',
    description: 'Wineglass Bay from the lookout is even more stunning in person! The turquoise water and white sand.',
    images: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a',
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0'
    ],
    category: ['beach', 'lookout', 'peninsula', 'hiking']
  },
  {
    id: '18',
    title: 'Kakadu National Park',
    description: 'Exploring ancient rock art and swimming in crystal-clear waterholes! Kakadu is a cultural wonder.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e'
    ],
    category: ['national-park', 'rock-art', 'waterholes', 'culture']
  },
  {
    id: '19',
    title: 'Bondi to Coogee Coastal Walk',
    description: 'Just completed the famous Bondi to Coogee walk! Every beach along the way was more beautiful.',
    images: [
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      'https://images.unsplash.com/photo-1502933691298-84fc14542831',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a'
    ],
    category: ['coastal-walk', 'beach', 'hiking', 'exercise']
  },
  {
    id: '20',
    title: 'Grampians National Park',
    description: 'Hiking in the Grampians was absolutely epic! The rock formations, waterfalls, and panoramic views.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'
    ],
    category: ['national-park', 'hiking', 'waterfalls', 'lookout']
  }
    ];

    const value = { posts };

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within an PostProvider');
    }
    return context;
};
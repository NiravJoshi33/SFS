import Image from 'next/image';
import React from 'react';

const leaderboardData = [
  {
    id: 1,
    companyLogo: '/assets/images/avatars/avatar-1.jpg',
    companyName: 'Superfun social',
    position: 'Social app on farcaster',
    location: 'United States',
    salary: 'games',
    tags: ['Training', 'Support', 'Travel'],
    time: '13h',
    hot: true,
  } ,
  {
    id: 1,
    companyLogo: '/assets/images/avatars/avatar-1.jpg',
    companyName: 'Superfun social',
    position: 'Social app on farcaster',
    location: 'United States',
    salary: 'games',
    tags: ['Training', 'Support', 'Travel'],
    time: '13h',
    hot: true,
  } ,
  {
    id: 1,
    companyLogo: '/assets/images/avatars/avatar-1.jpg',
    companyName: 'Superfun social',
    position: 'Social app on farcaster',
    location: 'United States',
    salary: 'games',
    tags: ['Training', 'Support', 'Travel'],
    time: '13h',
    hot: true,
  } ,
  {
    id: 1,
    companyLogo: '/assets/images/avatars/avatar-1.jpg',
    companyName: 'Superfun social',
    position: 'Social app on farcaster',
    location: 'United States',
    salary: 'games',
    tags: ['Training', 'Support', 'Travel'],
    time: '13h',
    hot: true,
  } ,
];

const LeaderboardCard = () => {
  return (
    <div className="space-y-4">
      {leaderboardData.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border border-gray-200 dark:bg-dark2">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex-shrink-0">
              <Image src={item.companyLogo} alt={item.companyName} width={48} height={48} className="rounded-full" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.position}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.companyName}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                  {item.location}
                </span>
                <span className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                  {item.salary}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {item.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{item.time}</div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardCard;

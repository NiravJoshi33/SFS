import React from 'react';

const leaderboardData = {
  volume: [
    { id: 1, name: 'RevengeTour19B4', value: '$6,857,949', img: 'assets/images/meme/memeprofile3.png' },

    { id: 2, name: '50-Pence', value: '$3,678,915', img: 'assets/images/meme/memeprofile1.png' },
    { id: 3, name: 'ticenits', value: '$3,386,127', img: 'assets/images/meme/memeprofile2.png' },
    { id: 4, name: 'EndRacistMarkets', value: '$2,965,695', img: 'assets/images/meme/memeprofile3.png' },
    { id: 5, name: 'AOC', value: '$2,750,189', img: 'assets/images/meme/memeprofile4.png' },
    { id: 6, name: 'decap', value: '$2,551,172', img: 'assets/images/meme/memeprofile2.png' },
    { id: 7, name: 'therealbatman', value: '$2,486,137', img: 'assets/images/meme/memeprofile1.png' },
    { id: 8, name: 'floby', value: '$2,154,028', img: 'assets/images/meme/memeprofile2.png' },
    { id: 9, name: 'truthteller', value: '$1,862,363', img: 'assets/images/meme/memeprofile3.png' },
  ],
  profit: [
    { id: 1, name: 'SuperApe', value: '$73,473', img: 'assets/images/meme/memeprofile1.png' },
    { id: 2, name: 'AnonHorse', value: '$60,410', img: 'assets/images/meme/memeprofile3.png' },
    { id: 3, name: 'RevengeTour19B4', value: '$47,621', img: 'assets/images/meme/memeprofile4.png' },
    { id: 4, name: 'DarthVooncer', value: '$30,944', img: 'assets/images/meme/memeprofile1.png' },
    { id: 5, name: 'SLEEPYJOE', value: '$29,919', img: 'assets/images/meme/memeprofile2.png' },
    { id: 6, name: 'bstyrcz2', value: '$27,007', img: 'assets/images/meme/memeprofile3.png' },
    { id: 7, name: 'BOMAMA', value: '$19,609', img: 'assets/images/meme/memeprofile4.png' },
    { id: 8, name: 'ticenits', value: '$19,233', img: 'assets/images/meme/memeprofile1.png' },
    { id: 9, name: 'dibc23', value: '$19,180', img: 'assets/images/meme/memeprofile2.png' },
  ],
};

const Leaderboard = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-screen-2xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
        <div className="flex justify-center mb-8">
          <button className="px-4 py-2 mx-2 bg-gray-200 rounded-lg">Day</button>
          <button className="px-4 py-2 mx-2 bg-gray-200 rounded-lg">Week</button>
          <button className="px-4 py-2 mx-2 bg-black text-white rounded-lg">Month</button>
          <button className="px-4 py-2 mx-2 bg-gray-200 rounded-lg">All</button>
        </div>
        <div className="flex justify-center mb-4">
          <span className="text-gray-600">Resets in 21d 14h 25m 20s</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Volume</h2>
            <ul className="space-y-4">
              {leaderboardData.volume.map((item) => (
                <li key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <div className="flex items-center space-x-4">
                    <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-gray-600">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Profit</h2>
            <ul className="space-y-4">
              {leaderboardData.profit.map((item) => (
                <li key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <div className="flex items-center space-x-4">
                    <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-gray-600">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

import React from 'react';

const Tags = ({ noteTags }) => {
  const getRandomColor = () => {
    const colors = [
      {
        bg: 'bg-red-200',
        text: 'text-red-700',
      },
      {
        bg: 'bg-yellow-200',
        text: 'text-yellow-700',
      },
      {
        bg: 'bg-green-200',
        text: 'text-green-700',
      },
      {
        bg: 'bg-blue-200',
        text: 'text-blue-700',
      },
      {
        bg: 'bg-indigo-200',
        text: 'text-indigo-700',
      },
      {
        bg: 'bg-purple-200',
        text: 'text-purple-700',
      },
      {
        bg: 'bg-pink-200',
        text: 'text-pink-700',
      },
      {
        bg: 'bg-gray-200',
        text: 'text-gray-700',
      },
      {
        bg: 'bg-orange-200',
        text: 'text-orange-700',
      },
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return randomColor;
  };

  return (
    <div className="flex overflow-hidden w-full h-12 p-2 gap-2">
      {noteTags &&
        noteTags.map((tag, index) => {
          const randomColor = getRandomColor();
          return (
            <span
              className={`${randomColor.bg} w-full h-8 p-2 grid place-content-center text-center m-auto rounded-md text-xs font-semibold6 ${randomColor.text}`}
              key={index}
            >
              {tag}{' '}
            </span>
          );
        })}
    </div>
  );
};

export default Tags;

import { Link } from 'react-router-dom';

const PlaceItem = ({ location }) => {
  return (
    <Link to={`${location.name}`} className='group '>
      <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8'>
        <img
          src={
            location.imageSrc ||
            'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'
          }
          alt={location.imageAlt}
          className='h-full w-full object-cover object-center group-hover:opacity-75'
        />
      </div>
      <h3 className='mt-4 text-lg text-gray-900 group-hover:text-gray-400'>
        {location.name}
        <span className='ml-2 text-sm text-gray-600 group-hover:text-gray-300'>
          {location.category}
        </span>
      </h3>
      <p className='mt-1 text-sm font-normal text-gray-900  group-hover:text-gray-400'>
        <span>{location.address}</span>
        <span className='ml-2 text-gray-600  group-hover:text-gray-300'>
          {location.number}
        </span>
      </p>

      <p className='mt-1 text-lg font-medium text-blue-400 group-hover:text-blue-200'>
        {location.benefit}
      </p>
    </Link>
  );
};

export default PlaceItem;
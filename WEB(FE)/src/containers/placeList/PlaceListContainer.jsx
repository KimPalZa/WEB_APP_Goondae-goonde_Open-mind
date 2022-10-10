import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';
import PlaceList from '../../components/places/PlaceList';
import LoadingPlaceList from '../../components/loading/LoadingPlaceList';
import { list } from '../../modules/locations';

const PlaceListContainer = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { locations, loading, lastPage } = useSelector(
    ({ locations, loading }) => ({
      locations: locations.locations,
      lastPage: locations.lastPage,
      loading: loading['locations/LIST'],
    })
  );
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const buildLink = ({ username, page }) => {
    const query = qs.stringify({ page });
    return username ? `@${username}?${query}` : `?${query}`;
  };

  useEffect(() => {
    dispatch(list({ page }));
  }, [dispatch, page]);

  return (
    <>
      {loading ? (
        <>
          <LoadingPlaceList />
          <Pagination page={1} lastPage={1} />
        </>
      ) : (
        locations && (
          <>
            <PlaceList locations={locations} />
            <Pagination page={page} lastPage={lastPage} buildLink={buildLink} />
          </>
        )
      )}
    </>
  );
};

export default PlaceListContainer;
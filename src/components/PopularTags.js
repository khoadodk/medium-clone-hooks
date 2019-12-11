import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import Loading from './Loading';
import Error from './Error';

const PopularTags = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch('/tags');
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) return <Loading />;

  if (error) return <Error />;

  return (
    <div class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        {response.tags.map(tag => (
          <Link to={`/tags/${tag}`} className="tag-pill tag-default" key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;

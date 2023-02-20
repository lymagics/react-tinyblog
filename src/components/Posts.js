import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Post from './Post';
import Write from './Write';
import More from './More';
import { useApi } from '../contexts/ApiProvider';

export default function Posts({ content, write }) {
  const [posts, setPosts] = useState();
  const [nextPage, setNextPage] = useState();
  const api = useApi();

  const url = content !== undefined ? `/users/${content}/posts/` : '/posts/';

  useEffect(() => {
    (async () => {
      const response = await api.get(url);
      setPosts(response.ok ? response.body.results : null);
      setNextPage(response.ok ? response.body.next : null);
    })();
  }, [url, api]);

  const showPosts = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const loadNextPage = async () => {
    const response = await api.get(url + '?page=' + nextPage);
    if (response.ok) {
      setPosts([...posts, ...response.body.results]);
      setNextPage(response.body.next);
    }
  };

  return (
    <>
      {write && <Write showPost={showPosts} />}
      {posts === undefined ?
        <Spinner animation='border' />
        :
        <>
          {posts === null ?
            <p>Failed to retrieve posts.</p>
            :
            <>
              {posts.length === 0 ?
                <p>There are no blog posts.</p>
                :
                <>
                  {posts.map(post => <Post key={post.id} post={post} />)}
                  {nextPage !== null && <More loadNextPage={loadNextPage} />}
                </>
              }
            </>
          }
        </>
      }
    </>
  );
}
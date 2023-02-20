import { memo } from 'react';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo';

export default memo(function Post({ post }) {
  return (
    <Stack direction='horizontal' className='Post'>
      {console.log(post)}
      {console.log(post.author)}
      <Image 
        src={post.author.avatar_url + '&s=48'} 
        roundedCircle 
        alt={post.author.username}
      />
      <div className='Content'>
        <Link to={'/user/' + post.author.username}>
          {post.author.username}
        </Link>
        &nbsp;&mdash;&nbsp;<TimeAgo isoDate={post.timestamp} />
        <p>{post.text}</p>
      </div>
    </Stack>
  );
})
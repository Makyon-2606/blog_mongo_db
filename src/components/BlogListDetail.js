import { useLocation } from 'react-router-dom';

// ブログ詳細画面
const BlogListDetail = () => {
  const location = useLocation();
  const post = location.state;

  return (
    <div className='post-detail'>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogListDetail;

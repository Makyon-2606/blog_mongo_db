import { Link } from 'react-router-dom';

/**
 * ブログ一覧のコンポーネント
 *
 * @param {object} post authUserBlogPostsの単一データ
 */
const BlogList = ({ post }) => {
  return (
    <>
      <section class='section'>
        <div class='container'>
          <article>
            <Link to='blogDetail' state={post}>
              <div class='text'>
                <p class='h2'>{post.title}</p>
                <p className='ellipsis'>{post.content}</p>
              </div>
            </Link>
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogList;
